import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './css/index.css';
import VideoContainer from './components/VideoContainer';
import LoginDialog from './components/LoginDialog';
import {
  Snackbar,
} from '@material-ui/core';

class App extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      name: '',
      rooms: [],
      showNotification: false,
      notificationMessage: '',
    }
    this.handleAddName = this.handleAddName.bind(this);
    this.showNotification = this.showNotification.bind(this);
  }

  handleAddName(name) {
    this.setState({
      name,
    });

    this.showNotification(`Hi there, ${name}!`);
  }

  showNotification(notificationMessage) {
    this.setState({
      showNotification: true,
      notificationMessage,
    })
  }

  render() {
    const {
      name,
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
          showNotification={this.showNotification}
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