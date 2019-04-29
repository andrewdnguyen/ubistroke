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



  render() {
    return this.state.loading ? (
            <div>
                loading...
            </div>
        ) :(
      <div class="canvas-div2">
      <Player fluid={false} width={285} ref="player">
        <source src={this.state.test[this.props.patientIndex].video} ></source>
      </Player>
      </div>
    )
  }
}

export default PatientVideo;
