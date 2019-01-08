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
      userName: null,
    }

    this.inputRef = React.createRef();
  }

  render() {
    return this.state.userName ? (
      <Box>
        {/* <Video /> */}
        <Chat userName={this.state.userName} />
      </Box>
    ) : (
      <Box direction="row" pad="medium" gap='medium' align='center'>
        <TextInput
          ref={this.inputRef}
          onFocus={this.onStartWriting}
          onBlur={this.onStopWriting}
          placeholder={this.state.writer ? this.state.writer : 'What\'s your name?'}
        />
        <Button
          primary={true}
          label="Submit"
          onClick={() => this.setState({ userName: this.inputRef.current.value })}
        />
    </Box>
    );
  }
}

ReactDOM.render(
  <App /> ,
  document.getElementById('root')
);
