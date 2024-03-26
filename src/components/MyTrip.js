import { useContext, useEffect, useState } from "react";
import { AuthContext } from "./App";
import axios from "axios";
import profileImage from '../image/profile-image.jpg'
import { NavLink } from "react-router-dom";

export default function MyTrip() {
    const { setPaymentSuccessDiv } = useContext(AuthContext);
    const [bookingData, setBookingData] = useState();
    const [showPassword, setShowPassword] = useState(false);

    console.log("Booking data: ", bookingData);

    useEffect(() => {
        setPaymentSuccessDiv(false);
    }, [setPaymentSuccessDiv])

    useEffect(() => {
        const token = sessionStorage.getItem("userToken");
        const config = {
            headers: {
                "Content-Type": "application/json",
                "projectID": "f104bi07c490",
                "Authorization": `Bearer ${token}`
            }
        }

        axios.get("https://academics.newtonschool.co/api/v1/bookingportals/booking", config)
            .then((response) => {
                console.log(response.data.data);
                setBookingData(response.data.data);
            })
            .catch((error) => {
                console.log(error);
            })
    }, [])

    const userName = sessionStorage.getItem("loggedInUserName");
    const loggedInUserString = sessionStorage.getItem("loggedInUser");
    const loggedInUser = JSON.parse(loggedInUserString);
    const { email, password } = loggedInUser;

    return (
        <div className="mytrip-container">
            <div className="mytrip-welcome-info-section">
                <h1>HELLO <span>{userName.toUpperCase()}</span></h1>
                <p>This is your trip page. You can see all of the bookings you have made on cleartrip right here and view your account details.</p>
            </div>

            <div className="mytrip-mytrip-content-and-profile-section">
                <div className="mytrip-info-div">
                    {bookingData && bookingData.map((booking, index) => (
                        <div key={index} className="mytrip-flight-card">
                            {booking.booking_type === "flight" ? (
                                <div key={booking.flight._id} className="mytrip-flight-card-section">
                                    <div className="mytrip-logo-section">
                                        <img src="https://images.jdmagicbox.com/comp/delhi/c9/011pxx11.xx11.171229170107.e6c9/catalogue/indigo-air-cargo-services-mahipalpur-extension-delhi-cargo-services-i9owvibyd4.jpg" />
                                        <span>IndiGo</span>
                                        <p>{booking.flight.flightID.slice(0, 5)}</p>
                                    </div>

                                    <div className="mytrip-flight-info">
                                        <div className="mytrip-srcdes">
                                            <p>{booking.flight.source}</p>
                                            <span>{booking.flight.departureTime}</span>
                                        </div>
                                        <div>
                                            <div className="flight-duration-and-stop-container">
                                                <div className="flight-hours">{booking.flight.duration} hr</div>
                                                <div className="flight-line-break"></div>
                                                <div className="flight-stop-text">{booking.flight.stops} stop</div>
                                            </div>
                                        </div>
                                        <div className="mytrip-srcdes">
                                            <p>{booking.flight.destination}</p>
                                            <span>{booking.flight.arrivalTime}</span>
                                        </div>
                                    </div>

                                    <div className="hidden-flight-excess-information">
                                        <div className="hidden-flight-excess-text">
                                            Check-in baggage <span>15kg(1 piece) / adult</span></div>
                                        <div className="hidden-flight-excess-text">
                                            Cabin baggage <span>7kg / adult</span></div>
                                        <div className="hidden-flight-excess-text-amenities">
                                            <p>In-flight entertainment</p><p>Complimentary beverage</p><p>Booked on: {booking.created_at.substring(0, 10)}</p>
                                        </div>
                                    </div>
                                </div>
                            ) :
                                <div key={booking._id} className="mytrip-flight-card-section">
                                    <div className="mytrip-logo-section">
                                        <img src="https://images.unsplash.com/photo-1496417263034-38ec4f0b665a?q=80&w=3271&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />
                                        <span>{booking.hotel.name}</span>
                                        <p>{booking.hotel.location}</p>
                                    </div>

                                    <div className="mytrip-flight-info">
                                        <div className="mytrip-srcdes">
                                            {/* <p>{booking.flight.source}</p> */}
                                            {/* <span>{booking.flight.departureTime}</span> */}
                                        </div>
                                        <div>
                                            <div className="flight-duration-and-stop-container">
                                                {/* <div className="flight-hours">{booking.flight.duration} hr</div> */}
                                                {/* <div className="flight-line-break"></div> */}
                                                {/* <div className="flight-stop-text">{booking.flight.stops} stop</div> */}
                                            </div>
                                        </div>
                                        <div className="mytrip-srcdes">
                                            {/* <p>{booking.flight.destination}</p> */}
                                            {/* <span>{booking.flight.arrivalTime}</span> */}
                                        </div>
                                    </div>

                                    <div className="hidden-flight-excess-information">
                                        <div className="hidden-flight-excess-text">
                                            Check-in prior <span>One hour</span></div>
                                        <div className="hidden-flight-excess-text">
                                            Meal's Included <span>Breakfast/Lunch/Dinner</span></div>
                                        <div className="hidden-flight-excess-text-amenities">
                                            <p>Booked on: {booking.created_at.substring(0, 10)}</p>
                                        </div>
                                    </div>
                                </div>
                            }
                        </div>
                    ))}



                    {!bookingData && (
                        <div className="mytrip-home-button-container">
                            <p>You currently have no bookings associated to your account. To book flights or hotels, click the home button below.</p>
                            <NavLink to="/main" className="mytrip-navlink">
                                <button className="mytrip-home-button">HOME</button>
                            </NavLink>
                        </div>
                    )}
                </div>

                <div className="mytrip-profile-div">
                    <div className="profile-img-container">
                        <img src={profileImage} />
                    </div>
                    <div className="profile-info-container">
                        <div>
                            <span>Name</span>
                            <p>{userName}</p>
                        </div>
                        <div>
                            <span>Email</span>
                            <p>{email}</p>
                        </div>
                        <div>
                            <span>Password</span>
                            <p
                                onClick={() => setShowPassword(!showPassword)}
                                style={{ cursor: "pointer" }}
                            >
                                {showPassword ? password : "******"}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}



