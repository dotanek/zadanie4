import React, { Component } from 'react';
import { Grid, Input, Typography, Button } from '@material-ui/core';
import * as EmailValidator from 'email-validator';

import CartProducts from './CartProducts';

class Cart extends Component {
    state = {
        searchFieldValue:'',
        filter: (e) => {
            return (
                e.name.toLowerCase().includes(this.state.searchFieldValue.toLowerCase()) ||
                e.description.toLowerCase().includes(this.state.searchFieldValue.toLowerCase())
            );
        },
        usernameValue:'',
        emailValue:'',
        phoneValue:''
    }

    onChangeSearchField = (e) => {
        this.setState({ searchFieldValue:e.target.value });
    }

    countTotalOrderPrice = () => {
        let totalPrice = 0;

        this.props.cartProducts.forEach(cp => {
            totalPrice += cp.quantity * cp.product.price;
        });

        return totalPrice;
    }

    onChangeUsernameInput = (e) => {
        this.setState({ usernameValue:e.target.value });
    }

    onChangeEmailInput = (e) => {
        this.setState({ emailValue:e.target.value });
    }

    onChangePhoneInput = (e) => {
        this.setState({ phoneValue:e.target.value });
    }

    verifyForm = () => {
        if (this.state.usernameValue.length === 0) {
            return this.setState({ validationError: 'Username cannot be empty.'});
        }

        if(!EmailValidator.validate(this.state.emailValue)) {
            return this.setState({ validationError: 'E-mail is not correct.'});
        }

        if (this.state.phoneValue.length === 0) {
            return this.setState({ validationError: 'Phone number cannot be empty.'});
        } else if (!/^[0-9]*$/g.test(this.state.phoneValue)) {
            return this.setState({ validationError: 'Phone number cannot contain letters.'});
        }

        this.props.submitOrder({
            username: this.state.usernameValue,
            email: this.state.emailValue,
            phone: this.state.phoneValue
        });

        this.setState({ 
            validationError:undefined,
            usernameValue:'',
            emailValue:'',
            phoneValue:''
        });
    }

    render() {
        return (
            <React.Fragment>
                <Grid item xs={false} sm={1} md={2}/>
                <Grid item container direction='column' xs spacing={4}>
                    <Grid item>
                        <CartProducts 
                            cartProducts={this.props.cartProducts}
                            onClickButtonDecrease={(_id) => this.props.onClickButtonDecrease(_id)}
                            onClickButtonIncrease={(_id) => this.props.onClickButtonIncrease(_id)}
                            onClickButtonRemove={(_id) => this.props.onClickButtonRemove(_id)}
                        />
                    </Grid>
                    <Grid item container>
                        <Grid item container direction='column' xs={6} spacing={2}>
                            <Grid item>
                                <Typography variant='h5'>
                                    User data
                                </Typography>
                            </Grid>
                            <Grid item>
                                <Input
                                    fullWidth
                                    placeholder='Username'
                                    value={this.state.usernameValue}
                                    onChange={this.onChangeUsernameInput}
                                />
                            </Grid>
                            <Grid item>
                                <Input
                                    fullWidth
                                    placeholder='E-mail'
                                    value={this.state.emailValue}
                                    onChange={this.onChangeEmailInput}
                                />
                            </Grid>
                            <Grid item>
                                <Input
                                    fullWidth
                                    placeholder='Phone number'
                                    value={this.state.phoneValue}
                                    onChange={this.onChangePhoneInput}
                                />
                            </Grid>
                        </Grid>
                        <Grid item container xs={6} align='right' justify='flex-end' style={{marginLeft:'10px',marginTop:'20px'}}>
                            <Button 
                                variant='contained'
                                color='primary'
                                style={{width:'60%',minWidth:'60%',height:'40%',marginTop:'15%'}}
                                onClick={this.verifyForm}
                            >
                                ORDER
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={false} sm={1} md={2}/>
                {this.state.validationError}
            </React.Fragment>
        );
    }
}
 
export default Cart;