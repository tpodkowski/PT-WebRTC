import React, { Component } from 'react';
import axios from 'axios';
import Video from 'twilio-video';
import {
  AppBar,
  Button,
  Toolbar,
  Drawer,
  Fab,
  List,
  ListItem,
  ListItemText,
} from '@material-ui/core';
import Menu from '@material-ui/icons/Menu';

const AVAILABLE_ROOMS = ['General', 'Room1', 'Room2'];

class VideoContainer extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      activeRoom: null,
      previewTracks: null,
      identity: null,
      isDrawerOpened: false,
      selectedRoomIndex: null,
    };

    this.leaveRoomIfJoined = this.leaveRoomIfJoined.bind(this);
    this.roomJoined = this.roomJoined.bind(this);
    this.joinRoom = this.joinRoom.bind(this);
    this.toggleDrawer = this.toggleDrawer.bind(this);
    
    this.remoteRef = React.createRef();
    this.localRef = React.createRef(); 
  }
  
  componentDidMount() {    
    window.addEventListener('beforeunload', this.leaveRoomIfJoined);
    this.cameraPreview();
  }

  attachTracks(tracks, container) {
    tracks.forEach(track => container.appendChild(track.attach()));
  }

  attachParticipantTracks(participant, container) {
    const tracks = Array.from(participant.tracks.values());
    this.attachTracks(tracks, container);
  }

  detachTracks(tracks) {
    tracks.forEach((track) => {
      track.detach().forEach((detachedElement) => {
        detachedElement.remove();
      });
    });
  }

  detachParticipantTracks(participant) {
    const tracks = Array.from(participant.tracks.values());
    this.detachTracks(tracks);
  }

  roomJoined(room) {
    const { previewTracks } = this.state;

    this.setState({ activeRoom: room });
  
    const previewContainer = this.localRef.current;
    if (!previewContainer.querySelector('video')) {
      this.attachParticipantTracks(room.localParticipant, previewContainer);
    }

    room.participants.forEach((participant) => {
      const previewContainer = this.remoteRef.current;
      this.attachParticipantTracks(participant, previewContainer);
    });

    room.on('participantConnected', (participant) => {
      console.log(`Joining: ${participant.identity}`);
    });

    room.on('trackSubscribed', (track, participant) => {
      const previewContainer = this.remoteRef.current;
      this.attachTracks([track], previewContainer);
    });

    room.on('trackUnsubscribed', (track, participant) => {
      this.detachTracks([track]);
    });

    room.on('participantDisconnected', (participant) => {
      this.detachParticipantTracks(participant);
    });

    room.on('disconnected', () => {
      if (previewTracks) {
        previewTracks.forEach((track) => {
          track.stop();
        });
        
        this.setState({ previewTracks: null });
      }
      this.detachParticipantTracks(room.localParticipant);
      room.participants.forEach(this.detachParticipantTracks);
      
      this.setState({ activeRoom: null });
    });
  }

  cameraPreview() {
    const {
      previewTracks,
    } = this.state;

    const localTracksPromise = previewTracks
      ? previewTracks
      : Video.createLocalTracks();

    localTracksPromise.then((tracks) => {
      this.setState({ previewTracks: tracks });
      
      const previewContainer = this.localRef.current;
      if (!previewContainer.querySelector('video')) {
        this.attachTracks(tracks, previewContainer);
      }
    }, error => console.error('Unable to access local media', error));
  };

  log(message) {
    // const logDiv = document.getElementById('log');
    // logDiv.innerHTML += '<p>&gt;&nbsp;' + message + '</p>';
    // logDiv.scrollTop = logDiv.scrollHeight;
  }

  leaveRoomIfJoined() {
    const {
      activeRoom,
    } = this.state;

    if (activeRoom) {
      activeRoom.disconnect();
    }
  }

  joinRoom() {
    const {
      previewTracks,
      selectedRoomIndex,
    } = this.state;
    const { name } = this.props;
    
    const roomName = AVAILABLE_ROOMS[selectedRoomIndex];
    
    this.toggleDrawer(false);

    if (!roomName) {
      alert('Please enter a room name.');
      return;
    }

    const connectOptions = {
      name: roomName,
      logLevel: 'debug',
      ...previewTracks && { tracks: previewTracks },
    };

    axios.get(`/token?identity=${name}`)
      .then(({ data }) => {
        const { token } = data;

        Video
          .connect(token, connectOptions)
          .then(this.roomJoined)
          .catch(error => console.error(error));
      });
  }

  toggleDrawer(open) {
    this.setState({ isDrawerOpened: open });
  }

  render() {
    const { name } = this.props;
    const { activeRoom } = this.state;
    
    const containerClassNames =`
      preview
      ${!name ? 'preview--inactive' : ''}
      ${activeRoom ? 'preview--in-call' : ''}
    `;
    return (
      <div className="video">
        { name && (
          <AppBar position="absolute" className="navbar" >
            <Toolbar>
              <Fab
                color="default"
                onClick={() => this.toggleDrawer(true)}
              >
                <Menu />
              </Fab>
            </Toolbar>
          </AppBar>
        )}

        <div className={containerClassNames}>
          <div className="video-container video-container--local" ref={this.localRef}></div>
          <div className="video-container video-container--remote" ref={this.remoteRef}></div>
        </div>

        <Drawer
          anchor="right"
          open={this.state.isDrawerOpened}
          onClose={() => this.toggleDrawer(false)}
        >
          <div>
            <p className="instructions">Room Name:</p>
            <List component="nav">
              {AVAILABLE_ROOMS.map((room, index) => (
                <ListItem
                  button
                  key={index}
                  selected={this.state.selectedRoomIndex === index}
                  onClick={() => this.setState({ selectedRoomIndex: index })}
                  >
                  <ListItemText primary={room} />
                </ListItem>
              ))}
            </List>
            <Button
              color="primary"
              onClick={this.joinRoom}
              disabled={this.state.selectedRoomIndex === null}
            >Join Room</Button>
            <Button color="secondary" onClick={this.leaveRoomIfJoined}>Leave Room</Button>
          </div>
        </Drawer>
      </div>
    );
  }
}
  
  export default VideoContainer;