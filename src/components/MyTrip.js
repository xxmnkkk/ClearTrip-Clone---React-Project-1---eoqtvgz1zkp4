import { useContext, useEffect, useState } from "react";
import { AuthContext } from "./App";
import axios from "axios";
import profileImage from '../image/profile-image.jpg'
import { NavLink } from "react-router-dom";

export default function MyTrip() {
    const { setPaymentSuccessDiv } = useContext(AuthContext);

    const [flightID, setFlightID] = useState();
    const [flightData, setFlightData] = useState();
    console.log(flightID)
    const [showPassword, setShowPassword] = useState(false);

    console.log(flightData);

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
                console.log(response);

                const userBookingDetails = JSON.parse(localStorage.getItem(`${userName}_bookingDetails`));
                console.log("Booking details: ", userBookingDetails)
                setFlightData(userBookingDetails);

                // const flightData = response.data.data.map((entry) => ({
                //     bookingType: entry.booking_type,
                //     flightId: entry._id,
                //     startDate: entry.start_date,
                //     endDate: entry.end_date
                // }))

                // flightData.forEach((flight) => {
                //     const { flightId, startDate, endDate } = flight;

                //     axios.get(`https://academics.newtonschool.co/api/v1/bookingportals/flight/${flightId}`, {
                //         headers: {
                //             projectID: "f104bi07c490"
                //         }
                //     })
                //         .then((flightDetailsResponse) => {
                //             console.log(`Flight ID: ${flightId}, Start Date: ${startDate}, End Date: ${endDate}`);
                //             console.log('Flight Details:', flightDetailsResponse.data);
                //         })
                //         .catch((error) => {
                //             console.error(`Error fetching data for Flight ID ${flightId}:`, error.message);
                //         });
                // })

                // let updatedFlightData = [];

                // flightData.forEach((flight) => {
                //     const flightId = flight.flightId;
                //     const flightInformation = localStorage.getItem(`flightData_${flightId}`);

                //     if (flightInformation) {
                //         const parsedFlightData = JSON.parse(flightInformation);
                //         updatedFlightData.push(parsedFlightData);
                //     } else {
                //         console.log(`Flight data not found for flight ID ${flightId}`);
                //     }
                // });

                // setFlightData(updatedFlightData);
            })
            .catch((error) => {
                console.log(error);
            })
    }, [])

    const userName = sessionStorage.getItem("loggedInUserName");
    const loggedInUserString = sessionStorage.getItem("loggedInUser");
    const loggedInUser = JSON.parse(loggedInUserString);
    const { email, password } = loggedInUser;

    // if(flightID){
    //     let updatedFlightData = [];

    //     flightID.forEach((flight) => {
    //         const flightId = flight.flightId;
    //         const flightInformation = localStorage.getItem(`flightData_${flightId}`);

    //         if (flightInformation) {
    //             const parsedFlightData = JSON.parse(flightInformation);

    //             updatedFlightData.push(parsedFlightData);
    //         } else {
    //             console.log(`Flight data not found for flight ID ${flightId}`);
    //         }
    //     });

    //     setFlightData(updatedFlightData);
    // }
    // else{
    //     console.log("No flight data");
    // }

    return (
        <div className="mytrip-container">
            <div className="mytrip-welcome-info-section">
                <h1>HELLO <span>{userName.toUpperCase()}</span></h1>
                <p>This is your trip page. You can see all of the bookings you have made on cleartrip right here and view your account details.</p>
            </div>

            <div className="mytrip-mytrip-content-and-profile-section">
                <div className="mytrip-info-div">
                    {flightData ? flightData.map((innerArray, index) => (
                        <div key={index} className="mytrip-flight-card">
                            {innerArray.map((flight) => (
                                <div key={flight._id} className="mytrip-flight-card-section">
                                    <div className="mytrip-logo-section">
                                        <img src="https://images.jdmagicbox.com/comp/delhi/c9/011pxx11.xx11.171229170107.e6c9/catalogue/indigo-air-cargo-services-mahipalpur-extension-delhi-cargo-services-i9owvibyd4.jpg" />
                                        <span>IndiGo</span>
                                        <p>{flight.flightID.slice(0, 5)}</p>
                                    </div>

                                    <div className="mytrip-flight-info">
                                        <div className="mytrip-srcdes">
                                            <p>{flight.source}</p>
                                            <span>{flight.departureTime}</span>
                                        </div>
                                        <div>
                                            <div class="flight-duration-and-stop-container">
                                                <div class="flight-hours">{flight.duration} hr</div>
                                                <div class="flight-line-break"></div>
                                                <div class="flight-stop-text">{flight.stops} stop</div>
                                            </div>
                                        </div>
                                        <div className="mytrip-srcdes">
                                            <p>{flight.destination}</p>
                                            <span>{flight.arrivalTime}</span>
                                        </div>
                                    </div>

                                    <div class="hidden-flight-excess-information">
                                        <div class="hidden-flight-excess-text">
                                            Check-in baggage <span>15kg(1 piece) / adult</span></div>
                                        <div class="hidden-flight-excess-text">
                                            Cabin baggage <span>7kg / adult</span></div>
                                        <div class="hidden-flight-excess-text-amenities">
                                            <p>In-flight entertainment</p><p>Complimentary beverage</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ))
                        :

                        <div className="mytrip-home-button-container">
                            <p>You currently have no bookings associated to your account. To book flights or hotels, click the home button below.</p>
                            <NavLink to="/main" className="mytrip-navlink">
                                <button className="mytrip-home-button">HOME</button>
                            </NavLink>
                        </div>

                    }
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