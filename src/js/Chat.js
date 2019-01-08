import React, { Component } from 'react';
import {
  Box,
  Button,
  Grommet,
  Text,
  TextArea,
  InfiniteScroll,
} from 'grommet';
import { Send } from 'grommet-icons';
import {
  getMessages,
  sendMessage,
  getWriter,
  sendWriter,
} from './api';

class Chat extends Component {
  constructor(props) {
    super(props);
    this.inputRef = React.createRef();

    this.state = {
      messages: [],
      writer: '',
    }

    this.submitMessage = this.submitMessage.bind(this);
    this.onStartWriting = this.onStartWriting.bind(this);
    this.onStopWriting = this.onStopWriting.bind(this);
  }

  componentDidMount() {
    getMessages(messages => this.setState({ messages }));
    getWriter(writer => console.log({ writer}) || this.setState({ writer }));
  }

  submitMessage() {
    sendMessage(this.inputRef.current.value);
    this.inputRef.current.value = '';
  }

  onStartWriting() {
    sendWriter(this.props.userName)
  }

  onStopWriting() {
    sendWriter('')
  }

  render() {
    return (
      <Grommet className="chat">
        <Box className="message" style={{ maxHeight: 450 }}>
          <InfiniteScroll
            items={this.state.messages}
            step={5}
            pad="medium"
            replace={true}
          >
            {(item, index) => (
              <Box
                key={index}
                pad='small'
                direction="row"
              >
                <Text size='medium'>{item.message}</Text>
                <Text size='medium' weight="bold">{item.date}</Text>
              </Box>
            )}
          </InfiniteScroll>
        </Box>
        <Box direction="row" pad="medium" gap='medium' align='center'>
          <TextArea
            ref={this.inputRef}
            type="text"
            name="message"
            onFocus={this.onStartWriting}
            onBlur={this.onStopWriting}
            placeholder={this.state.writer ? `${this.state.writer} is typing...` : 'Your message'}
          />
          <Button
            primary={true}
            icon={<Send />}
            label="Send"
            onClick={this.submitMessage}
          />
        </Box>
      </Grommet>
    );
  }
}

export default Chat;
