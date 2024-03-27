import React, { useContext, useState , useEffect} from "react";
import { CiLocationOn, CiUser } from 'react-icons/ci';
import DateSelector from "./DateSelector";
import { AiOutlinePlusCircle, AiOutlineMinusCircle } from 'react-icons/ai';
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./App";

// An array with hotel names
const hotelLocationArray = ['Nagpur, Maharashtra', 'Jodhpur, Rajasthan', 'Amritsar, Punjab', 'Bhopal, Madhya Pradesh', 'Patna, Bihar', 'Kalyan-Dombivali, Maharashtra', 'Hyderabad, Telangana', 'Bangalore, Karnataka', 'Pimpri-Chinchwad, Maharashtra', 'Mumbai, Maharashtra', 'Pune, Maharashtra', 'Kanpur, Uttar Pradesh', 'Visakhapatnam, Andhra Pradesh', 'Nashik, Maharashtra', 'Srinagar, Jammu and Kashmir', 'Meerut, Uttar Pradesh', 'Coimbatore, Tamil Nadu', 'Vijayawada, Andhra Pradesh', 'Chennai, Tamil Nadu', 'Agra, Uttar Pradesh'];

function HotelBookingSection() {
    // Here im importing my states and also defining local state
    const [hotelLocation, setHotelLocation] = useState("");
    const { hiddenDiv, setHiddenDiv, hotelLocationHiddenDiv, setHotelLocationHiddenDiv, updateHotelLocation, roomCount, setRoomCount, hotelAdultCount, setHotelAdultCount, hotelChildCount, setHotelChildCount, setShowDate , setAdultCount , setChildCount , setInfantCount} = useContext(AuthContext);

    const navigate = useNavigate();

    useEffect(() => {
        setAdultCount(0)
        setChildCount(0)
        setInfantCount(0)
    }, [])

    console.log(hotelLocationArray);

    // This function basically updates the count of adult, child and room.
    const updateCount = (type, action) => {
        if (action === 'increment') {
            if (type === 'adult') {
                setHotelAdultCount(hotelAdultCount + 1);
            } else if (type === 'child') {
                setHotelChildCount(hotelChildCount + 1);
            } else if (type === 'room') {
                setRoomCount(roomCount + 1);
            }
        } else if (action === 'decrement') {
            if (type === 'adult' && hotelAdultCount > 0) {
                setHotelAdultCount(hotelAdultCount - 1);
            } else if (type === 'child' && hotelChildCount > 0) {
                setHotelChildCount(hotelChildCount - 1);
            } else if (type === 'room' && roomCount > 0) {
                setRoomCount(roomCount - 1);
            }
        }
    };

    // This function handles the click for guest counts and room counts selector
    const handleGuests = () => {
        setHiddenDiv(!hiddenDiv);
        setHotelLocationHiddenDiv(false);
        setShowDate(false);
    }

    // This function handles the click for location dropdown selector
    const openHotelLocationDropdownModal = () => {
        setHotelLocationHiddenDiv(!hotelLocationHiddenDiv);
        setHiddenDiv(false);
        setShowDate(false);
    }

    // This function basically updates whatver location is selected inside of the button
    const handleLocationClick = (location) => {
        setHotelLocation(location);
        setHotelLocationHiddenDiv(false);
        updateHotelLocation(location);
    }

    return (
        // Some basic code for the ui of hotel booking section ui
        <div className="hotel-booking-section">
            <div className="hotel-text-content">
                <h1>Search Hotels</h1>
                <p>Enjoy hassle free bookings with Cleartrip</p>
            </div>

            {/* Here im creating a location selector button which opens a hidden loacation selector div */}
            <div className="hotel-booking-sub-section">
                <div className="hotel-name">
                    <CiLocationOn className="hotel-location-icon" />
                    <input
                        onClick={openHotelLocationDropdownModal}
                        type="text"
                        placeholder="Enter locality, landmark, city or hotel"
                        value={hotelLocation}
                    />
                </div>

                {hotelLocationHiddenDiv && (
                    <div className="hotel-location-hidden-div-container">
                        {hotelLocationArray.map((location, index) => (
                            <div
                                key={index}
                                className="hotel-location-text"
                                onClick={() => handleLocationClick(location)}
                            >
                                {location}
                            </div>
                        ))}
                    </div>
                )}

                {/* Code for guest and room count selector button */}
                <div className="hotel-date-room-section">
                    <DateSelector />
                    <div className="hotel-guest-section">
                        <div className="hotel-guest" onClick={handleGuests}>
                            <CiUser className="usericon" />
                            <div>
                                {`${roomCount > 0 ? `${roomCount} ${roomCount === 1 ? 'Room ' : 'Rooms '}` : ''}`}
                                {`${hotelAdultCount > 0 ? `,${hotelAdultCount} ${hotelAdultCount === 1 ? 'Adult ' : 'Adults '}` : ''}`}
                                {`${hotelChildCount > 0 ? `,${hotelChildCount} ${hotelChildCount === 1 ? 'Child' : 'Children'}` : ''}`}
                            </div>
                        </div>

                        {hiddenDiv && <div className='hotel-hidden-div'>
                            <div className='hotel-div-section'>
                                <div className='hotel-hidden-div-text-section'>
                                    <span><strong>Rooms</strong></span>
                                </div>
                                <div className='hotel-inc-dec-button'>
                                    <AiOutlineMinusCircle className='main-icons' onClick={() => updateCount('room', 'decrement')} />
                                    {roomCount}
                                    <AiOutlinePlusCircle className='main-icons' onClick={() => updateCount('room', 'increment')} />
                                </div>
                            </div>
                            <div className='hotel-div-section'>
                                <div className='hotel-hidden-div-text-section'>
                                    <span><strong>Adults</strong></span>
                                </div>
                                <div className='hotel-inc-dec-button'>
                                    <AiOutlineMinusCircle className='main-icons' onClick={() => updateCount('adult', 'decrement')} />
                                    {hotelAdultCount}
                                    <AiOutlinePlusCircle className='main-icons' onClick={() => updateCount('adult', 'increment')} />
                                </div>
                            </div>
                            <div className='hotel-div-section'>
                                <div className='hotel-hidden-div-text-section'>
                                    <span><strong>Children</strong></span>
                                </div>
                                <div className='hotel-inc-dec-button'>
                                    <AiOutlineMinusCircle className='main-icons' onClick={() => updateCount('child', 'decrement')} />
                                    {hotelChildCount}
                                    <AiOutlinePlusCircle className='main-icons' onClick={() => updateCount('child', 'increment')} />
                                </div>
                            </div>
                        </div>
                        }

                    </div>
                </div>
            </div>

            {/* A simple hotel search button which navigated us to a page with hotel list */}
            <div className="search-hotel-button-container">
                <div className='search-hotels-button' onClick={() => navigate('/hotel')}>
                    <span>Search hotels</span>
                </div>
            </div>
        </div>
    )
}

export default HotelBookingSection;