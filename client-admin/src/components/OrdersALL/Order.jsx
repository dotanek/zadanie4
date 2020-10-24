import React, { Component } from 'react';
import { TableRow, TableCell } from '@material-ui/core';

class Order extends Component {
    state = {  }

    renderStatus = () => {
        if (!this.props.statuses) {
            return 'Unknown status';
        }

        let { status_id } = this.props.o;
        let status = this.props.statuses.find(s => s._id === status_id);

        if (!status) {
            return 'Unknown status';
        }

        return status.name;
    }

    renderPrice = () => {
        if (!this.props.products) {
            return 'Unknown price';
        }

        let totalPrice = 0;

        let error = false;

        this.props.o.products.forEach(p => {
            let product = this.props.products.find(p2 => p2._id === p.product_id);
            if (product) {
                totalPrice += product.price * p.quantity;
            } else {
                error = true;
            }
        });

        if (error) {
            return 'Unable to count.';
        }

        return totalPrice;
    }

    renderDate = () => {
        if (!this.props.o.date) {
            return 'No date.';
        }

        return this.props.o.date;
    }

    render() { 
        return (
            <TableRow>
                <TableCell>{this.props.o._id}</TableCell>
                <TableCell>{this.renderStatus()}</TableCell>
                <TableCell>{this.renderPrice()}</TableCell>
                <TableCell>{this.renderDate()}</TableCell>
            </TableRow>
        );
    }
}
 
export default Order;