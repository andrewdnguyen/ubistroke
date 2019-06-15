import React, { Component } from "react";
import { Redirect } from 'react-router';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import './Patients.css'
import firebase from "firebase";
var config = {
  apiKey: "AIzaSyDBFvjEfVbGK6njvCN49i68K-F8S_w5mus",
  authDomain: "ubistroke.firebaseapp.com",
  databaseURL: "https://ubistroke.firebaseio.com",
  projectId: "ubistroke",
  storageBucket: "ubistroke.appspot.com",
  messagingSenderId: "466560050867"
};

class Saved extends Component {
  constructor() {
    super();

    // this.app = firebase.initializeApp(config);
    !firebase.apps.length ? this.app = firebase.initializeApp(config) : this.app = firebase.app();

    this.database = this.app.database().ref().child('info');

    this.state = {
      patientArray: [],
      loading: true,
      redirect: false,
      redirectLink: "/"
    };
  }

getModules(){
  this.database.on('value', snap => {
    console.log(JSON.stringify(snap.val().responses));
    this.setState({
      test:snap.val().responses,
      progress: snap.val().data.patientArray.length,
      loading: false
    });
  });
    //window.localStorage.setItem('storedDatabase', JSON.stringify(this.response));
  }

saveAndContinue = e => {
    //console.log(this.test);
    // let savedData = JSON.stringify(this.state.response);
    // localStorage.setItem('responseData', savedData);
    console.log(this.props.match.params);
    let newData = this.state.test;
    let redirectLink;
    let progress = parseInt(this.state.progress);
    let nextIndex = parseInt(this.props.match.params.subjectID);
    nextIndex = nextIndex + 1;
    console.log(nextIndex);
    if(nextIndex >= 7){
      redirectLink = '/questionnaire/' + this.props.match.params.participantID;
    }
    else{
      redirectLink = '/experiment1/' + this.props.match.params.participantID + '/' + nextIndex;
    }

    newData[this.props.match.params.participantID]["progress"] = parseInt(this.props.match.params.subjectID)+1;
    // newData.push(this.state.response);
    let updates = {['/responses']:newData};
    this.database.update(updates);
    // var today = new Date();
    // var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    this.setState({
      redirectLink: redirectLink,
      redirect: true
     });
  };

  saveAndQuit = e => {
      //console.log(this.test);
      // let savedData = JSON.stringify(this.state.response);
      // localStorage.setItem('responseData', savedData);

      let newData = this.state.test;
      let redirectLink = '/';

      newData[this.props.match.params.participantID]["progress"] = parseInt(this.props.match.params.subjectID)+1;
      // newData.push(this.state.response);
      let updates = {['/responses']:newData};
      this.database.update(updates);
      // var today = new Date();
      // var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
      this.setState({
        redirectLink: redirectLink,
        redirect: true
       });
    };

  componentDidMount(){
      this.getModules();
  }

  render(){

    if(this.state.loading){
      return (
              <div>
                  loading...
              </div>
          );
    }

    else if(this.state.redirect){
      return(
        <Redirect to={this.state.redirectLink} />
      );
    }

  else{
    return (

      <div>
        <br/><br/>
        <h1 style={{color: 'white'}}><center>{parseInt(this.props.match.params.subjectID)+1} out of 7 patients complete!<br/>Make sure to click one of the buttons below to save your progress.</center></h1>
          <div class = "patient-buttons">
          <center><button onClick={this.saveAndQuit} class="btn btn-lg btn-primary btn-block">Pause Experiment</button></center><br/><br/>
          <center><button onClick={this.saveAndContinue} class="btn btn-lg btn-primary btn-block">Continue Experiment</button></center><br/><br/>
          </div>

      </div>
    );
  }
  }
};

export default Saved;
