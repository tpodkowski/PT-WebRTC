import openSocket from 'socket.io-client';

const socket = openSocket('ws://localhost:3000');

export const getMessages = (onSuccess) => {
  socket.on('chat:message', messages => onSuccess(messages));
}

export const sendMessage = (message) => {
  socket.emit('chat:message', message);
}

export const getWriter = (onSuccess) => {
  socket.on('chat:typing', writer => onSuccess(writer));
}

export const sendWriter = (writer) => {
  socket.emit('chat:typing', writer);
}
