import React, { Component } from 'react';
import { TableRow, TableCell, Button, Input } from '@material-ui/core';

class Product extends Component {
    state = {
        product:this.props.p
    }

    onClickButtonEdit = () =>{
        this.setState({ edit:true });
    }

    onClickButtonSave = () => {
        this.setState({ edit:false });
        //this.props.updateProduct()
    }

    renderButtons = () => {
        if (this.state.edit) {
            return (
                <React.Fragment>
                    <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    onClick={this.onClickButtonSave}
                    >Save</Button>
                </React.Fragment>
            );
        }

        return (
            <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={this.onClickButtonEdit}
            >Edit</Button>
        );
    }

    renderNormalMode = () => {
        return ( 
            <TableRow>
                <TableCell>{this.state.product.name}</TableCell>
                <TableCell>{this.state.product.category_id}</TableCell>
                <TableCell>{this.state.product.price}</TableCell>
                <TableCell>{this.state.product.weight}</TableCell>
                <TableCell>{this.state.product.description}</TableCell>
                <TableCell>
                    {this.renderButtons()}
                </TableCell>
            </TableRow>
        );
    }

    onChangeNameValue = (e) => {
        let product = this.state.product;
        product.name = e.target.value;
        this.setState({ product });
    }

    onChangeCategoryValue = (e) => {
        let product = this.state.product;
        product.category_id = e.target.value;
        this.setState({ product });
    }

    onChangePriceValue = (e) => {
        let product = this.state.product;
        product.price = e.target.value;
        this.setState({ product });
    }

    onChangeWeightValue = (e) => {
        let product = this.state.product;
        product.weight = e.target.value;
        this.setState({ product });
    }

    onChangeDescriptionValue = (e) => {
        let product = this.state.product;
        product.description = e.target.value;
        this.setState({ product });
    }

    renderEditMode = () => {
        return ( 
            <TableRow>
                <TableCell>
                    <Input 
                        value={this.state.product.name}
                        onChange={this.onChangeNameValue}
                        fullWidth
                    />
                </TableCell>
                <TableCell>
                    <Input
                        value={this.state.product.category_id}
                        fullWidth
                        onChange={this.onChangeCategoryValue}
                    />
                </TableCell>
                <TableCell>
                    <Input
                        value={this.state.product.price}
                        fullWidth
                        onChange={this.onChangePriceValue}
                    />
                </TableCell>
                <TableCell>
                    <Input
                        value={this.state.product.weight}
                        fullWidth
                        onChange={this.onChangeWeightValue}
                    />
                </TableCell>
                <TableCell>
                    <Input
                        value={this.state.product.description}
                        fullWidth
                        onChange={this.onChangeDescriptionValue}
                    />
                </TableCell>
                <TableCell>
                    {this.renderButtons()}
                </TableCell>
            </TableRow>
        );
    }

    render() { 
        if (!this.state.edit) {
            return this.renderNormalMode();
        }
        return this.renderEditMode();
    }
}
 
export default Product;