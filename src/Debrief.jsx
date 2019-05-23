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




class Debrief extends Component {
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
      console.log(JSON.stringify(snap.val().responseArrayThree));
      this.setState({
        test:snap.val().responseArrayThree,
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
    let name = this.state.response.name;
    let splitName = name.split(" ");
    let firstName = splitName[0];
    let time = new Date();
    let tod = time.getHours();
    let adjective;
    if(tod < 3 && tod >= 18){
      adjective = "evening";
    }
    else if (tod < 18 && tod >= 6) {
      adjective = "afternoon";
    }
    else{
      adjective = "morning"
    }

    return this.state.redirect ? (
        <Redirect to={'/tutorial/' + this.state.response.name} />
        ) :(
      <div className="info-side container" align="center">
        <br/>
        <h2 class="white-text">Good {adjective + " " + firstName}, in this experiment we will be asking you to perform a brief NIHSS diagnosis on several patients through video.
        after each video diagnosis, we will then ask you to reevaluate your diagnosis after providing you with more information through our Ubistroke interface.</h2>
        <br/><br/>
        <button class = "btn btn-lg btn-primary btn-width" onClick={this.saveChanges}>Click Here When You're Ready</button>
      </div>
    )
  }
}

export default Debrief;
