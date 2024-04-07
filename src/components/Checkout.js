import React, { useContext, useState } from "react";
import { AuthContext } from "./App";
import { TbCircleNumber1, TbCircleNumber2, TbCircleNumber3, TbCircleNumber4 } from "react-icons/tb";
import { MdOutlineMeetingRoom, MdLuggage, MdFreeCancellation, MdOutlineAirlineSeatReclineExtra } from "react-icons/md";
import { LiaBedSolid } from "react-icons/lia";
import { IoPricetagsOutline, IoBagHandleOutline, IoFastFoodOutline } from "react-icons/io5";
import { FaArrowRightLong, FaChevronRight } from "react-icons/fa6";
import { IoEllipsisVerticalOutline } from "react-icons/io5";
import { GrLocationPin } from "react-icons/gr";
import { useNavigate } from "react-router-dom";
import { RiFlightLandLine, RiFlightTakeoffFill } from "react-icons/ri";
import { SlCalender } from "react-icons/sl";
import { GiReturnArrow } from "react-icons/gi";

export default function Checkout() {
    // Here im importing states that i want to use inside of this component
    const { selectedRoom, selectedHotelData, selectedFlightData, roomCount, calenderDateDifference, startDate, endDate, flightDay, flightDayTwo, flightClass, adultCount, childCount, infantCount, hotelAdultCount, hotelChildCount, fareType, setRoundFlightDetailsDiv } = useContext(AuthContext);

    // If the user clicks the book button from the round flight modal then im just setting that off here
    setRoundFlightDetailsDiv(false);

    // This function sets default values for gender, firstName, and lastName.
    const getEmptyPassenger = () => {
        return {
            gender: "Mr.",
            firstName: "",
            lastName: ""
        };
    };

    // Here im creating two states where im creating array of respective size and filling them with dafault values using the above function
    const [hotelPassengerDetails, setHotelPassengerDetails] = useState(Array(hotelAdultCount).fill(getEmptyPassenger()));
    const [flightPassengerDetails, setFlightPassengerDetails] = useState(Array(adultCount).fill(getEmptyPassenger()));

    // Here im creating states for managing some other user inputs
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [termsChecked, setTermsChecked] = useState(false);

    // function containsOnlyNumbers(str) {
    //     return /^\d+$/.test(str);
    // }

    const [phoneNoError, setPhoneNoError] = useState();
    const [emailError, setEmailError] = useState();
    const [error, setError] = useState("");

    // if (!containsOnlyNumbers(phone)) {
    //     setPhoneNoError("Please enter a valid phone number")
    //     setError("Please enter a valid phone number")
    // }

    // Here ive created a state to store the error message while proceeding
    const [cancellationDiv, setCancellationDiv] = useState(false);

    const navigate = useNavigate();

    const validatePhone = (phone) => {
        if (!/^\d+$/.test(phone)) {
            setPhoneNoError("Please enter a valid phone number");
            return false;
        }
        setPhoneNoError(null); // Clear the error if phone number is valid
        return true;
    };

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setEmailError("Please enter a valid email address");
            return false;
        }
        setEmailError(null); // Clear the error if email is valid
        return true;
    };
    
    
    const handleContinue = () => {
        const isValidPhone = validatePhone(phone);
        const isValidEmail = validateEmail(email);
    
        const isValid = validateForm();
        if (!isValid) {
            setError("Please fill in all required fields and accept the terms and conditions.");
        } 
        else if (!isValidPhone) {
            setError("Please enter a valid phone number");
            setPhone("")
        }
        else  if (!isValidEmail) {
            setError("Please enter a valid email address");
            setEmail("")
        }
        else {
            navigate('/payment');
        }
    };

    // This function is called on the click of the continue button
    // const handleContinue = () => {
    //     // Here im calling the validateForm function and storing the response inside of the isValid
    //     const isValid = validateForm();

    //     // And then im conditionally applying the logic for setting the error and navigating the user to the payment page
    //     // if (!isValid) {
    //     //     setError("Please fill in all required fields and accept the terms and conditions.");
    //     // }
    //     // else if (phoneNoError) {
    //     //     setError(phoneNoError);
    //     // }
    //     // else {
    //     //     navigate('/payment');
    //     // }

    //     if(phoneNoError){
    //         setError(phoneNoError);
    //     }
    //     else if(!isValid){
    //         setError("Please fill in all required fields and accept the terms and conditions.");
    //     }
    //     else {
    //         navigate('/payment');
    //     }
    // };

    // This function checks if there is any empty input fields
    const hasEmptyField = (passenger) => {
        // Here im excluding the gender selection field
        const fieldsToExclude = ['gender'];

        // Here im checking for all the keys if any of them have empty value
        return Object.keys(passenger).some(
            // Im checking if it does not include fieldsToExclude and if there is any empty value 
            (field) => !fieldsToExclude.includes(field) && passenger[field].trim() === ""
        );
    };

    // This function checks for if there is any input empty and returns boolean values
    const validateForm = () => {
        if (
            hotelPassengerDetails.some(hasEmptyField) ||
            flightPassengerDetails.some(hasEmptyField) ||
            phone.trim() === "" ||
            email.trim() === "" ||
            !termsChecked
        ) {
            // If false it proceeds to the handleContinue function and sets the error and the message is displayed on the screen
            return false;
        }

        return true;
    };

    // This function handles updating the hotel passanger details
    const updateHotelPassengerDetails = (index, field, value) => {
        setHotelPassengerDetails((prevDetails) => {
            // im making the copy of previous details so that the original array is not modified
            const updatedDetails = [...prevDetails];
            // Here im updating the details at a specific index that is passed as a parameter
            updatedDetails[index] = {
                ...updatedDetails[index],
                [field]: value,
            };
            return updatedDetails;
        });
    };

    // This function handles updating the flight passanger details
    const updateFlightPassengerDetails = (index, field, value) => {
        setFlightPassengerDetails((prevDetails) => {
            // im making the copy of previous details so that the original array is not modified
            const updatedDetails = [...prevDetails];
            // Here im updating the details at a specific index that is passed as a parameter
            updatedDetails[index] = {
                ...updatedDetails[index],
                [field]: value,
            };
            return updatedDetails;
        });
    };

    return (
        <div className="checkout-container">
            <div className="review-your-itinerary">
                {/* This section of code is for reviewing the itinerary */}
                <h1><TbCircleNumber1 /> Review your itinerary</h1>

                {/* Here im checking if the data is present and just mapping it out */}
                {selectedHotelData && selectedRoom && selectedRoom.costDetails && (
                    <>
                        <div className="checkout-hotel-card">
                            <div className="checkout-hotel-info-container">
                                <div className="checkout-hotel-image">
                                    <img src={selectedHotelData.images[0]} />
                                </div>
                                <div className="checkout-hotel-name">
                                    {selectedHotelData.name}
                                </div>
                                <div className="checkout-hotel-location-and-rating">
                                    <span>{selectedHotelData.location} </span>
                                    <span>{selectedHotelData.rating} / 5 rating</span>
                                </div>
                            </div>

                            <div className="checkout-hotel-price">
                                <div className="checkout-price-text">
                                    <MdOutlineMeetingRoom /> {selectedRoom.roomType} room
                                </div>
                                <div className="checkout-price-text">
                                    <LiaBedSolid /> {selectedRoom.bedDetail}
                                </div>
                                <div className="checkout-price-text">
                                    <IoPricetagsOutline /> {selectedRoom.costDetails?.baseCost} rupees per night / room (without taxes and fees)
                                </div>

                                {/* Here ive calculated the total price based on this logic */}
                                <div className="checkout-final-price-text">
                                    Total Price: {(selectedRoom.costDetails?.baseCost + selectedRoom.costDetails?.taxesAndFees - selectedRoom.costDetails?.discount) * roomCount * (calenderDateDifference === 0 ? 1 : calenderDateDifference)} rupees
                                </div>
                            </div>
                        </div>
                    </>
                )}

                <div className="checkout-flight-break">
                    {/* Here im checking if the data is present and just mapping it out */}
                    {selectedFlightData && selectedFlightData.length === 1 &&
                        <>
                            <div className="checkout-flight-card">
                                <div className="checkout-flight-srcdes-date-container">
                                    <p>{selectedFlightData[0].source} <FaArrowRightLong /> {selectedFlightData[0].destination} <span>{flightDay}, {startDate}</span></p>
                                </div>
                                <div className="checkout-flight-info-container">
                                    <div className="checkout-flight-name-section">
                                        <img src="https://seeklogo.com/images/I/indigo-logo-EDBB4B3C09-seeklogo.com.png" />
                                        <div className="checkout-flight-name-info">
                                            <span><strong>IndiGo</strong></span>
                                            <span>{selectedFlightData[0].flightID}</span>
                                            <span>{flightClass}</span>
                                        </div>
                                    </div>

                                    <div className="checkout-flight-dotted-line">
                                        <GrLocationPin />
                                        <IoEllipsisVerticalOutline />
                                        <IoEllipsisVerticalOutline />
                                        <IoEllipsisVerticalOutline />
                                        <IoEllipsisVerticalOutline />
                                        <GrLocationPin className="checkout-inverted" />
                                    </div>

                                    <div className="checkout-flight-time-container">
                                        <div>
                                            <p><strong>{selectedFlightData[0].departureTime}</strong> {selectedFlightData[0].source}</p>
                                        </div>
                                        <div>
                                            <p>{selectedFlightData[0].duration} hr</p>
                                        </div>
                                        <div>
                                            <p><strong>{selectedFlightData[0].arrivalTime}</strong> {selectedFlightData[0].destination}</p>
                                        </div>
                                    </div>

                                    <div className="checkout-flight-price">
                                        ₹ {selectedFlightData[0].ticketPrice}
                                    </div>
                                </div>
                            </div>

                            {/* This section is for the flight info section showing the rules and regulations, */}
                            <div className="selected-flight-fare-section">
                                <div className="flight-fare-heading">
                                    <RiFlightTakeoffFill /> {selectedFlightData[0].source} <FaArrowRightLong /> {selectedFlightData[0].destination} : {fareType}
                                </div>
                                <div className="flight-fare-content">
                                    <div className="flight-fare-info">
                                        <span><SlCalender /> Date change allowed from ₹ {selectedFlightData[0].ticketPrice / 4}</span>
                                        <span><IoBagHandleOutline /> Cabin/person: 7kg</span>
                                        <span><MdLuggage /> Check-in/person: 15kg(1 piece)</span>
                                        <span><MdFreeCancellation /> Cancellation fee starts from ₹ 1999</span>
                                        <span><IoFastFoodOutline /> Paid meal</span>
                                        <span><MdOutlineAirlineSeatReclineExtra /> Paid seat</span>
                                    </div>
                                    <div className="fare-cancellation" onClick={() => setCancellationDiv(!cancellationDiv)}><FaChevronRight /> Cancellation and refund policy</div>
                                    {cancellationDiv && <div className="fare-cancellation-text">
                                        <p>The customer must use the My Trips section on Cleartrip App / Website and raise a request for cancellation by selecting ‘Due to medical emergency’ as the reason. Alternatively, customers can call us at +91-9595333333. </p>
                                        <p>On cancellation, the refund amount post deduction of applicable cancellation charges will be credited to the original source.</p>
                                        <p>An email will be sent to the customers to upload the required documents on a link to claim the Medi-Cancel benefit.</p>
                                        <p>On receiving the documents, Cleartrip will validate and process the refund equivalent to cancellation charges for eligible cases. Once validated, refund will be processed within 2-3 days.</p>
                                        <span>Note: Customers can file for a claim by uploading the required documents until 15 days after cancelling the flight.</span>
                                    </div>}

                                    <div className="fare-info-container">
                                        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/3b/Eo_circle_green_checkmark.svg/1200px-Eo_circle_green_checkmark.svg.png" />
                                        <div className="fare-information">
                                            <div className="fare-flight-logo">
                                                <img src="https://seeklogo.com/images/I/indigo-logo-EDBB4B3C09-seeklogo.com.png" />
                                                IndiGo
                                            </div>
                                            <div className="fare-extra-info">
                                                <span>{selectedFlightData[0].source} <FaArrowRightLong /> {selectedFlightData[0].destination}</span>
                                                <p>{flightDay}, {startDate}</p>
                                            </div>
                                            <div className="fare-extra-info">
                                                <span>{selectedFlightData[0].departureTime} - {selectedFlightData[0].arrivalTime}</span>
                                                <p>{selectedFlightData[0].duration} hr ·<span>{selectedFlightData[0].stops} {selectedFlightData[0].stops === 1 ? "stop" : "stops"}</span></p>
                                            </div>
                                            <div className="fare-faretype">{fareType}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </>
                    }

                    {/* Here im checking if the data is present for the round trip flight and just mapping it out */}
                    {selectedFlightData && selectedFlightData.length === 2 && (
                        <>
                            <div className="checkout-flight-card">
                                <div className="checkout-flight-srcdes-date-container">
                                    <p>{selectedFlightData[0].source} <FaArrowRightLong /> {selectedFlightData[0].destination} <span>{flightDay}, {startDate}</span></p>
                                </div>
                                <div className="checkout-flight-info-container">
                                    <div className="checkout-flight-name-section">
                                        <img src="https://seeklogo.com/images/I/indigo-logo-EDBB4B3C09-seeklogo.com.png" />
                                        <div className="checkout-flight-name-info">
                                            <span><strong>IndiGo</strong></span>
                                            <span>{selectedFlightData[0].flightID}</span>
                                            <span>{flightClass}</span>
                                        </div>
                                    </div>

                                    <div className="checkout-flight-dotted-line">
                                        <GrLocationPin />
                                        <IoEllipsisVerticalOutline />
                                        <IoEllipsisVerticalOutline />
                                        <IoEllipsisVerticalOutline />
                                        <IoEllipsisVerticalOutline />
                                        <GrLocationPin className="checkout-inverted" />
                                    </div>

                                    <div className="checkout-flight-time-container">
                                        <div>
                                            <p><strong>{selectedFlightData[0].departureTime}</strong> {selectedFlightData[0].source}</p>
                                        </div>
                                        <div>
                                            <p>{selectedFlightData[0].duration} hr</p>
                                        </div>
                                        <div>
                                            <p><strong>{selectedFlightData[0].arrivalTime}</strong> {selectedFlightData[0].destination}</p>
                                        </div>
                                    </div>

                                    <div className="checkout-flight-price">
                                        ₹ {selectedFlightData[0].ticketPrice}
                                    </div>
                                </div>
                            </div>

                            <div className="checkout-flight-card">
                                <div className="checkout-flight-srcdes-date-container">
                                    <p>{selectedFlightData[1].source} <FaArrowRightLong /> {selectedFlightData[1].destination} <span>{flightDayTwo}, {endDate}</span></p>
                                </div>
                                <div className="checkout-flight-info-container">
                                    <div className="checkout-flight-name-section">
                                        <img src="https://seeklogo.com/images/I/indigo-logo-EDBB4B3C09-seeklogo.com.png" />
                                        <div className="checkout-flight-name-info">
                                            <span><strong>IndiGo</strong></span>
                                            <span>{selectedFlightData[1].flightID}</span>
                                            <span>{flightClass}</span>
                                        </div>
                                    </div>

                                    <div className="checkout-flight-dotted-line">
                                        <GrLocationPin />
                                        <IoEllipsisVerticalOutline />
                                        <IoEllipsisVerticalOutline />
                                        <IoEllipsisVerticalOutline />
                                        <IoEllipsisVerticalOutline />
                                        <GrLocationPin className="checkout-inverted" />
                                    </div>

                                    <div className="checkout-flight-time-container">
                                        <div>
                                            <p><strong>{selectedFlightData[1].departureTime}</strong> {selectedFlightData[1].source}</p>
                                        </div>
                                        <div>
                                            <p>{selectedFlightData[1].duration} hr</p>
                                        </div>
                                        <div>
                                            <p><strong>{selectedFlightData[1].arrivalTime}</strong> {selectedFlightData[1].destination}</p>
                                        </div>
                                    </div>

                                    <div className="checkout-flight-price">
                                        ₹ {selectedFlightData[1].ticketPrice}
                                    </div>
                                </div>
                            </div>

                            <div className="selected-flight-fare-section">
                                <div className="flight-round-fare-heading">
                                    <div className="round-fare-heading">
                                        <RiFlightTakeoffFill /> {selectedFlightData[0].source} <FaArrowRightLong /> {selectedFlightData[0].destination} : {fareType}
                                    </div>
                                    <GiReturnArrow className="fare-return-icon" />
                                    <div className="round-fare-heading">
                                        <RiFlightLandLine /> {selectedFlightData[1].source} <FaArrowRightLong /> {selectedFlightData[1].destination} : {fareType}
                                    </div>
                                </div>
                                <div className="flight-fare-content">
                                    <div className="flight-fare-info">
                                        <span><SlCalender /> Date change allowed from ₹ {selectedFlightData[0].ticketPrice / 4}</span>
                                        <span><IoBagHandleOutline /> Cabin/person: 7kg</span>
                                        <span><MdLuggage /> Check-in/person: 15kg(1 piece)</span>
                                        <span><MdFreeCancellation /> Cancellation fee starts from ₹ 1999</span>
                                        <span><IoFastFoodOutline /> Paid meal</span>
                                        <span><MdOutlineAirlineSeatReclineExtra /> Paid seat</span>
                                    </div>
                                    <div className="fare-cancellation" onClick={() => setCancellationDiv(!cancellationDiv)}><FaChevronRight /> Cancellation and refund policy</div>
                                    {cancellationDiv && <div className="fare-cancellation-text">
                                        <p>The customer must use the My Trips section on Cleartrip App / Website and raise a request for cancellation by selecting ‘Due to medical emergency’ as the reason. Alternatively, customers can call us at +91-9595333333. </p>
                                        <p>On cancellation, the refund amount post deduction of applicable cancellation charges will be credited to the original source.</p>
                                        <p>An email will be sent to the customers to upload the required documents on a link to claim the Medi-Cancel benefit.</p>
                                        <p>On receiving the documents, Cleartrip will validate and process the refund equivalent to cancellation charges for eligible cases. Once validated, refund will be processed within 2-3 days.</p>
                                        <span>Note: Customers can file for a claim by uploading the required documents until 15 days after cancelling the flight.</span>
                                    </div>}

                                    <div className="round-fare-info-container">
                                        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/3b/Eo_circle_green_checkmark.svg/1200px-Eo_circle_green_checkmark.svg.png" />
                                        <div className="round-fare-information-container">
                                            <div className="round-fare-information">
                                                <div className="fare-flight-logo">
                                                    <img src="https://seeklogo.com/images/I/indigo-logo-EDBB4B3C09-seeklogo.com.png" />
                                                    IndiGo
                                                </div>
                                                <div className="fare-extra-info">
                                                    <span>{selectedFlightData[0].source} <FaArrowRightLong /> {selectedFlightData[0].destination}</span>
                                                    <p>{flightDay}, {startDate}</p>
                                                </div>
                                                <div className="fare-extra-info">
                                                    <span>{selectedFlightData[0].departureTime} - {selectedFlightData[0].arrivalTime}</span>
                                                    <p>{selectedFlightData[0].duration} hr ·<span>{selectedFlightData[0].stops} {selectedFlightData[0].stops === 1 ? "stop" : "stops"}</span></p>
                                                </div>
                                                <div className="fare-faretype">{fareType}</div>
                                            </div>

                                            <div className="round-fare-information">
                                                <div className="fare-flight-logo">
                                                    <img src="https://seeklogo.com/images/I/indigo-logo-EDBB4B3C09-seeklogo.com.png" />
                                                    IndiGo
                                                </div>
                                                <div className="fare-extra-info">
                                                    <span>{selectedFlightData[1].source} <FaArrowRightLong /> {selectedFlightData[1].destination}</span>
                                                    <p>{flightDayTwo}, {endDate}</p>
                                                </div>
                                                <div className="fare-extra-info">
                                                    <span>{selectedFlightData[1].departureTime} - {selectedFlightData[1].arrivalTime}</span>
                                                    <p>{selectedFlightData[1].duration} hr ·<span>{selectedFlightData[1].stops} {selectedFlightData[1].stops === 1 ? "stop" : "stops"}</span></p>
                                                </div>
                                                <div className="fare-faretype">{fareType}</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </>
                    )}

                </div>

                <hr />

                {/* Inside of this section im taking in the input for the passanger */}
                <h1><TbCircleNumber2 /> {selectedHotelData ? "Guest details" : "Passanger details"}</h1>
                {/* <h1><TbCircleNumber2 /> Passanger details</h1> */}
                <div className="checkout-passanger-detail-container">
                    {/* The below section takes in input for the hotel adult count */}
                    {hotelAdultCount > 0 && <div className="passanger-title">Enter details of adult guest</div>}
                    {[...Array(hotelAdultCount)].map((_, index) => (
                        <div key={`adult-${index + 1}`} className="passanger-detail-card">
                            <label>Gender
                                <select onChange={(e) => updateHotelPassengerDetails(index, 'gender', e.target.value)}>
                                    <option value="Mr.">Mr.</option>
                                    <option value="Mrs.">Mrs.</option>
                                </select>
                            </label>
                            <label>
                                First name
                                <input
                                    type="text"
                                    placeholder="Enter guest first name"
                                    onChange={(e) => updateHotelPassengerDetails(index, 'firstName', e.target.value)}
                                />
                            </label>
                            <label>
                                Last name
                                <input
                                    type="text"
                                    placeholder="Enter guest last name"
                                    onChange={(e) => updateHotelPassengerDetails(index, 'lastName', e.target.value)}
                                />
                            </label>
                        </div>
                    ))}

                    {/* The below section takes in input for the hotel child count */}
                    {hotelChildCount > 0 && <div className="passanger-title">Enter details of child guest</div>}
                    {[...Array(hotelChildCount)].map((_, index) => (
                        <div key={`adult-${index + 1}`} className="passanger-detail-card">
                            <label>Gender
                                <select onChange={(e) => updateHotelPassengerDetails(index + hotelAdultCount, 'gender', e.target.value)}>
                                    <option value="Mr.">Mr.</option>
                                    <option value="Mrs.">Mrs.</option>
                                </select>
                            </label>
                            <label>
                                First name
                                <input
                                    type="text"
                                    placeholder="Enter guest first name"
                                    onChange={(e) => updateHotelPassengerDetails(index + hotelAdultCount, 'firstName', e.target.value)}
                                />
                            </label>
                            <label>
                                Last name
                                <input
                                    type="text"
                                    placeholder="Enter guest last name"
                                    onChange={(e) => updateHotelPassengerDetails(index + hotelAdultCount, 'lastName', e.target.value)}
                                />
                            </label>
                        </div>
                    ))}

                    {/* The below section takes in input for the flight adult count */}
                    {adultCount > 0 && <div className="passanger-title">Enter details of adult passenger</div>}
                    {[...Array(adultCount)].map((_, index) => (
                        <div key={`adult-${index + 1}`} className="passanger-detail-card">
                            <label>Gender
                                <select onChange={(e) => updateFlightPassengerDetails(index, 'gender', e.target.value)}>
                                    <option value="Mr.">Mr.</option>
                                    <option value="Mrs.">Mrs.</option>
                                </select>
                            </label>
                            <label>
                                First name
                                <input
                                    type="text"
                                    placeholder="Enter passenger first name"
                                    onChange={(e) => updateFlightPassengerDetails(index, 'firstName', e.target.value)}
                                />
                            </label>
                            <label>
                                Last name
                                <input
                                    type="text"
                                    placeholder="Enter passenger last name"
                                    onChange={(e) => updateFlightPassengerDetails(index, 'lastName', e.target.value)}
                                />
                            </label>
                        </div>
                    ))}

                    {/* The below section takes in input for the flight child count */}
                    {childCount > 0 && <div className="passanger-title">Enter details of child passenger</div>}
                    {[...Array(childCount)].map((_, index) => (
                        <div key={`child-${index + 1}`} className="passanger-detail-card">
                            <label>Gender
                                <select onChange={(e) => updateFlightPassengerDetails(index + adultCount, 'gender', e.target.value)}>
                                    <option value="Mr.">Mr.</option>
                                    <option value="Mrs.">Mrs.</option>
                                </select>
                            </label>
                            <label>
                                First name
                                <input
                                    type="text"
                                    placeholder="Enter passenger first name"
                                    onChange={(e) => updateFlightPassengerDetails(index + adultCount, 'firstName', e.target.value)}
                                />
                            </label>
                            <label>
                                Last name
                                <input
                                    type="text"
                                    placeholder="Enter passenger last name"
                                    onChange={(e) => updateFlightPassengerDetails(index + adultCount, 'lastName', e.target.value)}
                                />
                            </label>
                        </div>
                    ))}

                    {/* The below section takes in input for the flight infant count */}
                    {infantCount > 0 && <div className="passanger-title">Enter details of infant passenger</div>}
                    {[...Array(infantCount)].map((_, index) => (
                        <div key={`infant-${index + 1}`} className="passanger-detail-card">
                            <label>Gender
                                <select onChange={(e) => updateFlightPassengerDetails(index + adultCount + childCount, 'gender', e.target.value)}>
                                    <option value="Mr.">Mr.</option>
                                    <option value="Mrs.">Mrs.</option>
                                </select>
                            </label>
                            <label>
                                First name
                                <input
                                    type="text"
                                    placeholder="Enter passenger first name"
                                    onChange={(e) => updateFlightPassengerDetails(index + adultCount + childCount, 'firstName', e.target.value)}
                                />
                            </label>
                            <label>
                                Last name
                                <input
                                    type="text"
                                    placeholder="Enter passenger last name"
                                    onChange={(e) => updateFlightPassengerDetails(index + adultCount + childCount, 'lastName', e.target.value)}
                                />
                            </label>
                        </div>
                    ))}

                </div>

                <hr />

                {/* Here im taking inputs for contact details */}
                <div className="heading-three-div">
                    <TbCircleNumber3 className="heading-3-icon" />
                    <div>
                        <h1>Add contact details</h1>
                        <p>E-ticket will be send to this email address and phone number</p>
                    </div>
                </div>
                <div className="checkout-contact-container">
                    <div className="checkout-phone-div">
                        Mobile number
                        <div>
                            <div>+91</div>
                            <input
                                type="tel"
                                pattern="[0-9]{10}"
                                maxLength="10"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                placeholder={`${phoneNoError ? "Enter valid phone no" : "Enter phone no"}`}
                                className={`${phoneNoError && "error-input"}`}
                            />
                        </div>
                    </div>

                    <div className="checkout-email-div">
                        <div>Email address</div>
                        {/* <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        /> */}
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}"
                            title="Please enter a valid email address"
                            placeholder={`${emailError ? "Enter valid email address" : "Enter email address"}`}
                            className={`${emailError && "error-input"}`}
                        />
                    </div>
                </div>

                <hr />

                {/* Here ive created checkbox for checking if the terms and conditions are checked or not */}
                <h1><TbCircleNumber4 /> Terms and conditions</h1>
                <div className="checkout-terms-and-conditions">
                    <label>
                        <input
                            type="checkbox"
                            checked={termsChecked}
                            onChange={() => setTermsChecked(!termsChecked)}
                        />
                        I agree to the terms and conditions of the airline and agree to compile by the airline rules.
                    </label>
                </div>

            </div>

            {/* The below div shows all the price details */}
            <div className="checkout-price-section">
                {/* This shows the price detail for the hotel booking */}
                {selectedHotelData && selectedRoom && selectedRoom.costDetails && (
                    <div className="checkout-hotel-price-container">
                        <div className="checkout-hotel-price-text">
                            ₹ {selectedRoom.costDetails?.baseCost} per night / room (without taxes and fees)
                        </div>
                        <div className="checkout-hotel-final-price-text">
                            Total Price: ₹ {(selectedRoom.costDetails?.baseCost + selectedRoom.costDetails?.taxesAndFees - selectedRoom.costDetails?.discount) * roomCount * (calenderDateDifference === 0 ? 1 : calenderDateDifference)}
                        </div>
                        <hr />
                        <div className="checkout-hotel-base-fare">
                            Base fare (1 room)
                            <div>₹ {selectedRoom.costDetails?.baseCost + selectedRoom.costDetails?.taxesAndFees}</div>
                        </div>
                        <div className="checkout-hotel-base-fare">
                            Taxes and fees
                            <div>₹ {selectedRoom.costDetails?.taxesAndFees}</div>
                        </div>
                        <div className="checkout-hotel-base-fare">
                            Discount
                            <div>₹ {selectedRoom.costDetails?.discount}</div>
                        </div>
                    </div>
                )}

                {/* This shows the price detail for the one-way flight booking */}
                {selectedFlightData && selectedFlightData.length === 1 &&
                    <div className="checkout-Flight-price-container">
                        <div className="checkout-flight-price-info">
                            <span>{selectedFlightData[0].availableSeats} seats left</span>

                            <div className="checkout-flight-total-price">
                                <span>Total price</span> ₹
                                {selectedFlightData[0].ticketPrice * (
                                    adultCount +
                                    3 / 4 * childCount +
                                    1 / 2 * infantCount
                                )}
                            </div>
                            <div className="checkout-passanger-count">
                                {adultCount > 0 && (
                                    <span>{adultCount} {adultCount === 1 ? "adult" : "adults"}</span>
                                )}
                                {childCount > 0 && (
                                    <span>{childCount} {adultCount === 1 ? "child" : "children"}</span>
                                )}
                                {infantCount > 0 && (
                                    <span>{infantCount} {adultCount === 1 ? "infant" : "infants"}</span>
                                )}
                            </div>
                        </div>

                        <hr />

                        <div className="checkout-flight-basefare">
                            Base fare (1 traveller)
                            <div>₹ {selectedFlightData[0].ticketPrice}</div>
                        </div>
                    </div>
                }

                {/* This shows the price detail for the round-trip flight booking */}
                {selectedFlightData && selectedFlightData.length === 2 &&
                    <div className="checkout-Flight-price-container">
                        <div className="checkout-flight-price-info">
                            <span>{selectedFlightData[0].availableSeats} seats left</span>

                            <div className="checkout-flight-total-price">
                                <span>Total price</span> ₹
                                {selectedFlightData[0].ticketPrice * (
                                    adultCount +
                                    3 / 4 * childCount +
                                    1 / 2 * infantCount
                                )
                                    +
                                    selectedFlightData[1].ticketPrice * (
                                        adultCount +
                                        3 / 4 * childCount +
                                        1 / 2 * infantCount
                                    )}
                            </div>
                            <div className="checkout-passanger-count">
                                {adultCount > 0 && (
                                    <span>{adultCount} {adultCount === 1 ? "adult" : "adults"}</span>
                                )}
                                {childCount > 0 && (
                                    <span>{childCount} {adultCount === 1 ? "child" : "children"}</span>
                                )}
                                {infantCount > 0 && (
                                    <span>{infantCount} {adultCount === 1 ? "infant" : "infants"}</span>
                                )}
                            </div>
                        </div>

                        <hr />

                        <div className="checkout-flight-basefare">
                            Base fare (1 traveller)
                            <div>₹ {selectedFlightData[0].ticketPrice}</div>
                        </div>
                        <div className="checkout-flight-basefare">
                            Return base fare (1 traveller)
                            <div>₹ {selectedFlightData[1].ticketPrice}</div>
                        </div>
                    </div>
                }

                {/* This is the continue button which calls the handleContinue function */}
                <div className="checkout-continue-button" onClick={handleContinue}>Continue</div>

                {/* Here im loading up my error div if there is any error present while proceeding */}
                {error && <div className="checkout-error">{error}</div>}
            </div>
        </div>
    )
}