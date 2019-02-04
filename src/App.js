import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import PatientInfo from './PatientInfo';

    //removed header/ element
const App = () => (
  <Router>
    <div>
      <Route exact path="/" component={Home} />
      <Route path="/about" component={About} />
      <Route path="/patients" component={Patients} />
      <Route path="/subjects/:subjectID" component={Subject} />
    </div>
  </Router>
);

const Subject = ({match}) => (

  <div class = "row">
  <div class="col-md-6">
  <Link to="/patients"><button id="back-button" class="btn btn-primary">&lt;&lt; Back</button></Link>
  <PatientInfo patientId={match.params.subjectID}/>
  </div>
  <div class="col-md-6">
    <img src={require('./img/body.PNG')} alt="Prototype vision for body representation."></img>
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
const About = () => <h2>About</h2>;

const Patients = ({ match }) => (
  <div>
    <h2>Patients</h2>
    <ul>
      <li>
        <Link to={`subjects/12345`}>John Doe (ID: 12345)</Link>
      </li>
      <li>
        <Link to={`subjects/24680`}>Jane Doe (ID: 24680)</Link>
      </li>
      <li>
        <Link to={`subjects/13579`}>Lisa Grega (ID: 13579)</Link>
      </li>
      <li>
        <Link to={`subjects/92122`}>Andrew Nguyen (ID: 92122)</Link>
      </li>
    </ul>

    <Link to="/"><button class="btn btn-primary">&lt;&lt; Back</button></Link>
  </div>
);


export default App;
