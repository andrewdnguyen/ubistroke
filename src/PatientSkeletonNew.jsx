import React, { Component } from 'react';
import Test from './test.json';
import './version2.css';
import ChartistGraph from "react-chartist";
import {
  dailySalesChart
} from "./charts.jsx";
import * as Papa from 'papaparse';
import data from './data/test-data.csv';
import { Player } from 'video-react';
import './PatientInfo.css';
import firebase from "firebase";
import Chart from 'react-google-charts';
import Skeleton from './Skeleton.jsx'
var config = {
  apiKey: "AIzaSyDBFvjEfVbGK6njvCN49i68K-F8S_w5mus",
  authDomain: "ubistroke.firebaseapp.com",
  databaseURL: "https://ubistroke.firebaseio.com",
  projectId: "ubistroke",
  storageBucket: "ubistroke.appspot.com",
  messagingSenderId: "466560050867"
};
//var test = require('./data/kinect-data/Patient_10_2016330_145130327/Patient_10_2016330_145130327_kinect_video_color.mp4')

let testData = [
    ['x', 'dogs'],
    [0, 0],
    [1, 10],
    [2, 23],
    [3, 17],
    [4, 18],
    [5, 9],
    [6, 11],
    [7, 27],
    [8, 33],
    [9, 40],
    [10, 32],
    [11, 35],
  ];

class PatientSkeletonNew extends Component {
  constructor(props){
    super(props);
    !firebase.apps.length ? this.app = firebase.initializeApp(config) : this.app = firebase.app();

    this.database = this.app.database().ref().child('info');
    this.state = {
      loading: true,
      trueMin: [],
      trueMax: [],
      minimum: [],
      maximum: [],
      index: this.props.patientIndex,
      database: {},
      displayGraph: true,
      diplayNodes: false,
      data: {},
      csvData: {},
      currentJoint: "None",
      nodeValue: -1,
      yAxis: true,
      canvasSize: 0,
      googleData: []
  }

console.log(this.state.time);
    // Bind this to function updateData (This eliminates the error)
this.updateData = this.updateData.bind(this);
this.seek = this.seek.bind(this);
this.testMethod = this.testMethod.bind(this);

}

componentWillMount() {

    // Your parse code, but not seperated in a function
    //let databaseData = JSON.parse(window.localStorage.getItem('storedDatabase'));
    //let link = databaseData[this.props.patientIndex].csv;
    let csvFilepath;
    switch (this.props.patientIndex) {
        case '0':
            csvFilepath = require('./data/test-data.csv');
            break;
        case '9':
            csvFilepath = require('./data/kinect-data/Patient_30_2017130_155326401/body3-jointPositionData.csv');
            break;
        case '10':
            csvFilepath = require('./data/kinect-data/Patient_31_2017213_15232451/Patient_31_body5-jointPositionData.csv');
            break;
        case '1':
            csvFilepath = require('./data/kinect-data/Patient_3/body1-jointPositionData.csv');
            break;
        case '2':
            csvFilepath = require('./data/kinect-data/Patient_4/body0-jointPositionData.csv');
            break;
        case '3':
            csvFilepath = require('./data/kinect-data/Patient_5_2016210_144452290/Patient_5_body3-jointPositionData.csv');
            break;
        case '4':
            csvFilepath = require('./data/kinect-data/Patient_6_201632_153730576/body0-jointPositionData.csv');
            break;
        case '5':
            csvFilepath = require('./data/kinect-data/Patient_7_201639_143050834/Patient 7_body0-jointPositionData.csv');
            break;
        case '6':
            csvFilepath = require('./data/kinect-data/Patient_8_201639_152738602/Patient_8_body5-jointPositionData.csv');
            break;
        case '7':
            csvFilepath = require('./data/kinect-data/Patient_9_2016330_13597929/Patient_9_body5-jointPositionData.csv');
            break;
        case '8':
            csvFilepath = require('./data/kinect-data/Patient_10_2016330_145130327/Patient_10_body1-jointPositionData.csv');
            break;
        }
    Papa.parse(csvFilepath, {
      header: true,
      download: true,
      skipEmptyLines: true,
      // Here this is also available. So we can call our custom class method
      complete: this.updateData
    });
}

getModules(){
    let ref = this.database;
    ref.once("value").then(dataSnapshot => {
      this.response = dataSnapshot.val().data.patientArray;
      //window.localStorage.setItem('storedDatabase', JSON.stringify(this.response));
      //once the data is back, set the loading to false so it can be rendered
      this.setState({ database: this.response, loading: false });
    });
  }

componentDidMount() {
  // subscribe state change
  //this.refs.player.subscribeToStateChange(this.handleStateChange.bind(this));
  // Your parse code, but not seperated in a function
  this.getModules();
}

handleStateChange(state, prevState) {
  // copy player state to this component's state
  this.setState({
    player: state
  });
  if(this.state.player !== undefined){
    let seconds = this.state.player.duration;
    seconds = seconds * 400;
    this.setState({canvasSize: seconds});
  }

}

seeking(){
  console.log(this.refs.player2.duration);
  let current = parseInt(this.refs.player2.currentTime);
  //console.log(current);
  let array = [];
  let minutes = parseInt(current/60);
  let seconds = parseInt(current%60);
  let maxSeconds = seconds + 5;
  let minSeconds = seconds - 5;
  let maxMinutes = minutes;
  let minMinutes = minutes;
  if(maxSeconds >= 60){
    maxMinutes++;
    maxSeconds = maxSeconds - 60;
  }
  if(minSeconds <= 0){
    if(minMinutes > 0){
      minMinutes--;
    }
    else{
      minMinutes = 0;
    }

    minSeconds = 60 - minSeconds;
  }
  let array2 = [];
  array.push(0);
  array.push(maxMinutes);
  array.push(maxSeconds);
  array.push(0);
  array2.push(0);
  array2.push(minMinutes);
  array2.push(minSeconds);
  array2.push(0);
  console.log(array);
  console.log(array2);
  if(array > this.state.trueMax){
    array = this.state.trueMax;
  }
  this.setState({minimum: array2, maximum: array});
}

testMethod = e =>{
      console.log("value");
}


getValue(input){
  let returnValue = parseInt(input);
  if(isNaN(returnValue)){
    return 0;
  }
  return returnValue;
}

rightArmColor(){
  let index = parseInt(this.state.index);
  let patientVariable = this.state.database[index].NIHSS;
  //console.log(this.state.database);
  let motorArmRight = this.getValue(patientVariable.motorArm.right.value);
  let sensory = 0;
  if(patientVariable.sensory.side != 1){
    sensory = this.getValue(patientVariable.sensory.value);
  }
  let limbAtaxia = 0;
  if(patientVariable.limbAtaxia.side != 1){
    if(patientVariable.limbAtaxia.limb != 2){
      limbAtaxia = 1;
    }
  }
  let determinator = motorArmRight+limbAtaxia+sensory;
  if(determinator <= 2){
    return "green";
  }
  else if(determinator <= 4){
    return "yellow";
  }
  else{
    return "red";
  }

}

mouthColor(){
  let index = parseInt(this.state.index);
  let patientVariable = this.state.database[index].NIHSS;
  //console.log(this.state.database);
  let locQuestions = this.getValue(patientVariable.locQuestions.value);
  let dysarthria = this.getValue(patientVariable.dysarthria.value);
  let bestLanguage = this.getValue(patientVariable.bestLanguage.value);
  let facialPalsy = this.getValue(patientVariable.facialPalsy.value);
  let determinator = locQuestions + dysarthria + bestLanguage + facialPalsy;
  if(determinator < 4){
    return "green";
  }
  else if(determinator < 8){
    return "yellow";
  }
  else{
    return "red";
  }

}

leftArmColor(){
  let index = parseInt(this.state.index);
  let patientVariable = this.state.database[index].NIHSS;
  //console.log(this.state.database);
  let motorArmLeft = this.getValue(patientVariable.motorArm.left.value);
  let sensory = 0;
  if(patientVariable.sensory.side != 2){
    sensory = this.getValue(patientVariable.sensory.value);
  }
  let limbAtaxia = 0;
  if(patientVariable.limbAtaxia.side != 2){
    if(patientVariable.limbAtaxia.limb != 2){
      limbAtaxia = 1;
    }
  }
  let determinator = motorArmLeft + limbAtaxia + sensory;
  if(determinator <= 2){
    return "green";
  }
  else if(determinator <= 4){
    return "yellow";
  }
  else{
    return "red";
  }

}

leftLegColor(){
  let index = parseInt(this.state.index);
  let patientVariable = this.state.database[index].NIHSS;
  //console.log(this.state.database);
  let motorLegLeft = this.getValue(patientVariable.motorLeg.left.value);
  let sensory = 0;
  if(patientVariable.sensory.side != 2){
    sensory = this.getValue(patientVariable.sensory.value);
  }
  let limbAtaxia = 0;
  if(patientVariable.limbAtaxia.side != 2){
    if(patientVariable.limbAtaxia.limb != 1){
      limbAtaxia = 1;
    }
  }
  let determinator = motorLegLeft+limbAtaxia+sensory;
  if(determinator <= 2){
    return "green";
  }
  else if(determinator <= 4){
    return "yellow";
  }
  else{
    return "red";
  }

}

rightFaceColor(){
  let index = parseInt(this.state.index);
  let patientVariable = this.state.database[index].NIHSS;
  let sensory = 0;
  let facialPalsy = 0;
  if(patientVariable.sensory.side != 1){
    sensory = this.getValue(patientVariable.sensory.value);
  }
  if(patientVariable.facialPalsy.side != 1){
    facialPalsy = this.getValue(patientVariable.facialPalsy.value);
  }
  let determinator = sensory+facialPalsy;
  if(determinator <= 2){
    return "green";
  }
  else if(determinator <= 4){
    return "yellow";
  }
  else{
    return "red";
  }

}

leftFaceColor(){
  let index = parseInt(this.state.index);
  let patientVariable = this.state.database[index].NIHSS;
  let sensory = 0;
  let facialPalsy = 0;
  if(patientVariable.facialPalsy.side != 2){
    facialPalsy = this.getValue(patientVariable.facialPalsy.value);
  }
  if(patientVariable.sensory.side != 2){
    sensory = this.getValue(patientVariable.sensory.value);
  }
  let determinator = sensory + facialPalsy;
  if(determinator <= 2){
    return "green";
  }
  else if(determinator <= 4){
    return "yellow";
  }
  else{
    return "red";
  }

}

rightHeadColor(){
  let index = parseInt(this.state.index);
  let patientVariable = this.state.database[index].NIHSS;
  let ei = 0;
  let loc = this.getValue(patientVariable.levelOfConsciousness.value);
  let commands = this.getValue(patientVariable.locCommands.value);
  if(patientVariable.extinctionAndInattention.side != 2){
    ei = this.getValue(patientVariable.extinctionAndInattention.value);
  }
  let determinator = ei+loc+commands;
  if(determinator < 3){
    return "green";
  }
  else if(determinator <= 6){
    return "yellow";
  }
  else{
    return "red";
  }

}

leftHeadColor(){
  let index = parseInt(this.state.index);
  let patientVariable = this.state.database[index].NIHSS;
  let loc = this.getValue(patientVariable.levelOfConsciousness.value);
  let commands = this.getValue(patientVariable.locCommands.value);
  let ei = 0;
  if(patientVariable.extinctionAndInattention.side != 1){
    ei = this.getValue(patientVariable.extinctionAndInattention.value);
  }
  let determinator = ei + loc+commands;
  if(determinator < 3){
    return "green";
  }
  else if(determinator <= 6){
    return "yellow";
  }
  else{
    return "red";
  }

}

rightLegColor(){
  let index = parseInt(this.state.index);
  let patientVariable = this.state.database[index].NIHSS;
  //console.log(this.state.database);
  let motorLegRight = this.getValue(patientVariable.motorLeg.right.value);
  let sensory = 0;
  if(patientVariable.sensory.side != 1){
    sensory = this.getValue(patientVariable.sensory.value);
  }
  let limbAtaxia = 0;
  if(patientVariable.limbAtaxia.side != 1){
    if(patientVariable.limbAtaxia.limb != 1){
      limbAtaxia = 1;
    }
  }
  let determinator = motorLegRight+limbAtaxia+sensory;
  if(determinator <= 2){
    return "green";
  }
  else if(determinator <= 4){
    return "yellow";
  }
  else{
    return "red";
  }

}

rightEyeColor(){
  let index = parseInt(this.state.index);
  let patientVariable = this.state.database[index].NIHSS;
  //console.log(this.state.database);
  let bestGaze = 0;
  let visual = this.getValue(patientVariable.visual.value);
  if(patientVariable.bestGaze.side > 1 ){
    bestGaze = this.getValue(patientVariable.bestGaze.value);
  }
  let determinator = bestGaze+visual;
  if(determinator <= 2){
    return "green";
  }
  else if(determinator <= 4){
    return "yellow";
  }
  else{
    return "red";
  }

}

leftEyeColor(){
  let index = parseInt(this.state.index);
  let patientVariable = this.state.database[index].NIHSS;
  //console.log(this.state.database);
  let visual = this.getValue(patientVariable.visual.value);
  let bestGaze = 0;
  if(patientVariable.bestGaze.side != 2 ){
    bestGaze = this.getValue(patientVariable.bestGaze.value);
  }
  let determinator = bestGaze+visual;
  if(determinator <= 2){
    return "green";
  }
  else if(determinator <= 4){
    return "yellow";
  }
  else{
    return "red";
  }

}

seek(seconds) {
  return () => {
    //this.refs.player.seek(seconds);
  };
}

jump(seconds) {
  return () => {
    console.log("Going to:" + seconds);
    this.refs.player2.currentTime = seconds;
  };
}

    updateData(result) {
    console.log(result);
    const data = result.data;
    let newData = [];
    let currentAxis = "X";
    let googleData = [[{ type: 'timeofday', label: 'Time' }, 'Head', 'Neck', 'Left Shoulder', 'Right Shoulder',
    'Left Elbow', 'Right Elbow', 'Left Wrist', 'Right Wrist', 'Spine Mid', 'Spine Base', 'Left Knee', 'Right Knee',
    'Left Ankle', 'Right Ankle']];

    console.log(data[1500].Time);
    let time = data[1500].Time;
    let minutes = parseInt(time.substring(3, 5));
    let seconds = parseInt(time.substring(6, 8));
    let thirdThing = parseInt(time.substring(9, 12));
    console.log(minutes + " " + seconds + " " + thirdThing);
    let minimum;
    let maximum;
    for (let i = 0; i < data.length; i++){
      let timeArray = [];
      let time = data[i].Time;
      let minutes = parseInt(time.substring(3, 5));
      let seconds = parseInt(time.substring(6, 8));
      let thirdThing = parseInt(time.substring(9, 12));
      timeArray.push(0);
      timeArray.push(minutes);
      timeArray.push(seconds);
      timeArray.push(thirdThing);
      if(i == 0){
        minimum = timeArray;
      }
      if(i == data.length-1){
        maximum = timeArray;
      }
      let tempArray = [];
      tempArray.push(timeArray);
      tempArray.push(parseFloat(data[i].HeadX));
      tempArray.push(parseFloat(data[i].NeckX));
      tempArray.push(parseFloat(data[i].ShoulderLeftX));
      tempArray.push(parseFloat(data[i].ShoulderRightX));
      tempArray.push(parseFloat(data[i].ElbowLeftX));
      tempArray.push(parseFloat(data[i].ElbowRightX));
      tempArray.push(parseFloat(data[i].WristLeftX));
      tempArray.push(parseFloat(data[i].WristRightX));
      tempArray.push(parseFloat(data[i].SpineMidX));
      tempArray.push(parseFloat(data[i].SpineBaseX));
      tempArray.push(parseFloat(data[i].KneeLeftX));
      tempArray.push(parseFloat(data[i].KneeRightX));
      tempArray.push(parseFloat(data[i].AnkleLeftX));
      tempArray.push(parseFloat(data[i].AnkleRightX));
      googleData.push(tempArray);
      if(i%5 === 0){
        newData.push(data[i].Time);
      }
      else{
        newData.push(null);
      }

    }
    console.log(googleData);
    // Here this is available and we can call this.setState (since it's binded in the constructor)
    this.setState({csvData: data, head: false, neck: false, lshoulder: false, rshoulder: false, lelbow: false, relbow: false,
      lwrist: false, rwrist: false, midspine: false, spinebase: false, lknee: false, rknee: false, lankle: false, rankle: false, googleData: googleData, axis: currentAxis
                  }); // or shorter ES syntax: this.setState({ data });
    this.setState({ data: { ...this.state.data, labels: newData}, minimum: minimum, maximum: maximum, trueMax: maximum, trueMin: minimum });
    }


displayHead = e =>{
  this.setState({displayGraph: false, head: !this.state.head});
}

displayNeck = e =>{
  this.setState({displayGraph: false, neck: !this.state.neck});
}

displayBase = e =>{
  this.setState({displayGraph: false, spinebase: !this.state.spinebase});
}

displaySpine = e =>{
  this.setState({displayGraph: false, midspine: !this.state.midspine});
}

displayShoulder = e =>{
  this.setState({displayGraph: false, lshoulder: !this.state.lshoulder});
}

displayElbow = e =>{
  this.setState({displayGraph: false, lelbow: !this.state.lelbow});
}

displayElbowR = e =>{
  this.setState({displayGraph: false, displayGraph: false, relbow: !this.state.relbow});
}

displayShoulderR = e =>{
  this.setState({displayGraph: false, rshoulder: !this.state.rshoulder});
}

displayWrist = e =>{
  this.setState({displayGraph: false, lwrist: !this.state.lwrist});
}

displayWristR = e =>{
  this.setState({displayGraph: false, rwrist: !this.state.rwrist});
}

displayKnee = e =>{
  this.setState({displayGraph: false, lknee: !this.state.lknee});
}

displayKneeR = e =>{
  this.setState({displayGraph: false, rknee: !this.state.rknee});
}

displayAnkle = e =>{
  this.setState({displayGraph: false, lankle: !this.state.lankle});
}

displayAnkleR = e =>{
  this.setState({displayGraph: false, rankle: !this.state.rankle});
}


displayOff = e =>{
  this.setState({ displayGraph: true });
  this.setState({ currentJoint: "None"});
}

displayOn = e =>{
  this.setState({ displayGraph: false });
}

refocus = e =>{
  this.setState({ minimum: this.state.trueMin, maximum: this.state.trueMax });
}

displayToggle = e =>{
  this.setState({ displayNodes: !this.state.displayNodes });
}

listDisplay(){
  let table = [];
  if(this.state.head){
    table.push(<div>Head</div>)
  }
  if(this.state.neck){
    table.push(<div>Neck</div>)
  }
  if(this.state.lshoulder){
    table.push(<div>Left Shoulder</div>)
  }
  if(this.state.rshoulder){
    table.push(<div>Right Shoulder</div>)
  }
  if(this.state.lelbow){
    table.push(<div>Left Elbow</div>)
  }
  if(this.state.relbow){
    table.push(<div>Right Elbow</div>)
  }
  if(this.state.lwrist){
    table.push(<div>Left Wrist</div>)
  }
  if(this.state.rwrist){
    table.push(<div>Right Wrist</div>)
  }
  if(this.state.midspine){
    table.push(<div>Mid Spine</div>)
  }
  if(this.state.spinebase){
    table.push(<div>Spine Base</div>)
  }
  if(this.state.lknee){
    table.push(<div>Left Knee</div>)
  }
  if(this.state.rknee){
    table.push(<div>Right Knee</div>)
  }
  if(this.state.lankle){
    table.push(<div>Left Ankle</div>)
  }
  if(this.state.rankle){
    table.push(<div>Right Ankle</div>)
  }

  return table;
}



switchX = e =>{
  let googleData = [[{ type: 'string', label: 'Time' }, 'Head', 'Neck', 'Left Shoulder', 'Right Shoulder',
  'Left Elbow', 'Right Elbow', 'Left Wrist', 'Right Wrist', 'Spine Mid', 'Spine Base', 'Left Knee', 'Right Knee',
  'Left Ankle', 'Right Ankle']];

  for (let i = 0; i < this.state.csvData.length; i++){
    let tempArray = [];
    tempArray.push(this.state.csvData[i].Time);
    tempArray.push(parseFloat(this.state.csvData[i].HeadX));
    tempArray.push(parseFloat(this.state.csvData[i].NeckX));
    tempArray.push(parseFloat(this.state.csvData[i].ShoulderLeftX));
    tempArray.push(parseFloat(this.state.csvData[i].ShoulderRightX));
    tempArray.push(parseFloat(this.state.csvData[i].ElbowLeftX));
    tempArray.push(parseFloat(this.state.csvData[i].ElbowRightX));
    tempArray.push(parseFloat(this.state.csvData[i].WristLeftX));
    tempArray.push(parseFloat(this.state.csvData[i].WristRightX));
    tempArray.push(parseFloat(this.state.csvData[i].SpineMidX));
    tempArray.push(parseFloat(this.state.csvData[i].SpineBaseX));
    tempArray.push(parseFloat(this.state.csvData[i].KneeLeftX));
    tempArray.push(parseFloat(this.state.csvData[i].KneeRightX));
    tempArray.push(parseFloat(this.state.csvData[i].AnkleLeftX));
    tempArray.push(parseFloat(this.state.csvData[i].AnkleRightX));
    googleData.push(tempArray);
  }
  this.setState({axis: "X", googleData: googleData});
}

switchY = e =>{
  let googleData = [[{ type: 'string', label: 'Time' }, 'Head', 'Neck', 'Left Shoulder', 'Right Shoulder',
  'Left Elbow', 'Right Elbow', 'Left Wrist', 'Right Wrist', 'Spine Mid', 'Spine Base', 'Left Knee', 'Right Knee',
  'Left Ankle', 'Right Ankle']];

  for (let i = 0; i < this.state.csvData.length; i++){
    let tempArray = [];
    tempArray.push(this.state.csvData[i].Time);
    tempArray.push(parseFloat(this.state.csvData[i].HeadY));
    tempArray.push(parseFloat(this.state.csvData[i].NeckY));
    tempArray.push(parseFloat(this.state.csvData[i].ShoulderLeftY));
    tempArray.push(parseFloat(this.state.csvData[i].ShoulderRightY));
    tempArray.push(parseFloat(this.state.csvData[i].ElbowLeftY));
    tempArray.push(parseFloat(this.state.csvData[i].ElbowRightY));
    tempArray.push(parseFloat(this.state.csvData[i].WristLeftY));
    tempArray.push(parseFloat(this.state.csvData[i].WristRightY));
    tempArray.push(parseFloat(this.state.csvData[i].SpineMidY));
    tempArray.push(parseFloat(this.state.csvData[i].SpineBaseY));
    tempArray.push(parseFloat(this.state.csvData[i].KneeLeftY));
    tempArray.push(parseFloat(this.state.csvData[i].KneeRightY));
    tempArray.push(parseFloat(this.state.csvData[i].AnkleLeftY));
    tempArray.push(parseFloat(this.state.csvData[i].AnkleRightY));
    googleData.push(tempArray);
  }
  this.setState({axis: "Y", googleData: googleData});
}

switchZ = e =>{
  let googleData = [[{ type: 'string', label: 'Time' }, 'Head', 'Neck', 'Left Shoulder', 'Right Shoulder',
  'Left Elbow', 'Right Elbow', 'Left Wrist', 'Right Wrist', 'Spine Mid', 'Spine Base', 'Left Knee', 'Right Knee',
  'Left Ankle', 'Right Ankle']];

  for (let i = 0; i < this.state.csvData.length; i++){
    let tempArray = [];
    tempArray.push(this.state.csvData[i].Time);
    tempArray.push(parseFloat(this.state.csvData[i].HeadZ));
    tempArray.push(parseFloat(this.state.csvData[i].NeckZ));
    tempArray.push(parseFloat(this.state.csvData[i].ShoulderLeftZ));
    tempArray.push(parseFloat(this.state.csvData[i].ShoulderRightZ));
    tempArray.push(parseFloat(this.state.csvData[i].ElbowLeftZ));
    tempArray.push(parseFloat(this.state.csvData[i].ElbowRightZ));
    tempArray.push(parseFloat(this.state.csvData[i].WristLeftZ));
    tempArray.push(parseFloat(this.state.csvData[i].WristRightZ));
    tempArray.push(parseFloat(this.state.csvData[i].SpineMidZ));
    tempArray.push(parseFloat(this.state.csvData[i].SpineBaseZ));
    tempArray.push(parseFloat(this.state.csvData[i].KneeLeftZ));
    tempArray.push(parseFloat(this.state.csvData[i].KneeRightZ));
    tempArray.push(parseFloat(this.state.csvData[i].AnkleLeftZ));
    tempArray.push(parseFloat(this.state.csvData[i].AnkleRightZ));
    googleData.push(tempArray);
  }
  this.setState({axis: "Z", googleData: googleData});
}


listSymptoms(){
  let table = []
  let index = parseInt(this.props.patientIndex);
  let array = this.state.database[index].NIHSS;
  // Outer loop to create parent
  for (let element in array) {
    //Create the parent and add the children
    if(element === "motorArm" || element === "motorLeg"){
      //console.log(this.state.database[index].NIHSS[element]);
      if(this.state.database[index].NIHSS[element].left.value != 0){
        table.push(<div>{element} left: {this.state.database[index].NIHSS[element].left.value}</div>);
      }
      if(this.state.database[index].NIHSS[element].right.value != 0){
        table.push(<div>{element} right: {this.state.database[index].NIHSS[element].right.value}</div>);
      }

    }
    else{
      if(this.state.database[index].NIHSS[element].value != 0){
        table.push(<div>{element} : {this.state.database[index].NIHSS[element].value}</div>);
      }
    }
  }
  return table;
}



  render() {
    return this.state.loading ? (
            <div>
                loading...
            </div>
        ) :(
      <div class="canvas-div2">



      <video controls fluid={false} width={285} ref="player2" onSeeked={this.seeking.bind(this)}>
        <source src={this.state.database[this.props.patientIndex].Video} ></source>
      </video>

        <div class = "displayReading">
          {(this.state.displayGraph) ? <div></div> : <div>Currently Displaying {this.state.axis} Axis Data for:
           <div class="joints">{this.listDisplay()}</div>
           vs. Time (HH:MM:SS) </div>}
           <br/><br/>
           <p >Skeleton Region Legend:</p>
           <p ><div class="square" style={{backgroundColor: "green"}} ></div> Symptoms in area are mild.</p>
           <p ><div class="square" style={{backgroundColor: "yellow"}} ></div> Symptoms in area are moderate.</p>
           <p ><div class="square" style={{backgroundColor: "red"}} ></div> Symptoms in area are severe.</p>
        </div>

        <h1 id="left-symbol"> R </h1>
        <h1 id="right-symbol"> L </h1>


        <div class = "skeleton">
        { (this.state.displayNodes) ?
        <div class="nodes">
        <div class="head node" style={{ backgroundColor: this.state.head ? '#c95253' : 'black'}} onClick={this.displayHead}><span class="tooltiptext">Head</span></div>
        <div class="neck node" style={{ backgroundColor: this.state.neck ? '#304d48' : 'black'}} onClick={this.displayNeck}><span class="tooltiptext">Neck</span></div>
        <div class="shoulderLeft node" style={{ backgroundColor: this.state.rshoulder ? '#d17846' : 'black'}} onClick={this.displayShoulderR}><span class="tooltiptext">Right Shoulder</span></div>
        <div class="shoulderRight node" style={{ backgroundColor: this.state.lshoulder ? '#f1ca3a' : 'black'}} onClick={this.displayShoulder}><span class="tooltiptextleft">Left Shoulder</span></div>
        <div class="elbowRight node" style={{ backgroundColor: this.state.lelbow ? '#97f3d9' : 'black'}} onClick={this.displayElbow}><span class="tooltiptextleft">Left Elbow</span></div>
        <div class="elbowLeft node" style={{ backgroundColor: this.state.relbow ? '#01dc54' : 'black'}} onClick={this.displayElbowR}><span class="tooltiptext">Right Elbow</span></div>
        <div class="wristLeft node" style={{ backgroundColor: this.state.rwrist ? '#15c683' : 'black'}} onClick={this.displayWristR}><span class="tooltiptext">Right Wrist</span></div>
        <div class="wristRight node" style={{ backgroundColor: this.state.lwrist ? '#ed0a7c' : 'black'}} onClick={this.displayWrist}><span class="tooltiptextleft">Left Wrist</span></div>
        <div class="spine node" style={{ backgroundColor: this.state.midspine ? '#bab780' : 'black'}} onClick={this.displaySpine}><span class="tooltiptext">Spine Mid</span></div>
        <div class="hip node" style={{ backgroundColor: this.state.spinebase ? '#d241a7' : 'black'}} onClick={this.displayBase}><span class="tooltiptext">Spine Base</span></div>
        <div class="kneeLeft node" style={{ backgroundColor: this.state.rknee ? '#cfed08' : 'black'}} onClick={this.displayKneeR}><span class="tooltiptext">Right Knee</span></div>
        <div class="kneeRight node" style={{ backgroundColor: this.state.lknee ? '#61673e' : 'black'}} onClick={this.displayKnee}><span class="tooltiptextleft">Left Knee</span></div>
        <div class="ankleLeft node" style={{ backgroundColor: this.state.rankle ? '#25e40d' : 'black'}} onClick={this.displayAnkleR}><span class="tooltiptext">Right Ankle</span></div>
        <div class="ankleRight node" style={{ backgroundColor: this.state.lankle ? '#b39ad2' : 'black'}} onClick={this.displayAnkle}><span class="tooltiptextleft">Left Ankle</span></div>
        </div>
        :
        <div></div>
      }
      <Skeleton leftLegColor={this.leftLegColor()} rightLegColor={this.rightLegColor()}
      chestColor="#727882" rightArmColor={this.rightArmColor()} leftArmColor={this.leftArmColor()}
      leftHead={this.leftHeadColor()} rightEyeColor={this.rightEyeColor()} rightFace={this.rightFaceColor()}
      mouthColor={this.mouthColor()} leftEyeColor={this.leftEyeColor()} leftFace={this.leftFaceColor()} rightHead={this.rightHeadColor()}/>
      </div>
      <div class="user-options">
            <h5><center>User Options</center></h5>
            <center>{ (this.state.displayNodes) ? <button class="hideNodes" onClick={this.displayToggle}>&times; Hide Nodes</button> :
            <button class="showNodes" onClick={this.displayToggle}>Show Nodes</button> } </center>
            {(this.state.displayGraph) ? <div><center><button class="closeChart" onClick={this.displayOn}>Open Chart</button></center></div> : <div><center><button class="closeChart" onClick={this.displayOff}>&times; Close Chart</button></center>
            <center><button class="switchChart" onClick={this.refocus}>Reset Chart Focus</button></center>
            <center><button class="switchChart" onClick={this.switchX}>Switch to X Data</button></center>
            <center><button class="switchChart" onClick={this.switchY}>Switch to Y Data</button></center>
            <center><button class="switchChart" onClick={this.switchZ}>Switch to Z Data</button></center>
              </div>}

      </div>

      <div class="displayed-symptoms">
        <h5><center>Symptoms</center></h5>
        <div class = "symptoms">
        {this.listSymptoms()}
        </div>
      </div>

        { (this.state.displayGraph)  ? <div></div> : <div>
              <div ref="chart" class="chart-div">
              <Chart
                width="100%"
                height={200}
                chartType="LineChart"
                data={this.state.googleData}
                options={{
                  explorer: {
                     maxZoomOut: 1,
                     maxZoomIn: .01,
                     keepInBounds: true,
                     rightClickToReset: true,
                  },
                  legend: {
                    position: 'none',
                  },
                  hAxis: {
                    title: 'Time',
                    viewWindow: {  // <-- set view window
                      min: this.state.minimum,
                      max: this.state.maximum
                    },
                  },
                  vAxis: {
                    title: 'Joint Position',
                  },
                  series: {
                    0: this.state.head ? {tooltip: true, color: '#c95253'} : {tooltip: false, color: 'transparent'},
                    1: this.state.neck ? {tooltip: true, color: '#304d48'} : {tooltip: false, color: 'transparent'},
                    2: this.state.lshoulder ? {tooltip: true, color: '#f1ca3a'} : {tooltip: false, color: 'transparent'},
                    3: this.state.rshoulder ? {tooltip: true, color: '#d17846'} : {tooltip: false, color: 'transparent'},
                    4: this.state.lelbow ? {tooltip: true, color: '#97f3d9'} : {tooltip: false, color: 'transparent'},
                    5: this.state.relbow ? {tooltip: true, color: '#01dc54'} : {tooltip: false, color: 'transparent'},
                    6: this.state.lwrist ? {tooltip: true, color: '#ed0a7c'} : {tooltip: false, color: 'transparent'},
                    7: this.state.rwrist ? {tooltip: true, color: '#15c683'} : {tooltip: false, color: 'transparent'},
                    8: this.state.midspine ? {tooltip: true, color: '#bab780'} : {tooltip: false, color: 'transparent'},
                    9: this.state.spinebase ? {tooltip: true, color: '#d241a7'} : {tooltip: false, color: 'transparent'},
                    10: this.state.lknee ? {tooltip: true, color: '#61673e'} : {tooltip: false, color: 'transparent'},
                    11: this.state.rknee ? {tooltip: true, color: '#cfed08'} : {tooltip: false, color: 'transparent'},
                    12: this.state.lankle ? {tooltip: true, color: '#b39ad2'} : {tooltip: false, color: 'transparent'},
                    13: this.state.rankle ? {tooltip: true, color: '#25e40d'} : {tooltip: false, color: 'transparent'},
                  },
                }}
                chartEvents={[
                {
                eventName: 'select',
                callback: ({ chartWrapper }) => {
                const chart = chartWrapper.getChart()
                const selection = chart.getSelection()
                if (selection.length === 1) {
                  const [selectedItem] = selection
                  const dataTable = chartWrapper.getDataTable()
                  const { row, column } = selectedItem
                  let timeString = dataTable.getValue(row, 0);
                  console.log(timeString);
                  let minutes = timeString[1] * 60;
                  let seconds = timeString[2];
                  let value2 = minutes+seconds;
                  this.refs.player2.currentTime = value2;;
                  //this.refs.player.seek(value2);

                }
                //console.log(value);
                },
                },
                ]}
                />


                      </div></div>}
      </div>

    )
  }
}

export default PatientSkeletonNew;
