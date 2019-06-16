import React, { Component } from 'react';
import './version2.css';
import { Player } from 'video-react';
import firebase from "firebase";
var config = {
  apiKey: "AIzaSyDBFvjEfVbGK6njvCN49i68K-F8S_w5mus",
  authDomain: "ubistroke.firebaseapp.com",
  databaseURL: "https://ubistroke.firebaseio.com",
  projectId: "ubistroke",
  storageBucket: "ubistroke.appspot.com",
  messagingSenderId: "466560050867"
};


//var test = require('./data/kinect-data/Patient_10_2016330_145130327/Patient_10_2016330_145130327_kinect_video_color.mp4')


class PatientVideo extends Component {
  constructor(props){
    super(props);

    // this.app = firebase.initializeApp(config);
    !firebase.apps.length ? this.app = firebase.initializeApp(config) : this.app = firebase.app();

    this.database = this.app.database().ref().child('info');

    this.state = {
      loading: true,
      saved: false,
      timeSaved: 0,
      index: this.props.patientIndex,
      test: {}
    };
  }

getModules(){
    let ref = this.database;
    ref.once("value").then(dataSnapshot => {
      this.response = dataSnapshot.val().data.patientArray;
      window.localStorage.setItem('storedDatabase', JSON.stringify(this.response));
      //once the data is back, set the loading to false so it can be rendered
      this.setState({ test: this.response, loading: false });
    });
  }

  componentDidMount(){
      this.getModules();
  }

  seeking(){
    console.log(this.refs.player.duration);
    let current = parseInt(this.refs.player.currentTime);
    this.refs.audio.currentTime = current;
  }

  playAudio(){
    this.refs.audio.currentTime = this.refs.player.currentTime;
    this.refs.audio.play();
  }

  pauseAudio(){
    this.refs.audio.currentTime = this.refs.player.currentTime;
    this.refs.audio.pause();
  }


  render() {
    console.log(this.props);
    return this.state.loading ? (
            <div>
                loading...
            </div>
        ) :(
      <div class="canvas-div2">
      <div class="container">
      <video controls fluid={false} width="100%" ref="player" onSeeked={this.seeking.bind(this)} onPlay={this.playAudio.bind(this)} onPause={this.pauseAudio.bind(this)}>
        <source src={this.state.test[this.props.patientIndex].Video} ></source>
      </video>

      <audio ref="audio">
        <source src={this.state.test[this.props.patientIndex].audio} type="audio/wav"></source>
      Your browser does not support the audio element.
      </audio>


      </div>
      <h1 id="left-symbol-video"> R </h1>
      <h1 id="right-symbol-video"> L </h1>
      </div>
    )
  }
}

export default PatientVideo;
