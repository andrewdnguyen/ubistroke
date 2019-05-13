import React, { Component } from "react";
import PatientInfo from './PatientInfo';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
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

class Patients extends Component {
  constructor() {
    super();

    // this.app = firebase.initializeApp(config);
    !firebase.apps.length ? this.app = firebase.initializeApp(config) : this.app = firebase.app();

    this.database = this.app.database().ref().child('info');

    this.state = {
      patientArray: [],
      loading: true
    };
  }

getModules(){
    let ref = this.database;
    ref.once("value").then(dataSnapshot => {
      this.response = dataSnapshot.val().data.patientArray;
      //once the data is back, set the loading to false so it can be rendered
      this.setState({ patientArray: this.response, loading: false });
    });

    //window.localStorage.setItem('storedDatabase', JSON.stringify(this.response));
  }

  componentDidMount(){
      this.getModules();
      //console.log(JSON.stringify(this.response));
  }

  generateButtons = () => {
    let table = []
    let array = this.state.patientArray;
    // Outer loop to create parent
    table.push(<div><Link to={`subjecttest/0`}><button class="btn btn-lg btn-primary btn-block">{array[0]["UbiStroke Label"]}</button></Link><br/><br/></div>)
    for (let i = 1; i <= 10; i++) {
      //Create the parent and add the children
      table.push(<div><Link to={`response1/` + i}><button class="btn btn-lg btn-primary btn-block">{array[i]["UbiStroke Label"]}</button></Link><br/><br/></div>)
    }
    return table
  }

  render(){

    return this.state.loading ? (
            <div>
                loading...
            </div>
        ) :(

      <div>

        <h1 style={{color: 'white'}}><center>Patients</center></h1>
          <div class = "patient-buttons">
          <center><Link to="/"><button class="btn btn-lg btn-primary btn-block">&lt;&lt; Go Back</button></Link></center><br/><br/>
          {this.generateButtons()}
          </div>

      </div>
    );
  }
};

export default Patients;
