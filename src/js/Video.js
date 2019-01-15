import React, { Component } from 'react';
import {
  emitJoinRoom,
  onRoomJoined,
  videoStream,
} from './api';
import {
  Box,
  Button,
  Text,
} from 'grommet';

let remotePeerConnection = new RTCPeerConnection();
let localPeerConnection = new RTCPeerConnection();

class Video extends Component {
  constructor(props) {
    super(props);

    this.localRef = React.createRef();
    this.remoteRef = React.createRef();

    this.callAction = this.callAction.bind(this);
    this.createdAnswer = this.createdAnswer.bind(this);
    this.createdOffer = this.createdOffer.bind(this);
    this.getOtherPeer = this.getOtherPeer.bind(this);
    this.handleConnection = this.handleConnection.bind(this);
    this.startAction = this.startAction.bind(this);
    this.hangupAction = this.hangupAction.bind(this);
    this.onRoomJoined = this.onRoomJoined.bind(this);

    navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
  }

  componentDidMount() {
    onRoomJoined(this.onRoomJoined);
  }

  startAction() {
    emitJoinRoom(this.props.userName);
  }

  onRoomJoined(data) {
    const {
      isInitiator,
      videoConstraints,
    } = data;

    navigator.mediaDevices.getUserMedia(videoConstraints)
      .then(((localStream) => {
        this.localRef.current.srcObject = localStream;
        videoStream({ isInitiator , localStream});
        // if (!isInitiator) {
          this.callAction({
            isInitiator,
            localStream
          });
        // }
      }))
      .catch(error => console.error(`[${error.name}] ${error.message}`));
  }

  callAction({ isInitiator, localStream }) {
    localPeerConnection.addEventListener('icecandidate', this.handleConnection);
    localPeerConnection.addEventListener('iceconnectionstatechange', () => {});

    remotePeerConnection.addEventListener('icecandidate', this.handleConnection);
    remotePeerConnection.addEventListener('iceconnectionstatechange', () => {});
    remotePeerConnection.addEventListener('addstream', (event) => {
      console.log({ event });
      const remoteStream = event.stream;
      this.remoteRef.current.srcObject = remoteStream;
    });

    localPeerConnection.addStream(localStream);

    localPeerConnection.createOffer({
      offerToReceiveVideo: 1,
    }).then(this.createdOffer)
      .catch(error => console.error(`[${error.name}] ${error.message}`));
  }

  createdOffer(description) {
    localPeerConnection.setLocalDescription(description);
    remotePeerConnection.setRemoteDescription(description);

    remotePeerConnection.createAnswer()
      .then(this.createdAnswer)
      .catch(error => console.error(`[${error.name}] ${error.message}`));
  }

  createdAnswer(description) {
    remotePeerConnection.setLocalDescription(description);
    localPeerConnection.setRemoteDescription(description);
  }

  handleConnection({ target, candidate }) {
    console.log('onConnectionHandle', { target, candidate});

    if (candidate) {
      const newIceCandidate = new RTCIceCandidate(candidate);
      const otherPeer = this.getOtherPeer(target);

      otherPeer.addIceCandidate(newIceCandidate);
    }
  }

  getOtherPeer(peerConnection) {
    return (peerConnection === localPeerConnection) ?
      remotePeerConnection : localPeerConnection;
  }

  hangupAction() {
    localPeerConnection.close();
    remotePeerConnection.close();
    localPeerConnection = null;
    remotePeerConnection = null;
  }

  render() {
    return (
      <Box>
        <Box direction="row" gap="medium">
          <Button id="startButton" label="Start" primary={true} onClick={this.startAction}/>
          <Button id="hangupButton" label="Hang up" onClick={this.hangupAction}/>
        </Box>
        <Box direction="row" gap="medium" justify="center">
          <Box>
            <Text>Local</Text>
            <video
              ref={this.localRef}
              autoPlay
              playsInline
            ></video>
          </Box>
          <Box>
            <Text>Remote</Text>
            <video
              ref={this.remoteRef}
              autoPlay
              playsInline
            ></video>
          </Box>
        </Box>
      </Box>
    );
  }
}

export default Video;
