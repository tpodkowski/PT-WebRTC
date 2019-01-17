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
      welcomeSnackbarVisible: false,
    }
    this.handleAddName = this.handleAddName.bind(this);
  }

  handleAddName(name) {
    this.setState({
      name,
      welcomeSnackbarVisible: true,
    });
  }

  render() {
    const {
      name,
      welcomeSnackbarVisible,
    } = this.state;
    return (
      <div className="app">
        <LoginDialog
          isOpen={!name}
          onSubmit={this.handleAddName}
        />

        <VideoContainer
          name={name}
        />

        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          open={welcomeSnackbarVisible}
          autoHideDuration={3000}
          message={`Hi there, ${name}!`}
          onClose={() => this.setState({ welcomeSnackbarVisible: false })}
        />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));