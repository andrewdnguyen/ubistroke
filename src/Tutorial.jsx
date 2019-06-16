import React, { Component } from 'react';
import { Redirect } from 'react-router';
import Test from './test.json';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import './PatientInfo.css';
import firebase from "firebase";
var config = {
  apiKey: "AIzaSyDBFvjEfVbGK6njvCN49i68K-F8S_w5mus",
  authDomain: "ubistroke.firebaseapp.com",
  databaseURL: "https://ubistroke.firebaseio.com",
  projectId: "ubistroke",
  storageBucket: "ubistroke.appspot.com",
  messagingSenderId: "466560050867"
};




class Tutorial extends Component {
  constructor(props){
    super(props);
    // this.app = firebase.initializeApp(config);
    !firebase.apps.length ? this.app = firebase.initializeApp(config) : this.app = firebase.app();

    this.database = this.app.database().ref().child('info');

    this.state = {
      loading: true,
      redirect: false,
      saved: false,
      timeSaved: 0,
      index: this.props.patientIndex,
      response: {
          occupation: "",
          name: this.props.match.params.participantID,
          confidence: "1"
      }
      }
    };


  getModules(){
    this.database.on('value', snap => {
      console.log(JSON.stringify(snap.val().settings));
      this.setState({
        test:snap.val().settings,
        loading: false
      });
    });
    }

    componentDidMount(){
        this.getModules();
    }


saveChanges = e => {
  //console.log(JSON.stringify(this.state.test))
//window.localStorage.setItem('storedDatabase', JSON.stringify(this.state.test));
  this.setState({
    saved: true,
    redirect: true
  });
};

  render() {
    let patientVar = this.state.response;
    let name = this.state.response.name;
    let splitName = name.split(" ");
    let firstName = splitName[0];
    return this.state.redirect ? (
        <Redirect to={'/experiment1/' + this.state.response.name + '/0'} />
        ) :(
      <div className="info-side container" align="center" >
        <br/>
        <h2 class="white-text">Alright {firstName}, let's do a quick run through of this experiment. Please watch the video below if this is your first time with this experiment:
        <br/><br/>
        <video controls fluid={false} width="100%" height="400px" ref="player">
          <source src="/Videos/Ubistroke_Tutorial.mp4" ></source>
        </video>
        <br/><br/>
        Click the button below to move on to a demo patient, feel free to play around with everything yourself. Some of the following patient's data may be faked for tutorial purposes. Your results will NOT be recorded.</h2>
        <br/><br/>
        <Link to={"/response1/" + this.props.match.params.participantID}><button class = "btn btn-lg btn-primary btn-width">Click Here To Get to the Demo</button></Link>
      </div>
    )
  }
}

export default Tutorial;
