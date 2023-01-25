import React, { useState, useEffect } from 'react';

// Creates the first row of table and fills it with dates
export function FirstRowCreator (props) {
    const [weekDay, setWeekDays] = useState(['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Sathurday', 'Sunday']);
    const [weekDates, setWeekDates] = useState(); // In the end it will be filled with a current batch of dates

    useEffect(() => {
        let lastMonday = new Date(props.lastMon);   
        let weekDaysElements = []; // Collects jsx/html elements for rendering  

        for (let i = 0; i < 6; i++) {   
            let anotherDate = new Date(lastMonday); // By default, assigns current date and time. The value will be changed in the next line
            anotherDate.setDate(lastMonday.getDate() + i);
            let anotherDateString = anotherDate.toLocaleDateString();

            weekDaysElements.push(<th key={'Day ' + i} scope="col" className="days cells">{weekDay[i]}<p className="dates">{anotherDateString}</p></th>);
        }   
        setWeekDates(weekDaysElements);
    }, [props.lastMon]);

    return (
        <tr>
        <th scope="col" className="days firstColumn">Hours</th>
        {weekDates}
        </tr>
    )
}