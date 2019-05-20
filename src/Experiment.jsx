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




class Experiment extends Component {
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
          name: "",
          confidence: "1"
      }
      }
    };


  getModules(){
    this.database.on('value', snap => {
      console.log(JSON.stringify(snap.val().responseArrayThree));
      this.setState({
        test:snap.val().responseArrayThree,
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
      name: e.target.value

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
  let newData = {[this.state.response.name]:{role: this.state.response.occupation, confidence: this.state.response.confidence}}
  //console.log(variable);
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
    let redirectlink = '/';
    let patientVar = this.state.response;
    return this.state.redirect ? (
        <Redirect to={'/debrief/' + this.state.response.name} />
        ) :(
      <div className="info-side container">
      <form>
        <br/>

        <h2 class="white-text">Welcome to our the Ubistroke experiment! Before we begin please answer these quick questions, please make sure to answer them all.</h2>
        <br/>
        <br/>
          <p class="white-text">What is your full name?</p>
          <input class="form-control" id="name" onChange={this.updateID} value={patientVar.name} required></input>
          <br/>
          <p class="white-text">What is your current medical occupation or status?</p>
          <textarea rows="1" className="notes form-control" onChange={this.updateNotes} name="occupation" value={patientVar.occupation}/>
          <br/>
          <p class="white-text">How confident are you in your own NIHSS diagnoses when done in-person?</p>
          <select class="form-control" name="confidence" onChange={this.updateNotes} value={patientVar.confidence}>
            <option value="1">1 = No Confidence</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value ="4">4</option>
            <option value ="5">5</option>
            <option value ="6">6</option>
            <option value ="7">7 = Full Confidence</option>
          </select>          <br/>
          <submit class = "btn btn-lg btn-primary" onClick={this.saveChanges}>Submit Your Answers</submit>


        </form>
      </div>
    )
  }
}

export default Experiment;
