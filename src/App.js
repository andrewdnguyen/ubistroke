import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import PatientInfo from './PatientInfo';
import PatientSkeleton from './PatientSkeleton';
import ChartistGraph from "react-chartist";
import {
  dailySalesChart
} from "./charts.jsx";

    //removed header/ element
const App = () => (
  <Router>
    <div>
      <Route exact path="/" component={Home} />
      <Route path="/about" component={About} />
      <Route path="/patients" component={Patients} />
      <Route path="/subjects/:subjectID" component={Subject} />
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
    <PatientSkeleton/>
  </div>

  </div>

);

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

const Patients = ({ match }) => (
  <div style={{
          position: 'absolute', left: '50%', top: '50%',
          transform: 'translate(-50%, -50%)'
      }}>
    <h1 style={{color: 'white'}}><center>Patients</center></h1>
        <Link to={`subjects/12345`}><button class="btn btn-lg btn-primary btn-block">John Doe (ID: 12345)</button></Link>
        <br/>
        <br/>
        <Link to={`subjects/24680`}><button class="btn btn-lg btn-primary btn-block">Jane Doe (ID: 24680)</button></Link>
        <br/>
        <br/>
        <Link to={`subjects/13579`}><button class="btn btn-lg btn-primary btn-block">Lisa Grega (ID: 13579)</button></Link>
        <br/>
        <br/>
        <Link to={`subjects/92122`}><button class="btn btn-lg btn-primary btn-block">Andrew Nguyen (ID: 92122)</button></Link>
        <br/>
        <br/>
        <Link to="/"><button class="btn btn-lg btn-primary btn-block">&lt;&lt; Go Back</button></Link>


  </div>
);


export default App;
