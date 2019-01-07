import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Video from './js/Video';
import Chat from './js/Chat';

class App extends Component {
  render() {
    return (
      <div>
        <Video />
        <Chat />
      </div>
    );
  }
}

ReactDOM.render(
  <App /> ,
  document.getElementById('root')
);
