import React, { useContext, useState } from "react";
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { DateRange } from 'react-date-range';
import format from 'date-fns/format';
import { SlCalender } from 'react-icons/sl';
import { AuthContext } from "./App";

// This is my date selector component
const DateSelector = () => {
    // here ive defined a use state with start date and end date initial values
    const [date, setDate] = useState([
        {
            startDate: new Date(),
            endDate: new Date(),
            key: 'selection',
        },
    ]);

    // Here im importing all the state that i want to use inside of this component.
    const { showDate, setShowDate, setFlightDay, setFlightDayTwo, setCalenderDateDifference, setStartDate, setEndDate, setIsActive, setIsActivePassanger, setFlightDepartureHiddenDiv, setFlightArrivalHiddenDiv, setHiddenDiv, setHotelLocationHiddenDiv, setCheckoutStartDate, setCheckoutEndDate } = useContext(AuthContext);

    // Here im getting the basic date in required format and also getting the day as well
    const startDate = format(date[0].startDate, 'dd-MM-yyyy');
    const endDate = format(date[0].endDate, 'dd-MM-yyyy');
    const startDay = date[0].startDate.toLocaleString('en-US', { weekday: 'short' });
    const endDay = date[0].endDate.toLocaleString('en-US', { weekday: 'short' });

    // Here im getting the states value and storing them as strings
    const startISOString = date[0].startDate.toISOString();
    const endISOString = date[0].endDate.toISOString();

    // Here im calculating the time difference in days
    const startDateTimestamp = date[0].startDate.getTime();
    const endDateTimestamp = date[0].endDate.getTime();

    const timeDifferenceInMilliseconds = endDateTimestamp - startDateTimestamp;
    const timeDifferenceInSeconds = timeDifferenceInMilliseconds / 1000;
    const timeDifferenceInMinutes = timeDifferenceInSeconds / 60;
    const timeDifferenceInHours = timeDifferenceInMinutes / 60;
    const timeDifferenceInDays = timeDifferenceInHours / 24;

    // Here im setting the states respectively with the required values
    setFlightDay(startDay);
    setFlightDayTwo(endDay);
    setStartDate(startDate);
    setEndDate(endDate);
    setCalenderDateDifference(timeDifferenceInDays);
    setCheckoutStartDate(startISOString);
    setCheckoutEndDate(endISOString);
    console.log('Startdate : ', startDate)
    console.log('Enddate : ', endDate)

    // Here im handling the date click which shows the hidden date selector and also setting other hidden divs to false
    const handleDateClick = () => {
        setShowDate(!showDate);

        setIsActive(false);
        setIsActivePassanger(false);
        setFlightDepartureHiddenDiv(false);
        setFlightArrivalHiddenDiv(false);
        setHiddenDiv(false);
        setHotelLocationHiddenDiv(false);
    }

    return (
        <div className="date-container">
            <div className='date-div' onClick={handleDateClick} >
                <SlCalender />
                <div className='start-date'>
                    {startDate}
                </div>
                <div className='end-date'>
                    {endDate}
                </div>
            </div>

            {/* Here im imporiting the React DateRange selector*/}
            {showDate && <div>
                <DateRange
                    editableDateInputs={true}
                    onChange={(item) => {
                        setDate([item.selection]);
                    }}
                    moveRangeOnFirstSelection={false}
                    ranges={date}
                    minDate={new Date()}
                    className="rdrDateRangeWrapper"
                />
            </div>}
        </div>
    )
}

export default DateSelector;