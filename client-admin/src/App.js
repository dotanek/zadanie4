import React, { Component } from 'react';
import { Grid } from '@material-ui/core';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import axios from 'axios';

import Header from './components/Header/Header';
import OrdersALL from './components/OrdersALL/OrdersALL';
import OrdersNR from './components/OrdersNR/OrdersNR';
import Products from './components/Products/Products';

class App extends Component {
  state = {  }

  componentDidMount = () => {
    axios.get('http://localhost:9000/api/products')
      .then(res => {
        this.setState({ products:res.data });
      })
      .catch(err => {
        if (err.response) {
          console.log(err.response);
        }
      })

    axios.get('http://localhost:9000/api/categories')
      .then(res => {
        this.setState({ categories:res.data });
      })
      .catch(err => {
        if (err.response) {
          console.log(err.response);
        }
      }) 

      axios.get('http://localhost:9000/api/orders')
      .then(res => {
        this.setState({ orders:res.data });
      })
      .catch(err => {
        if (err.response) {
          console.log(err.response);
        }
      }) 

      axios.get('http://localhost:9000/api/statuses')
      .then(res => {
        this.setState({ statuses:res.data });
      })
      .catch(err => {
        if (err.response) {
          console.log(err.response);
        }
      }) 
  }

  updateProduct = (p) => {
    let products = [...this.state.products];
    let product = products.find(p2 => p2._id === p._id);

    if (!product) {
      return this.setState({ error:'Product does not exist.' });
    }

    let productNoId = {
      name: p.name,
      category_id: p.category_id,
      price: p.price,
      weight: p.weight,
      description: p.description
    }

    axios.put(`http://localhost:9000/api/products/${p._id}`,productNoId)
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        if (err.response) {
          console.log(err.response);
        }
      });
  }

  render() { 
    return (
      <Grid container direction="column">
        <Grid item container>
          <Header />
        </Grid>
        <Grid item container>
          <Router>
            <Switch>
              <Route exact path="/orders-notrealized" component={OrdersNR}/>
              <Route path="/orders-all" render={() => {
                return <OrdersALL
                  orders={this.state.orders}
                  statuses={this.state.statuses}
                  products={this.state.products}
                />
              }}/>
              <Route path="/" render={() => {
                return <Products
                  products={this.state.products}
                  categories={this.state.categories}
                  updateProduct={(p) => this.updateProduct(p)}
                />
              }}/>
            </Switch>
          </Router>
        </Grid>
      </Grid>
    );
  }
}
 
export default App;
