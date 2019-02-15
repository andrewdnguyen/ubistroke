import React, { Component } from 'react';
import './PatientSkeleton.css';



class PatientSkeleton extends Component {
  constructor(props){
    super(props);
    this.state = {
      displayGraph: true,
    }
  }

displayOn = e =>{
  this.setState({ displayGraph: false });
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
        <div class="head node" onClick={this.displayOn}><span class="tooltiptext">Head</span></div>
        <div class="neck node" onClick={this.displayOn}><span class="tooltiptext">Neck</span></div>
        <div class="shoulderLeft node" onClick={this.displayOn}><span class="tooltiptext">Left Shoulder</span></div>
        <div class="shoulderRight node" onClick={this.displayOn}><span class="tooltiptextleft">Right Shoulder</span></div>
        <div class="elbowRight node" onClick={this.displayOn}><span class="tooltiptextleft">Right Elbow</span></div>
        <div class="elbowLeft node" onClick={this.displayOn}><span class="tooltiptext">Left Elbow</span></div>
        <div class="wristLeft node" onClick={this.displayOn}><span class="tooltiptext">Left Wrist</span></div>
        <div class="wristRight node" onClick={this.displayOn}><span class="tooltiptextleft">Right Wrist</span></div>
        <div class="spine node" onClick={this.displayOn}><span class="tooltiptext">Spine</span></div>
        <div class="hip node" onClick={this.displayOn}><span class="tooltiptext">Hip</span></div>
        <div class="kneeLeft node" onClick={this.displayOn}><span class="tooltiptext">Left Knee</span></div>
        <div class="kneeRight node" onClick={this.displayOn}><span class="tooltiptextleft">Right Knee</span></div>
        <div class="ankleLeft node" onClick={this.displayOn}><span class="tooltiptext">Left Ankle</span></div>
        <div class="ankleRight node" onClick={this.displayOn}><span class="tooltiptextleft">Right Ankle</span></div>
        { (this.state.displayGraph)  ? <div></div> : <div class="chart-div">
                      <button onClick={this.displayOff}>&times;</button>
                      </div>}
      </div>
    )
  }
}

export default PatientSkeleton;
