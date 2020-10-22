import React, { Component } from 'react';
import { TableRow, TableCell, Button, Input, Select, MenuItem } from '@material-ui/core';
import { styled } from '@material-ui/core/styles';

const StyledInput = styled(Input)({
    fontSize:'14px'
});

const StyledSelect = styled(Select)({
    fontSize:'14px'
});

class Product extends Component {
    state = {
        product:this.props.p
    }

    onClickButtonEdit = () =>{
        this.setState({ edit:true });
    }

    onClickButtonSave = () => {
        this.setState({ edit:false });
        this.props.updateProduct(this.state.product);
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

    renderCategory = () => {
        if (!this.props.categories) {
            return 'Unknown category';
        }

        let { category_id } = this.state.product;
        let category = this.props.categories.find(c => c._id === category_id);

        if (!category) {
            return 'Unknown category';
        }

        return category.name;
    }

    renderCategoriesList = () => {
        return (
            <StyledSelect
                value={this.state.product.category_id}
                onChange={this.onChangeCategoryValue}
            >
                {this.props.categories.map(c => {
                    return <MenuItem key={c._id} value={c._id}>{c.name}</MenuItem>
                })}
            </StyledSelect>
        );
    }

    renderNormalMode = () => {
        return ( 
            <TableRow>
                <TableCell>{this.state.product.name}</TableCell>
                <TableCell>{this.renderCategory()}</TableCell>
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
                    <StyledInput 
                        value={this.state.product.name}
                        onChange={this.onChangeNameValue}
                        fullWidth
                    />
                </TableCell>
                <TableCell>
                    {/*<StyledInput
                        value={this.state.product.category_id}
                        fullWidth
                        onChange={this.onChangeCategoryValue}
                    />*/}
                    {this.renderCategoriesList()}
                </TableCell>
                <TableCell>
                    <StyledInput
                        value={this.state.product.price}
                        fullWidth
                        onChange={this.onChangePriceValue}
                    />
                </TableCell>
                <TableCell>
                    <StyledInput
                        value={this.state.product.weight}
                        fullWidth
                        onChange={this.onChangeWeightValue}
                    />
                </TableCell>
                <TableCell>
                    <StyledInput
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