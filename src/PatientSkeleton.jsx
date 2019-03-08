import React, { Component } from 'react';
import Test from './test.json';
import './PatientSkeleton.css';
import ChartistGraph from "react-chartist";
import {
  dailySalesChart
} from "./charts.jsx";
import * as d3 from 'd3';
import * as Papa from 'papaparse';
import data from './data/test-data.csv';



class PatientSkeleton extends Component {
  constructor(props){
    super(props);
    this.state = {
      displayGraph: true,
      data: {
        labels: ["-8h",,,, "-7h",,,, "-6h",,,, "-5h",,,, "-4h",,,, "-3h",,,, "-2h",,,, "-1h",,,, "0h"],
        series: [[157, 187, 22, 146, 61, 198, 52, 77, 194, 87, 1, 149, 131, 112, 59, 142, 37, 248, 249, 219, 35, 232, 21, 130, 225, 54, 120, 124, 18, 86, 222, 137, 238]],
      },
      csvData: {},
      currentJoint: "No",
      nodeValue: -1,
      yAxis: true
  }

    // Bind this to function updateData (This eliminates the error)
this.updateData = this.updateData.bind(this);
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

    updateData(result) {
    const data = result.data;
    let newData = [];
    for (let i = 0; i < data.length; i++){
      if(i%17 === 0){
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
    newData.push(this.state.csvData[i].HeadX);
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
    newData.push(this.state.csvData[i].NeckX);
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
    newData.push(this.state.csvData[i].SpineBaseX);
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
    newData.push(this.state.csvData[i].SpineMidX);
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
    newDataL.push(this.state.csvData[i].ShoulderLeftX);
    newDataR.push(this.state.csvData[i].ShoulderRightX);
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
    newDataL.push(this.state.csvData[i].ElbowLeftX);
    newDataR.push(this.state.csvData[i].ElbowRightX);
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
    newDataL.push(this.state.csvData[i].ElbowLeftX);
    newDataR.push(this.state.csvData[i].ElbowRightX);
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
    newDataL.push(this.state.csvData[i].ShoulderLeftX);
    newDataR.push(this.state.csvData[i].ShoulderRightX);
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
    newDataL.push(this.state.csvData[i].WristLeftX);
    newDataR.push(this.state.csvData[i].WristRightX);
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
    newDataL.push(this.state.csvData[i].WristLeftX);
    newDataR.push(this.state.csvData[i].WristRightX);
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
    newDataL.push(this.state.csvData[i].KneeLeftX);
    newDataR.push(this.state.csvData[i].KneeRightX);
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
    newDataL.push(this.state.csvData[i].KneeLeftX);
    newDataR.push(this.state.csvData[i].KneeRightX);
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
    newDataL.push(this.state.csvData[i].AnkleLeftX);
    newDataR.push(this.state.csvData[i].AnkleRightX);
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
    newDataL.push(this.state.csvData[i].AnkleLeftX);
    newDataR.push(this.state.csvData[i].AnkleRightX);
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
    newData.push(this.state.csvData[i].HeadY);
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
    newData.push(this.state.csvData[i].NeckY);
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
    newData.push(this.state.csvData[i].SpineBaseY);
  }
  this.setState({ data: { ...this.state.data, series: [newData]} });
  this.setState({ currentJoint: "Spine Base"});
  this.setState({ nodeValue: 2});
}

displaySpine = e =>{
  this.setState({ displayGraph: false });
  let newData = [];
  for (let i = 0; i < this.state.csvData.length; i++){
    newData.push(this.state.csvData[i].SpineMidY);
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
    newDataL.push(this.state.csvData[i].ShoulderLeftY);
    newDataR.push(this.state.csvData[i].ShoulderRightY);
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
    newDataL.push(this.state.csvData[i].ElbowLeftY);
    newDataR.push(this.state.csvData[i].ElbowRightY);
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
    newDataL.push(this.state.csvData[i].ElbowLeftY);
    newDataR.push(this.state.csvData[i].ElbowRightY);
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
    newDataL.push(this.state.csvData[i].ShoulderLeftY);
    newDataR.push(this.state.csvData[i].ShoulderRightY);
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
    newDataL.push(this.state.csvData[i].WristLeftY);
    newDataR.push(this.state.csvData[i].WristRightY);
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
    newDataL.push(this.state.csvData[i].WristLeftY);
    newDataR.push(this.state.csvData[i].WristRightY);
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
    newDataL.push(this.state.csvData[i].KneeLeftY);
    newDataR.push(this.state.csvData[i].KneeRightY);
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
    newDataL.push(this.state.csvData[i].KneeLeftY);
    newDataR.push(this.state.csvData[i].KneeRightY);
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
    newDataL.push(this.state.csvData[i].AnkleLeftY);
    newDataR.push(this.state.csvData[i].AnkleRightY);
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
    newDataL.push(this.state.csvData[i].AnkleLeftY);
    newDataR.push(this.state.csvData[i].AnkleRightY);
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



  render() {
    return (
      <div class="canvas-div">
        <video class="kinect-video" width="270" controls>
        <source src="/Videos/test-video.mp4" type="video/mp4"></source>
        Your browser does not support HTML5 video.
        </video>
        <div class = "displayReading">
          <h6>Currently displaying: <br/> {this.state.currentJoint}</h6>
          <h6>Axis: { (this.state.yAxis)  ? <h6>Y</h6> : <h6>X</h6>}</h6>
        </div>
        <div class="head node" onClick={this.displayHead}><span class="tooltiptext">Head</span></div>
        <div class="neck node" onClick={this.displayNeck}><span class="tooltiptext">Neck</span></div>
        <div class="shoulderLeft node" onClick={this.displayShoulder}><span class="tooltiptext">Left Shoulder</span></div>
        <div class="shoulderRight node" onClick={this.displayShoulderR}><span class="tooltiptextleft">Right Shoulder</span></div>
        <div class="elbowRight node" onClick={this.displayElbowR}><span class="tooltiptextleft">Right Elbow</span></div>
        <div class="elbowLeft node" onClick={this.displayElbow}><span class="tooltiptext">Left Elbow</span></div>
        <div class="wristLeft node" onClick={this.displayWrist}><span class="tooltiptext">Left Wrist</span></div>
        <div class="wristRight node" onClick={this.displayWristR}><span class="tooltiptextleft">Right Wrist</span></div>
        <div class="spine node" onClick={this.displaySpine}><span class="tooltiptext">Spine Mid</span></div>
        <div class="hip node" onClick={this.displayBase}><span class="tooltiptext">Spine Base</span></div>
        <div class="kneeLeft node" onClick={this.displayKnee}><span class="tooltiptext">Left Knee</span></div>
        <div class="kneeRight node" onClick={this.displayKneeR}><span class="tooltiptextleft">Right Knee</span></div>
        <div class="ankleLeft node" onClick={this.displayAnkle}><span class="tooltiptext">Left Ankle</span></div>
        <div class="ankleRight node" onClick={this.displayAnkleR}><span class="tooltiptextleft">Right Ankle</span></div>
        { (this.state.displayGraph)  ? <div></div> : <div>
              <button class="closeChart" onClick={this.displayOff}>&times; Close Chart</button>
              { (this.state.yAxis)  ? <button class="switchChart" onClick={this.switchX}>Switch to X Data</button> : <button class="switchChart" onClick={this.switchY}>Switch to Y Data</button>
                    }
              <div class="chart-div">

                      <ChartistGraph
                      className="ct-chart"
                      data={this.state.data}
                      type="Line"
                      options={dailySalesChart.options}
                      plugins={dailySalesChart.animation}
                      /></div></div>}
      </div>

    )
  }
}

export default PatientSkeleton;
