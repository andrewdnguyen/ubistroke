import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import PatientInfo from './PatientInfo';
import PatientSkeleton from './PatientSkeleton.jsx';
import PatientSkeletonNew from './PatientSkeletonNew.jsx';
import ChartistGraph from "react-chartist";
import SubjectTest from './SubjectTest.jsx';
import Patients from './Patients.jsx';
import Chart from 'react-google-charts';
import Experiment from './Experiment.jsx';
import ExperimentResponse1 from './ExperimentResponse1.jsx';
import ExperimentResponse2 from './ExperimentResponse2.jsx';
import Questions from './Questions.jsx';
import Saved from './Saved.jsx';
import Debrief from './Debrief.jsx';
import Tutorial from './Tutorial.jsx';
import Profiles from './Profiles.jsx';
import Experiment1 from './Experiment1.jsx';
import Experiment2 from './Experiment2.jsx';
import Finished from './Finished.jsx';
import Randomizer from './Randomizer.jsx';
import Begin from './Begin.jsx';
import Password from './Password.jsx'
import {line as Line} from 'zingchart-react';
import {zingchart} from 'zingchart';


var config = {
  apiKey: "AIzaSyDBFvjEfVbGK6njvCN49i68K-F8S_w5mus",
  authDomain: "ubistroke.firebaseapp.com",
  databaseURL: "https://ubistroke.firebaseio.com",
  projectId: "ubistroke",
  storageBucket: "ubistroke.appspot.com",
  messagingSenderId: "466560050867"
};

var myLineValues = [
  { text : "First Series", values : [0,1,2,2,4,6,7] },
  { text : "Second Series", values : [18,12,7,14,1,19,4] },
  { text : "Third Series", values : [0,1,12,12,4,6,17] },
  { text : "Fourth Series", values : [18,22,17,4,1,9,4] },
  { text : "Fifth Series", values : [4,2,7,3,23,7,2] },
  { text : "Sixth Series", values : [10,6,8,2,6,3,9] },
];

zingchart.bind('chart1', 'node_click', function(e) {
  console.log(e);
});

    //removed header/ element
const App = () => (

  <Router>
    <div>
      <Route exact path="/" component={Password} />
      <Route exact path="/home" component={Home} />
      <Route path="/about" component={About} />
      <Route path="/patients" component={Patients} />
      <Route path="/subjects/:subjectID/:time?" component={Subject} />
      <Route path="/edit/:subjectID/:time?" component={SubjectTest} />
      <Route path="/charttest" component={Test} />
      <Route path="/response1/:participantID" component={ExperimentResponse1} />
      <Route path="/response2/:participantID" component={ExperimentResponse2} />
      <Route path="/questionnaire/:participantID" component={Questions} />
      <Route path="/experiment" component={Experiment} />
      <Route path="/debrief/:participantID" component={Debrief} />
      <Route path="/tutorial/:participantID" component={Tutorial} />
      <Route path="/experiment1/:participantID/:subjectID" component={Experiment1} />
      <Route path="/experiment2/:participantID/:subjectID" component={Experiment2} />
      <Route path="/saved/:participantID/:subjectID" component={Saved} />
      <Route path="/finished/:participantID" component={Finished} />
      <Route path="/return" component={Profiles} />
      <Route path="/randomizer" component={Randomizer} />
      <Route path="/begin/:participantID" component={Begin} />

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
    <PatientSkeleton patientId={match.params.subjectID} time={match.params.time}/>
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
      <img style={{width: 300}} src={require('./logo.png')}></img>
      <br/>
      <br/>
      <Link to="/experiment"><button class="btn btn-lg btn-primary" style={{width: 300}}>Begin Experiment Session</button></Link>
      <br/>
      <br/>
      <Link to="/return"><button class="btn btn-lg btn-primary" style={{width: 300}}>Continue Experiment Session</button></Link>
</div>
);

const Test = () => (
  <Line id="chart1" height="300" width="600" series={myLineValues} legend="true" theme="light" title="Hello Line Chart"/>
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
