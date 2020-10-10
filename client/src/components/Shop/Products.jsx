import React, { Component } from 'react';
import { Table, TableHead, TableBody, TableRow, TableCell, Button } from '@material-ui/core';

class Porducts extends Component {
    state = {  }

    renderProducts = () => {
        return this.props.products
            .filter(p => this.props.filter(p))
            .map(p => {
                return (
                    <TableRow key={p._id}>
                        <TableCell>{p.name}</TableCell>
                        <TableCell>{p.description}</TableCell>
                        <TableCell>{p.price}</TableCell>
                        <TableCell align='right'>
                            <Button 
                                variant='contained'
                                color='secondary'
                                size='small'
                                onClick={() => this.props.onClickButtonAdd(p._id)}
                            >
                                Add
                            </Button>
                        </TableCell>
                    </TableRow>
                );
        });
    }

    render() { 
        return (
            <Table stickyHeader>
                <TableHead>
                    <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell>Description</TableCell>
                        <TableCell>Price</TableCell>
                        <TableCell />
                    </TableRow>
                </TableHead>
                <TableBody>
                    {this.renderProducts()}
                </TableBody>
            </Table>
        );
    }
}
 
export default Porducts;