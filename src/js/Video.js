import React, { Component } from 'react';
import Webcam from "react-webcam";

class Video extends Component {
  constructor(props) {
    super(props);

    this.webcamRef = React.createRef();
  }


  render() {
    return (
      <div>
        <Webcam
          ref={this.webcamRef}
        />
      </div>
    );
  }
}

export default Video;
