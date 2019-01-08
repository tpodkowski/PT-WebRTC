import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Video from './js/Video';
import Chat from './js/Chat';
import { Grommet } from 'grommet';

class App extends Component {
  render() {
    return (
      <Grommet>
        {/* <Video /> */}
        <Chat />
      </Grommet>
    );
  }
}

ReactDOM.render(
  <App /> ,
  document.getElementById('root')
);
