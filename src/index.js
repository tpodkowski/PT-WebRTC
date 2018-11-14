import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Peer from 'peerjs';
import Video from './js/Video';

class App extends Component {
  constructor(props) {
    super(props);

    this.streamRef = null;
    this.localRef = React.createRef();
    this.remoteRef = React.createRef();
    this.receiver = this.receiver.bind(this);

    this.startChat = this.startChat.bind(this);
    this.stopChat = this.stopChat.bind(this);

    navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
  }

  startChat() {
    // sender
    const peer = new Peer('sender', { host: 'localhost', port: 9000, path: '/' });
    const conn = peer.connect('receiver');

    conn.on('open', () => {
      conn.send('hi!')
    });

    navigator.getUserMedia({
      video: true,
    }, (localStream) => {
      this.streamRef = localStream;
      this.localRef.current.srcObject = localStream;

      const video = this.localRef.current;
      video.srcObject = localStream;
      video.onloadedmetadata = e => video.play();

      const call = peer.call('receiver', localStream);

      call.on('stream', (remoteStream) => {
        this.remoteRef.current.srcObject = remoteStream;
      });
    }, error => console.error(error));
  }

  receiver() {
    const peer = new Peer('sender', { host: 'localhost', port: 9000, path: '/' })
    const conn = peer.connect('receiver')

    conn.on('open', () => {
      conn.send('hi!')
    })

    peer.on('call', (call) => {
      navigator.getUserMedia({
        video: true,
      }, (localStream) => {
        this.streamRef = localStream;
        this.localRef.current.srcObject = localStream;

        call.answer(localStream);

        call.on('stream', remoteStream => {
          this.remoteRef.current.srcObject = remoteStream;
        });
      });
    }, error => console.error(error));
  }

  stopChat() {
    this.streamRef.getTracks().map(val => val.stop());
  }

  render() {
    return (
      <div>
        <div>
          <button
            onClick={this.startChat}
            style={{backgroundColor: 'green', color: 'white'}}
          >
            sender
          </button>
          <button
            onClick={this.receiver}
            style={{backgroundColor: 'yellow'}}
          >
            receiver
          </button>
          <button
            onClick={this.stopChat}
            style={{backgroundColor: 'red', color: 'white'}}
          >
            Stop chat
          </button>
        </div>
        <div>
          <video
            ref={this.localRef}
            autoPlay
          ></video>
          <video
            ref={this.remoteRef}
            autoPlay
          ></video>
        </div>
      </div>
    );
  }
}

ReactDOM.render(
  <App /> ,
  document.getElementById('root')
);
