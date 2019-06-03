import React, { Component } from 'react';
import { Redirect } from 'react-router';
import Test from './test.json';
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




class Questions extends Component {
  constructor(props){
    super(props);
    // this.app = firebase.initializeApp(config);
    !firebase.apps.length ? this.app = firebase.initializeApp(config) : this.app = firebase.app();

    this.database = this.app.database().ref().child('info');

    this.state = {
      name: this.props.match.params.participantID,
      loading: true,
      redirect: false,
      saved: false,
      timeSaved: 0,
      index: this.props.patientIndex,
      test: {},
      response: {
          notes: "",
          subjectID: "",
          question1: ""
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

updateNotes = e => {
  console.log(this.state.test);
  this.setState({
    response: {
      ...this.state.response,
      [e.target.name]: e.target.value

      }
    });
}

updateID = e => {
  this.setState({
    response: {
      ...this.state.response,
      subjectID: e.target.value

      }
    });
}


getValue(input){
  let returnValue = parseInt(input);
  if(isNaN(returnValue)){
    return 0;
  }
  return returnValue;
}

saveChanges = e => {
  console.log("clicked!")
  //console.log(this.test);
  let newData = this.state.test;
  newData[this.state.name]["Questionnaire Responses"] = this.state.response;
  let updates = {['/responses']:newData};
  this.database.update(updates);
  var today = new Date();
  var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  //console.log(JSON.stringify(this.state.test))
//window.localStorage.setItem('storedDatabase', JSON.stringify(this.state.test));
  this.setState({
    timeSaved: time,
    saved: true,
    redirect: true
  });
};

  render() {
    let redirectlink = '/finished/' + this.state.name;
    let patientVar = this.state.response;
    return this.state.redirect ? (
        <Redirect to={redirectlink} />
        ) :(
      <div className="info-side">
        <br/>
        <iframe src="https://docs.google.com/forms/d/e/1FAIpQLSczvxJbKKBTyurJwdzbCF3ZDpX1dUzkY2P0IpqkYWsn6NGlJQ/viewform?embedded=true" width="100%" height="85%" frameborder="0" marginheight="0" marginwidth="0">Loading...</iframe>
        <br/><br/>
        <center><button class = "btn btn-lg btn-primary" onClick={this.saveChanges}>Click Here Once You Have Recieved Your Email Receipt</button></center>
      </div>
    )
  }
}

export default Questions;
