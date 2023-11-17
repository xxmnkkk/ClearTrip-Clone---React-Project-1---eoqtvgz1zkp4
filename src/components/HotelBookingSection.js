import React, { useContext, useState } from "react";
import { CiLocationOn, CiUser } from 'react-icons/ci';
import DateSelector from "./DateSelector";
import { AiOutlinePlusCircle, AiOutlineMinusCircle } from 'react-icons/ai';
import { NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "./App";

function HotelBookingSection() {
    const [hotelLocation, setHotelLocation] = useState("");

    const { hiddenDiv, setHiddenDiv , hotelLocationHiddenDiv, setHotelLocationHiddenDiv , isLoggedIn, setLoginModal, updateHotelLocation , roomCount, setRoomCount , hotelAdultCount, setHotelAdultCount , hotelChildCount, setHotelChildCount , setShowDate} = useContext(AuthContext);
    const navigate = useNavigate();
    console.log(hotelLocationArray);

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

    const hotelLocationArray = ['Nagpur, Maharashtra', 'Jodhpur, Rajasthan', 'Amritsar, Punjab', 'Bhopal, Madhya Pradesh', 'Patna, Bihar', 'Kalyan-Dombivali, Maharashtra', 'Hyderabad, Telangana', 'Bangalore, Karnataka', 'Pimpri-Chinchwad, Maharashtra', 'Mumbai, Maharashtra', 'Pune, Maharashtra', 'Kanpur, Uttar Pradesh', 'Visakhapatnam, Andhra Pradesh', 'Nashik, Maharashtra', 'Srinagar, Jammu and Kashmir', 'Meerut, Uttar Pradesh', 'Coimbatore, Tamil Nadu', 'Vijayawada, Andhra Pradesh', 'Chennai, Tamil Nadu', 'Agra, Uttar Pradesh'];

    const handleGuests = () => {
        setHiddenDiv(!hiddenDiv);
        setHotelLocationHiddenDiv(false);
        setShowDate(false);
    }

    // const handelHotelInputChange = (e) => {
    //     const value = e.target.value;
    //     updateHotelLocation(value);
    // }

    const openHotelLocationDropdownModal = () => {
        setHotelLocationHiddenDiv(!hotelLocationHiddenDiv);
        setHiddenDiv(false);
        setShowDate(false);
    }

    const handleLocationClick = (location) => {
        setHotelLocation(location);
        setHotelLocationHiddenDiv(false);
        updateHotelLocation(location);
    }

    return (
        <div className="hotel-booking-section">
            <div className="hotel-text-content">
                <h1>Search Hotels</h1>
                <p>Enjoy hassle free bookings with Cleartrip</p>
            </div>
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
                        {/* <div className="hotel-location-text"></div> */}
                    </div>
                )}


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
            <div className="search-hotel-button-container">
                <div className='search-hotels-button' onClick={() => navigate('/hotel')}>
                    <span>Search hotels</span>
                </div>
            </div>
        </div>
    )
}

export default HotelBookingSection;