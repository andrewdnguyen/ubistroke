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
      numClicks: 0
      }
    };


  getModules(){
    this.database.on('value', snap => {
      console.log(JSON.stringify(snap.val().settings));
      this.setState({
        settings:snap.val().settings,
        patientData: snap.val().data.patientArray,
        fakeData: snap.val().data.badArray,
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

shift(slightFake){
  let toReturn = slightFake;
  for(let e in toReturn.NIHSS){
    if(e !== "motorArm" && e !== "motorLeg"){
      if(toReturn.NIHSS[e].value != 0 && typeof(toReturn.NIHSS[e].value) !== 'undefined'){
        console.log(toReturn.NIHSS[e].value != 0);
        toReturn.NIHSS[e].value = Math.floor(Math.random() * Math.floor(3));
      }
    }
    else{
      if(toReturn.NIHSS[e].left.value !== 0 && typeof(toReturn.NIHSS[e].left.value) !== 'undefined'){
        toReturn.NIHSS[e].left.value = Math.floor(Math.random() * Math.floor(5));
      }
      if(toReturn.NIHSS[e].right.value !== 0 && typeof(toReturn.NIHSS[e].right.value) !== 'undefined'){
        toReturn.NIHSS[e].right.value = Math.floor(Math.random() * Math.floor(5));
      }
    }
  }
  return toReturn;
}

randInsert(randomFake){
  let toReturn = randomFake;
  for(let e in toReturn.NIHSS){
    if(e !== "motorArm" && e !== "motorLeg"){
      if(toReturn.NIHSS[e].value == 0 || typeof(toReturn.NIHSS[e].value) == 'undefined'){
        let chance = Math.floor(Math.random() * Math.floor(10));
        if(chance == 0){
          if (e == 'bestGaze' || e == 'visual' || e == 'facialPalsy' || e == 'limbAtaxia' || e == 'sensory' || e == 'extinctionAndInattention'){
            toReturn.NIHSS[e].side = Math.floor(Math.random() * Math.floor(3))+1;
            console.log(e);
          }
          toReturn.NIHSS[e].value = 1;
        }
      }
    }
    else{
      if(toReturn.NIHSS[e].left.value == 0 || typeof(toReturn.NIHSS[e].left.value) == 'undefined'){
        let chance  = Math.floor(Math.random() * Math.floor(10));
        if(chance == 0){
          toReturn.NIHSS[e].left.value = 1;
        }
      }
      if(toReturn.NIHSS[e].right.value == 0 || typeof(toReturn.NIHSS[e].right.value) == 'undefined'){
        let chance = Math.floor(Math.random() * Math.floor(10));
        if(chance == 0){
          toReturn.NIHSS[e].right.value = 1;
        }
      }
    }
  }
  return toReturn;
}

saveChanges = e => {
  if(this.state.numClicks == 0){
    alert("If you are a participant in this experiment, please email adn047@ucsd.edu how you found your way to this page. Participants should not be able to access this page.");
    this.setState({numClicks: parseInt(this.state.numClicks)+1});
    return;
  }
  if(this.state.numClicks == 1){
    alert("Clicking this button further will completely reorder the experiment. Are you sure you wish to proceed?");
    this.setState({numClicks: parseInt(this.state.numClicks)+1});
    return;
  }
  if(this.state.numClicks == 2){
    alert("This will be your final warning. Any further clicks will randomize the experiment ordering and conditions. Please make sure that all participants have finished their sessions and that all data has been saved.");
    this.setState({numClicks: parseInt(this.state.numClicks)+1});
    return;
  }
  //let newArray = this.generateArray();
  let newArray = [10,6,7,8,3];
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
  let slightFake = this.state.patientData[newArray[rand1]];
  let randomFake = this.state.patientData[newArray[rand2]];
  let comboIndex = this.state.patientData[newArray[rand3]];
  let faked = this.shift(slightFake);
  let faked2 = this.randInsert(randomFake);
  let faked3 = this.shift(comboIndex);
  let faked3new = this.randInsert(faked3);
  let newBad = {};
  newBad["slightChange"] = faked;
  newBad["random"] = faked2;
  newBad["combo"] = faked3new;
  let updates = {['/settings']:newSettings};
  updates['/data/badArray'] = newBad;
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
          <br/>
        </h1></center>
        </div>
      </div>
    )
  }
}

export default Randomizer;
