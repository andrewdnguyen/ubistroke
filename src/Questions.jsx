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
      <form>
        <br/>
        <submit class = "btn btn-lg btn-primary" onClick={this.saveChanges}>Submit Your Answers</submit>
        <br/>
        <br/>
          <h2 class="white-text">Please Answer All of the Following Questions</h2>
          <br/>
          <p class="white-text">Were there any symptoms in particular which you found difficult to diagnose with just the information we gave you?</p>
          <textarea rows="4" className="notes form-control" onChange={this.updateNotes} name="question2" value={patientVar.question2}/>
          <br/>
          <p class="white-text">Was any of the given information largely unnecessary or unused?</p>
          <textarea rows="4" className="notes form-control" onChange={this.updateNotes} name="question3" value={patientVar.question3}/>
          <br/>
          <p class="white-text">Which piece of information was most helpful for you?</p>
          <select class="form-control" id="levelOfConsciousness" name="mostHelpful" onChange={this.updateNotes} value={patientVar.mostHelpful}>
            <option disabled selected value> -- select an option -- </option>
            <option value="Symptoms List">The Displayed List of Symptoms</option>
            <option value="Skeleton">The Color-Coded Skeleton</option>
            <option value="Graph">The Joint Movement Graph</option>
            <option value ="Video">The Exam Video</option>
           <option value ="Both Graph and Video">Both the Video and Joint Movement Graph Synched</option>
           <option value ="Other">Something Else</option>
          </select>
          <p class="white-text">If you answered other, elaborate here.</p>
          <textarea rows="1" className="notes form-control" onChange={this.updateNotes} name="mostHelpfulOther" value={patientVar.mostHelpfulOther}/>
          <br/>
          <p class="white-text">Which piece of information was most helpful for your diagnoses?</p>
          <textarea rows="4" className="notes form-control" onChange={this.updateNotes} name="question5" value={patientVar.question5}/>
          <br/>
          <br/>
          <p class="white-text">Do you feel that the information provided by this application is reliable and accurate?</p>
          <textarea rows="4" className="notes form-control" onChange={this.updateNotes} name="question8" value={patientVar.question8}/>
          <br/>
          <p class="white-text">Did you feel that there any errors in any of the data we provided?</p>
          <textarea rows="4" className="notes form-control" onChange={this.updateNotes} name="question9" value={patientVar.question9}/>
          <p class="white-text">In general, do you often trust or rely on information provided from your team? What about other teams? Outside of your own hospital system?</p>
          <textarea rows="4" className="notes form-control" onChange={this.updateNotes} name="question7" value={patientVar.question7}/>
          <br/>
          <p class="white-text">In your daily work, is there any software program that helps you make medical decisions for your patients? If so, what is the name of the software and what does it tell you?</p>
          <textarea rows="4" className="notes form-control" onChange={this.updateNotes} name="question10" value={patientVar.question10}/>
          <br/>
          <p class="white-text">General Questions and Comments:</p>
          <textarea rows="4" className="notes form-control" onChange={this.updateNotes} name="notes" value={patientVar.notes}/>
          <br/>

        </form>
      </div>
    )
  }
}

export default Questions;
