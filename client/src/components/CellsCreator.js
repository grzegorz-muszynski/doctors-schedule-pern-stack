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

    useEffect(() => {
      if (!backendData) return; // If there is still no data - won't do that
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
          
          for (let n = 0; n < 6; n++) {
            let differentStyling;
            let slotInfo;
            // Each row from a database is compared to a current slot. If coordinates (time and date) are same - slot gets more dynamic data and is properly styled
            let patientData=null;

            Array.from(backendData).forEach((bookedSlot, index) => {
              if (weekDatesArray[n] === bookedSlot.day && time === bookedSlot.time) {
                patientData=[bookedSlot.name, bookedSlot.surname, bookedSlot.phone_number, bookedSlot.ssn]

                return differentStyling = 1, slotInfo = bookedSlot, patientData;
              } 
            });
            slotsInRow.push(
              <td 
                key={'Day: ' + n + ' Time: ' + time} 
                className='slot cells' 
                onClick={props.showForm} 
                data-coordinates={[weekDatesArray[n], time]}
                data-patient={patientData}
                style={ differentStyling && styles.bookedSlotRed} 
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
      setRowsToDisplay(allRows);
    }, [backendData]); // Will be invoked only while changing backendData

    return (rowsToDisplay);
}