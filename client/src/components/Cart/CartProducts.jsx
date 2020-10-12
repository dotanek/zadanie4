import React, { Component } from 'react';
import { Grid, Table, TableHead, TableBody, TableRow, TableCell, Button, Typography } from '@material-ui/core';

import RemoveCircleOutlineIcon from '@material-ui/icons/RemoveCircleOutline';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';

class CartProducts extends Component {
    state = {
        width: window.innerWidth
    }

    componentDidMount = () => {
        window.addEventListener('resize', () => {
            this.setState({ width:window.innerWidth });
        });
    }

    countTotalOrderPrice = () => {
        let totalPrice = 0;

        this.props.cartProducts.forEach(cp => {
            totalPrice += cp.quantity * cp.product.price;
        });

        return totalPrice;
    }

    renderCartProducts = () => {

        if (this.props.cartProducts.length === 0) {
            return (
                <TableRow>
                    <TableCell align='center' colSpan="4">No products in your cart.</TableCell>
                </TableRow>
            );
        }

        return (
            <React.Fragment>
                {this.props.cartProducts
                    .map(cp => {
                        return (
                            <TableRow key={cp.product._id}>
                                <TableCell>{cp.product.name}</TableCell>
                                <TableCell>{cp.quantity}</TableCell>
                                <TableCell>{(cp.quantity*cp.product.price).toFixed(2)}</TableCell>
                                <TableCell>
                                    <Grid container spacing={1} align='right'>
                                        <Grid item xs={3}>
                                            <Button 
                                                style={{width:'90%',minWidth:'90%'}}
                                                variant='contained'
                                                color='secondary'
                                                size='small'
                                                onClick={() => this.props.onClickButtonDecrease(cp.product._id)}
                                            >
                                                <RemoveCircleOutlineIcon />
                                            </Button>
                                        </Grid>
                                        <Grid item xs={3}>
                                            <Button
                                                style={{width:'90%',minWidth:'90%'}}
                                                variant='contained'
                                                color='primary'
                                                size='small'
                                                onClick={() => this.props.onClickButtonIncrease(cp.product._id)}
                                            >
                                                <AddCircleOutlineIcon />
                                            </Button>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <Button
                                                style={{width:'90%',minWidth:'90%'}}
                                                variant='outlined'
                                                color='secondary'
                                                size='small'
                                                onClick={() => this.props.onClickButtonRemove(cp.product._id)}
                                            >
                                                {this.state.width < 1000 ? <HighlightOffIcon /> : 'REMOVE'}
                                            </Button>
                                        </Grid>
                                    </Grid>
                                </TableCell>
                            </TableRow>
                        );
                })}
                <TableRow>
                    <TableCell align='right' colSpan="4">
                        <Typography>
                            Total order price: <span style={{marginLeft:'20px',fontSize:'20px'}}>{this.countTotalOrderPrice().toFixed(2)}</span>
                        </Typography>
                    </TableCell>
                </TableRow>
            </React.Fragment>
        )
    }

    render() { 
        return (
            <Table stickyHeader>
                <TableHead>
                    <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell>Quantity</TableCell>
                        <TableCell>Total price</TableCell>
                        <TableCell />
                    </TableRow>
                </TableHead>
                <TableBody>
                    {this.renderCartProducts()}
                </TableBody>
            </Table>
        );
    }
}
 
export default CartProducts;