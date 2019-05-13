import React, { Component } from 'react';
import { Redirect } from 'react-router';
import Test from './test.json';
import './PatientInfo.css';
import firebase from "firebase";
var config = {
  apiKey: "AIzaSyDBFvjEfVbGK6njvCN49i68K-F8S_w5mus",
  authDomain: "ubistroke.firebaseapp.com",
  databaseURL: "https://ubistroke.firebaseio.com",
  projectId: "ubistroke",
  storageBucket: "ubistroke.appspot.com",
  messagingSenderId: "466560050867"
};


class ResponseLog extends Component {
  constructor(props){
    super(props);
    // this.app = firebase.initializeApp(config);
    !firebase.apps.length ? this.app = firebase.initializeApp(config) : this.app = firebase.app();

    this.database = this.app.database().ref().child('info');

    this.state = {
      redirect: false,
      saved: false,
      timeSaved: 0,
      index: this.props.patientIndex,
      test: {},
      response: {
        subjectID: "",
        notes: "",
        locQuestions: {
          value : 0
        },
        locCommands: {
          value : 0
        },
        bestGaze: {
              value: 0
        },
        bestLanguage: {
              value: 0
        },
        dysarthria: {
              value: 0
        },
        extinctionAndInattention: {
              value: 0
        },
        facialPalsy: {
              value: 0
        },
        limbAtaxia: {
              value: 0
        },
        levelOfConsciousness: {
              value: 0
        },
        motorArm: {
              left: {
                    value: 0
              },
              right: {
                    value: 0
              }
        },
        motorLeg: {
              left: {
                    value: 0
              },
              right: {
                    value: 0
              }
        },
        sensory: {
              value: 0
        },
        visual: {
              value: 0
        }
      }
    };
  }


  getModules(){
      this.database.on('value', snap => {
        console.log(JSON.stringify(snap.val().responseArrayOne));
        this.setState({
          test:snap.val().responseArrayOne,
        });
      });
    }

    componentDidMount(){
        this.getModules();
    }

updateNotes = e => {
  console.log(this.state.test);
  this.setState({
    response: {
      ...this.state.response,
      notes: e.target.value

      }
    });
}

updateID = e => {
  this.setState({
    response: {
      ...this.state.response,
      subjectID: e.target.value

      }
    });
}

updateLeftArm = e => {
  this.setState({
    response: {
      ...this.state.response,
      motorArm:{
        ...this.state.response.motorArm,
        left: {
          value:e.target.value
        }
      }
    }
  });
}

updateRightArm = e => {
this.setState({
  response: {
    ...this.state.response,
    motorArm:{
      ...this.state.response.motorArm,
      right: {
        value:e.target.value
      }
    }
  }
});
}

updateLeftLeg = e => {
this.setState({
  response: {
    ...this.state.response,
    motorLeg:{
      ...this.state.response.motorLeg,
      left: {
        value:e.target.value
      }
    }
  }
});
}

updateRightLeg = e => {
this.setState({
  response: {
    ...this.state.response,
    motorLeg:{
      ...this.state.response.motorLeg,
      right: {
        value:e.target.value
      }
    }
  }
});
}

updateValue = e => {
console.log(this.state.response);
this.setState({
  response: {
    ...this.state.response,
    [e.target.id]:{
      ...this.state.response[e.target.id],
      value:e.target.value
    }
  }
});
}

getValue(input){
  let returnValue = parseInt(input);
  if(isNaN(returnValue)){
    return 0;
  }
  return returnValue;
}

saveChanges = e => {
  console.log("clicked!")
  //console.log(this.test);
  let savedData = JSON.stringify(this.state.response);
  localStorage.setItem('responseData', savedData);
  let newData = this.state.test;
  newData.push(this.state.response);
  let updates = {['/responseArrayOne']:newData};
  this.database.update(updates);
  var today = new Date();
  var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  //console.log(JSON.stringify(this.state.test))
  window.localStorage.setItem('storedDatabase', JSON.stringify(this.state.test));
  this.setState({
    timeSaved: time,
    saved: true,
    redirect: true
  });
};

  render() {
    let redirectlink = '/response2/' + this.props.patientIndex;
    let patientVar = this.state.response;
    return this.state.redirect ? (
        <Redirect to={redirectlink} />
        ) :(
      <div className="info-side">
      <form>
        <br/>
        <submit class = "btn btn-lg btn-primary" onClick={this.saveChanges}>Submit Responses</submit>
        <br/>
          <p><h2 class="white-text">Input Your Subject ID:</h2>
          <input class="form-control" id="subjectID" onChange={this.updateID} value={patientVar.subjectID} required></input>
          <br/>
            <p class="white-text">Level of Consciousness:</p>
          <select class="form-control" id="levelOfConsciousness" onChange={this.updateValue} value={patientVar.levelOfConsciousness.value}>
            <option disabled selected value> -- select an option -- </option>
            <option value="0">0 = Alert; keenly responsive.</option>
            <option value="1">1 = Not alert; but arousable by minor stimulation to obey,
           answer, or respond.</option>
            <option value ="2">2 = Not Alert; requires repeated stimulation to attend, or is
           obtunded and requires strong or painful stimulation to
           make movements (not stereotyped).</option>
           <option value ="3">3 = Responds only with reflex motor or autonomic effects or
           totally unresponsive, flaccid, and areflexic. </option>
          </select>
          <br/>
            <p class="white-text">LOC - Questions:</p>
          <select class="form-control" id="locQuestions" onChange={this.updateValue} value={patientVar.locQuestions.value}>
            <option disabled selected value> -- select an option -- </option>
            <option value="0">0 = Answers both questions correctly.</option>
            <option value="1">1 = Answers one question correctly.</option>
            <option value ="2">2 = Answers neither question correctly.</option>
          </select>
          <br/>
            <p class="white-text">LOC - Commands:</p>
          <select class="form-control" id="locCommands" onChange={this.updateValue} value={patientVar.locCommands.value}>
            <option disabled selected value> -- select an option -- </option>
            <option value="0">0 = Performs both tasks correctly.</option>
            <option value="1">1 = Performs one task correctly.</option>
            <option value ="2">2 = Performs neither task correctly. </option>
          </select>
          <br/>
            <p class="white-text">Best Gaze:</p>
          <select class="form-control" id="bestGaze" onChange={this.updateValue} value={patientVar.bestGaze.value}>
            <option disabled selected value> -- select an option -- </option>
            <option value="0">0 = Normal.</option>
            <option value="1">1 = Partial gaze palsy; gaze is abnormal in one or both eyes,
            but forced deviation or total gaze paresis is not present.</option>
            <option value ="2">2 = Forced deviation, or total gaze paresis not overcome by the
            oculocephalic maneuver. </option>
          </select>
          <br/>
            <p class="white-text">Visual:</p>
          <select class="form-control" id="visual" onChange={this.updateValue} value={patientVar.visual.value}>
            <option disabled selected value> -- select an option -- </option>
            <option value="0">0 = No visual loss.</option>
            <option value="1">1 = Partial hemianopia.</option>
            <option value ="2">2 = Complete hemianopia.</option>
            <option value ="3">3 = Bilateral hemianopia.</option>
          </select>
          <br/>
            <p class="white-text">Facial Palsy:</p>
          <select class="form-control" id="facialPalsy" onChange={this.updateValue} value={patientVar.facialPalsy.value}>
            <option disabled selected value> -- select an option -- </option>
            <option value="0">0 = Normal symmetrical movements.</option>
            <option value="1">1 = Minor paralysis (flattened nasolabial fold, asymmetry on
            smiling).</option>
            <option value ="2">2 = Partial paralysis (total or near-total paralysis of lower
            face).</option>
            <option value ="3">3 = Complete paralysis of one or both sides (absence of
            facial movement in the upper and lower face). </option>
          </select>
          <br/>
            <p class="white-text">Motor Arm Left:</p>
          <select class="form-control" id="leftArm" onChange={this.updateLeftArm} value={patientVar.motorArm.left.value}>
            <option disabled selected value> -- select an option -- </option>
            <option value="0">0 = No drift; limb holds 90 (or 45) degrees for full 10 seconds.</option>
            <option value="1">1 = Drift; limb holds 90 (or 45) degrees, but drifts down before
            full 10 seconds; does not hit bed or other support.</option>
            <option value ="2">2 = Some effort against gravity; limb cannot get to or
            maintain (if cued) 90 (or 45) degrees, drifts down to bed,
            but has some effort against gravity.</option>
            <option value ="3">3 = No effort against gravity; limb falls.</option>
            <option value ="4">4 = No movement.</option>
            <option value ="UN">UN = Amputation or joint fusion, explain below. </option>
          </select>
          <br/>
            <p class="white-text">Motor Arm Right:</p>
          <select class="form-control" id="questionValue" onChange={this.updateRightArm} value={patientVar.motorArm.right.value}>
          <option disabled selected value> -- select an option -- </option>
          <option value="0">0 = No drift; limb holds 90 (or 45) degrees for full 10 seconds.</option>
          <option value="1">1 = Drift; limb holds 90 (or 45) degrees, but drifts down before
          full 10 seconds; does not hit bed or other support.</option>
          <option value ="2">2 = Some effort against gravity; limb cannot get to or
          maintain (if cued) 90 (or 45) degrees, drifts down to bed,
          but has some effort against gravity.</option>
          <option value ="3">3 = No effort against gravity; limb falls.</option>
          <option value ="4">4 = No movement.</option>
          <option value ="UN">UN = Amputation or joint fusion, explain below. </option>
          </select>
          <br/>
            <p class="white-text">Motor Leg Left:</p>
          <select class="form-control" id="questionValue" onChange={this.updateLeftLeg} value={patientVar.motorLeg.left.value}>
            <option disabled selected value> -- select an option -- </option>
            <option value="0">0 = No drift; leg holds 30-degree position for full 5 seconds.</option>
            <option value="1">1 = Drift; leg falls by the end of the 5-second period but does
            not hit bed.</option>
            <option value ="2">2 = Some effort against gravity; leg falls to bed by 5
            seconds, but has some effort against gravity.</option>
            <option value ="3">3 = No effort against gravity; leg falls to bed immediately.</option>
            <option value ="4">4 = No movement.</option>
            <option value ="UN">UN = Amputation or joint fusion, explain below. </option>
          </select>
          <br/>
            <p class="white-text">Motor Leg Right:</p>
          <select class="form-control" id="questionValue" onChange={this.updateRightLeg} value={patientVar.motorLeg.right.value}>
            <option disabled selected value> -- select an option -- </option>
            <option value="0">0 = No drift; leg holds 30-degree position for full 5 seconds.</option>
            <option value="1">1 = Drift; leg falls by the end of the 5-second period but does
            not hit bed.</option>
            <option value ="2">2 = Some effort against gravity; leg falls to bed by 5
            seconds, but has some effort against gravity.</option>
            <option value ="3">3 = No effort against gravity; leg falls to bed immediately.</option>
            <option value ="4">4 = No movement.</option>
            <option value ="UN">UN = Amputation or joint fusion, explain below. </option>
          </select>
          <br/>
            <p class="white-text">Limb Ataxia:</p>
          <select class="form-control" id="limbAtaxia" onChange={this.updateValue} value={patientVar.limbAtaxia.value}>
            <option disabled selected value> -- select an option -- </option>
            <option value="0">0 = Absent.</option>
            <option value="1">1 = Present in one limb.</option>
            <option value ="2">2 = Present in two limbs.</option>
            <option value ="UN">UN = Amputation or joint fusion, explain below. </option>
          </select>
          <br/>
            <p class="white-text">Sensory:</p>
          <select class="form-control" id="sensory" onChange={this.updateValue} value={patientVar.sensory.value}>
            <option disabled selected value> -- select an option -- </option>
            <option value="0">0 = Normal; no sensory loss.</option>
            <option value="1">1 = Mild-to-moderate sensory loss; patient feels pinprick is
            less sharp or is dull on the affected side; or there is a
            loss of superficial pain with pinprick, but patient is aware
            of being touched.</option>
            <option value ="2">2 = Severe to total sensory loss; patient is not aware of
            being touched in the face, arm, and leg. </option>
          </select>
          <br/>
            <p class="white-text">Best Language:</p>
          <select class="form-control" id="bestLanguage" onChange={this.updateValue} value={patientVar.bestLanguage.value}>
            <option disabled selected value> -- select an option -- </option>
            <option value="0">0 = No aphasia; normal.</option>
            <option value="1">1 = Mild-to-moderate aphasia; some obvious loss of fluency
            or facility of comprehension, without significant
            limitation on ideas expressed or form of expression.
            Reduction of speech and/or comprehension, however,
            makes conversation about provided materials difficult
            or impossible. For example, in conversation about
            provided materials, examiner can identify picture or
            naming card content from patient’s response.</option>
            <option value ="2">2 = Severe aphasia; all communication is through fragmentary
            expression; great need for inference, questioning, and guessing
            by the listener. Range of information that can be exchanged is
            limited; listener carries burden of communication. Examiner
            cannot identify materials provided from patient response.</option>
            <option value ="3">3 = Mute, global aphasia; no usable speech or auditory
            comprehension. </option>
          </select>
          <br/>
            <p class="white-text">Dysarthria:</p>
          <select class="form-control" id="dysarthria" onChange={this.updateValue} value={patientVar.dysarthria.value}>
            <option disabled selected value> -- select an option -- </option>
            <option value="0">0 = Normal.</option>
            <option value="1">1 = Mild-to-moderate dysarthria; patient slurs at least some
            words and, at worst, can be understood with some
            difficulty.</option>
            <option value ="2">2 = Severe dysarthria; patient's speech is so slurred as to be
            unintelligible in the absence of or out of proportion to
            any dysphasia, or is mute/anarthric.</option>
            <option value ="UN">UN = Intubated or other physical barrier,
            explain below.</option>
          </select>
          <br/>
            <p class="white-text">Extinction and Inattention: </p>
          <select class="form-control" id="extinctionAndInattention" onChange={this.updateValue} value={patientVar.extinctionAndInattention.value}>
            <option disabled selected value> -- select an option -- </option>
            <option value="0">0 = No abnormality.</option>
            <option value="1">1 = Visual, tactile, auditory, spatial, or personal inattention
            or extinction to bilateral simultaneous stimulation in one
            of the sensory modalities.</option>
            <option value ="2">2 = Profound hemi-inattention or extinction to more than
            one modality; does not recognize own hand or orients
            to only one side of space. </option>
          </select>
          <br/>
          <p class="white-text">General Notes and Comments:</p>
          <textarea rows="4" className="notes form-control" onChange={this.updateNotes} name="Diagnosis" value={patientVar.notes}/>
          <br/>
          </p>
          <br/>
        </form>
      </div>
    )
  }
}

export default ResponseLog;
