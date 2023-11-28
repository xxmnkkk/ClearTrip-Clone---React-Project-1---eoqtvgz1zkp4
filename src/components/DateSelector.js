import React, { useContext, useEffect, useState } from "react";
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { DateRange } from 'react-date-range';
import format from 'date-fns/format';
import { SlCalender } from 'react-icons/sl';
import { AuthContext } from "./App";

const DateSelector = () => {
    const [date, setDate] = useState([
        {
            startDate: new Date(),
            endDate: new Date(),
            key: 'selection',
        },
    ]);

    const { showDate, setShowDate, flightDay, setFlightDay, flightDayTwo, setFlightDayTwo, setCalenderDateDifference, setStartDate, setEndDate, setIsActive, setIsActivePassanger, setFlightDepartureHiddenDiv, setFlightArrivalHiddenDiv, setHiddenDiv, setHotelLocationHiddenDiv, checkoutStartDate, setCheckoutStartDate, checkoutEndDate, setCheckoutEndDate } = useContext(AuthContext);

    const startDate = format(date[0].startDate, 'dd-MM-yyyy');
    const endDate = format(date[0].endDate, 'dd-MM-yyyy');
    const startDay = date[0].startDate.toLocaleString('en-US', { weekday: 'short' });
    const endDay = date[0].endDate.toLocaleString('en-US', { weekday: 'short' });

    const startDateTimestamp = date[0].startDate.getTime();
    const endDateTimestamp = date[0].endDate.getTime();

    const startISOString = date[0].startDate.toISOString();
    const endISOString = date[0].endDate.toISOString();

    const timeDifferenceInMilliseconds = endDateTimestamp - startDateTimestamp;
    const timeDifferenceInSeconds = timeDifferenceInMilliseconds / 1000;
    const timeDifferenceInMinutes = timeDifferenceInSeconds / 60;
    const timeDifferenceInHours = timeDifferenceInMinutes / 60;
    const timeDifferenceInDays = timeDifferenceInHours / 24;

    setFlightDay(startDay);
    setFlightDayTwo(endDay);
    setStartDate(startDate);
    setEndDate(endDate);
    setCalenderDateDifference(timeDifferenceInDays);
    setCheckoutStartDate(startISOString);
    setCheckoutEndDate(endISOString);
    console.log('Startdate : ', startDate)
    console.log('Enddate : ', endDate)

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