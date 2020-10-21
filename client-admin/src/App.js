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
        console.log(err);
      })
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
              <Route exact path="/orders-all" component={OrdersALL}/>
              <Route path="/" render={() => <Products products={this.state.products}/>}/>
            </Switch>
          </Router>
        </Grid>
      </Grid>
    );
  }
}
 
export default App;
