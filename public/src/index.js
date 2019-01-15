import React from 'react';
import ReactDOM from 'react-dom';
import './css/index.css';
import VideoContainer from './components/VideoContainer';

const App = () => (
  <div className="App">
    <VideoContainer />
  </div>
);

ReactDOM.render(<App />, document.getElementById('root'));