import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Grid, AppBar, Toolbar, Typography, Button } from '@material-ui/core';

import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';

const styleAppBar = {
    backgroundColor: '#0A4776',
}

const styleTypography = {
    fontSize:'14px',
}

const styleIcon = {
    fontSize:'15px',
    marginRight:'5px'
}

class Header extends Component {
    state = {  }
    render() { 
        return (
            <AppBar style={styleAppBar} position='static'>
                <Toolbar>
                    <Grid container>
                        <Grid item xs={6} sm={8} md={10}>
                            <Typography variant='h6'>
                                Aji-shop
                            </Typography>
                        </Grid>
                        <Grid item xs={6} sm={4} md={2}>
                            <Router>
                                <Route exact path='/'>
                                    <Button variant='contained' color='primary' fullWidth href='/cart'>
                                        <ShoppingCartIcon style={styleIcon} />
                                        <Typography style={styleTypography} variant='caption'>
                                            Cart ({this.props.cartProducts.length})
                                        </Typography>
                                    </Button>
                                </Route>
                                <Route exact path='/cart'>
                                    <Button variant='contained' color='primary' fullWidth href='/'>
                                        <MonetizationOnIcon style={styleIcon} />
                                        <Typography style={styleTypography} variant='caption'>
                                            Store
                                        </Typography>
                                    </Button>
                                </Route>
                            </Router>
                        </Grid>
                    </Grid>
                </Toolbar>
            </AppBar>
        );
    }
}
 
export default Header;