import axios from "axios";
import { useContext, useState, useEffect } from "react";
import qrImage from "../image/qrcode.jpg";
import { AuthContext } from "./App";
import { LuHotel } from "react-icons/lu";
import { MdOutlineHotelClass, MdOutlineMeetingRoom } from "react-icons/md";
import { FaArrowRightLong } from "react-icons/fa6";
import { MdOutlinePeople } from "react-icons/md";
import { RiFlightLandLine, RiFlightTakeoffFill } from "react-icons/ri";


export default function Payment() {
    const { selectedHotelData, selectedRoom, roomCount, calenderDateDifference, selectedFlightData, startDate, endDate, flightDay, flightDayTwo, adultCount, childCount, infantCount, hotelAdultCount, hotelChildCount } = useContext(AuthContext);
    console.log("start date: ", startDate);
    console.log("end date: ", endDate);
    console.log("day: ", flightDay);
    console.log("day2: ", flightDayTwo);
    console.log(selectedFlightData);

    const [creditDiv, setCreditDiv] = useState(true);
    const [debitDiv, setDebitDiv] = useState(false);
    const [netDiv, setNetDiv] = useState(false);
    const [upiDiv, setUpiDiv] = useState(false);


    useEffect(() => {
        const token = sessionStorage.getItem('userToken');
        console.log(token);

        const bookingPayload = {};

        if (selectedFlightData && selectedFlightData.length > 0) {
            bookingPayload.bookingType = 'flight';
            bookingPayload.requiredField = JSON.stringify(selectedFlightData);
        }

        if (selectedHotelData) {
            bookingPayload.bookingType = 'hotel';
            bookingPayload.requiredField = JSON.stringify(selectedHotelData);
        }

        const config = {
            headers: {
                'Authorization': `Bearer ${token}`,
                "projectID": "f104bi07c490",
            }
        }

        axios.post('https://academics.newtonschool.co/api/v1/bookingportals/booking', bookingPayload, config)
            .then(response => {
                console.log('Response:', response.data);
            })
            .catch(error => {
                if (error.response && error.response.status === 400) {
                    console.log('Validation errors:', error.response.data.message);
                } else {
                    console.log('Error occurred:', error.message);
                }
            });
    }, [selectedFlightData, selectedHotelData]);
    const handleCreditDiv = () => {
        setCreditDiv(true);
        setDebitDiv(false);
        setNetDiv(false);
        setUpiDiv(false);
    }

    const handleDebitDiv = () => {
        setDebitDiv(true);
        setCreditDiv(false);
        setNetDiv(false);
        setUpiDiv(false);
    }

    const handleNetDiv = () => {
        setNetDiv(true);
        setCreditDiv(false);
        setDebitDiv(false);
        setUpiDiv(false);

    }

    const handleUpiDiv = () => {
        setUpiDiv(true);
        setCreditDiv(false);
        setDebitDiv(false);
        setNetDiv(false);
    }

    const [cardDetails, setCardDetails] = useState({
        cardNumber: '',
        cvv: '',
        expDate: '',
        cardHolderName: '',
    });

    const [netBankingDetails, setNetBankingDetails] = useState({
        userId: '',
        password: '',
    });

    const [upiDetails, setUpiDetails] = useState({
        upiId: '',
    });

    const [checkboxChecked, setCheckboxChecked] = useState(false);

    const [paymentError, setPaymentError] = useState('');

    const handleInputChange = (e, paymentType) => {
        switch (paymentType) {
            case 'credit':
            case 'debit':
                setCardDetails({
                    ...cardDetails,
                    [e.target.name]: e.target.value,
                });
                break;
            case 'net':
                setNetBankingDetails({
                    ...netBankingDetails,
                    [e.target.name]: e.target.value,
                });
                break;
            case 'upi':
                setUpiDetails({
                    ...upiDetails,
                    [e.target.name]: e.target.value,
                });
                break;
            default:
                break;
        }
    };

    const handleCheckboxChange = (e) => {
        setCheckboxChecked(e.target.checked);
    };

    const handlePayNow = () => {
        if (!checkboxChecked) {
            setPaymentError('Please accept the terms and conditions.');
            return;
        }

        switch (true) {
            case creditDiv:
                if (!cardDetails.cardNumber || !cardDetails.cvv || !cardDetails.expDate || !cardDetails.cardHolderName) {
                    setPaymentError('Please fill in all credit card details.');
                    return;
                }
                break;
            case debitDiv:
                if (!cardDetails.cardNumber || !cardDetails.cvv || !cardDetails.expDate || !cardDetails.cardHolderName) {
                    setPaymentError('Please fill in all debit card details.');
                    return;
                }
                break;
            case netDiv:
                if (!netBankingDetails.userId || !netBankingDetails.password) {
                    setPaymentError('Please fill in all net banking details.');
                    return;
                }
                break;
            case upiDiv:
                if (!upiDetails.upiId) {
                    setPaymentError('Please fill in the UPI ID.');
                    return;
                }
                break;
            default:
                break;
        }

        setPaymentError('Success');
    };

    return (
        <div className="payment-container">
            <div className="payment-title">
                <h1>
                    Pay to complete your booking
                </h1>
            </div>

            <div className="payment-sub-container">
                <div className="payment-option-container">
                    <div className="payment-option-sub-container">
                        <div className="payment-options">
                            <div className={`option ${creditDiv ? 'active' : ''}`} onClick={handleCreditDiv}>Credit card</div>
                            <div className={`option ${debitDiv ? 'active' : ''}`} onClick={handleDebitDiv}>Debit card</div>
                            <div className={`option ${netDiv ? 'active' : ''}`} onClick={handleNetDiv}>Net banking</div>
                            <div className={`option ${upiDiv ? 'active' : ''}`} onClick={handleUpiDiv}>Upi</div>
                        </div>

                        <div className="selected-payment-section">
                            {creditDiv &&
                                <div className="payment-card-container">
                                    <h2>Please enter your card details to complete your booking</h2>
                                    <label>
                                        Credit card number
                                        <input className="input-one" type="text" placeholder="1234 4567 8912 3456" />
                                    </label>
                                    <div>
                                        <label>
                                            Cvv
                                            <input type="text" placeholder="123" />
                                        </label>
                                        <label>
                                            Exp date
                                            <input type="text" placeholder="12/1234" />
                                        </label>
                                    </div>
                                    <label>
                                        Cardholder name
                                        <input type="text" placeholder="Post Malone" />
                                    </label>

                                    <div className="payment-error-div">{paymentError}</div>
                                </div>
                            }

                            {debitDiv &&
                                <div className="payment-card-container">
                                    <h2>Please enter your card details to complete your booking</h2>
                                    <label>
                                        Debit card number
                                        <input className="input-one" type="text" placeholder="1234 4567 8912 3456" />
                                    </label>
                                    <div>
                                        <label>
                                            Cvv
                                            <input type="text" placeholder="123" />
                                        </label>
                                        <label>
                                            Exp date
                                            <input type="text" placeholder="12/1234" />
                                        </label>
                                    </div>
                                    <label>
                                        Cardholder name
                                        <input type="text" placeholder="Post Malone" />
                                    </label>

                                    <div className="payment-error-div">{paymentError}</div>
                                </div>
                            }

                            {netDiv &&
                                <div className="payment-card-container">
                                    <h2>Please enter your netbanking account id and password to pay for your booking</h2>
                                    <label>
                                        User Id
                                        <input type="number" placeholder="user Id" />
                                    </label>
                                    <label>
                                        Password
                                        <input type="password" placeholder="password" />
                                    </label>

                                    <div className="payment-error-div">{paymentError}</div>
                                </div>
                            }

                            {upiDiv &&
                                <div className="payment-upi-container">
                                    <div className="upi-id-container">
                                        Enter UPI ID
                                        <input type="text" name="upiId" placeholder="Enter your UPI ID" onClick={handleInputChange}/>
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

                    <div className="payment-paynow">
                        <div className="payment-terms">
                            <input type="checkbox" onClick={handleCheckboxChange}/>
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



