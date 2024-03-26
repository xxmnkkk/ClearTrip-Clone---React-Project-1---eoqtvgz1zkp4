import React, { useState, useContext, useEffect } from 'react';
import { RiArrowLeftRightLine, RiArrowDropUpLine, RiArrowDropDownLine } from 'react-icons/ri';
import { BsArrowRight } from 'react-icons/bs';
import DateSelector from './DateSelector';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from './App.js';
import LoginModal from './LoginModal.js';
import DesAndArr from './DesAndArr.js';
import PassangerFlight from './PassangerFlight.js';

// This is an array of abjects where im storing icons, text and other related fields for the trip option button.
const tripOption = [
    {
        icon1: <BsArrowRight className='main-icons' />,
        text: "One way",
        dropdown: <RiArrowDropDownLine className='main-icons' />,
        dropup: <RiArrowDropUpLine className='main-icons' />
    },
    {
        icon1: <RiArrowLeftRightLine className='main-icons' />,
        text: "Round trip",
        dropdown: <RiArrowDropDownLine className='main-icons' />,
        dropup: <RiArrowDropUpLine className='main-icons' />
    }
]


const FlightBookingSection = () => {
    // Here im importing all the state that i want to use inside of this component and also im defining additional stated like index and selectedtrip that will be used inside of this component.
    const { isActive, setIsActive, setIsActivePassanger, setIsLoggedIn, setLoginModal, loginModal, selectedFlightTrip, setSelectedFlightTrip, setFlightDepartureHiddenDiv, setFlightArrivalHiddenDiv, setShowDate, fareType, setFareType, setPaymentFailureDiv, setRoundFlightDetailsDiv } = useContext(AuthContext);
    const [index, setIndex] = useState(0);
    const [selectedTrip, setSelectedTrip] = useState("oneway");

    const navigate = useNavigate();

    // Here im setting some states to default value when the user navigates to the homepage and setting the selected flight trip to whatever is stored inside of the above state
    useEffect(() => {
        setSelectedFlightTrip(selectedTrip);
        setPaymentFailureDiv(false);
        setRoundFlightDetailsDiv(false);
    }, [selectedTrip, setPaymentFailureDiv, setRoundFlightDetailsDiv]);

    console.log("Selected Trip Option print 2: ", selectedFlightTrip);

    // This function basically toggles the hidden trip div and sets other active hidden divs to false
    const toggleHiddenTripDiv = () => {
        setIsActive(!isActive);
        setIsActivePassanger(false);
        console.log("active");

        setFlightDepartureHiddenDiv(false);
        setFlightArrivalHiddenDiv(false);
        setShowDate(false);
    }

    // This function handles the hidden trip option click which then gets reflected inside of the hidden trip div button
    const handleTripOptionClick = (e) => {
        const newIndex = parseInt(e.currentTarget.getAttribute('data-index'), 10);
        setSelectedTrip(e.target.textContent);
        setIndex(newIndex);
        setIsActive(false);
    }

    // This function sets whatever fare type ive selected
    const handleFareTypeClick = (fareType) => {
        setFareType(fareType);
    }

    const handleLoginSuccess = () => {
        setLoginModal(false);
        setIsLoggedIn(true);
    }

    if (loginModal) {
        return <LoginModal onClose={() => setLoginModal(false)} onLoginSuccess={handleLoginSuccess} />
    }

    return (
        // Basic code for the ui of flight booking section
        <main className='flight-booking-section'>
            <div className='anonymous-text'>
                <h1>Search Flights</h1>
                <p>Enjoy hassle free bookings with Cleartrip</p>
            </div>

            <div className='trip-passanger-button-div'>
                {/* Code for the hidden trip selection button which opens a dropdown when true */}
                <div className='trip-button-container'>
                    <div
                        className='trip-button'
                        onClick={toggleHiddenTripDiv}
                    >
                        {tripOption[index].icon1}
                        <span>{tripOption[index].text}</span>
                        {isActive ? tripOption[index].dropup : tripOption[index].dropdown}
                    </div>

                    {isActive && <div className='trip-hidden-div'>
                        <ul className='trip-option'>
                            {tripOption.map((option, index) => (
                                <li
                                    key={index}
                                    value={option.text}
                                    data-index={index}
                                    onClick={handleTripOptionClick}
                                >
                                    {tripOption[index].icon1}
                                    <span>{tripOption[index].text}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                    }
                </div>

                {/* Importing my passanger div component here */}
                <PassangerFlight />
            </div>

            {/* very basic code for fare selector*/}
            <div className='fare-type-div'>
                <div className='fare-type-container'>
                    <div
                        className={`fare-type-button ${fareType === 'Regular fare' ? 'selected-fare-type' : ''}`}
                        onClick={() => handleFareTypeClick('Regular fare')}
                    >
                        Regular fare
                    </div>
                </div>

                <div className='fare-type-container fare-type-container-student'>
                    <div
                        className={`fare-type-button ${fareType === 'Student fare' ? 'selected-fare-type' : ''}`}
                        onClick={() => handleFareTypeClick('Student fare')}
                    >
                        Student fare
                    </div>
                    <div className='fare-type-hidden-div'>
                        <p>Only students above the age of 12 with valid ID can avail this special fare and any additional baggage allowance.</p>
                    </div>
                </div>

                <div className='fare-type-container fare-type-container-senior-citizen'>
                    <div
                        className={`fare-type-button ${fareType === 'Senior citizen fare' ? 'selected-fare-type' : ''}`}
                        onClick={() => handleFareTypeClick('Senior citizen fare')}
                    >
                        Senior citizen fare
                    </div>
                    <div className='fare-type-hidden-div'>
                        <p>Only senior citizens above the age of 60 years can avail this special fare.</p>
                    </div>
                </div>

                <div className='fare-type-container fare-type-container-armed-forces'>
                    <div
                        className={`fare-type-button ${fareType === 'Armed forces fare' ? 'selected-fare-type' : ''}`}
                        onClick={() => handleFareTypeClick('Armed forces fare')}
                    >
                        Armed forces fare
                    </div>
                    <div className='fare-type-hidden-div'>
                        <p>Only serving/retired Indian armed forces personnel & their dependents can avail this fare.</p>
                    </div>
                </div>

            </div>

            {/* Importing my departure and arrival location selector here */}
            < DesAndArr />

            {/* Here im importing the date selector component and making a search flight button which navigates me to the list of flights page */}
            <div className='date-selector-and-search-div'>
                <DateSelector />
                <div className='search-flights-button' onClick={() => navigate('/flight')}>
                    <span>Search flights</span>
                </div>
            </div>
        </main>
    )
}

export default FlightBookingSection; 