import { useContext, useState, useEffect } from "react";
import qrImage from "../image/qrcode.jpg";
import { AuthContext } from "./App";
import { LuHotel } from "react-icons/lu";
import { MdOutlineHotelClass, MdOutlineMeetingRoom } from "react-icons/md";
import { FaArrowRightLong } from "react-icons/fa6";
import { MdOutlinePeople } from "react-icons/md";
import { RiFlightLandLine, RiFlightTakeoffFill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import SuccessModal from "./SuccessModal";
import FailureModal from "./FailureModal";


export default function Payment() {
    // Here im importing all the states that i want to use inside of this component
    const { selectedHotelData, selectedRoom, roomCount, calenderDateDifference, selectedFlightData, startDate, endDate, flightDay, flightDayTwo, adultCount, childCount, infantCount, checkoutStartDate, checkoutEndDate, paymentSuccessDiv, setPaymentSuccessDiv, paymentFailureDiv, setPaymentFailureDiv } = useContext(AuthContext);

    const navigate = useNavigate();

    // Here ive created state to manage toggling between different payment methods
    const [creditDiv, setCreditDiv] = useState(true);
    const [debitDiv, setDebitDiv] = useState(false);
    const [netDiv, setNetDiv] = useState(false);
    const [upiDiv, setUpiDiv] = useState(false);

    // Here ive defined states to keep track of any payment error and if terms and condition is checked or not
    const [paymentError, setPaymentError] = useState('');
    const [agreedToTerms, setAgreedToTerms] = useState(false);

    // Here ive created a state to store the body object that is to be passed in api and im also keeping track if the body is set or not
    const [body, setBody] = useState();
    const [isBodySet, setIsBodySet] = useState(false);

    // here inside of the useEffect hook, im performing the function of setting the body with the respective detail
    useEffect(() => {
        if (!isBodySet) {
            // Inside the loop im defining a variable which will be used to set the body
            let newBody;

            // Im conditionally checking if the data belongs to flight or hotel
            if (selectedFlightData && selectedFlightData.length > 0) {
                // Here im getting the flight id and setting all the necessary details 
                const flightId = selectedFlightData[0]._id;
                newBody = {
                    bookingType: "flight",
                    bookingDetails: {
                        flightId: flightId,
                        startDate: checkoutStartDate,
                        endDate: checkoutEndDate
                    }
                };
            } else if (selectedHotelData) {
                // Here im getting the flight id and setting all the necessary details 
                const hotelId = selectedHotelData._id;
                newBody = {
                    bookingType: "hotel",
                    bookingDetails: {
                        hotelId: hotelId,
                        startDate: checkoutStartDate,
                        endDate: checkoutEndDate
                    }
                };
            }

            // Here im setting the body inside of the state to use it while calling the api
            setBody(newBody);
            setIsBodySet(true);
        }
    }, [isBodySet, selectedFlightData, selectedHotelData, checkoutStartDate, checkoutEndDate]);

    // Here inside of the checkout function im calling the api for booking the flight/hotel
    const checkout = () => {
        // Here im checking if the body is present and if it is then im calling the api
        if (body) {
            // Getting the token from the session storage
            const token = sessionStorage.getItem("userToken");

            // Defining the configuration
            const config = {
                method: "POST",
                body: JSON.stringify(body),
                headers: {
                    "Content-Type": "application/json",
                    "projectID": "f104bi07c490",
                    "Authorization": `Bearer ${token}`
                }
            };

            // Calling the api
            fetch('https://academics.newtonschool.co/api/v1/bookingportals/booking', config)
                .then((res) => res.json())
                .then((result) => {
                    console.log(result);
                    navigate("/payment/success");
                    setPaymentSuccessDiv(true);
                })
                .catch((e) => {
                    console.log(e)
                    setPaymentFailureDiv(true);
                });
        }
    }

    // Here im handling the click for credit div which sets all other payment divs to false and also setting the payment error to ''
    const handleCreditDiv = () => {
        setCreditDiv(true);
        setDebitDiv(false);
        setNetDiv(false);
        setUpiDiv(false);

        setPaymentError('');
    }

    // Here im handling the click for debit div which sets all other payment divs to false and also setting the payment error to ''
    const handleDebitDiv = () => {
        setDebitDiv(true);
        setCreditDiv(false);
        setNetDiv(false);
        setUpiDiv(false);

        setPaymentError('');
    }

    // Here im handling the click for net div which sets all other payment divs to false and also setting the payment error to ''
    const handleNetDiv = () => {
        setNetDiv(true);
        setCreditDiv(false);
        setDebitDiv(false);
        setUpiDiv(false);

        setPaymentError('');
    }

    // Here im handling the click for upi div which sets all other payment divs to false and also setting the payment error to ''
    const handleUpiDiv = () => {
        setUpiDiv(true);
        setCreditDiv(false);
        setDebitDiv(false);
        setNetDiv(false);

        setPaymentError('');
    }

    // This function handles the click for the pay button
    const handlePayNow = () => {
        // Here im checking if the agree to terms and conditions is checked or not and setting the error
        if (!agreedToTerms) {
            setPaymentError('Please agree to the terms and conditions.');
            return;
        }

        // Here im checking if upi div is selected
        if (upiDiv) {
            // Here im getting the input
            const upiIdInput = document.querySelector('input[name="upiId"]');
            // Here im checking if the input value is empty or not and setting the error and if not empty then im calling the checkout function
            if (upiIdInput.value === '') {
                setPaymentError('Please enter your UPI ID to complete the payment.');
            } else {
                console.log("Setting showSuccessModal to true...");
                checkout();
            }
        }

        // Here im checking if debit div is selected
        if (debitDiv) {
            // Here im getting the input values
            const debitNumberInputs = document.querySelector('input[name="debitNumberInput"]');
            const debitCvvInputs = document.querySelector('input[name="debitCvvInput"]');
            const debitDateInputs = document.querySelector('input[name="debitDateInput"]');
            const debitNameInputs = document.querySelector('input[name="debitNameInput"]');

            // Here im checking if the input value is empty or not and setting the error and if not empty then im calling the checkout function
            if (debitNumberInputs.value === '' ||
                debitCvvInputs.value === '' ||
                debitDateInputs.value === '' ||
                debitNameInputs.value === ''
            ) {
                setPaymentError('Please enter your debit card details to complete the payment.');
            } else {
                console.log("Setting showSuccessModal to true...");
                checkout();
            }
        }

        // Here im checking if credit div is selected
        if (creditDiv) {
            // Here im getting the input values
            const creditNumberInputs = document.querySelector('input[name="creditNumberInput"]');
            const creditCvvInputs = document.querySelector('input[name="creditCvvInput"]');
            const creditDateInputs = document.querySelector('input[name="creditDateInput"]');
            const creditNameInputs = document.querySelector('input[name="creditNameInput"]');

            // Here im checking if the input value is empty or not and setting the error and if not empty then im calling the checkout function
            if (creditNumberInputs.value === '' ||
                creditCvvInputs.value === '' ||
                creditDateInputs.value === '' ||
                creditNameInputs.value === ''
            ) {
                setPaymentError('Please enter your credit card details to complete the payment.');
            } else {
                console.log("Setting showSuccessModal to true...");
                checkout();
            }
        }

        // Here im checking if net div is selected
        if (netDiv) {
            // Here im getting the input values
            const nameInput = document.querySelector('input[name="netname"]');
            const passwordInput = document.querySelector('input[name="netpassword"]');

            // Here im checking if the input value is empty or not and setting the error and if not empty then im calling the checkout function
            if (nameInput.value === '' || passwordInput.value === '') {
                setPaymentError('Please enter your net banking details to complete the payment.');
            } else {
                console.log("Setting showSuccessModal to true...");
                checkout();
            }
        }
    }

    return (
        <div className="payment-container">
            <div className="payment-title">
                <h1>
                    Pay to complete your booking
                </h1>
            </div>

            {/* Here inside of the div im creating section for payment option and payment review */}
            <div className="payment-sub-container">
                <div className="payment-option-container">
                    <div className="payment-option-sub-container">
                        {/* The below div shows the various payment option available */}
                        <div className="payment-options">
                            <div className={`option ${creditDiv ? 'active' : ''}`} onClick={handleCreditDiv}>Credit card</div>
                            <div className={`option ${debitDiv ? 'active' : ''}`} onClick={handleDebitDiv}>Debit card</div>
                            <div className={`option ${netDiv ? 'active' : ''}`} onClick={handleNetDiv}>Net banking</div>
                            <div className={`option ${upiDiv ? 'active' : ''}`} onClick={handleUpiDiv}>Upi</div>
                        </div>

                        {/* Below is the code for the ui of different payment modes */}
                        <div className="selected-payment-section">
                            {creditDiv &&
                                <div className="payment-card-container">
                                    <h2>Please enter your card details to complete your booking</h2>
                                    <label>
                                        Credit card number
                                        <input className="input-one" type="text" maxLength="19" name="creditNumberInput" placeholder="1234 4567 8912 3456" />
                                    </label>
                                    <div>
                                        <label>
                                            Cvv
                                            <input type="text" maxLength="3" name="creditCvvInput" placeholder="123" />
                                        </label>
                                        <label>
                                            Exp date
                                            <input type="text" name="creditDateInput" maxLength="7" placeholder="12/1234" />
                                        </label>
                                    </div>
                                    <label>
                                        Cardholder name
                                        <input type="text" name="creditNameInput" placeholder="Post Malone" />
                                    </label>

                                    <div className="payment-error-div">{paymentError}</div>
                                </div>
                            }

                            {debitDiv &&
                                <div className="payment-card-container">
                                    <h2>Please enter your card details to complete your booking</h2>
                                    <label>
                                        Debit card number
                                        <input className="input-one" type="text" maxLength="19" name="debitNumberInput" placeholder="1234 4567 8912 3456" />
                                    </label>
                                    <div>
                                        <label>
                                            Cvv
                                            <input type="text" name="debitCvvInput" maxLength="3" placeholder="123" />
                                        </label>
                                        <label>
                                            Exp date
                                            <input type="text" name="debitDateInput" maxLength="7" placeholder="12/1234" />
                                        </label>
                                    </div>
                                    <label>
                                        Cardholder name
                                        <input type="text" name="debitNameInput" placeholder="Post Malone" />
                                    </label>

                                    <div className="payment-error-div">{paymentError}</div>
                                </div>
                            }

                            {netDiv &&
                                <div className="payment-card-container">
                                    <h2>Please enter your netbanking account id and password to pay for your booking</h2>
                                    <label>
                                        User Id
                                        <input type="number" name="netname" maxLength="10" placeholder="user Id" />
                                    </label>
                                    <label>
                                        Password
                                        <input type="password" name="netpassword" placeholder="password" />
                                    </label>

                                    <div className="payment-error-div">{paymentError}</div>
                                </div>
                            }

                            {upiDiv &&
                                <div className="payment-upi-container">
                                    <div className="upi-id-container">
                                        Enter UPI ID
                                        <input type="text" name="upiId" placeholder="Enter your UPI ID" />
                                        <p>Payment request will be sent to the phone number linked to your upi account</p>
                                        <span className="payment-error-div">{paymentError}</span>
                                    </div>
                                    <div className="qrcode-container">
                                        SCAN QR CODE
                                        <div className="qrcode-section">
                                            <div className="upi-logo">
                                                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/UPI-Logo-vector.svg/1200px-UPI-Logo-vector.svg.png" />
                                            </div>
                                            <div className="qrcode">
                                                <img src={qrImage} />
                                            </div>
                                            <div className="different-payment-logo">
                                                <img src="https://storage.googleapis.com/gweb-uniblog-publish-prod/images/GooglePayLogo.width-500.format-webp.webp" />
                                                <img src="https://mma.prnewswire.com/media/1607489/PhonePe_Logo.jpg?p=twitter" />
                                                <img src="https://upload.wikimedia.org/wikipedia/commons/4/42/Paytm_logo.png" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            }
                        </div>
                    </div>

                    {/* Below is the div for the pay now button and other details showing the total price and rules and regulations */}
                    <div className="payment-paynow">
                        <div className="payment-terms">
                            <input type="checkbox" onClick={() => setAgreedToTerms(!agreedToTerms)} />
                            <p>I understand and agree to the rules and restrictions of this fare, the <span>booking policy</span>, the <span>privacy policy</span> and the <span>terms and conditions</span> of Cleartrip and confirm all the entered details are correct</p>
                        </div>
                        <div className="payment-paynow-total-container">
                            <div className="payment-paynow-total">
                                {selectedHotelData && selectedRoom && selectedRoom.costDetails &&
                                    <span>₹ {(selectedRoom.costDetails?.baseCost + selectedRoom.costDetails?.taxesAndFees - selectedRoom.costDetails?.discount) * roomCount * (calenderDateDifference === 0 ? 1 : calenderDateDifference)}</span>
                                }

                                {selectedFlightData && selectedFlightData.length === 1 &&
                                    <span>₹ {selectedFlightData[0].ticketPrice * (
                                        adultCount +
                                        3 / 4 * childCount +
                                        1 / 2 * infantCount
                                    )}</span>
                                }

                                {selectedFlightData && selectedFlightData.length === 2 &&
                                    <span>₹ {selectedFlightData[0].ticketPrice * (
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
                                    </span>
                                }
                                <p>Total, inclusive of all taxes</p>
                            </div>
                            <div className="payment-paynow-button" onClick={handlePayNow}>Pay now</div>
                        </div>
                    </div>
                </div>

                {/* Here im loading up the success modal and failure modal */}
                {paymentSuccessDiv && <SuccessModal />}
                {paymentFailureDiv && <FailureModal />}

                {/* Below is the code for the payment review section showing the details for the toal cost and count of passanger */}
                <div className="payment-review-container">
                    <div className="total-payment-summary">
                        {selectedHotelData && selectedRoom && selectedRoom.costDetails &&
                            <div className="payment-price-container">
                                <div className="payment-price-container-text">
                                    <span>You pay</span>
                                    <span>₹ {(selectedRoom.costDetails?.baseCost + selectedRoom.costDetails?.taxesAndFees - selectedRoom.costDetails?.discount) * roomCount * (calenderDateDifference === 0 ? 1 : calenderDateDifference)}</span>
                                </div>

                                <hr />

                                <div className="payment-price-base-fare">
                                    <span>Base fare (1 room)</span>
                                    <span>₹ {selectedRoom.costDetails?.baseCost}</span>
                                </div>
                                <div className="payment-price-base-fare">
                                    <span>Discount</span>
                                    <span>₹ {selectedRoom.costDetails?.discount}</span>
                                </div>
                            </div>
                        }

                        {selectedFlightData && selectedFlightData.length === 1 &&
                            <div className="payment-price-container">
                                <div className="payment-price-container-text">
                                    <span>You pay</span>
                                    <span>₹ {selectedFlightData[0].ticketPrice * (
                                        adultCount +
                                        3 / 4 * childCount +
                                        1 / 2 * infantCount
                                    )}</span>
                                </div>

                                <hr />

                                <div className="payment-price-base-fare">
                                    <span>Base fare (1 traveller)</span>
                                    <span>₹ {selectedFlightData[0].ticketPrice}</span>
                                </div>
                            </div>
                        }

                        {selectedFlightData && selectedFlightData.length === 2 &&
                            <div className="payment-price-container">
                                <div className="payment-price-container-text">
                                    <span>You pay</span>
                                    <span>₹ {selectedFlightData[0].ticketPrice * (
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
                                    </span>
                                </div>

                                <hr />

                                <div className="payment-price-base-fare">
                                    <span>Base fare (1 traveller)</span>
                                    <span>₹ {selectedFlightData[0].ticketPrice}</span>
                                </div>

                                <div className="payment-price-base-fare">
                                    <span>Return base fare (1 traveller)</span>
                                    <span>₹ {selectedFlightData[1].ticketPrice}</span>
                                </div>
                            </div>
                        }
                    </div>

                    <div className="supercoin-container">
                        <img src="https://assets.mspimages.in/gear/wp-content/uploads/2021/01/Flipkart-SuperCoin.png" />
                        <p>Earn 50 SuperCoins with this booking</p>
                    </div>

                    <div className="traveller-summary-container">
                        {selectedHotelData && selectedRoom && selectedRoom.costDetails &&
                            <div className="traveller-summary-sub-container">
                                <h3>Booking summary</h3>
                                <div className="traveller-first-div"><LuHotel /> {selectedHotelData.name} <span>{selectedHotelData.location}</span></div>
                                <div className="traveller-date"><MdOutlineHotelClass /> {Math.floor(selectedHotelData.rating)} Stars hotel</div>
                                <hr />
                                <div className="traveller-count"><MdOutlineMeetingRoom /> {roomCount} rooms</div>
                            </div>
                        }

                        {selectedFlightData && selectedFlightData.length === 1 &&
                            <div className="traveller-summary-sub-container">
                                <h3>Booking summary</h3>
                                <div className="traveller-first-div"><RiFlightTakeoffFill /> {selectedFlightData[0].source} <FaArrowRightLong /> {selectedFlightData[0].destination}</div>
                                <div className="traveller-date">{selectedFlightData[0].departureTime} - {selectedFlightData[0].arrivalTime}, {flightDay} {startDate}</div>
                                <hr />
                                <div className="traveller-count"><MdOutlinePeople /> {adultCount + childCount + infantCount} {(adultCount + childCount + infantCount) === 1 ? "traveller" : "travellers"}</div>
                            </div>
                        }

                        {selectedFlightData && selectedFlightData.length === 2 &&
                            <div className="traveller-summary-sub-container">
                                <h3>Booking summary</h3>
                                <div className="traveller-first-div"><RiFlightTakeoffFill /> {selectedFlightData[0].source} <FaArrowRightLong /> {selectedFlightData[0].destination}</div>
                                <div className="traveller-date">{selectedFlightData[0].departureTime} - {selectedFlightData[0].arrivalTime}, {flightDay} {startDate}</div>
                                <div className="traveller-second-div"><RiFlightLandLine /> {selectedFlightData[1].source} <FaArrowRightLong /> {selectedFlightData[1].destination}</div>
                                <div className="traveller-date">{selectedFlightData[1].departureTime} - {selectedFlightData[1].arrivalTime}, {flightDayTwo} {endDate}</div>


                                <hr />
                                <div className="traveller-count"><MdOutlinePeople /> {adultCount + childCount + infantCount} {(adultCount + childCount + infantCount) === 1 ? "traveller" : "travellers"}</div>
                            </div>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}



