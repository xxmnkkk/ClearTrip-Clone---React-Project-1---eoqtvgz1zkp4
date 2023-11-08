import React, { useState, useContext } from 'react';
import { RiFlightTakeoffFill } from 'react-icons/ri';
import { RiArrowLeftRightLine, RiArrowDropUpLine, RiArrowDropDownLine } from 'react-icons/ri';
import { BsArrowRight } from 'react-icons/bs';
import { GrFormCheckmark } from 'react-icons/gr';
import { AiOutlineUser, AiOutlinePlusCircle, AiOutlineMinusCircle } from 'react-icons/ai';
import { GiAirplaneDeparture, GiAirplaneArrival } from 'react-icons/gi';
import DateSelector from './DateSelector';
import { NavLink, Navigate, useNavigate } from 'react-router-dom';
import { AuthContext } from './App.js';
import LoginModal from './LoginModal.js';

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
    const [isActive, setIsActive] = useState(false);
    const [isActivePassanger, setIsActivePassanger] = useState(false);
    const [index, setIndex] = useState(0);
    const [selectedTrip, setSelectedTrip] = useState("oneway");
    const [selectedOption, setSelectedOption] = useState("oneway");
    const [adultCount, setAdultCount] = useState(2);
    const [childCount, setChildCount] = useState(0);
    const [infantCount, setInfantCount] = useState(0);
    const [flightClass, setFlightClass] = useState('Economy');
    const [fareType, setFareType] = useState('Regular fare');

    const { isLoggedIn, setIsLoggedIn, setLoginModal, loginModal, departure, arrival, updateDeparture, updateArrival } = useContext(AuthContext);

    const toggleHiddenTripDiv = () => {
        setIsActive(!isActive);
        setIsActivePassanger(false);
        console.log("active")
    }

    const handleTripOptionClick = (e) => {
        const newIndex = parseInt(e.currentTarget.getAttribute('data-index'), 10);
        setSelectedTrip(e.target.value);
        setIndex(newIndex);
        setIsActive(false);
    }

    const toggleHiddenPassangerDiv = (e) => {
        setIsActivePassanger(!isActivePassanger);
        setIsActive(false);
    }

    const updateCount = (type, action) => {
        if (action === 'increment') {
            if (type === 'adult') {
                setAdultCount(adultCount + 1);
            } else if (type === 'child') {
                setChildCount(childCount + 1);
            } else if (type === 'infant') {
                setInfantCount(infantCount + 1);
            }
        } else if (action === 'decrement') {
            if (type === 'adult' && adultCount > 0) {
                setAdultCount(adultCount - 1);
            } else if (type === 'child' && childCount > 0) {
                setChildCount(childCount - 1);
            } else if (type === 'infant' && infantCount > 0) {
                setInfantCount(infantCount - 1);
            }
        }
    };

    const handleFareTypeClick = (fareType) => {
        setFareType(fareType);
    }

    const navigate = useNavigate();

    const handleLoginSuccess = () => {
        setLoginModal(false);
        setIsLoggedIn(true);
    }

    const handleDepartureInputChange = (e) => {
        const value = e.target.value;
        updateDeparture(value);
    };

    const handleArrivalInputChange = (e) => {
        const value = e.target.value;
        updateArrival(value);
    };

    if (loginModal) {
        return <LoginModal onClose={() => setLoginModal(false)} onLoginSuccess={handleLoginSuccess} />
    }

    return (
        <main className='flight-booking-section'>
            <div className='anonymous-text'>
                <h1>Search Flights</h1>
                <p>Enjoy hassle free bookings with Cleartrip</p>
            </div>

            <div className='trip-passanger-button-div'>
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
                    </div>}
                </div>

                <div className='passanger-button-container'>
                    <div className='passenger-button' onClick={toggleHiddenPassangerDiv}>
                        <AiOutlineUser />
                        {`${adultCount > 0 ? `${adultCount} ${adultCount === 1 ? 'Adult, ' : 'Adults, '}` : ''}`}
                        {`${childCount > 0 ? `${childCount} ${childCount === 1 ? 'Child, ' : 'Children, '}` : ''}`}
                        {`${infantCount > 0 ? `${infantCount} ${infantCount === 1 ? 'Infant, ' : 'Infants, '}` : ''}`}
                        {flightClass}
                        {isActivePassanger ? tripOption[index].dropup : tripOption[index].dropdown}
                    </div>

                    {isActivePassanger && <div className='passanger-hidden-div'>
                        <div className='passanger-div-section'>
                            <div className='passanger-text-content'>
                                <span><strong>Adults</strong></span>
                                <span style={{ color: "#808080" }}>(12+ years)</span>
                            </div>
                            <div className='passanger-inc-dec-button'>
                                <AiOutlineMinusCircle className='main-icons' onClick={() => updateCount('adult', 'decrement')} />
                                {adultCount}
                                <AiOutlinePlusCircle className='main-icons' onClick={() => updateCount('adult', 'increment')} />
                            </div>
                        </div>
                        <div className='passanger-div-section'>
                            <div className='passanger-text-content'>
                                <span><strong>Children</strong></span>
                                <span style={{ color: "#808080" }}>(2 - 12 yrs)</span>
                            </div>
                            <div className='passanger-inc-dec-button'>
                                <AiOutlineMinusCircle className='main-icons' onClick={() => updateCount('child', 'decrement')} />
                                {childCount}
                                <AiOutlinePlusCircle className='main-icons' onClick={() => updateCount('child', 'increment')} />
                            </div>
                        </div>
                        <div className='passanger-div-section'>
                            <div className='passanger-text-content'>
                                <span><strong>Infants</strong></span>
                                <span style={{ color: "#808080" }}>(Below 2 yrs)</span>
                            </div>
                            <div className='passanger-inc-dec-button'>
                                <AiOutlineMinusCircle className='main-icons' onClick={() => updateCount('infant', 'decrement')} />
                                {infantCount}
                                <AiOutlinePlusCircle className='main-icons' onClick={() => updateCount('infant', 'increment')} />
                            </div>
                        </div>
                        <div className='passanger-div-section'>
                            <div
                                className={`class-buttons ${flightClass === 'Economy' ? 'selected-flight-class-button' : ''}`}
                                onClick={() => setFlightClass("Economy")}
                            >
                                Economy
                            </div>
                            <div
                                className={`class-buttons ${flightClass === 'Business class' ? 'selected-flight-class-button' : ''}`} onClick={() => setFlightClass("Business class")}
                            >
                                Business class
                            </div>
                            <div
                                className={`class-buttons ${flightClass === 'First class' ? 'selected-flight-class-button' : ''}`} onClick={() => setFlightClass("First class")}
                            >
                                First class
                            </div>
                            <div
                                className={`class-buttons ${flightClass === 'Premium economy' ? 'selected-flight-class-button' : ''}`} onClick={() => setFlightClass("Premium economy")}
                            >
                                Premium economy
                            </div>
                        </div>
                    </div>}
                </div>
            </div>

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

            <div className='flight-des-arr-div'>
                <div className='dep-arr departure'>
                    <GiAirplaneDeparture className='dep-arr-icon' />
                    <input
                        placeholder='Where from?'
                        onChange={handleDepartureInputChange}
                        value={departure}
                    />
                </div>
                <div className='svg-container'>
                    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" class="c-pointer"><rect width="32" height="32" rx="16" fill="white"></rect><g clip-path="url(#clip0_160_1650)"><path d="M24.1666 14.8333H7.83325" stroke="#3366CC" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"></path><path d="M7.83325 14.8333L13.6666 9" stroke="#3366CC" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"></path><path d="M7.83342 18.3335H24.1667" stroke="#3366CC" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"></path><path d="M24.1667 18.3334L18.3334 24.1667" stroke="#3366CC" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"></path><circle cx="16" cy="16" r="13.375" stroke="#3366CC" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"></circle></g><defs><clipPath id="clip0_160_1650"><rect width="28" height="28" fill="white" transform="translate(2 2)"></rect></clipPath></defs></svg>
                </div>
                <div className='dep-arr arrival'>
                    <GiAirplaneArrival className='dep-arr-icon arr-icon' />
                    <input placeholder='Where to?'
                        onChange={handleArrivalInputChange}
                        value={arrival}
                    />
                </div>
            </div>

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