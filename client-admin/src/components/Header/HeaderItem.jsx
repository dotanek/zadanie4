import React, { Component } from 'react';
import { Grid, Button } from '@material-ui/core';

class HeaderItem extends Component {
    state = {  }

    onClickButton = () => {
        window.location.href=this.props.path;
    }

    render() { 
        return (
            <Grid item>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={this.onClickButton}
                >
                    {this.props.name}
                </Button>
            </Grid>
        );
    }
}

export default HeaderItem;