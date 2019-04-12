import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import PatientInfo from './PatientInfo';
import PatientSkeleton from './PatientSkeleton.jsx';
import PatientSkeletonNew from './PatientSkeletonNew.jsx';
import ChartistGraph from "react-chartist";
import SubjectTest from './SubjectTest.jsx';
import Patients from './Patients.jsx';
import {
  dailySalesChart
} from "./charts.jsx";

var config = {
  apiKey: "AIzaSyDBFvjEfVbGK6njvCN49i68K-F8S_w5mus",
  authDomain: "ubistroke.firebaseapp.com",
  databaseURL: "https://ubistroke.firebaseio.com",
  projectId: "ubistroke",
  storageBucket: "ubistroke.appspot.com",
  messagingSenderId: "466560050867"
};

    //removed header/ element
const App = () => (

  <Router>
    <div>
      <Route exact path="/" component={Home} />
      <Route path="/about" component={About} />
      <Route path="/patients" component={Patients} />
      <Route path="/subjects/:subjectID/:time?" component={Subject} />
      <Route path="/subjecttest/:subjectID/:time?" component={SubjectTest} />
      <Route path="/charttest" component={Test} />
    </div>
  </Router>
);

const Subject = ({match}) => (

  <div class = "row">
  <div class="col-md-6">
  <div class="white-background">
  <Link to="/patients"><button id="back-button" class="btn btn-block btn-primary">&lt;&lt; Back</button></Link>
  </div>
  <PatientInfo patientId={match.params.subjectID}/>
  </div>
  <div class="col-md-6">
    <br/>
    <PatientSkeleton time={match.params.time}/>
  </div>

  </div>

);

// const SubjectTest = ({match}) => (
//
//   <div class = "row">
//   <div class="col-md-6">
//   <div class="white-background">
//   <Link to="/patients"><button id="back-button" class="btn btn-block btn-primary">&lt;&lt; Back</button></Link>
//   </div>
//   <PatientInfo patientId={match.params.subjectID}/>
//   </div>
//   <div class="col-md-6">
//     <br/>
//     <PatientSkeletonNew time={match.params.time}/>
//   </div>
//
//   </div>
//
// );

const Home = () => (
<div style={{
        position: 'absolute', left: '50%', top: '50%',
        transform: 'translate(-50%, -50%)'
    }}>
      <img src={require('./logo.svg')}></img>
      <button class="btn btn-lg btn-primary">Start New Patient (Disabled)</button>
      <br/>
      <br/>
      <Link to="/patients"><button class="btn btn-lg btn-primary">Open Patient Files (Enabled)</button></Link>
</div>
);

const Test = () => (
  <div class="jumbotron chart-div" style={{backgroundColor: "#563d7c", color:"white"}}>

  </div>
);

const About = () => <h2>About</h2>;

// const Patients = ({ match }) => (
//   <div style={{
//           position: 'absolute', left: '50%', top: '50%',
//           transform: 'translate(-50%, -50%)'
//       }}>
//     <h1 style={{color: 'white'}}><center>Patients</center></h1>
//         <Link to={`subjects/12345`}><button class="btn btn-lg btn-primary btn-block">John Doe (ID: 12345)</button></Link>
//         <br/>
//         <br/>
//         <Link to={`subjecttest/24680`}><button class="btn btn-lg btn-primary btn-block">Jane Doe (ID: 24680)</button></Link>
//         <br/>
//         <br/>
//         <Link to={`subjects/13579`}><button class="btn btn-lg btn-primary btn-block">Lisa Grega (ID: 13579)</button></Link>
//         <br/>
//         <br/>
//         <Link to={`subjects/92122`}><button class="btn btn-lg btn-primary btn-block">Andrew Nguyen (ID: 92122)</button></Link>
//         <br/>
//         <br/>
//         <Link to="/"><button class="btn btn-lg btn-primary btn-block">&lt;&lt; Go Back</button></Link>
//
//
//   </div>
// );


export default App;
