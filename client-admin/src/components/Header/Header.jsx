import React, { Component } from 'react';
import { Grid, AppBar, Toolbar } from '@material-ui/core';

import HeaderItem from './HeaderItem';

class Header extends Component {
    state = {  }
    render() { 
        return (
            <AppBar position="static" color="secondary">
                <Toolbar>
                    <Grid container spacing={2} justify="flex-end">
                        <HeaderItem name="Products" path="/"/>
                        <HeaderItem name="Orders (NOT REALIZED)" path="/orders-notrealized"/>
                        <HeaderItem name="Orders (ALL)" path="/orders-all"/>
                    </Grid>
                </Toolbar>
            </AppBar>
        );
    }
}
 
export default Header;