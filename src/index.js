import React, { useState, useEffect, componentDidMount, componentDidUpdate } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

import { usSystem } from './hoursArray';
import { styles } from './styles';

const API_ENDPOINT = "http://127.0.0.1:4002/"


let weekDatesArray = [];

const submitButton = document.getElementById('submitBtn');
const changeButton = document.getElementById('changeBtn');
const deleteButton = document.getElementById('deleteBtn');
let popUpInputs = document.getElementsByClassName('popUpInputs');
let schedule = document.getElementById('schedule');

const rightArrow = document.getElementById('rightArrow');
const leftArrow = document.getElementById('leftArrow');

let currentSlot; // Slot which will be clicked as the last one, will be assigned to that variable


// Creates the first row of table and fills it with dates
function FirstRowCreator (props) {
  const [weekDay, setWeekDays] = useState(['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Sathurday', 'Sunday']);
  const [weekDates, setWeekDates] = useState(); // In the end we fill it in current batch of dates
  let weekDaysElements = []; // Collects jsx/html elements and render

  let lastMonday = new Date(props.lastMon);

  for (let i = 0; i < 6; i++) {
    let anotherDate = new Date(lastMonday); // By default, assigns current date and time. The value will be changed in the next line

    anotherDate.setDate(lastMonday.getDate() + i);
    let anotherDateString = anotherDate.toLocaleDateString();

    weekDaysElements.push(<th key={'Day ' + i} scope="col" className="days cells">{weekDay[i]}<p className="dates">{anotherDateString}</p></th>);

    weekDatesArray.push(anotherDateString);
  }

  return (
    <tr>
      <th scope="col" className="days firstColumn">Hours</th>
      {weekDaysElements}
    </tr>
  )
}

// Returns a row with input field (used in the pop up form)
function RowInput(props, { patientData }) {
  let [inputValue, setInputValue] = useState(props.patientData);
  let foo = props.patientData;
  // console.log('RowInput', props.patientData);
  // console.log('patientData', patientData);
  // console.log('inputValue', inputValue);

  // when useState is used - while first rendering, there is no patientData so initial value is undefined. Using useEffect we can set the input value every time props.patientData is changed
  React.useEffect(() => {
    setInputValue(props.patientData);
  }, [props.patientData]);

  return (
    <div className="rows">
      <label className='labels' htmlFor={props.htmlFor}>{props.description}</label>
      <input className="popUpInputs" type={props.type} id={props.id} name={props.name} required value={inputValue} onChange={(e) => setInputValue(e.target.value)} />   
    </div>
  )
}

// Returns one of three buttons in the pop up form
function PopUpFormButtons(props) {
  return <button id={props.id} className='buttons' type="submit" disabled={ props.isDisabled ? false : true} >{props.description}</button>
}

// The function takes the array with hours as the argument and creates as many rows as the length of array is
function CellsCreator (props) {
    const [backendData, setBackendData] = useState();
    const [rowsToDisplay, setRowsToDisplay] = useState();

    // Getting data from the database
    useEffect(() => {
      fetch(`${API_ENDPOINT}getting`, {
        method: 'GET'
      }).then(
        response => response.json()
      ).then(
        data => {
          setBackendData(data);
        }
      )    
    }, []); // Due to initial value it will be invoked only while starting

    useEffect(() => {
      if (!backendData) return; // If there is still no data - won't do that
      // Making the array with dates for a current week
      let lastMonday = new Date(props.lastMon);
      let weekDatesArray = [];
      for (let i = 0; i < 6; i++) {
        let anotherDate = new Date(lastMonday); // By default, assigns current date and time. The value will be changed in the next line
        anotherDate.setDate(lastMonday.getDate() + i);
        let anotherDateString = anotherDate.toLocaleDateString();

        weekDatesArray.push(anotherDateString);
      }


      let allRows = [];
      // Every hour 'receives' one row
      usSystem.forEach(time => {
          // Creating 6 slots for one row
          let slotsInRow = [];
          let patientData;
          for (let n = 0; n < 6; n++) {
            let differentStyling;
            let slotInfo;
            // Each row from a database is compared to a current slot. If coordinates (time and date) are same - slot gets more dynamic data and is properly styled
            Array.from(backendData).forEach((bookedSlot, index) => {
              // console.log(bookedSlot.day);
              // console.log(bookedSlot.time);
              if (weekDatesArray[n] === bookedSlot.day && time === bookedSlot.time)
              {
                patientData=[bookedSlot.name, bookedSlot.surname, bookedSlot.phone_number, bookedSlot.ssn]
                return differentStyling = 1, slotInfo=bookedSlot, patientData;
              } 
            });
            slotsInRow.push(
              <td 
                key={'Day: ' + n + ' Time: ' + time} 
                className='slot cells' 
                onClick={props.showForm} 
                data-coordinates={[weekDatesArray[n], time]}
                data-patient={patientData}
                style={ differentStyling && styles.bookedSlot} 
              >
                {differentStyling && slotInfo.surname}
              </td>
            )
          }
          // "Assembling" a row from elements and adding to array of all rows
          let row = (
            <tr key={'Row-time ' + time} className="scheduleRow">
              <td key={'Time slot-time ' + time} className="timeSlot firstColumn">{time} </td>
              {slotsInRow}
            </tr>
          );
          allRows.push(row);
      });
      // console.log(backendData);
      setRowsToDisplay(allRows);
    }, [backendData]); // Will be invoked only while changing backendData

    // console.log(backendData);
    return (rowsToDisplay);
}

function PopUpForm(props) {
    const { patientName, setPatientName } = useState();
    const { patientSurname, setPatientSurname } = useState();
    const { patientPhone, setPatientPhone } = useState();
    const { patientSSN, setPatientSSN } = useState();

    // console.log('PopUpForm', props.patientData);
    // console.log('PopUpForm', props.patientData.name);
    // console.log(props.patientData[0]);
    // Closing the pop up form. Called as event handler for 'x' button, also invoked afterclicking any submit type button 
    const closeForm = () => {
      document.getElementById('popUpBackground').style.display = 'none';
    }

    // Posting data by POST
    const submitHandler = async () => {
      let popUpForm = document.getElementById('popUpForm');
      let allInputs =  await new FormData(popUpForm);
      let inputsArray = [];
      // .entries iterates through the object and returns short arrays (each consists only form name and value of an input - below are extracted only values)
      for (let pair of allInputs.entries()) {
          inputsArray.push(pair[1]);
      }
      let postedData = inputsArray.concat(props.coordinates);

      const response = await fetch(`${API_ENDPOINT}posting`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(postedData)
      });
      // console.log(response.status);
    }

    const changeHandler = async () => {
      let popUpForm = document.getElementById('popUpForm');
      let allInputs =  await new FormData(popUpForm);
      let inputsArray = [];
      // .entries iterates through the object and returns short arrays (each consists only form name and value of an input - below are extracted only values)
      for (let pair of allInputs.entries()) {
          inputsArray.push(pair[1]);
      }
      let newData = inputsArray.concat(props.coordinates);

      const response = await fetch(`${API_ENDPOINT}change`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newData)
      });
    }

    const deleteHandler = async () => {
      let dateId = props.coordinates[0];
      let timeId = props.coordinates[1];

      const response = await fetch(`${API_ENDPOINT}day/${dateId}/time/${timeId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
      });
    }


    // The event handler for posting, changing and deleting data via pop up form
    const submitting = (e) => {
      e.preventDefault();

      // Getting the clicked button
      let clickedBtn = document.activeElement.id;
      // console.log(clickedBtn);

      if (clickedBtn ==="submitBtn") {
        submitHandler();
      } else if (clickedBtn ==="changeBtn") {
        changeHandler();
      } else {
        deleteHandler();
      }
      closeForm();
  }

  return (
    <div id="popUpBackground">
      <div id="popUp">
          <div id="close" onClick={closeForm} >+</div>
          <div><h1 id="appointment">Make an appointment</h1></div>

          <form method="post" action="/" id="popUpForm" onSubmit={submitting} >
              <RowInput htmlFor="name" description="Patient's name:" type="text" id="name" name="name" patientData={props.patientData.name} />
              <RowInput htmlFor="surname" description="Patient's surname:" type="text" id="surname" name="surname" patientData={props.patientData.surname} />
              <RowInput htmlFor="number" description="Number of phone:" type="number" id="number" name="phoneNumber" 
              patientData={props.patientData.phone} />
              <RowInput htmlFor="ssn" description="Social Security number:" type="text" id="ssn" name="SocialSecurityNumber" patientData={props.patientData.ssn} />

              <div id="btnContainer">
                  <PopUpFormButtons id="submitBtn" description="Submit" isDisabled={true} />
                  <PopUpFormButtons id="changeBtn" description="Change" isDisabled={true} />
                  <PopUpFormButtons id="deleteBtn" description="Delete" isDisabled={true} />
              </div>
          </form>
      </div>
    </div>
  )
}

const Table = () => {
  const [currentWeekMonday, setCurrentWeekMonday] = useState('');
  const [currentSlot, setCurrentSlot] = useState(); // This variable will be used for tracking a last clicked slot by storing its date and time
  let [coordinates, setCoordinates] = useState({});
  let [patientData, setPatientData] = useState({});
  let newPatientData;
  let newSlotCoordinates;


  // The effect below finds the last monday's date for a current week
  useEffect(() => {
    const date = new Date(); // Getting today's date
    // Getting the days difference between today and the last monday
    const daysDifference = date.getDay() - 1;
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
  
    let lastMondayDay = day - daysDifference;
    let lastMondayString = `${year}, ${month}, ${lastMondayDay}`;

    setCurrentWeekMonday(lastMondayString);
  }, []); // While first rendering, there is set a last monday counting from a day we are opening the program

  // Event handlers changing monday dates for a next or a previous week
  function rightArrowHandler() {
    let nextWeekMonday = new Date(currentWeekMonday);
    nextWeekMonday.setDate(nextWeekMonday.getDate() + 7);
    setCurrentWeekMonday(nextWeekMonday);
  }

  function leftArrowHandler() {
    let nextWeekMonday = new Date(currentWeekMonday);
    nextWeekMonday.setDate(nextWeekMonday.getDate() - 7);
    setCurrentWeekMonday(nextWeekMonday);
  }

  // Event handler responsible for showing the pop up form and setting data of a possible patient
  function showForm(e) {
    document.getElementById('popUpBackground').style.display = 'flex';

    // If there slot is booked, we get patient's data and will pass it as props to PopUpForm in purpose of displaying it in inputs
    if (e.target.dataset.patient) {
      newPatientData = e.target.dataset.patient.split(",");
      newPatientData = {
        name: newPatientData[0],
        surname: newPatientData[1],
        phone: newPatientData[2],
        ssn: newPatientData[3],
      }
    } else {
      newPatientData = {
        name: '',
        surname: '',
        phone: '',
        ssn: '',
      }
    }
    setPatientData(newPatientData);

    newSlotCoordinates = e.target.dataset.coordinates.split(",");
    newSlotCoordinates = [
      newSlotCoordinates[0],
      newSlotCoordinates[1],
    ]
    setCoordinates(newSlotCoordinates);
    // console.log(newSlotCoordinates);
    // console.log('patientData', patientData);
    // console.log('coordinates', coordinates);
  }
  
  return (
    <body>
      <img src='./images/doctor-work.jpg' id='wallpaper' alt="wallpaper" />

      <h1 id="title">Doctor's schedule</h1>

      <img className="arrows" id="leftArrow" src="./images/arrowBtn.png" alt="leftArrow" onClick={leftArrowHandler} />
      <img className="arrows" id="rightArrow" src="./images/arrowBtn.png" alt="rightArrow" onClick={rightArrowHandler} />

      <table id="schedule">
            <FirstRowCreator lastMon={currentWeekMonday} />
            <CellsCreator lastMon={currentWeekMonday} showForm={showForm} />
      </table>
      <PopUpForm coordinates={coordinates} patientData={patientData} />
    </body>
  )
}

// ======================================== 

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Table />); // Table must be rendered below its declaring