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




class Finished extends Component {
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
      name: this.props.match.params.participantID
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
    let redirectlink = '/';
    let patientVar = this.state.response;
    let name = this.state.name;
    let splitName = name.split(" ");
    let firstName = splitName[0];
    return(
      <div className="info-side container" align="center" >
        <br/>
        <h2 class="white-text">Congratualations {firstName}, you have completed the experiment. Our goal with this information is to guage how much
        physicians rely on technology in the case of stroke diagnoses. If you have any further questions feel free to contact Andrew Nguyen (adn047@ucsd.edu) or Vishwajith Ramesh (vramesh@eng.ucsd.edu).</h2>
        <br/><br/>
        <Link to="/"><button class = "btn btn-lg btn-primary btn-width">Click Here To Return to Home</button></Link>


      </div>
    )
  }
}

export default Finished;
