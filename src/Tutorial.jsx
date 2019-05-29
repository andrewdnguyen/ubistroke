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
      test: {},
      response: {
          occupation: "",
          name: this.props.match.params.participantID,
          confidence: "1"
      }
      }
    };


  getModules(){
    this.database.on('value', snap => {
      console.log(JSON.stringify(snap.val().responses));
      this.setState({
        test:snap.val().responses,
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
        <Redirect to={'/experiment1/' + this.state.response.name + '/1'} />
        ) :(
      <div className="info-side container" align="center" >
        <br/>
        <h2 class="white-text">Alright {firstName}, let's do a quick run through of the Ubistroke Interface. Please ask the research assistant running this experiment to guide you through it.</h2>
        <br/><br/>
        <Link to="/edit/0" target="_blank"><button class = "btn btn-lg btn-primary btn-width" onClick={this.openWindow}>Click Here To Demo the Interface</button></Link>
        <br/><br/>
        <button class = "btn btn-lg btn-primary btn-width" onClick={this.saveChanges}>The Research Assistant Should Click Here Once You're Ready to Begin</button>
      </div>
    )
  }
}

export default Tutorial;
