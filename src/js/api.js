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

export const emitJoinRoom = (room) => {
  if (room !== "") {
    socket.emit('room:join', room);
  }
}

socket.on('room:full', (room) => {
  alert('Message from client: Room ' + room + ' is full :^(');
});

export const onRoomJoined = (onSuccess) => {
  socket.on('room:joined', (data) => {
    const { isInitiator } = data;
    console.log(`Joined isInitiator: ${isInitiator}`, data);
    onSuccess(data);
  });
}

export const videoStream = (videoStream) => {
  socket.emit('video:stream', videoStream);
}

socket.on('video:stream', (videoStream) => {
  console.log({ videoStream });
})

socket.on('room:ready', () => {
  console.log('Room ready');
});
