import React, { useState, useEffect } from 'react';

import { FirstRowCreator } from './FirstRowCreator';
import { CellsCreator } from './CellsCreator';
import { PopUpForm } from './PopUpForm';

const API_ENDPOINT = "/";

export const Table = () => {
    const [currentWeekMonday, setCurrentWeekMonday] = useState('');
    let [coordinates, setCoordinates] = useState({});
    let [patientData, setPatientData] = useState({});
    let [triggerRender, setTriggerRender]= useState(false);
    let newSlotCoordinates;

    // The effect below finds the last monday's date for a current week
    useEffect(() => {
        const date = new Date(); // Getting today's date
        const mondayDate = new Date();
        const daysDifference = date.getDay() - 1; // Getting days difference between today and the last monday
        mondayDate.setDate(date.getDate() - daysDifference); // Setting monday's date

        setCurrentWeekMonday(mondayDate);
    }, []); // While first rendering, there is set a last monday counting from a day we are opening the program

    // Event handlers changing monday dates for a next week... 
    function rightArrowHandler() {
        // let nextWeekMonday = currentWeekMonday;
        let nextWeekMonday = new Date(currentWeekMonday);
        nextWeekMonday.setDate(nextWeekMonday.getDate() + 7);
        setCurrentWeekMonday(nextWeekMonday);
    }
    // ...and the previous one
    function leftArrowHandler() {
        let nextWeekMonday = new Date(currentWeekMonday);
        nextWeekMonday.setDate(nextWeekMonday.getDate() - 7);
        setCurrentWeekMonday(nextWeekMonday);
    }

    // Event handler responsible for showing the pop up form and setting data of a possible patient
    function showForm(e) {
        let newPatientData;

        // If the slot is booked, we get patient's data and will pass it as props to PopUpForm in purpose of displaying it in inputs
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

        // A small delay below, because the previous data was visible for a split second making unpleasant flash
        setTimeout(function() {
        document.getElementById('popUpBackground').style.display = 'flex';
        }, 100)
    }

    // Closing the pop up form. Called as event handler for 'x' button, also invoked after clicking any submit type button 
    const closeForm = () => {
        document.getElementById('popUpBackground').style.display = 'none';
    }

    // Posting data by POST
    const submitHandler = async () => {
        let popUpForm = document.getElementById('popUpForm');
        let allInputs =  await new FormData(popUpForm);
        let inputsArray = [];
        // .entries iterates through the object and returns short arrays (each consists of a form name and value of an input - below are extracted only values)
        for (let pair of allInputs.entries()) {
            inputsArray.push(pair[1]);
        }
        let postedData = inputsArray.concat(coordinates);


        console.log(postedData);



        // const response = await fetch(`${API_ENDPOINT}posting`, {
        // method: 'POST',
        // headers: {
        //     'Content-Type': 'application/json'
        // },
        // body: JSON.stringify(postedData)
        // });

        fetch(`${API_ENDPOINT}posting`, {
            method: 'POST'
          }).then(
            response => response.json()
          ).then(
            data => {
              console.log(data);
            }
          )
    }
    const changeHandler = async () => {
        let popUpForm = document.getElementById('popUpForm');
        let allInputs =  await new FormData(popUpForm);
        let inputsArray = [];

        for (let pair of allInputs.entries()) {
            inputsArray.push(pair[1]);
        }
        let newData = inputsArray.concat(coordinates);

        const response = await fetch(`${API_ENDPOINT}change`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newData)
        });
        }

        const deleteHandler = async () => {
        let dateId = coordinates[0];
        let timeId = coordinates[1];

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

        let clickedBtn = document.activeElement.id;

        if (clickedBtn ==="submitBtn") {
            submitHandler();
            setPatientData({}); // When sb chooses a slot for booking, patientData for all inputs is equal to empty string. When we type in inputs, modified is inputValue in RowInput component's state so patientData is still the same. This leads to bug when after submit, and choosing an empty slot we still see a data submitted before. To avoid this, after each submitHandler(), the patiendData is changed to trigger useEffect in RowInput
        } else if (clickedBtn ==="changeBtn") {
            changeHandler();
        } else {
            deleteHandler();
        }
        closeForm();
        setTriggerRender(!triggerRender); // When the variable changes after each CRUD action, it triggers rerendering cells in CellsCreator
    }

    return (
    <body>
        <img src='./images/doctor-work.jpg' id='wallpaper' alt="wallpaper" />
        
        <h1 id="title">Doctor's schedule</h1>

        <img className="arrows" id="leftArrow" src="./images/arrowBtn.png" alt="leftArrow" onClick={leftArrowHandler} />
        <img className="arrows" id="rightArrow" src="./images/arrowBtn.png" alt="rightArrow" onClick={rightArrowHandler} />

        <table id="schedule">
            <FirstRowCreator lastMon={currentWeekMonday} />
            <CellsCreator lastMon={currentWeekMonday} showForm={showForm} triggerRender={triggerRender} />
        </table>
        <PopUpForm coordinates={coordinates} patientData={patientData} submitting={submitting} closeForm={closeForm} />
    </body>
    )
}