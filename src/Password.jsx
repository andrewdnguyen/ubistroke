import React, { Component } from "react";
import PatientInfo from './PatientInfo';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { Redirect } from 'react-router';
import PatientSkeleton from './PatientSkeleton.jsx';
import PatientSkeletonNew from './PatientSkeletonNew.jsx';
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

class Password extends Component {
  constructor() {
    super();

    // this.app = firebase.initializeApp(config);
    !firebase.apps.length ? this.app = firebase.initializeApp(config) : this.app = firebase.app();

    this.database = this.app.database().ref().child('info');

    this.state = {
      profileArray: [],
      loading: true,
      redirect: false,
      input: "",
      color: "transparent"
    };
  }

getModules(){
  this.database.on('value', snap => {
    this.setState({
      password: snap.val().settings.password,
      loading: false
    });
  });
    //window.localStorage.setItem('storedDatabase', JSON.stringify(this.response));
  }

  updateInput = e => {
    this.setState({input: e.target.value});
  }

  checkPassword = e =>{
    e.preventDefault();
    if(this.state.password === this.state.input){
      this.setState({redirect: true});
    }
    else{
      this.setState({color: "red"});
    }
  }

  componentDidMount(){
      this.getModules();
      //console.log(JSON.stringify(this.response));
  }

  render(){

    return this.state.redirect ? (
        <Redirect to="/home" />
        ) :(

      <div>

        <h1 style={{color: 'white'}}><center>Please enter the emailed passcode:</center></h1>
        <p style={{color: this.state.color}}><center>You have inputted the wrong passcode, please try again.</center></p>
        <form onSubmit={this.checkPassword}>
          <center><input type="password" name="Password" onChange={this.updateInput} value={this.state.input}></input></center>
          <br/><br/>
          <center><input type="submit" class="btn-lg btn-primary"/></center>
        </form>

      </div>
    );
  }
};

export default Password;
