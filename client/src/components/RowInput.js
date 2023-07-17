import React, { useState } from 'react';

// Returns a row with input field (used in the pop up form)
export function RowInput(props) {
    let [inputValue, setInputValue] = useState('');
    
    // when useState is used - while first rendering, there is no patientData so initial value is undefined. Using useEffect we can set the input value every time props.patientData is changed
    React.useEffect(() => {
      setInputValue(props.patientData);
    }, [props.patientData]);
  
    return (
      <div className="rows">
        <label className='labels' htmlFor={props.htmlFor}>{props.description}</label>
        <input className="popUpInputs" type={props.type} id={props.id} name={props.name} required value={inputValue || ''} // adding <OR ''> fixes the issue with changing a controlled input to be uncontrolled
        onChange={(e) => setInputValue(e.target.value)} />   
      </div>
    )
}