import React, { Component } from "react";
import ResponseLog2 from './ResponseLog2.jsx';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import PatientSkeleton from './PatientSkeleton.jsx';
import PatientSkeletonNew from './PatientSkeletonNew.jsx';
import PatientVideo from './PatientVideo.jsx';
import firebase from "firebase";
var config = {
  apiKey: "AIzaSyDBFvjEfVbGK6njvCN49i68K-F8S_w5mus",
  authDomain: "ubistroke.firebaseapp.com",
  databaseURL: "https://ubistroke.firebaseio.com",
  projectId: "ubistroke",
  storageBucket: "ubistroke.appspot.com",
  messagingSenderId: "466560050867"
};

class Experiment2 extends Component {
  constructor() {
    super();

    // this.app = firebase.initializeApp(config);
    !firebase.apps.length ? this.app = firebase.initializeApp(config) : this.app = firebase.app();

    this.database = this.app.database().ref().child('info');

    this.state = {
      loading: true
    };
  }


  getModules(){
    let ref = this.database;
    ref.once("value").then(dataSnapshot => {
      this.response = dataSnapshot.val().settings;
      //once the data is back, set the loading to false so it can be rendered
      this.setState({ settings: this.response, loading: false });
    });
  }

    componentDidMount(){
        this.getModules();
    }

    skeletonRender(){
      let value1 = this.state.settings.slightFakeIndex;
      let value2 = this.state.settings.randomIndex;
      let value3 = this.state.settings.comboIndex;
      console.log(value3 == this.props.match.params.subjectID);
      if(value1 == this.props.match.params.subjectID){
        return <PatientSkeletonNew patientIndex={this.state.settings.orderArray[this.props.match.params.subjectID]} dataState="1"/>
      }
      else if(value2 == this.props.match.params.subjectID){
        return <PatientSkeletonNew patientIndex={this.state.settings.orderArray[this.props.match.params.subjectID]} dataState="2"/>
      }
      else if(value3 == this.props.match.params.subjectID){
        return <PatientSkeletonNew patientIndex={this.state.settings.orderArray[this.props.match.params.subjectID]} dataState="3"/>
      }
      else{
        return <PatientSkeletonNew patientIndex={this.state.settings.orderArray[this.props.match.params.subjectID]} dataState="0"/>        
      }
    }

  render(){

    return this.state.loading ? (
            <div>
                loading...
            </div>
        ) :(
      <div class = "row">
      <div class="col-md-6">
      <div class="white-background">
      </div>
      <ResponseLog2 participantID={this.props.match.params.participantID} experimentIndex={this.props.match.params.subjectID} patientIndex={this.state.settings.orderArray[this.props.match.params.subjectID]}/>
      </div>
      <div class="col-md-6">
        <br/>
        {this.skeletonRender()}
      </div>

      </div>
    );
  }
};

export default Experiment2;
