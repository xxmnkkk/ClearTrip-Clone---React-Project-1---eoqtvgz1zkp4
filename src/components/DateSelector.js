import React, { useState } from "react";
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { DateRange } from 'react-date-range';
import format from 'date-fns/format';
import { SlCalender } from 'react-icons/sl';

const DateSelector = () => {
    const [showDate, setShowDate] = useState(false);
    const [date, setDate] = useState([
        {
            startDate: new Date(),
            endDate: new Date(),
            key: 'selection',
        },
    ]);

    const startDate = format(date[0].startDate, 'dd-MM-yyyy');
    const endDate = format(date[0].endDate, 'dd-MM-yyyy');
    console.log(date.startDate);

    const handleDateClick = () => {
        setShowDate(!showDate);
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
                    onChange={item => setDate([item.selection])}
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