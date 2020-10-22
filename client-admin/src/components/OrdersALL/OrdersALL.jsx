import React, { Component } from 'react';
import { Grid } from '@material-ui/core';
import { Table, TableHead, TableBody, TableRow, TableCell } from '@material-ui/core';

import Order from './Order';

class OrdersALL extends Component {
    state = {  }

    renderOrders = () => {
        if(!this.props.orders || this.props.orders.length === 0) {
            return (
                <TableRow>
                    <TableCell colSpan="4">No orders found.</TableCell>
                </TableRow>
            );
        }

        return this.props.orders.map(o => {
            return (
                <Order
                    key={o._id}
                    statuses={this.props.statuses}
                    products={this.props.products}
                    o={o}
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
                                <TableCell>ID</TableCell>
                                <TableCell>Status</TableCell>
                                <TableCell>Price</TableCell>
                                <TableCell>Date</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {this.renderOrders()}
                        </TableBody>
                    </Table>
                </Grid>
                <Grid item xs={1} />
            </Grid>
        );
    }
}
 
export default OrdersALL;