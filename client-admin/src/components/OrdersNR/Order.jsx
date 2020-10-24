import React, { Component } from 'react';
import { TableRow, TableCell, Menu, MenuItem, Button } from '@material-ui/core';

class Order extends Component {
    state = { }

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

    handleClick = (e) => {
        this.setState({ anchorEl:e.currentTarget });
    }

    handleClose = () => {
        this.setState({ anchorEl:null });
    }

    renderProducts = () => {
        if (!this.props.products) {
            return 'Products unavailable.';
        }

        if (!this.props.o.products || this.props.o.products.length === 0) {
            return 'No products.';
        }

        return(
            <React.Fragment>
                <Button aria-controls="simple-menu" aria-haspopup="true" onClick={this.handleClick}>
                    Show products
                </Button>
                <Menu
                    anchorEl={this.state.anchorEl}
                    keepMounted
                    open={Boolean(this.state.anchorEl)}
                    onClose={this.handleClose}
                >
                    {this.props.o.products.map(p => {
                        let product = this.props.products.find(p2 => p.product_id === p2._id);
                        if (!product) {
                            return 'Unknown product.';
                        } 

                        return <MenuItem key={p._id}>{p.quantity}x {product.name}</MenuItem>
                    })}
                </Menu>
            </React.Fragment>
        );
    }

    renderDate = () => {
        if (!this.props.o.date) {
            return 'No date.';
        }
    }

    render() { 
        return (
            <TableRow>
                <TableCell>{this.props.o._id}</TableCell>
                <TableCell>{this.renderStatus()}</TableCell>
                <TableCell>{this.renderProducts()}</TableCell>
                <TableCell>{this.renderDate()}</TableCell>
                <TableCell>
                    <Button variant="contained" style={{marginRight:'10px'}}
                        onClick={() => this.props.confirmOrder(this.props.o)}
                    >Realize</Button>
                    <Button variant="contained"
                        onClick={() => this.props.cancelOrder(this.props.o)}
                    >Cancel</Button>
                </TableCell>
            </TableRow>
        );
    }
}
 
export default Order;