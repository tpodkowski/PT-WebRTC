import React, { Component } from 'react';
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  TextField,
} from '@material-ui/core';

class AddRoomDialog extends Component {
  constructor (props) {
    super(props);

    this.state = {
      roomName: '',
    };
  }

  render() {
    const {
      isOpen
    } = this.props;
    const {
      roomName,
    } = this.state;
    return (
      <Dialog open={isOpen}>
        <DialogTitle>Add room name:</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Room name"
            margin="normal"
            onChange={(event) => this.setState({ roomName: event.target.value })}
          />
          <Button
            fullWidth
            variant="contained"
            color="primary"
            onClick={() => this.props.onSubmit(roomName)}
            disabled={!roomName || roomName.length < 3}
          >
            Add room
          </Button>
        </DialogContent>
      </Dialog>
    );
  }
}
export default AddRoomDialog;