import React, { Component } from 'react';
import openSocket from 'socket.io-client';

// import {
//   subscribeMessage
// } from './api';

const socket = openSocket('ws://localhost:3000');

class Chat extends Component {
  constructor(props) {
    super(props);
    this.inputRef = React.createRef();

    this.state = {
      messages: [],
    }
    this.sendMessage = this.sendMessage.bind(this);
  }

  componentDidMount() {
    socket.on('chat message', messages => this.setState({ messages }));
  }

  sendMessage() {
    socket.emit('chat message', this.inputRef.current.value);
    this.inputRef.current.value = '';
  }

  render() {
    return (
      <div>
        <div>
          {
            this.state.messages.map((message, index) => {
              const date = new Date(message.date);
              return (
                <div key={index}>
                  <small>
                    {`${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`}
                  </small>
                  <span> { message.message }</span>
                </div>
              )
            })
          }
        </div>
        <div>
          <textarea type="text" name="message" ref={this.inputRef} />
          <button onClick={this.sendMessage}>Send</button>
        </div>
      </div>
    );
  }
}

export default Chat;
