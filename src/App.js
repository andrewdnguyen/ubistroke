import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Test from './test.json'

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
  {console.log(JSON.stringify(match.params.subjectID))}
  <h1>Subject ID: {match.params.subjectID}</h1>
  <h1>Subject Name: {Test[match.params.subjectID].name}</h1>
  <h1>Examination Date: {Test[match.params.subjectID].date}</h1>
  <ul>
    <li>Pre-exam: {Test[match.params.subjectID].preExam}</li>
    <li>Level of Consciousness:
      <ul>
        <li> Questions: {Test[match.params.subjectID].loc.questions}</li>
        <li> Commands: {Test[match.params.subjectID].loc.commands}</li>
      </ul>
    </li>
    <li>Best Gaze: {Test[match.params.subjectID].bestGaze}</li>
    <li>Visual: {Test[match.params.subjectID].visual}</li>
    <li>Facial Palsy: {Test[match.params.subjectID].facialPalsy}</li>
    <li>Motor Arm: Left - {Test[match.params.subjectID].motorArm.left} Right - {Test[match.params.subjectID].motorArm.right}</li>
    <li>Motor Leg: {Test[match.params.subjectID].motorLeg}</li>
    <li>Limb Ataxia: {Test[match.params.subjectID].limbAtaxia}</li>
    <li>Sensory: {Test[match.params.subjectID].sensory}</li>
    <li>Best Language: {Test[match.params.subjectID].bestLanguage}</li>
    <li>Disathria: {Test[match.params.subjectID].disathria}</li>
    <li>Extinction and Inattention: {Test[match.params.subjectID].extinctionAndInattention}</li>
  </ul>
  <Link to="/patients"><button>Back</button></Link>
  </div>
  <div class="col-md-6">
    <img src={require('./img/body.PNG')} alt="Prototype vision for body representation."></img>
  </div>

  </div>

);

const Home = () => (
  <div>
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

    <Link to="/"><button>Back</button></Link>
  </div>
);


export default App;
