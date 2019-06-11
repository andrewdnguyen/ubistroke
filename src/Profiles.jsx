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

class Profiles extends Component {
  constructor() {
    super();

    // this.app = firebase.initializeApp(config);
    !firebase.apps.length ? this.app = firebase.initializeApp(config) : this.app = firebase.app();

    this.database = this.app.database().ref().child('info');

    this.state = {
      profileArray: [],
      loading: true
    };
  }

getModules(){
  this.database.on('value', snap => {
    console.log(JSON.stringify(snap.val().responses));
    this.setState({
      profileArray:snap.val().responses,
      length: snap.val().responses.length,
      loading: false
    });
  });
    //window.localStorage.setItem('storedDatabase', JSON.stringify(this.response));
  }

  componentDidMount(){
      this.getModules();
      //console.log(JSON.stringify(this.response));
  }

  generateButtons = () => {
    let table = []
    let array = this.state.profileArray;
    // Outer loop to create parent
    for (let element in array) {
      console.log(element == "placeholder");
      if(element != "placeholder"){
        if(array[element].progress == 0){
          table.push(<div><Link to={`/tutorial/` + element}><button class="btn btn-lg btn-primary btn-block">{element}</button></Link><br/><br/></div>)
        }
        else{
          table.push(<div><Link to={`/saved/` + element + '/' + (parseInt(array[element].progress)-1)}><button class="btn btn-lg btn-primary btn-block">{element}</button></Link><br/><br/></div>)
        }
      }
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

        <h1 style={{color: 'white'}}><center>Saved Profiles</center></h1>
          <div class = "patient-buttons">
          <center><Link to="/home"><button class="btn btn-lg btn-primary btn-block">&lt;&lt; Go Back</button></Link></center><br/><br/>
          {this.generateButtons()}
          </div>

      </div>
    );
  }
};

export default Profiles;
