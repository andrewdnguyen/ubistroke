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
      csvData: {}
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


displayHead = e =>{
  this.setState({ displayGraph: false });
  let newData = [];
  for (let i = 0; i < this.state.csvData.length; i++){
    newData.push(this.state.csvData[i].HeadY);
  }
  this.setState({ data: { ...this.state.data, series: [newData]} });
}

displayNeck = e =>{
  this.setState({ displayGraph: false });
  let newData = [];
  for (let i = 0; i < this.state.csvData.length; i++){
    newData.push(this.state.csvData[i].NeckY);
  }
  this.setState({ data: { ...this.state.data, series: [newData]} });
}

displayBase = e =>{
  this.setState({ displayGraph: false });
  let newData = [];
  for (let i = 0; i < this.state.csvData.length; i++){
    newData.push(this.state.csvData[i].SpineBaseY);
  }
  this.setState({ data: { ...this.state.data, series: [newData]} });
}

displaySpine = e =>{
  this.setState({ displayGraph: false });
  let newData = [];
  for (let i = 0; i < this.state.csvData.length; i++){
    newData.push(this.state.csvData[i].SpineMidY);
  }
  this.setState({ data: { ...this.state.data, series: [newData]} });
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
}

displayOff = e =>{
  this.setState({ displayGraph: true });
}



  render() {
    return (
      <div class="canvas-div">
      <video class="kinect-video" width="270" controls>
      <source src="/Videos/test-video.mp4" type="video/mp4"></source>
      Your browser does not support HTML5 video.
      </video>
        <div class="head node" onClick={this.displayHead}><span class="tooltiptext">Head</span></div>
        <div class="neck node" onClick={this.displayNeck}><span class="tooltiptext">Neck</span></div>
        <div class="shoulderLeft node" onClick={this.displayShoulder}><span class="tooltiptext">Left Shoulder</span></div>
        <div class="shoulderRight node" onClick={this.displayShoulder}><span class="tooltiptextleft">Right Shoulder</span></div>
        <div class="elbowRight node" onClick={this.displayElbow}><span class="tooltiptextleft">Right Elbow</span></div>
        <div class="elbowLeft node" onClick={this.displayElbow}><span class="tooltiptext">Left Elbow</span></div>
        <div class="wristLeft node" onClick={this.displayWrist}><span class="tooltiptext">Left Wrist</span></div>
        <div class="wristRight node" onClick={this.displayWrist}><span class="tooltiptextleft">Right Wrist</span></div>
        <div class="spine node" onClick={this.displaySpine}><span class="tooltiptext">Spine Mid</span></div>
        <div class="hip node" onClick={this.displayBase}><span class="tooltiptext">Spine Base</span></div>
        <div class="kneeLeft node" onClick={this.displayKnee}><span class="tooltiptext">Left Knee</span></div>
        <div class="kneeRight node" onClick={this.displayKnee}><span class="tooltiptextleft">Right Knee</span></div>
        <div class="ankleLeft node" onClick={this.displayAnkle}><span class="tooltiptext">Left Ankle</span></div>
        <div class="ankleRight node" onClick={this.displayAnkle}><span class="tooltiptextleft">Right Ankle</span></div>
        { (this.state.displayGraph)  ? <div></div> : <div class="chart-div">
                      <button onClick={this.displayOff}>&times;</button>
                      <ChartistGraph
                      className="ct-chart"
                      data={this.state.data}
                      type="Line"
                      options={dailySalesChart.options}
                      plugins={dailySalesChart.animation}
                      /></div>}
      </div>
    )
  }
}

export default PatientSkeleton;
