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
var config = {
  apiKey: "AIzaSyDBFvjEfVbGK6njvCN49i68K-F8S_w5mus",
  authDomain: "ubistroke.firebaseapp.com",
  databaseURL: "https://ubistroke.firebaseio.com",
  projectId: "ubistroke",
  storageBucket: "ubistroke.appspot.com",
  messagingSenderId: "466560050867"
};
//var test = require('./data/kinect-data/Patient_10_2016330_145130327/Patient_10_2016330_145130327_kinect_video_color.mp4')


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
      canvasSize: 0,
      googleData: []
  }

console.log(this.state.time);
    // Bind this to function updateData (This eliminates the error)
this.updateData = this.updateData.bind(this);
this.seek = this.seek.bind(this);
this.testMethod = this.testMethod.bind(this);
this.graphClick = this.graphClick.bind(this);

}

componentWillMount() {

    // Your parse code, but not seperated in a function
    let databaseData = JSON.parse(window.localStorage.getItem('storedDatabase'));
    let link = databaseData[this.props.patientIndex].csv;
    let csvFilepath;
    switch (this.props.patientIndex) {
        case '0':
            csvFilepath = require('./data/test-data.csv');
            break;
        case '1':
            csvFilepath = require('./data/test-data.csv');
            break;
        case '2':
            csvFilepath = require('./data/test-data.csv');
            break;
        case '3':
            csvFilepath = require('./data/test-data.csv');
            break;
        case '4':
            csvFilepath = require('./data/test-data.csv');
            break;
        case '5':
            csvFilepath = require('./data/test-data.csv');
            break;
        case '6':
            csvFilepath = require('./data/test-data.csv');
            break;
        case '7':
            csvFilepath = require('./data/test-data.csv');
            break;
        case '8':
            csvFilepath = require('./data/test-data.csv');
            break;
        case '9':
            csvFilepath = require('./data/test-data.csv');
            break;
        case '10':
            csvFilepath = require('./data/test-data.csv');
            break;
        case '11':
            csvFilepath = require('./data/test-data.csv');
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

seeking(){

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

mouthColor(){
  let index = parseInt(this.state.index);
  let patientVariable = this.state.database[index].NIHSS;
  //console.log(this.state.database);
  let locQuestions = this.getValue(patientVariable.locQuestions.value);
  let determinator = locQuestions;
  if(determinator == 0){
    return "green";
  }
  else if(determinator == 1){
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
  let determinator = motorArmLeft;
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
    console.log(result);
    const data = result.data;
    let newData = [];
    let currentAxis = "X";
    let googleData = [[{ type: 'string', label: 'Time' }, 'Head', 'Neck', 'Left Shoulder', 'Right Shoulder',
    'Left Elbow', 'Right Elbow', 'Left Wrist', 'Right Wrist', 'Spine Mid', 'Spine Base', 'Left Knee', 'Right Knee',
    'Left Ankle', 'Right Ankle']];

    for (let i = 0; i < data.length; i++){
      let tempArray = [];
      tempArray.push(data[i].Time);
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
    this.setState({ data: { ...this.state.data, labels: newData} });
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
      <Player fluid={false} width={285} ref="player" startTime={this.state.time} onSeeked={this.seeking()}>
        <source src={this.state.database[this.props.patientIndex].video} ></source>
      </Player>

        <div class = "displayReading">
          {(this.state.displayGraph) ? <div></div> : <div>Currently Displaying {this.state.axis} Axis Data for:
           <div class="joints">{this.listDisplay()}</div>
           vs. Time (HH:MM:SS) </div>}
        </div>

        <h1 id="left-symbol"> R </h1>
        <h1 id="right-symbol"> L </h1>

        <div class="drawn-head"></div>
        <div class="drawn-arm-left"></div>
        <div class="drawn-arm-right">
        <div class="drawn-upper-arm-right" style={{backgroundColor: this.leftArmColor()}}></div>
        <div class="drawn-lower-arm-right" style={{backgroundColor: this.leftArmColor()}}></div>
        <div class="drawn-hand-right" style={{backgroundColor: this.leftArmColor()}}></div>
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
        <div class="drawn-mouth" style={{backgroundColor: this.mouthColor()}}></div>

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

      <div class="user-options">
            <h5><center>User Options</center></h5>
            <center>{ (this.state.displayNodes) ? <button class="hideNodes" onClick={this.displayToggle}>&times; Hide Nodes</button> :
            <button class="showNodes" onClick={this.displayToggle}>Show Nodes</button> } </center>
            {(this.state.displayGraph) ? <div><center><button class="closeChart" onClick={this.displayOn}>Open Chart</button></center></div> : <div><center><button class="closeChart" onClick={this.displayOff}>&times; Close Chart</button></center>
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
              <div class="chart-div">
              <Chart
                chartType="LineChart"
                data={this.state.googleData}
                options={{
                  legend: {
                    position: 'none',
                  },
                  hAxis: {
                    title: 'Time',
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
                  var link2 = timeString.substring(3,8);
                  var value = link2.split(':').reverse().reduce((prev, curr, i) => prev + curr*Math.pow(60, i), 0);
                  var value2 = parseInt(value);
                  this.refs.player.seek(value2);
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
