import React, { Component } from 'react';
import { Grid, MenuItem } from '@material-ui/core';
import { Table, TableHead, TableBody, TableRow, TableCell, Select,  } from '@material-ui/core';

import Order from './Order';

class OrdersALL extends Component {
    state = {
        selectValue:'ALL'
    }

    renderStatuses = () => {
        if (!this.props.statuses) {
            return;
        }

        return this.props.statuses.map(s => {
            return <MenuItem key={s._id} value={s.name}>{s.name}</MenuItem>
        })
    }

    renderOrders = () => {
        if(!this.props.orders || this.props.orders.length === 0) {
            return (
                <TableRow>
                    <TableCell colSpan="4">No orders found.</TableCell>
                </TableRow>
            );
        }

        let orders = this.props.orders;

        if (this.state.selectValue !== 'ALL') {
            if (this.props.statuses) {
                let status = this.props.statuses.find(s => s.name === this.state.selectValue);
                orders = orders.filter(o => o.status_id === status._id);
            }
        }

        return orders.map(o => {
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

    onChangeSelect = (e) => {
        this.setState({ selectValue:e.target.value });
    }

    render() { 
        return (
            <Grid item container>
                <Grid item xs={1} />
                <Grid item xs={10}>
                    <Select 
                        style={{marginLeft:'10px', marginTop:'30px', width:'20%' }}
                        value={this.state.selectValue}
                        onChange={this.onChangeSelect}
                    >
                        <MenuItem value="ALL">ALL</MenuItem>
                        {this.renderStatuses()}
                    </Select>
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