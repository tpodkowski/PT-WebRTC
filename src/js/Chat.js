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
} from './api';

class Chat extends Component {
  constructor(props) {
    super(props);
    this.inputRef = React.createRef();

    this.state = {
      messages: [],
    }

    this.submitMessage = this.submitMessage.bind(this);
  }

  componentDidMount() {
    getMessages(messages => this.setState({ messages }));
    this.inputRef.current.focus();
  }

  submitMessage() {
    sendMessage(this.inputRef.current.value);
    this.inputRef.current.value = '';
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
            placeholder="Message"
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
