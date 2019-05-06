import React, { Component } from 'react';
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


class PatientInfo extends Component {
  constructor(props){
    super(props);
    // this.app = firebase.initializeApp(config);
    !firebase.apps.length ? this.app = firebase.initializeApp(config) : this.app = firebase.app();

    this.database = this.app.database().ref().child('info');
    this.state = {
      loading: true,
      saved: false,
      timeSaved: 0,
      index: this.props.patientIndex,
      test: {}
    };
  }


  getModules(){
      let ref = this.database;
      ref.once("value").then(dataSnapshot => {
        this.response = dataSnapshot.val().data.patientArray;
        window.localStorage.setItem('storedDatabase', JSON.stringify(this.response));
        //once the data is back, set the loading to false so it can be rendered
        this.setState({ test: this.response, loading: false });
      });
    }

    componentDidMount(){
        this.getModules();
    }

    updateNotes = e => {
      let index = parseInt(this.state.index);
      console.log(this.state.test);
      this.setState({
        test: {
          ...this.state.test,
          [index]: {
              ...this.state.test[index],
              [e.target.name]:e.target.value
              }
          }
        });
    }

updateInfo = e => {
  let index = parseInt(this.state.index);
  console.log(this.state.test);
  this.setState({
    test: {
      ...this.state.test,
      [index]: {
          ...this.state.test[index],
          ["NIHSS"]: {
              ...this.state.test[index]["NIHSS"],
              [e.target.name]: {
                 ...this.state.test[index].NIHSS[e.target.name],
                 notes: e.target.value
              }
          }
      }
    }
  });
}



updateLeftArm = e => {
  let index = parseInt(this.state.index);
  this.setState({
    test: {
      ...this.state.test,
      [index]: {
          ...this.state.test[index],
          ["NIHSS"]: {
              ...this.state.test[index]["NIHSS"],
              motorArm: {
                 ...this.state.test[index].NIHSS.motorArm,
                 left: {
                   value: e.target.value
                 }
              }
          }
      }
    }
  });
}

updateRightArm = e => {
let index = parseInt(this.state.index);
this.setState({
  test: {
    ...this.state.test,
    [index]: {
        ...this.state.test[index],
        ["NIHSS"]: {
            ...this.state.test[index]["NIHSS"],
            motorArm: {
               ...this.state.test[index].NIHSS.motorArm,
               right: {
                 value: e.target.value
               }
            }
        }
    }
  }
});
}

updateLeftLeg = e => {
let index = parseInt(this.state.index);
this.setState({
  test: {
    ...this.state.test,
    [index]: {
        ...this.state.test[index],
        ["NIHSS"]: {
            ...this.state.test[index]["NIHSS"],
            motorLeg: {
               ...this.state.test[index].NIHSS.motorLeg,
               left: {
                 value: e.target.value
               }
            }
        }
    }
  }
});
}

updateRightLeg = e => {
let index = parseInt(this.state.index)
this.setState({
  test: {
    ...this.state.test,
    [index]: {
        ...this.state.test[index],
        ["NIHSS"]: {
            ...this.state.test[index]["NIHSS"],
            motorLeg: {
               ...this.state.test[index].NIHSS.motorLeg,
               right: {
                 value: e.target.value
               }
            }
        }
    }
  }
});
}

updateValue = e => {
let variable = this.state.test[this.props.patientIndex];
let index = parseInt(this.state.index);
console.log(this.state.test);
this.setState({
  test: {
    ...this.state.test,
    [index]: {
        ...this.state.test[index],
        ["NIHSS"]: {
            ...this.state.test[index]["NIHSS"],
            [e.target.id]: {
               ...this.state.test[index].NIHSS[e.target.id],
               value: e.target.value
            }
        }
    }
  }
});
}

updateSide = e => {
let variable = this.state.test[this.props.patientIndex];
let index = parseInt(this.state.index);
console.log(this.state.test);
this.setState({
  test: {
    ...this.state.test,
    [index]: {
        ...this.state.test[index],
        ["NIHSS"]: {
            ...this.state.test[index]["NIHSS"],
            [e.target.id]: {
               ...this.state.test[index].NIHSS[e.target.id],
               side: e.target.value
            }
        }
    }
  }
});
}

updateLimb = e => {
let variable = this.state.test[this.props.patientIndex];
let index = parseInt(this.state.index);
console.log(this.state.test);
this.setState({
  test: {
    ...this.state.test,
    [index]: {
        ...this.state.test[index],
        ["NIHSS"]: {
            ...this.state.test[index]["NIHSS"],
            [e.target.id]: {
               ...this.state.test[index].NIHSS[e.target.id],
               limb: e.target.value
            }
        }
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
  console.log(this.state.test);
  //console.log(this.test);
  let index = this.props.patientIndex;
  let newData = this.state.test;
  let updates = {['/data/patientArray']:newData};
  this.database.update(updates);
  var today = new Date();
  var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  //console.log(JSON.stringify(this.state.test))
  window.localStorage.setItem('storedDatabase', JSON.stringify(this.state.test));
  this.setState({
    timeSaved: time,
    saved: true
  });
  window.location.reload();
};

  render() {
    let patientVar = this.state.test[this.props.patientIndex];
    return this.state.loading ? (
            <div>
                loading...
            </div>
        ) :(
      <div className="info-side">
        <h1 class="white-text">Subject ID: {patientVar.ID}</h1>
        <h1 class="white-text">Age: {patientVar.Age}</h1>
        <h1 class="white-text">Visit Date: {patientVar["Visit Date"]}</h1>
        <h1 class="white-text">NIHSS Total Score: {this.getValue(patientVar.NIHSS.levelOfConsciousness.value) + this.getValue(patientVar.NIHSS.locQuestions.value) + this.getValue(patientVar.NIHSS.locCommands.value) +
        this.getValue(patientVar.NIHSS.bestGaze.value) + this.getValue(patientVar.NIHSS.visual.value) + this.getValue(patientVar.NIHSS.facialPalsy.value) + this.getValue(patientVar.NIHSS.motorArm.left.value)
        + this.getValue(patientVar.NIHSS.motorArm.right.value) + this.getValue(patientVar.NIHSS.motorLeg.left.value) + this.getValue(patientVar.NIHSS.motorLeg.right.value)
        + this.getValue(patientVar.NIHSS.limbAtaxia.value) + this.getValue(patientVar.NIHSS.sensory.value) + this.getValue(patientVar.NIHSS.bestLanguage.value) + this.getValue(patientVar.NIHSS.dysarthria.value) +
        this.getValue(patientVar.NIHSS.extinctionAndInattention.value)}</h1>
        <br/>
        <button class = "btn btn-lg btn-primary" onClick={this.saveChanges}>Save Changes</button>
        <br/>
        {(this.state.saved) ? <div><p>Saved changes at {this.state.timeSaved}</p></div> : <div></div>}
        <br/><br/>
        <form>
          <p><p class="white-text">Diagnosis</p>
          <textarea rows="4" className="notes form-control" onChange={this.updateNotes} name="Diagnosis" value={patientVar.Diagnosis}/>
          <br/>
          <p class="white-text">History</p>
          <textarea rows="4" className="notes form-control" onChange={this.updateNotes} name="History" value={patientVar.History}/>
          <br/>
          <p class="white-text">Neuro-Exam</p>
          <textarea rows="4" className="notes form-control" onChange={this.updateNotes} name="NeuroExam" value={patientVar.NeuroExam}/>
          <br/>
          <br/><br/>
            <p class="white-text">Level of Consciousness:</p>
          <select class="form-control" id="levelOfConsciousness" onChange={this.updateValue} value={patientVar.NIHSS.levelOfConsciousness.value}>
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
          <select class="form-control" id="locQuestions" onChange={this.updateValue} value={patientVar.NIHSS.locQuestions.value}>
            <option disabled selected value> -- select an option -- </option>
            <option value="0">0 = Answers both questions correctly.</option>
            <option value="1">1 = Answers one question correctly.</option>
            <option value ="2">2 = Answers neither question correctly.</option>
          </select>
          <br/>
            <p class="white-text">LOC - Commands:</p>
          <select class="form-control" id="locCommands" onChange={this.updateValue} value={patientVar.NIHSS.locCommands.value}>
            <option disabled selected value> -- select an option -- </option>
            <option value="0">0 = Performs both tasks correctly.</option>
            <option value="1">1 = Performs one task correctly.</option>
            <option value ="2">2 = Performs neither task correctly. </option>
          </select>
          <br/>
          <textarea rows="10" className="notes form-control" onChange={this.updateInfo} name="levelOfConsciousness" value={patientVar.NIHSS.levelOfConsciousness.notes}/>
          <br/><br/>
            <p class="white-text">Best Gaze:</p>
          <select class="form-control" id="bestGaze" onChange={this.updateValue} value={patientVar.NIHSS.bestGaze.value}>
            <option disabled selected value> -- select an option -- </option>
            <option value="0">0 = Normal.</option>
            <option value="1">1 = Partial gaze palsy; gaze is abnormal in one or both eyes,
            but forced deviation or total gaze paresis is not present.</option>
            <option value ="2">2 = Forced deviation, or total gaze paresis not overcome by the
            oculocephalic maneuver. </option>
          </select>
          <br/>
          <p class="white-text">Side of Symptom:</p>
        <select class="form-control" id="bestGaze" onChange={this.updateSide} value={patientVar.NIHSS.bestGaze.side}>
          <option value="0"> -- Not a Symptom -- </option>
          <option value="1">Left</option>
          <option value="2">Right</option>
          <option value ="3">Both</option>
        </select>
          <br/>
          <textarea rows="10" className="notes form-control" onChange={this.updateInfo} name="bestGaze" value={patientVar.NIHSS.bestGaze.notes}/>
          <br/><br/>
            <p class="white-text">Visual:</p>
          <select class="form-control" id="visual" onChange={this.updateValue} value={patientVar.NIHSS.visual.value}>
            <option disabled selected value> -- select an option -- </option>
            <option value="0">0 = No visual loss.</option>
            <option value="1">1 = Partial hemianopia.</option>
            <option value ="2">2 = Complete hemianopia.</option>
            <option value ="3">3 = Bilateral hemianopia.</option>
          </select>
          <br/>
          <p class="white-text">Impaired Visual Field:</p>
        <select class="form-control" id="visual" onChange={this.updateSide} value={patientVar.NIHSS.visual.side}>
          <option value="0"> -- Not a Symptom -- </option>
          <option value="1">Left</option>
          <option value="2">Right</option>
          <option value ="3">Both</option>
        </select>
          <br/>
          <textarea rows="10" className="notes form-control" name="visual" onChange={this.updateInfo} value={patientVar.NIHSS.visual.notes}/>
          <br/><br/>
            <p class="white-text">Facial Palsy:</p>
          <select class="form-control" id="facialPalsy" onChange={this.updateValue} value={patientVar.NIHSS.facialPalsy.value}>
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
          <p class="white-text">Side of Symptom:</p>
        <select class="form-control" id="facialPalsy" onChange={this.updateSide} value={patientVar.NIHSS.facialPalsy.side}>
          <option value="0"> -- Not a Symptom -- </option>
          <option value="1">Left</option>
          <option value="2">Right</option>
          <option value ="3">Both</option>
        </select>
          <br/>
          <textarea rows="10" className="notes form-control" onChange={this.updateInfo} name="facialPalsy" value={patientVar.NIHSS.facialPalsy.notes}/>
          <br/><br/>
            <p class="white-text">Motor Arm Left:</p>
          <select class="form-control" id="leftArm" onChange={this.updateLeftArm} value={patientVar.NIHSS.motorArm.left.value}>
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
          <select class="form-control" id="questionValue" onChange={this.updateRightArm} value={patientVar.NIHSS.motorArm.right.value}>
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
          <textarea rows="10" className="notes form-control" name="motorArm" onChange={this.updateInfo} value={patientVar.NIHSS.motorArm.notes}/>
          <br/><br/>
            <p class="white-text">Motor Leg Left:</p>
          <select class="form-control" id="questionValue" onChange={this.updateLeftLeg} value={patientVar.NIHSS.motorLeg.left.value}>
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
          <select class="form-control" id="questionValue" onChange={this.updateRightLeg} value={patientVar.NIHSS.motorLeg.right.value}>
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
          <textarea rows="10" className="notes form-control" name="motorLeg" onChange={this.updateInfo} value={patientVar.NIHSS.motorLeg.notes}/>
          <br/><br/>
            <p class="white-text">Limb Ataxia:</p>
          <select class="form-control" id="limbAtaxia" onChange={this.updateValue} value={patientVar.NIHSS.limbAtaxia.value}>
            <option disabled selected value> -- select an option -- </option>
            <option value="0">0 = Absent.</option>
            <option value="1">1 = Present in one limb.</option>
            <option value ="2">2 = Present in two limbs.</option>
            <option value ="UN">UN = Amputation or joint fusion, explain below. </option>
          </select>
          <br/>
          <p class="white-text">Side of Symptom:</p>
          <select class="form-control" id="limbAtaxia" onChange={this.updateSide} value={patientVar.NIHSS.limbAtaxia.side}>
            <option value="0"> -- Not a Symptom -- </option>
            <option value="1">Left</option>
            <option value="2">Right</option>
            <option value ="3">Both</option>
          </select>
          <br/>
          <p class="white-text">Affected Limbs:</p>
          <select class="form-control" id="limbAtaxia" onChange={this.updateLimb} value={patientVar.NIHSS.limbAtaxia.limb}>
            <option value="0"> -- Not a Symptom -- </option>
            <option value="1">Arm</option>
            <option value="2">Leg</option>
            <option value ="3">Both</option>
          </select>
          <br/>
          <textarea rows="10" className="notes form-control" onChange={this.updateInfo} name="limbAtaxia" value={patientVar.NIHSS.limbAtaxia.notes}/>
          <br/><br/>
            <p class="white-text">Sensory:</p>
          <select class="form-control" id="sensory" onChange={this.updateValue} value={patientVar.NIHSS.sensory.value}>
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
          <p class="white-text">Side of Symptom:</p>
        <select class="form-control" id="sensory" onChange={this.updateSide} value={patientVar.NIHSS.sensory.side}>
          <option value="0"> -- Not a Symptom -- </option>
          <option value="1">Left</option>
          <option value="2">Right</option>
          <option value ="3">Both</option>
        </select>
          <br/>
          <textarea rows="10" className="notes form-control" onChange={this.updateInfo} name="sensory" value={patientVar.NIHSS.sensory.notes}/>
          <br/><br/>
            <p class="white-text">Best Language:</p>
          <select class="form-control" id="bestLanguage" onChange={this.updateValue} value={patientVar.NIHSS.bestLanguage.value}>
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
          <textarea rows="10" className="notes form-control" onChange={this.updateInfo} name="bestLanguage" value={patientVar.NIHSS.bestLanguage.notes}/>
          <br/><br/>
            <p class="white-text">Dysarthria:</p>
          <select class="form-control" id="dysarthria" onChange={this.updateValue} value={patientVar.NIHSS.dysarthria.value}>
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
          <textarea rows="10" className="notes form-control" onChange={this.updateInfo} name="dysarthria" value={patientVar.NIHSS.dysarthria.notes}/>
          <br/><br/>
            <p class="white-text">Extinction and Inattention: </p>
          <select class="form-control" id="extinctionAndInattention" onChange={this.updateValue} value={patientVar.NIHSS.extinctionAndInattention.value}>
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
          <p class="white-text">Side of Symptom:</p>
        <select class="form-control" id="extinctionAndInattention" onChange={this.updateSide} value={patientVar.NIHSS.extinctionAndInattention.side}>
          <option value="0"> -- Not a Symptom -- </option>
          <option value="1">Left</option>
          <option value="2">Right</option>
          <option value ="3">Both</option>
        </select>
          <br/>
          <textarea rows="10" className="notes form-control" onChange={this.updateInfo} name="extinctionAndInattention" value={patientVar.NIHSS.extinctionAndInattention.notes}/>
          </p>
          <br/>
        </form>
      </div>
    )
  }
}

export default PatientInfo;
