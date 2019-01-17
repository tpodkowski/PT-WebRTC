import React, { Component } from 'react';
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  InputAdornment,
  TextField,
} from '@material-ui/core';
import AccountCircle from '@material-ui/icons/AccountCircle';

class LoginDialog extends Component {
  constructor (props) {
    super(props);

    this.state = {
      name: '',
    };
  }

  render() {
    const {
      isOpen
    } = this.props;
    const {
      name,
    } = this.state;
    return (
      <Dialog open={isOpen}>
        <DialogTitle>Enter your name:</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="What's your name?"
            margin="normal"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <AccountCircle />
                </InputAdornment>
              )
            }}
            onChange={(event) => this.setState({ name: event.target.value })}
          />
          <Button
            fullWidth
            variant="contained"
            color="primary"
            onClick={() => this.props.onSubmit(name)}
            disabled={!name || name.length < 3}
          >
            Sign in
          </Button>
        </DialogContent>
      </Dialog>
    );
  }
}
export default LoginDialog;