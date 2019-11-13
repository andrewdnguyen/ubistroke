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
      check1: false,
      check2: false,
      check3: false,
      check4: false,
      warning: false,
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
  if(this.state.check1 && this.state.check2 && this.state.check3 && this.state.check4){
    this.setState({
      saved: true,
      redirect: true
    });
  }
  else{
    this.setState({
      warning: true,
    });
  }
};

handleCheckOne = e => {
  this.setState({
    check1: !this.state.check1
  });
}

handleCheckTwo = e => {
  this.setState({
    check2: !this.state.check2
  });
}

handleCheckThree = e => {
  this.setState({
    check3: !this.state.check3
  });
}

handleCheckFour = e => {
  this.setState({
    check4: !this.state.check4
  });
}

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
        <p class="white-text">Good {adjective + " " + firstName}, in this experiment we will be asking you to perform a brief NIHSS diagnosis on several patients through video.
        after each video diagnosis, we will then ask you to reevaluate your diagnosis after providing you with more information through our Ubistroke interface.
        <br/><br/>
        <h2><strong>A few important notes before you begin (please checkmark each as you read them):</strong></h2>
        <h5>
        <input
          name="check1"
          type="checkbox"
          checked={this.state.check1}
          onChange={this.handleCheckOne} />
        This experiment requires that you are able to hear some videos, so please make sure that you have access to a speaker or headphones.
        <br/><br/>
        <input
          name="check1"
          type="checkbox"
          checked={this.state.check2}
          onChange={this.handleCheckTwo} />
        This experiment is optimized for Google Chrome so please change browsers if you are not currently on Chrome.
        <br/><br/>
        <input
          name="check1"
          type="checkbox"
          checked={this.state.check3}
          onChange={this.handleCheckThree} />
        This experiment may also be resource intensive so it is recommended that you close any other tabs before proceeding.
        <br/><br/>
        <input
          name="check1"
          type="checkbox"
          checked={this.state.check4}
          onChange={this.handleCheckFour} />
        Should you encounter any bugs or technical issues, please let us know by sending an email to vramesh@eng.ucsd.edu.
        </h5>
        </p>
        <br/><br/>
        <h5 style={{color:"red"}} hidden={!this.state.warning}>Make sure you read and check all of the boxes.</h5>
        <button class = "btn btn-lg btn-primary btn-width" onClick={this.saveChanges}>Click Here When You're Ready</button>
      </div>
    )
  }
}

export default Debrief;
