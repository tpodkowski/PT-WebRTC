import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Video from './js/Video';

class App extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Video />
    );
  }
}

ReactDOM.render(
  <App /> ,
  document.getElementById('root')
);
