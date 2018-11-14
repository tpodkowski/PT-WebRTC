import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Peer from 'peerjs';
import Video from './js/Video';

class App extends Component {
  constructor(props) {
    super(props);
    this.videoRef = React.createRef();
    this.receiver = this.receiver.bind(this);
    this.sender = this.sender.bind(this);
  }
  receiver() {
    const peer = new Peer('sender', { host: 'localhost', port: 9000, path: '/' })
    const conn = peer.connect('receiver')

    conn.on('open', () => {
      conn.send('hi!')
    });
  }
  sender() {
    const peer = new Peer('receiver', { host: 'localhost', port: 9000, path: '/' })
    peer.on('connection', (conn) => {
      conn.on('data', (data) => {
        console.log(data);
      })
    })
  }
  render() {
    return (
      <div>
        <button
          onClick={this.receiver}
        >
          Receiver
        </button>
        <button
          onClick={this.sender}
        >
          Sender
        </button>
        {/* <Video
          ref={this.videoRef}
          onUserMediaError={error => console.error(error)}
        /> */}
      </div>
    );
  }
}

ReactDOM.render(
  <App /> ,
  document.getElementById('root')
);
