import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Video from './js/Video';
import Chat from './js/Chat';
import {
  Box,
  Button,
  TextInput,
} from 'grommet';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userName: 'Tomek',
    }

    this.inputRef = React.createRef();
    this.startChat = this.startChat.bind(this);
  }

  startChat(isCaller) {
    this.setState({
      userName: this.inputRef.current.value,
      isCaller,
    })
  }

  render() {
    return this.state.userName ? (
      <Box pad="medium" gap="medium">
        <Video
          isCaller={this.state.isCaller}
          userName={this.state.userName}
        />
        <Chat userName={this.state.userName} />
      </Box>
    ) : (
      <Box direction="row" pad="medium" gap="medium" align='center'>
        <TextInput
          ref={this.inputRef}
          onFocus={this.onStartWriting}
          onBlur={this.onStopWriting}
          placeholder={this.state.writer ? this.state.writer : 'What\'s your name?'}
        />
        <Box direction="row">
          <Button label="Start" onClick={() => this.startChat(true)} primary={true}/>
          <Button label="Join" onClick={() => this.startChat(false)} />
        </Box>
    </Box>
    );
  }
}

ReactDOM.render(
  <App /> ,
  document.getElementById('root')
);
