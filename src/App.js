import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import PatientInfo from './PatientInfo';
import PatientSkeleton from './PatientSkeleton.jsx';
import PatientSkeletonNew from './PatientSkeletonNew.jsx';
import ChartistGraph from "react-chartist";
import SubjectTest from './SubjectTest.jsx';
import Patients from './Patients.jsx';
import Chart from 'react-google-charts';
import ExperimentResponse1 from './ExperimentResponse1.jsx';
import ExperimentResponse2 from './ExperimentResponse2.jsx';
import Questions from './Questions.jsx';
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
      <Route path="/response1/:subjectID" component={ExperimentResponse1} />
      <Route path="/response2/:subjectID" component={ExperimentResponse2} />
      <Route path="/questionnaire" component={Questions} />
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
      <img src={require('./logo.svg')}></img>
      <button class="btn btn-lg btn-primary">Start New Patient (Disabled)</button>
      <br/>
      <br/>
      <Link to="/patients"><button class="btn btn-lg btn-primary">Open Patient Files (Enabled)</button></Link>
</div>
);

const Test = () => (
  <Chart
    width={'1000px'}
    height={'400px'}
    chartType="LineChart"
    loader={<div>Loading Chart</div>}
    data={[['x', 'hi', 'hey', 'hello']
[1,  37.8, 80.8, 41.8],
[2,  30.9, 69.5, 32.4],
[3,  25.4,   57, 25.7],
[4,  11.7, 18.8, 10.5],
[5,  11.9, 17.6, 10.4],
[6,   8.8, 13.6,  7.7],
[7,   7.6, 12.3,  9.6],
[8,  12.3, 29.2, 10.6],
[9,  16.9, 42.9, 14.8],
[10, 12.8, 30.9, 11.6],
[11,  5.3,  7.9,  4.7],
[12,  6.6,  8.4,  5.2],
[13,  4.8,  6.3,  3.6],
[14,  4.2,  6.2,  3.4]
]}
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
    }}
    rootProps={{ 'data-testid': '2' }}
    chartEvents={[
    {
      eventName: 'select',
      callback: ({ chartWrapper }) => {
        const chart = chartWrapper.getChart();
        const selection = chart.getSelection();
          const [selectedItem] = selection;
          const dataTable = chartWrapper.getDataTable();
          const { row, column } = selectedItem;
          console.log(selection);
      },
    },
  ]}
  />
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
