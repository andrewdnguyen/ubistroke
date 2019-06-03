import React, { Component } from 'react';
import { Redirect } from 'react-router';
import Test from './test.json';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import './Button.css';
import firebase from "firebase";
var config = {
  apiKey: "AIzaSyDBFvjEfVbGK6njvCN49i68K-F8S_w5mus",
  authDomain: "ubistroke.firebaseapp.com",
  databaseURL: "https://ubistroke.firebaseio.com",
  projectId: "ubistroke",
  storageBucket: "ubistroke.appspot.com",
  messagingSenderId: "466560050867"
};




class Randomizer extends Component {
  constructor(props){
    super(props);
    // this.app = firebase.initializeApp(config);
    !firebase.apps.length ? this.app = firebase.initializeApp(config) : this.app = firebase.app();

    this.database = this.app.database().ref().child('info');

    this.state = {
      loading: true,
      redirect: false,
      }
    };


  getModules(){
    this.database.on('value', snap => {
      console.log(JSON.stringify(snap.val().settings));
      this.setState({
        settings:snap.val().settings,
        loading: false
      });
    });
    }

    componentDidMount(){
        this.getModules();
    }


generateArray(){
  let newArray = [];
  let i = 0;
  while(i < 5){
    let newNum = Math.floor(Math.random() * Math.floor(10)) + 1;
    if(!newArray.includes(newNum)){
      newArray.push(newNum);
      i++;
    }
  }
  return newArray;
}

saveChanges = e => {
  let newArray = this.generateArray();
  let rand1 = Math.floor(Math.random() * Math.floor(5));
  let rand2 = rand1;
  while(rand2 === rand1){
    rand2 = Math.floor(Math.random() * Math.floor(5));
  }
  let rand3 = rand2;
  while(rand3 === rand1 || rand3 === rand2){
    rand3 = Math.floor(Math.random() * Math.floor(5));
  }
  let newSettings = {};
  newSettings["orderArray"] = newArray;
  newSettings["slightFakeIndex"] = rand1;
  newSettings["randomIndex"] = rand2;
  newSettings["comboIndex"] = rand3;
  console.log(newSettings);
  let updates = {['/settings']:newSettings};
  this.database.update(updates);
  this.setState({
    settings: newSettings
  });
};

  render() {
    return this.state.loading ? (
            <div>
                loading...
            </div>
        ):(
      <div>
        <div class="center">
        <div class="select-button" onClick={this.saveChanges}>RANDOMIZE</div>
        </div>
        <div class = "container">
        <br/>
        <center><h1 class="white-text">
          Current Patient Index: {JSON.stringify(this.state.settings.orderArray)}
          <br/>
          Shifted Value Patient: {this.state.settings.orderArray[this.state.settings.slightFakeIndex]}
          <br/>
          Random Value Patient: {this.state.settings.orderArray[this.state.settings.randomIndex]}
          <br/>
          Both Manipulations Patient: {this.state.settings.orderArray[this.state.settings.comboIndex]}

        </h1></center>
        </div>
      </div>
    )
  }
}

export default Randomizer;
