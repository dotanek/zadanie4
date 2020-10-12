import React, { Component } from 'react';
import { Grid, TextField } from '@material-ui/core';

import Products from './Products';

class Shop extends Component {
    state = {
        searchFieldValue:'',
        filter: (e) => {
            return (
                e.name.toLowerCase().includes(this.state.searchFieldValue.toLowerCase()) ||
                e.description.toLowerCase().includes(this.state.searchFieldValue.toLowerCase())
            );
        }
    }

    onChangeSearchField = (e) => {
        this.setState({ searchFieldValue:e.target.value });
    }

    render() { 
        return (
            <React.Fragment>
                <Grid item xs={false} sm={1}/>
                <Grid item container direction='column' xs>
                    <Grid item style={{ padding:'20px' }}>
                        <TextField
                            fullWidth
                            placeholder='Type something to search for a product.'
                            value={this.state.searchFieldValue}
                            onChange={this.onChangeSearchField}
                            
                        />
                    </Grid>
                    <Grid item style={{marginTop:'40px'}}>
                        <Products
                            filter={this.state.filter}
                            products={this.props.products}
                            onClickButtonAdd={(_id) => this.props.onClickButtonAdd(_id)}
                        />
                    </Grid>
                </Grid>
                <Grid item xs={false} sm={1}/>
            </React.Fragment>
        );
    }
}
 
export default Shop;