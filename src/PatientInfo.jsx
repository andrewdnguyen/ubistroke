import React, { Component } from 'react';
import Test from './test.json';
import './PatientInfo.css';



class PatientInfo extends Component {
  constructor(props){
    super(props);
    this.state = {
      id: props.patientId,
      name :Test[props.patientId].name,
      date : Test[props.patientId].date,
      preExam: Test[props.patientId].preExam,
      loc: {
          value: Test[props.patientId].loc.value,
          questionValue: Test[props.patientId].loc.questionValue,
          commandValue: Test[props.patientId].loc.commandValue,
          notes: Test[props.patientId].loc.notes
        },
      bestGaze: {
        value: Test[props.patientId].bestGaze.value,
        notes: Test[props.patientId].bestGaze.notes
      },
      visual: {
        value: Test[props.patientId].visual.value,
        notes: Test[props.patientId].visual.notes
      },
      facialPalsy: {
        value: Test[props.patientId].facialPalsy.value,
        notes: Test[props.patientId].facialPalsy.notes
      },
      motorArm:{
        left: {
          value: Test[props.patientId].motorArm.left.value
        },
        right: {
          value: Test[props.patientId].motorArm.right.value
        },
        notes: Test[props.patientId].motorArm.notes
      },
      motorLeg: {
        left: {
          value: Test[props.patientId].motorLeg.left.value
        },
        right: {
          value: Test[props.patientId].motorLeg.left.value
        },
        notes: Test[props.patientId].motorLeg.notes
      },
      limbAtaxia: {
        value: Test[props.patientId].limbAtaxia.value,
        notes: Test[props.patientId].limbAtaxia.notes
      },
      sensory : {
        value: Test[props.patientId].sensory.value,
        notes: Test[props.patientId].sensory.notes
      },
      bestLanguage : {
        value: Test[props.patientId].bestLanguage.value,
        notes: Test[props.patientId].bestLanguage.notes
      },
      dysarthria : {
        value: Test[props.patientId].dysarthria.value,
        notes: Test[props.patientId].dysarthria.notes
      },
      extinctionAndInattention : {
        value: Test[props.patientId].extinctionAndInattention.value,
        notes: Test[props.patientId].extinctionAndInattention.notes
      }
    };
    console.log(this.state);

  }

updateInfo = e => {
  this.setState({
    [e.target.name]:{
      ...this.state[e.target.name],
      notes: e.target.value
    }
  });
}

updateLeftArm = e => {
let rightValue = this.state.motorArm.right;
this.setState({
  motorArm: {
    left: {
      value: e.target.value
    },
    right: rightValue
  }
});
}

updateRightArm = e => {
let leftValue = this.state.motorArm.left;
this.setState({
  motorArm: {
    right: {
      value: e.target.value
    },
    left: leftValue
  }
});
console.log(this.state.motorArm);
}

updateLeftLeg = e => {
let rightValue = this.state.motorLeg.right;
this.setState({
  motorLeg: {
    left: {
      value: e.target.value
    },
    right: rightValue
  }
});
}

updateRightLeg = e => {
let leftValue = this.state.motorLeg.left;
this.setState({
  motorLeg: {
    right: {
      value: e.target.value
    },
    left: leftValue
  }
});
}

updateValue = e => {
this.setState({
  [e.target.id]:{
    ...this.state[e.target.id],
    value: e.target.value
  }
});
}

updateCommandValue = e => {
this.setState({
  [e.target.id]:{
    ...this.state[e.target.id],
    commandValue: e.target.value
  }
});
}

updateQuestionValue = e => {
this.setState({
  [e.target.id]:{
    ...this.state[e.target.id],
    questionValue: e.target.value
  }
});
}


updatePreExam = e => {
this.setState({
  [e.target.name] : e.target.value
});
}

  render() {
    return (
      <div className="info-side">
        <h1>Subject ID: {this.state.id}</h1>
        <h1>Pt. Date of Birth: {Test[this.state.id].dob}</h1>
        <h1>Hospital: {Test[this.state.id].hospital}</h1>
        <h1>Examination Date: {Test[this.state.id].date}</h1>
        <h1>Last Known Well: 3 hours ago</h1>
        <h1>Blood Pressure: 150/70</h1>
        <h1>Glucose Levels: 130 mg/dL</h1>
        <h1>NIHSS Total Score: {parseInt(this.state.loc.value) + parseInt(this.state.loc.questionValue) + parseInt(this.state.loc.commandValue) +
        parseInt(this.state.bestGaze.value) + parseInt(this.state.visual.value) + parseInt(this.state.facialPalsy.value) + parseInt(this.state.motorArm.left.value)
        + parseInt(this.state.motorArm.right.value) + parseInt(this.state.motorLeg.left.value) + parseInt(this.state.motorLeg.right.value)
        + parseInt(this.state.limbAtaxia.value) + parseInt(this.state.sensory.value) + parseInt(this.state.bestLanguage.value) + parseInt(this.state.dysarthria.value) +
        parseInt(this.state.extinctionAndInattention.value)}</h1>

        <br/><br/>
        <form>
          <p>Pre-Exam Notes
          <textarea rows="10" className="notes form-control" onChange={this.updatePreExam} name="preExam" value={this.state.preExam}/>
          <br/><br/>
          Level of Consciousness:
          <select class="form-control" id="loc" onChange={this.updateValue} value={this.state.loc.value}>
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
          LOC - Questions:
          <select class="form-control" id="loc" onChange={this.updateQuestionValue} value={this.state.loc.questionValue}>
            <option disabled selected value> -- select an option -- </option>
            <option value="0">0 = Answers both questions correctly.</option>
            <option value="1">1 = Answers one question correctly.</option>
            <option value ="2">2 = Answers neither question correctly.</option>
          </select>
          <br/>
          LOC - Commands:
          <select class="form-control" id="loc" onChange={this.updateCommandValue} value={this.state.loc.commandValue}>
            <option disabled selected value> -- select an option -- </option>
            <option value="0">0 = Performs both tasks correctly.</option>
            <option value="1">1 = Performs one task correctly.</option>
            <option value ="2">2 = Performs neither task correctly. </option>
          </select>
          <br/>
          <textarea rows="10" className="notes form-control" onChange={this.updateInfo} name="loc" value={this.state.loc.notes}/>
          <br/><br/>
          Best Gaze:
          <select class="form-control" id="bestGaze" onChange={this.updateValue} value={this.state.bestGaze.value}>
            <option disabled selected value> -- select an option -- </option>
            <option value="0">0 = Normal.</option>
            <option value="1">1 = Partial gaze palsy; gaze is abnormal in one or both eyes,
            but forced deviation or total gaze paresis is not present.</option>
            <option value ="2">2 = Forced deviation, or total gaze paresis not overcome by the
            oculocephalic maneuver. </option>
          </select>
          <br/>
          <textarea rows="10" className="notes form-control" onChange={this.updateInfo} name="bestGaze" value={this.state.bestGaze.notes}/>
          <br/><br/>
          Visual:
          <select class="form-control" id="visual" onChange={this.updateValue} value={this.state.visual.value}>
            <option disabled selected value> -- select an option -- </option>
            <option value="0">0 = No visual loss.</option>
            <option value="1">1 = Partial hemianopia.</option>
            <option value ="2">2 = Complete hemianopia.</option>
            <option value ="3">3 = Bilateral hemianopia.</option>
          </select>
          <br/>
          <textarea rows="10" className="notes form-control" name="visual" onChange={this.updateInfo} value={this.state.visual.notes}/>
          <br/><br/>
          Facial Palsy:
          <select class="form-control" id="facialPalsy" onChange={this.updateValue} value={this.state.facialPalsy.value}>
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
          <textarea rows="10" className="notes form-control" onChange={this.updateInfo} name="facialPalsy" value={this.state.facialPalsy.notes}/>
          <br/><br/>
          Motor Arm Left:
          <select class="form-control" id="leftArm" onChange={this.updateLeftArm} value={this.state.motorArm.left.value}>
            <option disabled selected value> -- select an option -- </option>
            <option value="0">0 = No drift; limb holds 90 (or 45) degrees for full 10 seconds.</option>
            <option value="1">1 = Drift; limb holds 90 (or 45) degrees, but drifts down before
            full 10 seconds; does not hit bed or other support.</option>
            <option value ="2">2 = Some effort against gravity; limb cannot get to or
            maintain (if cued) 90 (or 45) degrees, drifts down to bed,
            but has some effort against gravity.</option>
            <option value ="3">3 = No effort against gravity; limb falls.</option>
            <option value ="4">4 = No movement.</option>
            <option value ="5">UN = Amputation or joint fusion, explain below. </option>
          </select>
          <br/>
          Motor Arm Right:
          <select class="form-control" id="questionValue" onChange={this.updateRightArm} value={this.state.motorArm.right.value}>
          <option disabled selected value> -- select an option -- </option>
          <option value="0">0 = No drift; limb holds 90 (or 45) degrees for full 10 seconds.</option>
          <option value="1">1 = Drift; limb holds 90 (or 45) degrees, but drifts down before
          full 10 seconds; does not hit bed or other support.</option>
          <option value ="2">2 = Some effort against gravity; limb cannot get to or
          maintain (if cued) 90 (or 45) degrees, drifts down to bed,
          but has some effort against gravity.</option>
          <option value ="3">3 = No effort against gravity; limb falls.</option>
          <option value ="4">4 = No movement.</option>
          <option value ="5">UN = Amputation or joint fusion, explain below. </option>
          </select>
          <br/>
          <textarea rows="10" className="notes form-control" name="motorArm" onChange={this.updateInfo} value={this.state.motorArm.notes}/>
          <br/><br/>
          Motor Leg Left:
          <select class="form-control" id="questionValue" onChange={this.updateLeftLeg} value={this.state.motorLeg.left.value}>
            <option disabled selected value> -- select an option -- </option>
            <option value="0">0 = No drift; leg holds 30-degree position for full 5 seconds.</option>
            <option value="1">1 = Drift; leg falls by the end of the 5-second period but does
            not hit bed.</option>
            <option value ="2">2 = Some effort against gravity; leg falls to bed by 5
            seconds, but has some effort against gravity.</option>
            <option value ="3">3 = No effort against gravity; leg falls to bed immediately.</option>
            <option value ="4">4 = No movement.</option>
            <option value ="5">UN = Amputation or joint fusion, explain below. </option>
          </select>
          <br/>
          Motor Leg Right:
          <select class="form-control" id="questionValue" onChange={this.updateRightLeg} value={this.state.motorLeg.right.value}>
            <option disabled selected value> -- select an option -- </option>
            <option value="0">0 = No drift; leg holds 30-degree position for full 5 seconds.</option>
            <option value="1">1 = Drift; leg falls by the end of the 5-second period but does
            not hit bed.</option>
            <option value ="2">2 = Some effort against gravity; leg falls to bed by 5
            seconds, but has some effort against gravity.</option>
            <option value ="3">3 = No effort against gravity; leg falls to bed immediately.</option>
            <option value ="4">4 = No movement.</option>
            <option value ="5">UN = Amputation or joint fusion, explain below. </option>
          </select>
          <br/>
          <textarea rows="10" className="notes form-control" name="motorLeg" onChange={this.updateInfo} value={this.state.motorLeg.notes}/>
          <br/><br/>
          Limb Ataxia:
          <select class="form-control" id="limbAtaxia" onChange={this.updateValue} value={this.state.limbAtaxia.value}>
            <option disabled selected value> -- select an option -- </option>
            <option value="0">0 = Absent.</option>
            <option value="1">1 = Present in one limb.</option>
            <option value ="2">2 = Present in two limbs.</option>
            <option value ="3">UN = Amputation or joint fusion, explain below. </option>
          </select>
          <br/>
          <textarea rows="10" className="notes form-control" onChange={this.updateInfo} name="limbAtaxia" value={this.state.limbAtaxia.notes}/>
          <br/><br/>
          Sensory:
          <select class="form-control" id="sensory" onChange={this.updateValue} value={this.state.sensory.value}>
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
          <textarea rows="10" className="notes form-control" onChange={this.updateInfo} name="sensory" value={this.state.sensory.notes}/>
          <br/><br/>
          Best Language:
          <select class="form-control" id="bestLanguage" onChange={this.updateValue} value={this.state.bestLanguage.value}>
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
          <textarea rows="10" className="notes form-control" onChange={this.updateInfo} name="bestLanguage" value={this.state.bestLanguage.notes}/>
          <br/><br/>
          Dysarthria:
          <select class="form-control" id="dysarthria" onChange={this.updateValue} value={this.state.dysarthria.value}>
            <option disabled selected value> -- select an option -- </option>
            <option value="0">0 = Normal.</option>
            <option value="1">1 = Mild-to-moderate dysarthria; patient slurs at least some
            words and, at worst, can be understood with some
            difficulty.</option>
            <option value ="2">2 = Severe dysarthria; patient's speech is so slurred as to be
            unintelligible in the absence of or out of proportion to
            any dysphasia, or is mute/anarthric.</option>
            <option value ="3">UN = Intubated or other physical barrier,
            explain below.</option>
          </select>
          <br/>
          <textarea rows="10" className="notes form-control" onChange={this.updateInfo} name="dysarthria" value={this.state.dysarthria.notes}/>
          <br/><br/>
          Extinction and Inattention:
          <select class="form-control" id="extinctionAndInattention" onChange={this.updateValue} value={this.state.extinctionAndInattention.value}>
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
          <textarea rows="10" className="notes form-control" onChange={this.updateInfo} name="extinctionAndInattention" value={this.state.extinctionAndInattention.notes}/>
          </p>
          <br/>
        </form>
      </div>
    )
  }
}

export default PatientInfo;
