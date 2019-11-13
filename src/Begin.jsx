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




class Begin extends Component {
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
    return(
      <div className="info-side container" align="center" >
        <br/>
        <h2 class="white-text">Good job {firstName}, this marks the end of the tutorial phase. <br/><br/>
        The real experiment will begin NOW, please consider your answers carefully as your responses WILL be recorded.</h2>
        <br/><br/>
        <Link to={'/experiment1/' + this.state.response.name + '/0'}><button class = "btn btn-lg btn-primary btn-width">Click Here To Get to Begin the Experiment</button></Link>
      </div>
    )
  }
}

export default Begin;
