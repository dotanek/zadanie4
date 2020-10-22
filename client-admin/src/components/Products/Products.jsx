import React, { Component } from 'react';
import { Grid } from '@material-ui/core';
import { Table, TableHead, TableBody, TableRow, TableCell } from '@material-ui/core';

import Product from './Product';

class Products extends Component {
    state = {  }

    renderProducts = () => {
        if(!this.props.products || this.props.products.length === 0) {
            return (
                <TableRow>
                    <TableCell colSpan="5">No products found.</TableCell>
                </TableRow>
            );
        }

        return this.props.products.map(p => {
            return (
                <Product
                    key={p._id}
                    p={p}
                    categories={this.props.categories}
                    updateProduct={(p) => this.props.updateProduct(p)}
                />
            );
        });
    }

    render() { 
        return (
            <Grid item container>
                <Grid item xs={1} />
                <Grid item xs={10}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Name</TableCell>
                                <TableCell>Category</TableCell>
                                <TableCell>Price</TableCell>
                                <TableCell>Weight</TableCell>
                                <TableCell>Description</TableCell>
                                <TableCell></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {this.renderProducts()}
                        </TableBody>
                    </Table>
                </Grid>
                <Grid item xs={1} />
            </Grid>
        );
    }
}
 
export default Products;