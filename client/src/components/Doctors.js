import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

import './Doctors.css';

const API_ENDPOINT = "http://127.0.0.1:4002/";

export function Doctors() {
    const [patientsList, setPatientsList] = useState([]);
    const [determinant, setDeterminant] = useState();

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
        const sortedList = mergeSortSplitting(patientsList);
        setPatientsList(sortedList);   
    }, [determinant])

    function logPatientsList() {
        // return console.log(patientsList[0]['day']);
        // return console.log(patientsList[0][determinant]);
        // return console.log(patientsList);
        // return console.log(patientsList[3].surname > patientsList[4].surname);
        // return console.log(patientsList[8].surname + ` vs ` + patientsList[9].surname + patientsList[9].surname > patientsList[10].surname);
        // return console.log(patientsList[8].surname + ` < ` + patientsList[9].surname, patientsList[8].surname > patientsList[9].surname);
        // return console.log(mergeSortSplitting(patientsList));
        // return console.log([]);
    }

    // The function receives a date in format DD.MM.YYYY and returns as YYYY.MM.DD which can be easily compared with the greater-than sign
    function makeDateComparable(dateString) {
        let comparableString = dateString;
        if (dateString.length === 9) comparableString = '0' + dateString;
        comparableString = comparableString.split(".").reverse().join("");
        // console.log('foo3 ', comparableString);
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

        // console.log('foo2 ' + determinant);

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
                if (leftArr[0][determinant].toLowerCase() < rightArr[0][determinant].toLowerCase())  array.push(leftArr.shift())
                
                array.push(rightArr.shift())
            }
        } else if (determinant === 'ssn' || determinant === 'phone_number') {
            while(leftArr.length && rightArr.length) {
                if (Number(leftArr[0][determinant]) < Number(rightArr[0][determinant]))  array.push(leftArr.shift())

                array.push(rightArr.shift())
            }
        } else if (determinant === 'day') {
            while(leftArr.length && rightArr.length) {
                if (makeDateComparable(leftArr[0][determinant]) < makeDateComparable(rightArr[0][determinant])) {
                    array.push(leftArr.shift())
                } else if (makeDateComparable(leftArr[0][determinant]) > makeDateComparable(rightArr[0][determinant])) {
                    array.push(rightArr.shift())
                } else /* Visits with same dates are sorted secondly using time */ {
                    if (makeTimeComparable(leftArr[0]['time']) < makeTimeComparable(rightArr[0]['time'])) array.push(leftArr.shift())
                        
                    array.push(rightArr.shift())
                }
            }
        } else {
            while(leftArr.length && rightArr.length) {
                if (makeTimeComparable(leftArr[0][determinant]) < makeTimeComparable(rightArr[0][determinant])) {
                    array.push(leftArr.shift())
                } else if (makeTimeComparable(leftArr[0][determinant]) > makeTimeComparable(rightArr[0][determinant])) {
                    array.push(rightArr.shift())
                } else /* Visits with same time are sorted secondly using dates */ {
                    if (makeDateComparable(leftArr[0]['day']) < makeDateComparable(rightArr[0]['day'])) array.push(leftArr.shift())

                    array.push(rightArr.shift())
                }
            }
        }
 
        return array.concat(leftArr.slice()).concat(rightArr.slice());
    }

    function sortPatientsList(e) {
        console.log('foo1 ' + typeof e.target.dataset.determinant);
        setDeterminant(e.target.dataset.determinant)     
    }


    // displays list of patients
    function displayPatientsList(listForDisplaying) {
        let patientsTable = [];

        listForDisplaying.forEach(patientData => {
            let displayedRow = <tr>
                {/* <td></td> */}
                <td>{patientData.surname}</td>
                <td>{patientData.name}</td>
                <td className='phoneCell'>{patientData.phone_number}</td>
                <td className='ssnCell'>{patientData.ssn}</td>
                <td className='dateCell'>{patientData.day}</td>
                <td className='timeCell'>{patientData.time}</td>
            </tr>
            patientsTable = [...patientsTable, displayedRow];
        });

        return patientsTable;
    }

    return (
        <>
            <p onClick={logPatientsList}>Hejo</p>
            <div className='container'>
                <tr className='patientsListHeaders'>
                    {/* <th>Index</th> */}
                    <th data-determinant={'surname'} onClick={sortPatientsList}>Surname</th>    
                    <th data-determinant={'name'} onClick={sortPatientsList}>Name</th>
                    <th data-determinant={'phone_number'} onClick={sortPatientsList}>Phone number</th>
                    <th data-determinant={'ssn'} onClick={sortPatientsList}>Social Security Number</th>
                    <th data-determinant={'day'} onClick={sortPatientsList}>Date of visit</th>
                    <th data-determinant={'time'} onClick={sortPatientsList}>Time</th>
                </tr>
                {(!patientsList || patientsList === []) ? <p>there are no patients for this doctor</p> : displayPatientsList(patientsList)}
            </div>
        </>
    )
}