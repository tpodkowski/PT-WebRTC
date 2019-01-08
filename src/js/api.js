import openSocket from 'socket.io-client';

const socket = openSocket('ws://localhost:3000');

const getMessages = (onSuccess) => {
  socket.on('chat:message', messages => onSuccess(messages));
}

const sendMessage = (message, onSuccess) => {
  socket.emit('chat:message', message);
}

export {
  getMessages,
  sendMessage,
};
