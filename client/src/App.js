import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Grid, Typography } from '@material-ui/core';
import axios from 'axios';

import Header from './components/Header/Header';
import Shop from './components/Shop/Shop';
import Cart from './components/Cart/Cart';

class App extends Component {
  state = {
    products:[],
    error:""
  }

  constructor(props) {
    super(props);
  
    let cartProducts = window.localStorage.getItem("cartProducts");
    if (cartProducts) {
      this.state.cartProducts = JSON.parse(cartProducts);
    } else {
      this.state.cartProducts = [];
    }
  }

  componentDidMount = () => {
    axios.get('http://localhost:9000/api/products')
      .then(res => {
        this.setState({ products:res.data });
      })
      .catch(e => {
        if (e.response) {
          this.setState({ error:e.response.data });
        }
      });
  }

  onClickButtonAdd = (_id) => {
    let product = this.state.products.find(p => p._id === _id);
    
    if (!product) {
      return this.setState({ error:'Selected product no longer exists.' });
    }

    let cartProducts = [...this.state.cartProducts];
    let cartProduct = cartProducts.find(cp => cp.product._id === _id);

    if (cartProduct) {
      cartProduct.quantity++;
    } else {
      cartProducts.push({ product,quantity:1 });
    }
    
    window.localStorage.setItem("cartProducts", JSON.stringify(cartProducts));
    this.setState({ cartProducts });
  }

  onClickButtonDecrease = (_id) => {
    let cartProducts = [...this.state.cartProducts];
    let cartProduct = cartProducts.find(cp => cp.product._id === _id);

    if (!cartProduct) {
      return this.setState({ error:'Decreased product does not exist.'})
    }

    if (cartProduct.quantity <= 1) {
      cartProducts.splice(cartProducts.indexOf(cartProduct),1);
    } else {
      cartProduct.quantity--;
    }

    window.localStorage.setItem("cartProducts", JSON.stringify(cartProducts));
    this.setState({ cartProducts });
  }

  onClickButtonIncrease = (_id) => {
    let cartProducts = [...this.state.cartProducts];
    let cartProduct = cartProducts.find(cp => cp.product._id === _id);

    if (!cartProduct) {
      return this.setState({ error:'Increased product does not exist.'})
    }

    cartProduct.quantity++;

    window.localStorage.setItem("cartProducts", JSON.stringify(cartProducts));
    this.setState({ cartProducts });
  }

  onClickButtonRemove = (_id) => {
    let cartProducts = [...this.state.cartProducts];
    let cartProduct = cartProducts.find(cp => cp.product._id === _id);

    if (!cartProduct) {
      return this.setState({ error:'Removed product does not exist.'})
    }

    cartProducts.splice(cartProducts.indexOf(cartProduct),1);

    window.localStorage.setItem("cartProducts", JSON.stringify(cartProducts));
    this.setState({ cartProducts });
  }

  submitOrder = (userData) => {
    let order = {
      username: userData.username,
      email: userData.email,
      phone: userData.phone,
      products: this.state.cartProducts.map(cp => {
        return {
          product_id: cp.product._id,
          quantity: cp.quantity
        }
      })
    }

    axios.post('http://localhost:9000/api/orders', order, {
      headers: {
        'Content-Type': 'application/json',
      }
    })
      .then(res => {
        console.log(res);
        alert('Order created succesfully.');
        localStorage.removeItem('cartProducts');
        window.location.href = '/';
        this.setState({ cartProducts:[] });
      })
      .catch(e => {
        if (e.response) {
          this.setState({ error:e.response.data });
        }
      });
  }

  render() {
    return (
      <Grid container direction='column'>
        <Grid item container>
          <Header cartProducts={this.state.cartProducts}/>
        </Grid>
        <Grid item container justify='center' style={{paddingTop:'50px'}}>
          <Typography color='error'>
            {this.state.error}
          </Typography>
        </Grid>
        <Grid style={{paddingTop:'50px'}}  item container>
          <Router>
            <Route
              exact path='/'
              render={() => {
                return <Shop 
                  products={this.state.products}
                  onClickButtonAdd={(_id) => this.onClickButtonAdd(_id)}
                />
              }}
            />
            <Route 
              exact path='/cart'
              render={() => {
                return <Cart 
                  cartProducts={this.state.cartProducts}
                  onClickButtonDecrease={(_id) => this.onClickButtonDecrease(_id)}
                  onClickButtonIncrease={(_id) => this.onClickButtonIncrease(_id)}
                  onClickButtonRemove={(_id) => this.onClickButtonRemove(_id)}
                  submitOrder={(userData) => this.submitOrder(userData)}
                />
              }}
            />
          </Router>
        </Grid>
      </Grid>
    );
  }
}

export default App;
