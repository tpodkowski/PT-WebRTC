import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './css/index.css';
import VideoContainer from './components/VideoContainer';
import LoginDialog from './components/LoginDialog';
import {
  Snackbar,
} from '@material-ui/core';
import openSocket from 'socket.io-client';

class App extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      name: '',
      rooms: [],
      showNotification: false,
      notificationMessage: '',
    }

    this.socket = openSocket('wss://192.168.1.64:3000');

    this.handleAddName = this.handleAddName.bind(this);
    this.showNotification = this.showNotification.bind(this);
    this.handleAddRoom = this.handleAddRoom.bind(this);
    this.handleDeletingRoom = this.handleDeletingRoom.bind(this);
  }

  componentDidMount() {
    this.socket.on('rooms:changed', (rooms) => {
      this.setState({ rooms });
    });
  }

  handleAddName(name) {
    this.setState({ name });

    this.showNotification(`Hi there, ${name}!`);
  }

  showNotification(notificationMessage) {
    this.setState({
      showNotification: true,
      notificationMessage,
    })
  }

  handleAddRoom(room) {
    this.socket.emit('rooms:changed', room);
  }
  
  handleDeletingRoom(roomIndex) {
    this.socket.emit('rooms:changed', roomIndex);
  }

  render() {
    const {
      name,
      rooms,
      showNotification,
      notificationMessage,
    } = this.state;
    return (
      <div className="app">
        <LoginDialog
          isOpen={!name}
          onSubmit={this.handleAddName}
        />

        <VideoContainer
          name={name}
          rooms={rooms}
          showNotification={this.showNotification}
          addRoom={this.handleAddRoom}
          deleteRoom={this.handleDeletingRoom}
        />

        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          open={showNotification}
          autoHideDuration={3000}
          message={notificationMessage}
          onClose={() => this.setState({
            showNotification: false,
            notificationMessage: '',
          })}
        />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));