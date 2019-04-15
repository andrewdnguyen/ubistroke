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
var config = {
  apiKey: "AIzaSyDBFvjEfVbGK6njvCN49i68K-F8S_w5mus",
  authDomain: "ubistroke.firebaseapp.com",
  databaseURL: "https://ubistroke.firebaseio.com",
  projectId: "ubistroke",
  storageBucket: "ubistroke.appspot.com",
  messagingSenderId: "466560050867"
};


class PatientSkeletonNew extends Component {
  constructor(props){
    super(props);
    // this.app = firebase.initializeApp(config);
    let databaseData = JSON.parse(window.localStorage.getItem('storedDatabase'));
    console.log(databaseData);
    this.state = {
      loading: false,
      index: this.props.patientIndex,
      database: databaseData,
      displayGraph: true,
      diplayNodes: false,
      data: {
        labels: ["-8h",,,, "-7h",,,, "-6h",,,, "-5h",,,, "-4h",,,, "-3h",,,, "-2h",,,, "-1h",,,, "0h"],
        series: [[157, 187, 22, 146, 61, 198, 52, 77, 194, 87, 1, 149, 131, 112, 59, 142, 37, 248, 249, 219, 35, 232, 21, 130, 225, 54, 120, 124, 18, 86, 222, 137, 238]],
      },
      csvData: {},
      currentJoint: "None",
      nodeValue: -1,
      yAxis: true,
      canvasSize: 0
  }

console.log(this.state.time);
    // Bind this to function updateData (This eliminates the error)
this.updateData = this.updateData.bind(this);
this.seek = this.seek.bind(this);
this.onDrawHandler = this.onDrawHandler.bind(this);
this.testMethod = this.testMethod.bind(this);
this.graphClick = this.graphClick.bind(this);

}

componentWillMount() {

    // Your parse code, but not seperated in a function
    Papa.parse(data, {
      header: true,
      download: true,
      skipEmptyLines: true,
      // Here this is also available. So we can call our custom class method
      complete: this.updateData
    });
}

componentDidMount() {
  // subscribe state change
  this.refs.player.subscribeToStateChange(this.handleStateChange.bind(this));
  // Your parse code, but not seperated in a function

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

testMethod = e =>{
      console.log("value");
}

onDrawHandler(e){
  if (e.type === "point") {
    e.element._node.onclick = function() {
      //this.setState({currentTime: data.meta});
      var str = window.location.href;
      var link1 = str.substring(0,36);
      var str2 = e.meta;
      var link2 = str2.substring(3,8);
      var value = link2.split(':').reverse().reduce((prev, curr, i) => prev + curr*Math.pow(60, i), 0);
      window.localStorage.setItem('queriedTime', value);
      var getted = window.localStorage.getItem('queriedTime');
  }
  }
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
  let determinator = motorArmRight;
  if(determinator <= 1){
    return "green";
  }
  else if(determinator <= 3){
    return "yellow";
  }
  else{
    return "red";
  }

}

seek(seconds) {
  return () => {
    this.refs.player.seek(seconds);
  };
}

graphClick(){
  var getted = window.localStorage.getItem('queriedTime');
  var value = parseInt(getted);
  this.refs.player.seek(value);
}

    updateData(result) {
    const data = result.data;
    let newData = [];
    for (let i = 0; i < data.length; i++){
      if(i%5 === 0){
        newData.push(data[i].Time);
      }
      else{
        newData.push(null);
      }

    }
    console.log(newData);
    // Here this is available and we can call this.setState (since it's binded in the constructor)
    this.setState({csvData: data}); // or shorter ES syntax: this.setState({ data });
    this.setState({ data: { ...this.state.data, labels: newData} });
    }




displayHeadX = e =>{
  this.setState({ displayGraph: false });
  let newData = [];
  for (let i = 0; i < this.state.csvData.length; i++){
    let newObj = {value: this.state.csvData[i].HeadX, meta: this.state.csvData[i].Time}
    newData.push(newObj);
  }
  this.setState({ data: { ...this.state.data, series: [newData]} });
  this.setState({ currentJoint: "Head"});
  this.setState({ nodeValue: 0});
  this.setState({ yAxis: false});
}

displayNeckX = e =>{
  this.setState({ displayGraph: false });
  let newData = [];
  for (let i = 0; i < this.state.csvData.length; i++){
    let newObj = {value: this.state.csvData[i].NeckX, meta: this.state.csvData[i].Time}
    newData.push(newObj);
  }
  this.setState({ data: { ...this.state.data, series: [newData]} });
  this.setState({ currentJoint: "Neck"});
  this.setState({ nodeValue: 1});
  this.setState({ yAxis: false});
}

displayBaseX = e =>{
  this.setState({ displayGraph: false });
  let newData = [];
  for (let i = 0; i < this.state.csvData.length; i++){
    let newObj = {value: this.state.csvData[i].SpineBaseX, meta: this.state.csvData[i].Time}
    newData.push(newObj);
  }
  this.setState({ data: { ...this.state.data, series: [newData]} });
  this.setState({ currentJoint: "Spine Base"});
  this.setState({ nodeValue: 2});
  this.setState({ yAxis: false});
}

displaySpineX = e =>{
  this.setState({ displayGraph: false });
  let newData = [];
  for (let i = 0; i < this.state.csvData.length; i++){
    let newObj = {value: this.state.csvData[i].SpineMidX, meta: this.state.csvData[i].Time}
    newData.push(newObj);
  }
  this.setState({ data: { ...this.state.data, series: [newData]} });
  this.setState({ currentJoint: "Spine Mid"});
  this.setState({ nodeValue: 3});
  this.setState({ yAxis: false});
}

displayShoulderX = e =>{
  this.setState({ displayGraph: false });
  let newDataL = [];
  let newDataR = [];
  for (let i = 0; i < this.state.csvData.length; i++){
    let newObj = {value: this.state.csvData[i].ShoulderLeftX, meta: this.state.csvData[i].Time}
    newDataL.push(newObj);
    let newObj2 = {value: this.state.csvData[i].ShoulderRightX, meta: this.state.csvData[i].Time}
    newDataR.push(newObj2);
  }
  let newDataCombined = [];
  newDataCombined.push(newDataL);
  newDataCombined.push(newDataR);
  this.setState({ data: { ...this.state.data, series: newDataCombined} });
  this.setState({ currentJoint: "Left (W) vs Right (R) Shoulder"});
  this.setState({ nodeValue: 4});
  this.setState({ yAxis: false});
}

displayElbowX = e =>{
  this.setState({ displayGraph: false });
  let newDataL = [];
  let newDataR = [];
  for (let i = 0; i < this.state.csvData.length; i++){
    let newObj = {value: this.state.csvData[i].ElbowLeftX, meta: this.state.csvData[i].Time}
    newDataL.push(newObj);
    let newObj2 = {value: this.state.csvData[i].ElbowRightX, meta: this.state.csvData[i].Time}
    newDataR.push(newObj2);

  }
  let newDataCombined = [];
  newDataCombined.push(newDataL);
  newDataCombined.push(newDataR);
  this.setState({ data: { ...this.state.data, series: newDataCombined} });
  this.setState({ currentJoint: "Left (W) vs Right (R) Elbow"});
  this.setState({ nodeValue: 5});
  this.setState({ yAxis: false});
}

displayElbowRX = e =>{
  this.setState({ displayGraph: false });
  let newDataL = [];
  let newDataR = [];
  for (let i = 0; i < this.state.csvData.length; i++){
    let newObj = {value: this.state.csvData[i].ElbowLeftX, meta: this.state.csvData[i].Time}
    newDataL.push(newObj);
    let newObj2 = {value: this.state.csvData[i].ElbowRightX, meta: this.state.csvData[i].Time}
    newDataR.push(newObj2);
  }
  let newDataCombined = [];
  newDataCombined.push(newDataR);
  newDataCombined.push(newDataL);
  this.setState({ data: { ...this.state.data, series: newDataCombined} });
  this.setState({ currentJoint: "Right (W) vs Left (R) Elbow"});
  this.setState({ nodeValue: 6});
  this.setState({ yAxis: false});
}

displayShoulderRX = e =>{
  this.setState({ displayGraph: false });
  let newDataL = [];
  let newDataR = [];
  for (let i = 0; i < this.state.csvData.length; i++){
    let newObj = {value: this.state.csvData[i].ShoulderLeftX, meta: this.state.csvData[i].Time}
    newDataL.push(newObj);
    let newObj2 = {value: this.state.csvData[i].ShoulderRightX, meta: this.state.csvData[i].Time}
    newDataR.push(newObj2);
  }
  let newDataCombined = [];
  newDataCombined.push(newDataR);
  newDataCombined.push(newDataL);
  this.setState({ data: { ...this.state.data, series: newDataCombined} });
  this.setState({ currentJoint: "Right (W) vs Left (R) Shoulder"});
  this.setState({ nodeValue: 7});
  this.setState({ yAxis: false});
}

displayWristX = e =>{
  this.setState({ displayGraph: false });
  let newDataL = [];
  let newDataR = [];
  for (let i = 0; i < this.state.csvData.length; i++){
    let newObj = {value: this.state.csvData[i].WristLeftX, meta: this.state.csvData[i].Time}
    newDataL.push(newObj);
    let newObj2 = {value: this.state.csvData[i].WristRightX, meta: this.state.csvData[i].Time}
    newDataR.push(newObj2);
  }
  let newDataCombined = [];
  newDataCombined.push(newDataL);
  newDataCombined.push(newDataR);
  this.setState({ data: { ...this.state.data, series: newDataCombined} });
  this.setState({ currentJoint: "Left (W) vs Right (R) Wrist"});
  this.setState({ nodeValue: 8});
  this.setState({ yAxis: false});
}

displayWristRX = e =>{
  this.setState({ displayGraph: false });
  let newDataL = [];
  let newDataR = [];
  for (let i = 0; i < this.state.csvData.length; i++){
    let newObj = {value: this.state.csvData[i].WristLeftX, meta: this.state.csvData[i].Time}
    newDataL.push(newObj);
    let newObj2 = {value: this.state.csvData[i].WristRightX, meta: this.state.csvData[i].Time}
    newDataR.push(newObj2);
  }
  let newDataCombined = [];
  newDataCombined.push(newDataR);
  newDataCombined.push(newDataL);
  this.setState({ data: { ...this.state.data, series: newDataCombined} });
  this.setState({ currentJoint: "Right (W) vs Left (R) Wrist"});
  this.setState({ nodeValue: 9});
  this.setState({ yAxis: false});
}

displayKneeX = e =>{
  this.setState({ displayGraph: false });
  let newDataL = [];
  let newDataR = [];
  for (let i = 0; i < this.state.csvData.length; i++){
    let newObj = {value: this.state.csvData[i].KneeLeftX, meta: this.state.csvData[i].Time}
    newDataL.push(newObj);
    let newObj2 = {value: this.state.csvData[i].KneeRightX, meta: this.state.csvData[i].Time}
    newDataR.push(newObj2);
  }
  let newDataCombined = [];
  newDataCombined.push(newDataL);
  newDataCombined.push(newDataR);
  this.setState({ data: { ...this.state.data, series: newDataCombined} });
  this.setState({ currentJoint: "Left (W) vs Right (R) Knee"});
  this.setState({ nodeValue: 10});
  this.setState({ yAxis: false});
}

displayKneeRX = e =>{
  this.setState({ displayGraph: false });
  let newDataL = [];
  let newDataR = [];
  for (let i = 0; i < this.state.csvData.length; i++){
    let newObj = {value: this.state.csvData[i].KneeLeftX, meta: this.state.csvData[i].Time}
    newDataL.push(newObj);
    let newObj2 = {value: this.state.csvData[i].KneeRightX, meta: this.state.csvData[i].Time}
    newDataR.push(newObj2);
  }
  let newDataCombined = [];
  newDataCombined.push(newDataR);
  newDataCombined.push(newDataL);
  this.setState({ data: { ...this.state.data, series: newDataCombined} });
  this.setState({ currentJoint: "Right (W) vs Left (R) Knee"});
  this.setState({ nodeValue: 11});
  this.setState({ yAxis: false});
}

displayAnkleX = e =>{
  this.setState({ displayGraph: false });
  let newDataL = [];
  let newDataR = [];
  for (let i = 0; i < this.state.csvData.length; i++){
    let newObj = {value: this.state.csvData[i].AnkleLeftX, meta: this.state.csvData[i].Time}
    newDataL.push(newObj);
    let newObj2 = {value: this.state.csvData[i].AnkleRightX, meta: this.state.csvData[i].Time}
    newDataR.push(newObj2);
  }
  let newDataCombined = [];
  newDataCombined.push(newDataL);
  newDataCombined.push(newDataR);
  this.setState({ data: { ...this.state.data, series: newDataCombined} });
  this.setState({ currentJoint: "Left (W) vs Right (R) Ankle"});
  this.setState({ nodeValue: 12});
  this.setState({ yAxis: false});
}

displayAnkleRX = e =>{
  this.setState({ displayGraph: false });
  let newDataL = [];
  let newDataR = [];
  for (let i = 0; i < this.state.csvData.length; i++){
    let newObj = {value: this.state.csvData[i].AnkleLeftX, meta: this.state.csvData[i].Time}
    newDataL.push(newObj);
    let newObj2 = {value: this.state.csvData[i].AnkleRightX, meta: this.state.csvData[i].Time}
    newDataR.push(newObj2);
  }
  let newDataCombined = [];
  newDataCombined.push(newDataR);
  newDataCombined.push(newDataL);
  this.setState({ data: { ...this.state.data, series: newDataCombined} });
  this.setState({ currentJoint: "Right (W) vs Left (R) Ankle"});
  this.setState({ nodeValue: 13});
  this.setState({ yAxis: false});

}

displayHead = e =>{
  this.setState({ displayGraph: false });
  let newData = [];
  for (let i = 0; i < this.state.csvData.length; i++){
    let newObj = {value: this.state.csvData[i].HeadY, meta: this.state.csvData[i].Time}
    newData.push(newObj);
  }
  this.setState({ data: { ...this.state.data, series: [newData]} });
  this.setState({ currentJoint: "Head"});
  this.setState({ nodeValue: 0});
  this.setState({ yAxis: true});
}

displayNeck = e =>{
  this.setState({ displayGraph: false });
  let newData = [];
  for (let i = 0; i < this.state.csvData.length; i++){
    let newObj = {value: this.state.csvData[i].NeckY, meta: this.state.csvData[i].Time}
    newData.push(newObj);
  }
  this.setState({ data: { ...this.state.data, series: [newData]} });
  this.setState({ currentJoint: "Neck"});
  this.setState({ nodeValue: 1});
  this.setState({ yAxis: true});
}

displayBase = e =>{
  this.setState({ displayGraph: false });
  let newData = [];
  for (let i = 0; i < this.state.csvData.length; i++){
    let newObj = {value: this.state.csvData[i].SpineBaseY, meta: this.state.csvData[i].Time}
    newData.push(newObj);
  }
  this.setState({ data: { ...this.state.data, series: [newData]} });
  this.setState({ currentJoint: "Spine Base"});
  this.setState({ nodeValue: 2});
}

displaySpine = e =>{
  this.setState({ displayGraph: false });
  let newData = [];
  for (let i = 0; i < this.state.csvData.length; i++){
    let newObj = {value: this.state.csvData[i].SpineMidY, meta: this.state.csvData[i].Time}
    newData.push(newObj);
  }
  this.setState({ data: { ...this.state.data, series: [newData]} });
  this.setState({ currentJoint: "Spine Mid"});
  this.setState({ nodeValue: 3});
  this.setState({ yAxis: true});
}

displayShoulder = e =>{
  this.setState({ displayGraph: false });
  let newDataL = [];
  let newDataR = [];
  for (let i = 0; i < this.state.csvData.length; i++){
    let newObj = {value: this.state.csvData[i].ShoulderLeftY, meta: this.state.csvData[i].Time}
    newDataL.push(newObj);
    let newObj2 = {value: this.state.csvData[i].ShoulderRightY, meta: this.state.csvData[i].Time}
    newDataR.push(newObj2);
  }
  let newDataCombined = [];
  newDataCombined.push(newDataL);
  newDataCombined.push(newDataR);
  this.setState({ data: { ...this.state.data, series: newDataCombined} });
  this.setState({ currentJoint: "Left (W) vs Right (R) Shoulder"});
  this.setState({ nodeValue: 4});
  this.setState({ yAxis: true});
}

displayElbow = e =>{
  this.setState({ displayGraph: false });
  let newDataL = [];
  let newDataR = [];
  for (let i = 0; i < this.state.csvData.length; i++){
    let newObj = {value: this.state.csvData[i].ElbowLeftY, meta: this.state.csvData[i].Time}
    newDataL.push(newObj);
    let newObj2 = {value: this.state.csvData[i].ElbowRightY, meta: this.state.csvData[i].Time}
    newDataR.push(newObj2);
  }
  let newDataCombined = [];
  newDataCombined.push(newDataL);
  newDataCombined.push(newDataR);
  this.setState({ data: { ...this.state.data, series: newDataCombined} });
  this.setState({ currentJoint: "Left (W) vs Right (R) Elbow"});
  this.setState({ nodeValue: 5});
  this.setState({ yAxis: true});
}

displayElbowR = e =>{
  this.setState({ displayGraph: false });
  let newDataL = [];
  let newDataR = [];
  for (let i = 0; i < this.state.csvData.length; i++){
    let newObj = {value: this.state.csvData[i].ElbowLeftY, meta: this.state.csvData[i].Time}
    newDataL.push(newObj);
    let newObj2 = {value: this.state.csvData[i].ElbowRightY, meta: this.state.csvData[i].Time}
    newDataR.push(newObj2);
  }
  let newDataCombined = [];
  newDataCombined.push(newDataR);
  newDataCombined.push(newDataL);
  this.setState({ data: { ...this.state.data, series: newDataCombined} });
  this.setState({ currentJoint: "Right (W) vs Left (R) Elbow"});
  this.setState({ nodeValue: 6});
  this.setState({ yAxis: true});
}

displayShoulderR = e =>{
  this.setState({ displayGraph: false });
  let newDataL = [];
  let newDataR = [];
  for (let i = 0; i < this.state.csvData.length; i++){
    let newObj = {value: this.state.csvData[i].ShoulderLeftY, meta: this.state.csvData[i].Time}
    newDataL.push(newObj);
    let newObj2 = {value: this.state.csvData[i].ShoulderRightY, meta: this.state.csvData[i].Time}
    newDataR.push(newObj2);
  }
  let newDataCombined = [];
  newDataCombined.push(newDataR);
  newDataCombined.push(newDataL);
  this.setState({ data: { ...this.state.data, series: newDataCombined} });
  this.setState({ currentJoint: "Right (W) vs Left (R) Shoulder"});
  this.setState({ nodeValue: 7});
  this.setState({ yAxis: true});
}

displayWrist = e =>{
  this.setState({ displayGraph: false });
  let newDataL = [];
  let newDataR = [];
  for (let i = 0; i < this.state.csvData.length; i++){
    let newObj = {value: this.state.csvData[i].WristLeftY, meta: this.state.csvData[i].Time}
    newDataL.push(newObj);
    let newObj2 = {value: this.state.csvData[i].WristRightY, meta: this.state.csvData[i].Time}
    newDataR.push(newObj2);
  }
  let newDataCombined = [];
  newDataCombined.push(newDataL);
  newDataCombined.push(newDataR);
  this.setState({ data: { ...this.state.data, series: newDataCombined} });
  this.setState({ currentJoint: "Left (W) vs Right (R) Wrist"});
  this.setState({ nodeValue: 8});
  this.setState({ yAxis: true});
}

displayWristR = e =>{
  this.setState({ displayGraph: false });
  let newDataL = [];
  let newDataR = [];
  for (let i = 0; i < this.state.csvData.length; i++){
    let newObj = {value: this.state.csvData[i].WristLeftY, meta: this.state.csvData[i].Time}
    newDataL.push(newObj);
    let newObj2 = {value: this.state.csvData[i].WristRightY, meta: this.state.csvData[i].Time}
    newDataR.push(newObj2);
  }
  let newDataCombined = [];
  newDataCombined.push(newDataR);
  newDataCombined.push(newDataL);
  this.setState({ data: { ...this.state.data, series: newDataCombined} });
  this.setState({ currentJoint: "Right (W) vs Left (R) Wrist"});
  this.setState({ nodeValue: 9});
  this.setState({ yAxis: true});
}

displayKnee = e =>{
  this.setState({ displayGraph: false });
  let newDataL = [];
  let newDataR = [];
  for (let i = 0; i < this.state.csvData.length; i++){
    let newObj = {value: this.state.csvData[i].KneeLeftY, meta: this.state.csvData[i].Time}
    newDataL.push(newObj);
    let newObj2 = {value: this.state.csvData[i].KneeRightY, meta: this.state.csvData[i].Time}
    newDataR.push(newObj2);
  }
  let newDataCombined = [];
  newDataCombined.push(newDataL);
  newDataCombined.push(newDataR);
  this.setState({ data: { ...this.state.data, series: newDataCombined} });
  this.setState({ currentJoint: "Left (W) vs Right (R) Knee"});
  this.setState({ nodeValue: 10});
  this.setState({ yAxis: true});
}

displayKneeR = e =>{
  this.setState({ displayGraph: false });
  let newDataL = [];
  let newDataR = [];
  for (let i = 0; i < this.state.csvData.length; i++){
    let newObj = {value: this.state.csvData[i].KneeLeftY, meta: this.state.csvData[i].Time}
    newDataL.push(newObj);
    let newObj2 = {value: this.state.csvData[i].KneeRightY, meta: this.state.csvData[i].Time}
    newDataR.push(newObj2);
  }
  let newDataCombined = [];
  newDataCombined.push(newDataR);
  newDataCombined.push(newDataL);
  this.setState({ data: { ...this.state.data, series: newDataCombined} });
  this.setState({ currentJoint: "Right (W) vs Left (R) Knee"});
  this.setState({ nodeValue: 11});
  this.setState({ yAxis: true});
}

displayAnkle = e =>{
  this.setState({ displayGraph: false });
  let newDataL = [];
  let newDataR = [];
  for (let i = 0; i < this.state.csvData.length; i++){
    let newObj = {value: this.state.csvData[i].AnkleLeftY, meta: this.state.csvData[i].Time}
    newDataL.push(newObj);
    let newObj2 = {value: this.state.csvData[i].AnkleRightY, meta: this.state.csvData[i].Time}
    newDataR.push(newObj2);
  }
  let newDataCombined = [];
  newDataCombined.push(newDataL);
  newDataCombined.push(newDataR);
  this.setState({ data: { ...this.state.data, series: newDataCombined} });
  this.setState({ currentJoint: "Left (W) vs Right (R) Ankle"});
  this.setState({ nodeValue: 12});
  this.setState({ yAxis: true});
}

displayAnkleR = e =>{
  this.setState({ displayGraph: false });
  let newDataL = [];
  let newDataR = [];
  for (let i = 0; i < this.state.csvData.length; i++){
    let newObj = {value: this.state.csvData[i].AnkleLeftY, meta: this.state.csvData[i].Time}
    newDataL.push(newObj);
    let newObj2 = {value: this.state.csvData[i].AnkleRightY, meta: this.state.csvData[i].Time}
    newDataR.push(newObj2);
  }
  let newDataCombined = [];
  newDataCombined.push(newDataR);
  newDataCombined.push(newDataL);
  this.setState({ data: { ...this.state.data, series: newDataCombined} });
  this.setState({ currentJoint: "Right (W) vs Left (R) Ankle"});
  this.setState({ nodeValue: 13});
  this.setState({ yAxis: true});

}


displayOff = e =>{
  this.setState({ displayGraph: true });
  this.setState({ currentJoint: "None"});
}

displayToggle = e =>{
  this.setState({ displayNodes: !this.state.displayNodes });
}



switchX = e =>{
  switch (this.state.nodeValue) {
    case 0:
      this.displayHeadX();
      break;
    case 1:
      this.displayNeckX();
      break;
    case 2:
      this.displayBaseX();
      break;
    case 3:
      this.displaySpineX();
      break;
    case 4:
      this.displayShoulderX();
      break;
    case 5:
      this.displayElbowX();
      break;
    case 6:
      this.displayElbowRX();
      break;
    case 7:
      this.displayShoulderRX();
      break;
    case 8:
      this.displayWristX();
      break;
    case 9:
      this.displayWristRX();
      break;
    case 10:
      this.displayKneeX();
      break;
    case 11:
      this.displayKneeRX();
      break;
    case 12:
      this.displayAnkleX();
      break;
    case 13:
      this.displayAnkleRX();
      break;
    default:
      break;
  }
  this.setState({ yAxis: false});
}

switchY = e =>{
  switch (this.state.nodeValue) {
    case 0:
      this.displayHead();
      break;
    case 1:
      this.displayNeck();
      break;
    case 2:
      this.displayBase();
      break;
    case 3:
      this.displaySpine();
      break;
    case 4:
      this.displayShoulder();
      break;
    case 5:
      this.displayElbow();
      break;
    case 6:
      this.displayElbowR();
      break;
    case 7:
      this.displayShoulderR();
      break;
    case 8:
      this.displayWrist();
      break;
    case 9:
      this.displayWristR();
      break;
    case 10:
      this.displayKnee();
      break;
    case 11:
      this.displayKneeR();
      break;
    case 12:
      this.displayAnkle();
      break;
    case 13:
      this.displayAnkleR();
      break;
    default:
      break;
  }
  this.setState({ yAxis: true});
}

test = e => {
  console.log(this.state.time);
}

listSymptoms(){
  let table = []
  let index = parseInt(this.state.index);
  let array = this.state.database[index].NIHSS;
  // Outer loop to create parent
  for (let element in array) {
    //Create the parent and add the children
    if(element === "motorArm" || element === "motorLeg"){
      //console.log(this.state.database[index].NIHSS[element]);
      if(this.state.database[index].NIHSS[element].left.value != 0){
        table.push(<div>{element} left: {this.state.database[index].NIHSS[element].left.value}</div>);
      }
      if(this.state.database[index].NIHSS[element].left.value != 0){
        table.push(<div>{element} right: {this.state.database[index].NIHSS[element].left.value}</div>);
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
      <Player fluid={false} width={285} ref="player" startTime={this.state.time}>
        <source src="/Videos/test-video.mp4"></source>
      </Player>
        <div class = "displayReading">
          <h5>Currently displaying: <br/> {this.state.currentJoint}  { (this.state.yAxis)  ? "Y" : "X"} Axis</h5>
        </div>

        <h1 id="left-symbol"> R </h1>
        <h1 id="right-symbol"> L </h1>

        <div class="drawn-head"></div>
        <div class="drawn-arm-left"></div>
        <div class="drawn-arm-right">
        <div class="drawn-upper-arm-right"></div>
        <div class="drawn-lower-arm-right"></div>
        <div class="drawn-hand-right"></div>
        </div>

        <div class="drawn-arm-left">
        <div class="drawn-upper-arm-left" style={{backgroundColor: this.rightArmColor()}}></div>
        <div class="drawn-lower-arm-left" style={{backgroundColor: this.rightArmColor()}}></div>
        <div class="drawn-hand-left" style={{backgroundColor: this.rightArmColor()}}></div>
        </div>

        <div class="drawn-body-left"></div>
        <div class="drawn-body-right"></div>

        <div class="drawn-upper-leg-left"></div>
        <div class="drawn-lower-leg-left"></div>
        <div class="drawn-foot-left"></div>

        <div class="drawn-upper-leg-right"></div>
        <div class="drawn-lower-leg-right"></div>
        <div class="drawn-foot-right"></div>

        <div class="drawn-leg-right"></div>
        <div class="drawn-eye-left"></div>
        <div class="drawn-eye-right"></div>
        <div class="drawn-mouth"></div>

        { (this.state.displayNodes) ?
        <div class="nodes">
        <div class="head node" onClick={this.displayHead}><span class="tooltiptext">Head</span></div>
        <div class="neck node" onClick={this.displayNeck}><span class="tooltiptext">Neck</span></div>
        <div class="shoulderLeft node" onClick={this.displayShoulder}><span class="tooltiptext">Right Shoulder</span></div>
        <div class="shoulderRight node" onClick={this.displayShoulderR}><span class="tooltiptextleft">Left Shoulder</span></div>
        <div class="elbowRight node" onClick={this.displayElbowR}><span class="tooltiptextleft">Left Elbow</span></div>
        <div class="elbowLeft node" onClick={this.displayElbow}><span class="tooltiptext">Right Elbow</span></div>
        <div class="wristLeft node" onClick={this.displayWrist}><span class="tooltiptext">Right Wrist</span></div>
        <div class="wristRight node" onClick={this.displayWristR}><span class="tooltiptextleft">Left Wrist</span></div>
        <div class="spine node" onClick={this.displaySpine}><span class="tooltiptext">Spine Mid</span></div>
        <div class="hip node" onClick={this.displayBase}><span class="tooltiptext">Spine Base</span></div>
        <div class="kneeLeft node" onClick={this.displayKnee}><span class="tooltiptext">Right Knee</span></div>
        <div class="kneeRight node" onClick={this.displayKneeR}><span class="tooltiptextleft">Left Knee</span></div>
        <div class="ankleLeft node" onClick={this.displayAnkle}><span class="tooltiptext">Right Ankle</span></div>
        <div class="ankleRight node" onClick={this.displayAnkleR}><span class="tooltiptextleft">Left Ankle</span></div>
        </div>
        :
        <div></div>
      }

      <div class="user-options">
            <h5><center>User Options</center></h5>
            <center>{ (this.state.displayNodes) ? <button class="hideNodes" onClick={this.displayToggle}>&times; Hide Nodes</button> :
            <button class="showNodes" onClick={this.displayToggle}>&times; Show Nodes</button> } </center>
            {(this.state.displayGraph) ? <div></div> : <div><center><button class="closeChart" onClick={this.displayOff}>&times; Close Chart</button></center>
            { (this.state.yAxis)  ? <center><button class="switchChart" onClick={this.switchX}>Switch to X Data</button></center> : <center><button class="switchChart" onClick={this.switchY}>Switch to Y Data</button></center>
              }
              </div>}

      </div>

      <div class="displayed-symptoms">
        <h5><center>Symptoms</center></h5>
        <div class = "symptoms">
        {this.listSymptoms()}
        </div>
      </div>

        { (this.state.displayGraph)  ? <div></div> : <div>
              <div class="chart-div" onClick={this.graphClick}>

                      <ChartistGraph
                      listener={{
                        draw: this.onDrawHandler
                      }}
                      className="ct-chart"
                      style={{width: this.state.canvasSize}}
                      data={this.state.data}
                      type="Line"
                      options={dailySalesChart.options}
                      plugins={dailySalesChart.animation}
                      /></div></div>}
      </div>

    )
  }
}

export default PatientSkeletonNew;
