import React, { useState, useEffect } from 'react';

import { usSystem } from '../hoursArray';
import { styles } from './CellsCreator.styles';

const API_ENDPOINT = "/";

// The function takes the array with hours as the argument and creates as many rows as the length of array is
export function CellsCreator (props) {
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
    }, [props.lastMon, props.triggerRender]); // after skipping a week or invoking the post/change/delete function, the program will render new cells

    // Generating cells
    useEffect(() => {
      if (!backendData) return; // If there is still no data - won't do that
      let lastMonday = new Date(props.lastMon);
      let today = new Date();
      let currentTime = today.toLocaleTimeString();
      let weekDatesStrings = []; // Collects strings with dates for currently watched week
      let weekDates = []; // Collects dates as objects

      for (let i = 0; i < 6; i++) {
        let anotherDate = new Date(lastMonday); // By default, assigns current date and time. The value will be changed in the next line
        anotherDate.setDate(lastMonday.getDate() + i);
        weekDates.push(anotherDate);

        let anotherDateString = anotherDate.toLocaleDateString();
        weekDatesStrings.push(anotherDateString);
      }

      let allRows = [];
      // Every hour 'receives' one row
      usSystem.forEach(time => {
          let slotsInRow = [];
          let slotTime = new Date('July 1, 2001 ' + time).toLocaleTimeString(); // Putting random date here just in purpose of using Date object and extracting slot's time in 24h format

          // Creating 6 slots for one row
          for (let n = 0; n < 6; n++) {
            let isSlotBooked;
            let isOutOfDate = false;
            let slotInfo;
            // Each row from a database is compared to a current slot. If coordinates (time and date) are same - slot gets more dynamic data and is properly styled
            let patientData=null;

            Array.from(backendData).forEach((bookedSlot, index) => {
              if (weekDatesStrings[n] === bookedSlot.day && time === bookedSlot.time) {
                patientData=[bookedSlot.name, bookedSlot.surname, bookedSlot.phone_number, bookedSlot.ssn];

                return isSlotBooked = 1, slotInfo = bookedSlot, patientData;
              } 
            });

            // Checking if slots is from past day or today's date but past hours
            if (weekDates[n] < today || (weekDates[n].toLocaleDateString() === today.toLocaleDateString() && slotTime < currentTime)) isOutOfDate = true;

            slotsInRow.push(
              <td 
                key={'Day: ' + n + ' Time: ' + time} 
                className={ isOutOfDate ? 'slot oldCells' : 'slot cells'}
                onClick={props.showForm} 
                data-coordinates={[weekDatesStrings[n], time]}
                data-patient={patientData}
                style={ isSlotBooked && styles.bookedSlotRed} 
              >
                {isSlotBooked && slotInfo.surname}
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
      setRowsToDisplay(allRows);
    }, [backendData]); // Will be invoked only while changing 

    return (rowsToDisplay);
}