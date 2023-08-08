import React, { useState, useEffect } from 'react';
import { NavBar } from './NavBar';
import './Visits.css';

const API_ENDPOINT = "/";
// Local:
// const API_ENDPOINT = "http://localhost:4002/";

export function Visits() {
    const [patientsList, setPatientsList] = useState([]);
    const [doctorsList, setDoctorsList] = useState([]);
    const [renderDoctorsTrigger, setRenderDoctorsTrigger] = useState(0);
    const [currentDoctor, setCurrentDoctor] = useState();
    const [determinant, setDeterminant] = useState();
    const [toggleState, setToggleState] = useState(1);
    const [inputRow, setInputRow] = useState();
    const [optionsArr, setOptionsArr] = useState();
    const specializationsArr = [
        'Anesthesiologist',
        'Cardiologist',
        'Dermatologist',
        'Endocrinologist',
        'Family medicine',
        'Gastroenterologist',
        'Gynecologist',
        'Infectious disease',
        'Internal Medicine',
        'Neurologist',
        'Nephrologist',
        'Oncologist',
        'Ophthalmologist',
        'Otolaryngologist',
        'Pediatrician',
        'Physician executive',
        'Pulmonologist',
        'Psychiatrist',
        'Radiologist',
        'Surgeon',
        'Stomatologist'
    ];

    useEffect(() => {
        fetch(`${API_ENDPOINT}getting`, {
            method: 'GET'
        }).then(
            response => response.json()
        ).then(
            patientsData => setPatientsList(patientsData)
        )
    }, []);

    useEffect(() => {
        fetch(`${API_ENDPOINT}doctors`, {
            method: 'GET'
        }).then(
            response => response.json()
        ).then(
            doctorsData => setDoctorsList(doctorsData)
        )
    }, [renderDoctorsTrigger]);

    useEffect(() => {
        const sortedList = mergeSortSplitting(patientsList);
        setPatientsList(sortedList);   
    }, [determinant])

    useEffect(() => {
        let options = [];
        let option;
        specializationsArr.forEach((spec, index) => {
            option = <option key={'Option no.' + index} value={spec}>{spec}</option>
            options = [...options, option]
        })
        setOptionsArr(options);
    }, [])

    // The function receives a date in format DD.MM.YYYY and returns as YYYY.MM.DD which can be easily compared with the greater-than sign
    function makeDateComparable(dateString) {
        let comparableString = dateString;
        if (dateString.length === 9) comparableString = '0' + dateString;
        comparableString = comparableString.split(".").reverse().join("");

        return comparableString;
    }

    function makeTimeComparable(timeString) {
        if (timeString.length === 7) timeString = '0' + timeString;
        let [time, meridiem] = timeString.split(' ');
        let [hours, minutes] = time.split(':');

        if (meridiem === 'PM') hours = parseInt(hours, 10) + 12;
        
        return `${hours}:${minutes}`;
    }

    function mergeSortSplitting(arrayToSort) {
        if (arrayToSort.length <= 1) return arrayToSort;

        const middle = Math.floor(arrayToSort.length / 2);
        const arrayLeft = arrayToSort.slice(0, middle);
        const arrayRight = arrayToSort.slice(middle);

        return mergeSortComparing(mergeSortSplitting(arrayLeft), mergeSortSplitting(arrayRight)); // Recursion
    }

    function mergeSortComparing (leftArr, rightArr) {
        const array = [];

        if (determinant === 'name' || determinant === 'surname') {
            while(leftArr.length && rightArr.length) {
                if (leftArr[0][determinant].toLowerCase() < rightArr[0][determinant].toLowerCase()) {
                    array.push(leftArr.shift())
                } else {
                    array.push(rightArr.shift())
                }
            }
        } else if (determinant === 'ssn' || determinant === 'phone_number') {
            while(leftArr.length && rightArr.length) {
                if (Number(leftArr[0][determinant]) < Number(rightArr[0][determinant])) {
                    array.push(leftArr.shift())
                } else {
                    array.push(rightArr.shift())
                }
            }
        } else if (determinant === 'day') {
            while(leftArr.length && rightArr.length) {
                if (makeDateComparable(leftArr[0][determinant]) < makeDateComparable(rightArr[0][determinant])) {
                    array.push(leftArr.shift())
                } else if (makeDateComparable(leftArr[0][determinant]) > makeDateComparable(rightArr[0][determinant])) {
                    array.push(rightArr.shift())
                } else /* Visits with same dates are sorted secondly using time */ {
                    if (makeTimeComparable(leftArr[0]['time']) < makeTimeComparable(rightArr[0]['time'])) {
                        array.push(leftArr.shift())
                    } else {
                        array.push(rightArr.shift())
                    }
                }
            }
        } else {
            while(leftArr.length && rightArr.length) {
                if (makeTimeComparable(leftArr[0][determinant]) < makeTimeComparable(rightArr[0][determinant])) {
                    array.push(leftArr.shift())
                } else if (makeTimeComparable(leftArr[0][determinant]) > makeTimeComparable(rightArr[0][determinant])) {
                    array.push(rightArr.shift())
                } else /* Visits with same time are sorted secondly using dates */ {
                    if (makeDateComparable(leftArr[0]['day']) < makeDateComparable(rightArr[0]['day'])) {
                        array.push(leftArr.shift())
                    } else {
                        array.push(rightArr.shift())
                    }
                }
            }
        }
        return array.concat(leftArr.slice()).concat(rightArr.slice());
    }

    function sortPatientsList(e) {
        setDeterminant(e.target.dataset.determinant)     
    }

    // displays list of patients
    function displayPatientsList(listForDisplaying) {
        let patientsTable = [];
        let oddNumberRow = true;

        listForDisplaying.forEach((patientData, index) => {
            let displayedRow = <tr key={'Patient row ' + index} className={oddNumberRow ? 'oddRows' : 'evenRows'}>
                {/* <td></td> */}
                <td>{patientData.surname}</td>
                <td>{patientData.name}</td>
                <td className='phoneCell'>{patientData.phone_number}</td>
                <td className='ssnCell'>{patientData.ssn}</td>
                <td className='dateCell'>{patientData.day}</td>
                <td className='timeCell'>{patientData.time}</td>
            </tr>

            patientsTable = [...patientsTable, displayedRow];
            oddNumberRow = !oddNumberRow;
        });

        return patientsTable;
    }

    // displays list of doctors
    function displayDoctorsList(doctorsToDisplay) {
        let doctorsTable = [];
        let oddNumberRow = true;

        doctorsToDisplay.forEach((doctorsData, index) => {
            let displayedRow = <tr key={'Doctor row ' + index} className={oddNumberRow ? 'oddRows' : 'evenRows'}>
                <td>{doctorsData.surname}</td>
                <td>{doctorsData.name}</td>
                <td>{doctorsData.specialization}</td>
                <td className='lastCol'><img 
                    key={`Row no.: ${index}`}
                    src='./images/removeDoctor.png' 
                    data-row={index}
                    data-dbindex={doctorsData.id}
                    onClick={removeSpecialist}
                /></td>
            </tr>

            doctorsTable = [...doctorsTable, displayedRow];
            oddNumberRow = !oddNumberRow;
        });

        return doctorsTable;
    }

    // Switches between tables with visits and doctors depending on which button was clicked
    function switchTables (e) {
        if (e.target.className.includes('btnVisits')) {
            setToggleState(1)
        } else {
            setToggleState(2);
        }
    }

    function addSpecialist () {            
        let displayedRow = <>
            <tr id='inputRow'>
                <td><input className='inputs' placeholder='Surname' /></td>
                <td><input className='inputs' placeholder='Name' /></td>
                <td colSpan='2'>
                    <select className='inputs' name='Specialization'>
                        <option>Specialization</option>
                        {optionsArr}
                    </select>
                </td>
            </tr>
        </>

        setInputRow(displayedRow);
    }

    function removeInsertRow () {
        setInputRow()
    }

    function removeSpecialist (e) {

        // GOAL: put here blockade for case when doctor has booked visits for future
        
        let indexForRemove = e.target.dataset.row; // For removing row in Frontend
        let doctorToRemove = e.target.dataset.dbindex; // For removing row from db table
        
        let newArr = doctorsList.filter((doctor, index) => {
            return index !== Number(indexForRemove)
        });
        setDoctorsList(newArr);

        // Database
        // fetch(`${API_ENDPOINT}doctors/${doctorToRemove}`, {
        //     method: 'DELETE'
        // });
    }

    function addSpecialistFinish () {
        if (document.getElementsByClassName('inputs')[0].value === '' ||
            document.getElementsByClassName('inputs')[1].value === '' ||
            document.getElementsByClassName('inputs')[2].value === 'Specialization') return alert('Fill all inputs and choose specialization');

        let newDoctorObj = {
            surname: document.getElementsByClassName('inputs')[0].value,
            name: document.getElementsByClassName('inputs')[1].value,
            specialization: document.getElementsByClassName('inputs')[2].value
        };

        setInputRow(); // Removing the input row

        // Inserting into the database
        let postedData = Object.values(newDoctorObj);

        fetch(`${API_ENDPOINT}doctors`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(postedData)
        });

        // Triggers getting new doctors data and rendering it in the table
        setRenderDoctorsTrigger(!renderDoctorsTrigger);
    }

    return (
        <>
            <NavBar 
                btn1link={'/'} btn1desc={'Check schedule'} 
                btn2link={'/home'} btn2desc={'Home'} 
            />
            <div className='allContainer'>
                <img src='./images/cockpitTools.jpg' id='visitsWallpaper' />

                <div id='switcher'>
                    <p onClick={switchTables} className={toggleState === 1 ? 'btnVisits clicked' : 'btnVisits'}>Visits</p>
                    <p onClick={switchTables} className={toggleState === 2 ? 'btnDoctors clicked' : 'btnDoctors'}>Doctors</p>
                </div>

                <div id='patientsListTitle' style={toggleState === 2 ? {display: 'none'} : {display: 'flex'}}>
                    <img src='./images/doctor-icon.png' id='doctorIcon' />
                    <h3>Specialist: John Doe</h3>
                </div>

                {/* Patients list for a doctor */}
                <table id='listOfPatients' style={toggleState === 2 ? {display: 'none'} : {display: 'block'}}>
                    <tbody>
                        <tr id='patientsListHeaders'>
                            <th data-determinant={'surname'} onClick={sortPatientsList}>
                                Surname ⯆
                            </th>    
                            <th data-determinant={'name'} onClick={sortPatientsList}>
                                Name ⯆
                            </th>
                            <th data-determinant={'phone_number'} onClick={sortPatientsList}>
                                Phone ⯆
                            </th>
                            <th data-determinant={'ssn'} onClick={sortPatientsList}>
                                Social Security no. ⯆
                            </th>
                            <th data-determinant={'day'} onClick={sortPatientsList}>
                                Date of visit ⯆
                            </th>
                            <th data-determinant={'time'} onClick={sortPatientsList}>
                                Time ⯆
                            </th>
                        </tr>

                        {(!patientsList || patientsList === []) ? <p>There are no visits booked for this doctor</p> : displayPatientsList(patientsList)}
                    </tbody>
                </table>

                <div id='doctorsListTitle' style={toggleState === 1 ? {display: 'none'} : {display: 'flex'}}>
                    <img src='./images/plus.png' id='plusIcon' onClick={addSpecialist} />
                    <h3>Add a specialist</h3>
                </div>

                <div id='tableIconsContainer' style={toggleState === 1 ? {display: 'none'} : {display: 'flex'}}>
                    <img 
                            src='./images/tick.png' 
                            style={!inputRow ? {display: 'none'} : {display: 'block'}} 
                            onClick={addSpecialistFinish}
                    />
                    <table id='listOfDoctors'>
                        <tbody>
                            <tr id='doctorsListHeaders'>
                                <th>Surname</th>
                                <th>Name</th>
                                <th>Specialisation</th>
                                <th className='lastCol'></th>
                            </tr>

                            {inputRow && inputRow}

                            {(!doctorsList || doctorsList === []) ? <p>There are no doctors in the database</p> : displayDoctorsList(doctorsList)}
                        </tbody>
                    </table>
                    <img 
                            src='./images/cross.png' 
                            style={!inputRow ? {display: 'none'} : {display: 'block'}}
                            onClick={removeInsertRow}
                    />
                </div>
            </div>
        </>
    )
}