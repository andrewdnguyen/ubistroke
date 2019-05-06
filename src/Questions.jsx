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
      loading: true,
      redirect: false,
      saved: false,
      timeSaved: 0,
      index: this.props.patientIndex,
      test: {},
      response: {
          notes: "",
          subjectID: ""
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
      notes: e.target.value

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
  newData.push(this.state.response);
  let updates = {['/responseArrayThree']:newData};
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
        <Redirect to={redirectlink} />
        ) :(
      <div className="info-side">
      <form>
        <br/>
        <submit class = "btn btn-lg btn-primary" onClick={this.saveChanges}>Save Changes</submit>
        <br/>
        {(this.state.saved) ? <div><p>Saved changes at {this.state.timeSaved}</p></div> : <div></div>}
        <br/>
          <h2 class="white-text">Input Your Subject ID:</h2>
          <input class="form-control" id="subjectID" onChange={this.updateID} value={patientVar.subjectID} required></input>
          <br/>
          <p class="white-text">General Questions and Comments:</p>
          <textarea rows="4" className="notes form-control" onChange={this.updateNotes} name="Diagnosis" value={patientVar.notes}/>
          <br/>
        </form>
      </div>
    )
  }
}

export default Questions;
