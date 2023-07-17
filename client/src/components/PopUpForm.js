import React, { useState } from 'react';

import { PopUpFormButtons } from './PopUpFormButtons';
import { RowInput } from './RowInput';

export function PopUpForm(props) {
    let [inputValue, setInputValue] = useState(props.patientData);
    // when useState is used - while first rendering, there is no patientData so initial value is undefined. Using useEffect we can set the input value every time props.patientData is changed
  
    React.useEffect(() => {
      setInputValue(props.patientData);
    }, [props.patientData]);
  
    return (
      <div id="popUpBackground">
        <div id="popUp">
            <div id="close" onClick={props.closeForm} >+</div>
            <div><h1 id="appointment">Make an appointment</h1></div>
  
            <form method="post" action="/" id="popUpForm" onSubmit={props.submitting} >
                <RowInput htmlFor="name" description="Patient's name:" type="text" id="name" name="name" patientData={props.patientData.name} />
                <RowInput htmlFor="surname" description="Patient's surname:" type="text" id="surname" name="surname" patientData={props.patientData.surname} />
                <RowInput htmlFor="number" description="Number of phone:" type="number" id="number" name="phoneNumber" 
                patientData={props.patientData.phone} />
                <RowInput htmlFor="ssn" description="Social Security number:" type="number" id="ssn" name="SocialSecurityNumber" patientData={props.patientData.ssn} />
  
                {/* If there is no data in a slot to modify, the submit button will be available and the rest will be disabled (change and delete buttons), otherwise buttons are set in way allowing for modification of patient's data */}
                <div id="btnContainer">
                    <PopUpFormButtons id="submitBtn" description="Submit" isDisabled={!props.patientData.name ? false : true} />
                    <PopUpFormButtons id="changeBtn" description="Change" isDisabled={!props.patientData.name ? true : false} />
                    <PopUpFormButtons id="deleteBtn" description="Delete" isDisabled={!props.patientData.name ? true : false} />
                </div>
            </form>
        </div>
      </div>
    )
  }