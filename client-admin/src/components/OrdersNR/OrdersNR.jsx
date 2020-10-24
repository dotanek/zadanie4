import React, { Component } from 'react';
import { Grid } from '@material-ui/core';
import { Table, TableHead, TableBody, TableRow, TableCell } from '@material-ui/core';

import Order from './Order';

class OrdersNR extends Component {
    state = { }

    renderOrders = () => {

        if (!this.props.statuses || !this.props.orders) {
            return (
                <TableRow>
                    <TableCell colSpan="4">No orders found.</TableCell>
                </TableRow>
            );
        }

        let confirmed = this.props.statuses.find(s => s.name === 'CONFIRMED');
        let unconfirmed = this.props.statuses.find(s => s.name === 'UNCONFIRMED');

        let orders = this.props.orders.filter(o => {
            return o.status_id === confirmed._id || o.status_id === unconfirmed._id;
        });

        if(!orders || orders.length === 0) {
            return (
                <TableRow>
                    <TableCell colSpan="4">No orders found.</TableCell>
                </TableRow>
            );
        }

        return orders.map(o => {
            return (
                <Order
                    key={o._id}
                    statuses={this.props.statuses}
                    products={this.props.products}
                    o={o}
                    confirmOrder={this.props.confirmOrder}
                    cancelOrder={this.props.cancelOrder}
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
                                <TableCell>Products</TableCell>
                                <TableCell>Date</TableCell>
                                <TableCell></TableCell>
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
 
export default OrdersNR;