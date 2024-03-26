import axios from "axios"
import { useContext, useEffect, useState, useRef } from "react";
import { AuthContext } from "./App";
import DesAndArr from "./DesAndArr";
import { FaArrowRightLong } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { CiClock1 } from "react-icons/ci";
import PassangerFlight from "./PassangerFlight";

export default function Flight() {
    // Here im again importing my states that i want to use inside of this component
    const { startDate, endDate, isLoggedIn, setLoginModal, departure, arrival, flightDay, flightDayTwo, selectedFlightTrip, setSelectedFlightData, setSelectedHotelData, flightClass, roundFlightDetailsDiv, setRoundFlightDetailsDiv, checkoutStartDate, checkoutEndDate } = useContext(AuthContext);

    // While on this page im setting the selected hotel data to null
    setSelectedHotelData(null);

    const navigate = useNavigate();
    const selectedFlightDivRef = useRef(null);

    // Here im defining my state to store my one way flight detail
    const [flights, setFlights] = useState({
        data: {
            flights: []
        }
    });

    console.log(flights);

    // Here im defining my state to store my round flight detail
    const [flightsTwo, setFlightsTwo] = useState({
        data: {
            flights: []
        }
    });

    // Here im defining the state for storing in the selected flight information
    const [selectedToFlights, setSelectedToFlights] = useState([]);
    const [selectedBackFlights, setSelectedBackFlights] = useState([]);

    console.log("selectedToFlights: ", selectedToFlights);
    console.log("selectedBackFlights: ", selectedBackFlights);

    // Here im defining the filter states
    const [selectedStopsFilter, setSelectedStopsFilter] = useState(null);
    const [priceFilter, setPriceFilter] = useState({ min: null, max: null });
    console.log("selected to flight: ", selectedToFlights);
    console.log("selected back flight: ", selectedBackFlights);

    const [selectedSort, setSelectedSort] = useState(null);

    // Here, when the list is displayed for all the flights that is available for the route, im storinng the index for one way flight and rounnd trip flights seperately so that i can show them cards inside of the booking reviev section
    const [selectedFlightIndex, setSelectedFlightIndex] = useState(null);
    const [selectedRoundFlightIndex1, setSelectedRoundFlightIndex1] = useState(null);
    const [selectedRoundFlightIndex2, setSelectedRoundFlightIndex2] = useState(null);

    // Here im just defining state for loading and error
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Here im basically checking what trip ive selected and calling the apis according 
    if (selectedFlightTrip === "oneway" || selectedFlightTrip === "One way") {
        // Like for one way flight im calling the api once
        useEffect(() => {
            setLoading(true);
            setError(null);

            const queryParams = {
                source: departure,
                destination: arrival,
                day: flightDay
            };

            const config = {
                headers: {
                    "Content-type": "application/json",
                    "projectID": "f104bi07c490",
                },
                params: queryParams
            };

            axios.get("https://academics.newtonschool.co/api/v1/bookingportals/flight/", config)
                .then((response) => {
                    setFlights(response.data);
                })
                .catch((error) => {
                    console.log(error);
                    setError(error.message);
                })
                .finally(() => {
                    setLoading(false);
                });
        }, [departure, arrival, flightDay]);
    } else {
        // But for round trip flight im calling the api with departure and arrival locations exchanged and the dates as well
        useEffect(() => {
            setLoading(true);
            setError(null);

            const queryParams = {
                source: departure,
                destination: arrival,
                day: flightDay
            };

            const config = {
                headers: {
                    "Content-type": "application/json",
                    "projectID": "f104bi07c490",
                },
                params: queryParams
            };

            axios.get("https://academics.newtonschool.co/api/v1/bookingportals/flight/", config)
                .then((response) => {
                    setFlights(response.data);
                })
                .catch((error) => {
                    console.log(error);
                    setError(error.message);
                })
                .finally(() => {
                    setLoading(false);
                });
        }, [departure, arrival, flightDay]);


        useEffect(() => {
            setLoading(true);
            setError(null);

            const queryParams = {
                source: arrival,
                destination: departure,
                day: flightDay
            };

            const config = {
                headers: {
                    "Content-type": "application/json",
                    "projectID": "f104bi07c490",
                },
                params: queryParams
            };

            axios.get("https://academics.newtonschool.co/api/v1/bookingportals/flight/", config)
                .then((response) => {
                    setFlightsTwo(response.data);
                })
                .catch((error) => {
                    console.log(error);
                    setError(error.message);
                })
                .finally(() => {
                    setLoading(false);
                });
        }, [departure, arrival, flightDayTwo]);
    }

    // If loading is true then im just returning in my loading div
    if (loading) {
        return <div className="api-loading-container">
            <div className="api-loading"></div>
        </div>
    }

    // If there is an error im just displaying the error
    if (error) {
        return <div className="api-error">{error}</div>;
    }

    // Here i have two varibles which stores the data for oneway and round trip flight seperately, so that which ever has data gets loaded up on the screen
    const flightData = flights.data.flights;
    const flightDataTwo = flightsTwo.data.flights;

    // This below two function's handles the click of flight cards and helps in setting up the index
    const handleSelectFlight = (flight, index) => {
        setSelectedToFlights([flight]);
        setSelectedRoundFlightIndex1(index);
    };

    const handleSelectFlight2 = (flight, index) => {
        setSelectedBackFlights([flight]);
        setSelectedRoundFlightIndex2(index);
    };

    // This function handles the click of book flight button
    const handleBookFlight = () => {
        // Here im just checking in the length of the flight data so that i can store the data for one-way/round flight accordingly
        if (selectedToFlights.length > 0) {
            const selectedFlights = selectedBackFlights.length > 0
                ? [selectedToFlights[0], selectedBackFlights[0]]
                : [selectedToFlights[0]];

            setSelectedFlightData(selectedFlights);
        }

        // Here im performing authentication
        if (isLoggedIn) {
            navigate("/checkout")
        } else {
            setLoginModal(true);
        }
    };

    // Here, when one-way flight book button is clicked, im storing the data inside of the state and performing authentication as well
    const handleOneWayFlight = (flight) => {
        setSelectedFlightData([flight])

        if (isLoggedIn) {
            navigate("/checkout");
        } else {
            setLoginModal(true);
        }
    }

    // Here im setting the slected stop so that filter can be applied and also im setting the price filter state to its default value
    const handleStopsChange = (event) => {
        setSelectedStopsFilter(event.target.value);
        setPriceFilter({ min: null, max: null });
    };

    // Here im checking certain conditions to filter out the flight data. im using the filter function
    // So basically im checking if my state is falsy and if it is then all the data pass this criteria but if it is not then it checks for the second condition accordingly in each braces of code. 
    // So whatever flight data returs a boolean value true gets included inside of the new array 
    const filteredFlightData = flightData.filter((flight) => {
        return (
            (!selectedStopsFilter || flight.stops === parseInt(selectedStopsFilter)) &&
            (!priceFilter.min || flight.ticketPrice >= priceFilter.min) &&
            (!priceFilter.max || flight.ticketPrice <= priceFilter.max)
        );
    });

    const filteredFlightDataTwo = flightDataTwo.filter((flight) => {
        return (
            (!selectedStopsFilter || flight.stops === parseInt(selectedStopsFilter)) &&
            (!priceFilter.min || flight.ticketPrice >= priceFilter.min) &&
            (!priceFilter.max || flight.ticketPrice <= priceFilter.max)
        );
    });

    // this is just a function to store the value of price filter that is to be applied (lowToHigh or highToLow)
    const handleSortChange = (event) => {
        setSelectedSort(event.target.value);
    };

    // Here im just creating a copy of the filtered flight data
    const sortedFlightData = [...filteredFlightData];
    const sortedFlightDataTwo = [...filteredFlightDataTwo];

    // Here im checking if any filter has been chosen for the price range, and if true then im just sorting the data accordingly
    if (selectedSort === 'lowToHigh') {
        sortedFlightData.sort((a, b) => a.ticketPrice - b.ticketPrice);
        sortedFlightDataTwo.sort((a, b) => a.ticketPrice - b.ticketPrice);
    } else if (selectedSort === 'highToLow') {
        sortedFlightData.sort((a, b) => b.ticketPrice - a.ticketPrice);
        sortedFlightDataTwo.sort((a, b) => b.ticketPrice - a.ticketPrice);
    }

    // Here im storing in the flight data that is to be displayed if any filter is applied
    const displayedFlightData = selectedSort ? sortedFlightData : filteredFlightData;
    const displayedFlightDataTwo = selectedSort ? sortedFlightDataTwo : filteredFlightDataTwo;

    // For one way flight, for a specefic indexes hidden div to open, im checking if the selected index is what the button has being clicked on
    const handleToggleDetails = (index) => {
        setSelectedFlightIndex((prevIndex) => (prevIndex === index ? null : index));
    };

    // Here im setting the round flight hidden div information modal to true when the function is being called
    const handleRoundFlightHiddenDiv = () => {
        setRoundFlightDetailsDiv(true);
    }

    // Here im checking the length of the flight data so that i can apply required css conditionally for the header bar for clearing the user about the section's of the card
    if (selectedToFlights.length > 0) {
        const roundFlightHelpBar = document.querySelector(".round-flight-help-bar");
        if (roundFlightHelpBar) {
            roundFlightHelpBar.style.top = '181px';
        }

        if (selectedBackFlights.length > 0) {
            roundFlightHelpBar.style.top = '250.5px';
        }
    }

    return <>
        <div className="flight-container" ref={selectedFlightDivRef}>
            {/* This is the code for the flight modification, namely the desparture and arrival destinations and the passanger count */}
            <div className="flight-modify-search-container">
                <div className="dep-and-arr-div">
                    <DesAndArr />
                    <div className="flight-passanger-modifier">
                        <PassangerFlight />
                    </div>
                </div>
            </div>

            <div className="flight-filter-and-flightinfo-container">
                {/* The below code is for the filter section */}
                <div className="filter-container">
                    <div className="filter-stop-container">
                        {/* This is the code for the stops change filter*/}
                        <h3>Stops</h3>
                        <div className="stop-selection-container">
                            <div className="stops-selection">
                                <label>
                                    <input type="radio" name="stops" value="0" onChange={handleStopsChange} /> Non-stop
                                </label>
                            </div>
                            <div className="stops-selection">
                                <label>
                                    <input type="radio" name="stops" value="1" onChange={handleStopsChange} /> 1 stop
                                </label>
                            </div>
                            <div className="stops-selection">
                                <label>
                                    <input type="radio" name="stops" value="2" onChange={handleStopsChange} /> 2 stops
                                </label>
                            </div>
                            <div className="stops-selection">
                                <label>
                                    <input type="radio" name="stops" onChange={() => setSelectedStopsFilter(null)} /> Default
                                </label>
                            </div>

                        </div>

                        {/* This is the code for the price change filter*/}
                        <h3>Sort By Price</h3>
                        <div className="sort-checkboxes">
                            <label>
                                <input type="radio" name="price-checkbox" value="default" checked={!selectedSort} onChange={handleSortChange} />
                                Default
                            </label>
                            <label>
                                <input type="radio" name="price-checkbox" value="lowToHigh" checked={selectedSort === 'lowToHigh'} onChange={handleSortChange} />
                                Low to High
                            </label>
                            <label>
                                <input type="radio" name="price-checkbox" value="highToLow" checked={selectedSort === 'highToLow'} onChange={handleSortChange} />
                                High to Low
                            </label>
                        </div>

                        {/* this is the code for time change, this one is for visual representation only */}
                        <h3>Time</h3>
                        <div className="sort-checkboxes">
                            <div className="sort-inner-div">
                                <label>
                                    <input type="radio" name="time-checkbox" />
                                    Early morning
                                </label>
                                <div>Midnight - 8 am</div>
                            </div>

                            <div className="sort-inner-div">
                                <label>
                                    <input type="radio" name="time-checkbox" />
                                    Morning
                                </label>
                                <div>8 am - Noon</div>
                            </div>

                            <div className="sort-inner-div">
                                <label>
                                    <input type="radio" name="time-checkbox" />
                                    Afternoon
                                </label>
                                <div>Noon - 4 pm</div>
                            </div>

                            <div className="sort-inner-div">
                                <label>
                                    <input type="radio" name="time-checkbox" />
                                    Evening
                                </label>
                                <div>4 pm - 8 pm</div>
                            </div>

                            <div className="sort-inner-div">
                                <label>
                                    <input type="radio" name="time-checkbox" />
                                    Night
                                </label>
                                <div>8 pm - Midnight</div>
                            </div>
                        </div>

                        {/* this is the code for trip duration change, this one is for visual representation only */}
                        <h3>Trip duration</h3>
                        <div className="sort-sliders">
                            <label>
                                <div>
                                    <span>1 hour</span>
                                    <span>29 hours</span>
                                </div>
                                <input type="range" />
                            </label>
                        </div>

                        {/* this is the code for layover duration change, this one is for visual representation only */}
                        <h3>Layover duration</h3>
                        <div className="sort-sliders">
                            <label>
                                <div>
                                    <span>1 hour</span>
                                    <span>24 hours</span>
                                </div>
                                <input type="range" />
                            </label>
                        </div>

                    </div>
                </div>

                {/* The below code is for the flight information */}
                <div className="flight-information-section">
                    {/* The below code is for visual representation showing off some adds and offers available on certain bank cards */}
                    <div className="flight-adds-container">
                        <div className="flight-add">
                            <img src="https://fastui.cltpstatic.com/image/upload/offermgmt/images/bank-logos/svg/AUBank.svg" />
                            <div className="flight-add-text">
                                Flat 15% off
                                <p>AUFEST <span>| with AU Bank Credit Cards</span></p>
                            </div>
                        </div>

                        <div className="flight-add">
                            <img src="https://fastui.cltpstatic.com/image/upload/offermgmt/images/bank-logos/svg/HDFC.svg" />
                            <div className="flight-add-text">
                                Get up to ₹ 2,000 off
                                <p>HDFCEMI <span>| with HDFC Credit Card EMI</span></p>
                            </div>
                        </div>

                        <div className="flight-add">
                            <img src="https://fastui.cltpstatic.com/image/upload/offermgmt/images/bank-logos/svg/ICICI.svg" />
                            <div className="flight-add-text">
                                Flat 10% off
                                <p>ICICINB <span>| with ICICI Net Banking</span></p>
                            </div>
                        </div>

                        <div className="flight-add">
                            <img src="https://fastui.cltpstatic.com/image/upload/offermgmt/images/bank-logos/svg/ICICI.svg" />
                            <div className="flight-add-text">
                                Flat 10% off
                                <p>ICICINB <span>| with ICICI Net Banking</span></p>
                            </div>
                        </div>

                        <div className="flight-add">
                            <img src="https://fastui.cltpstatic.com/image/upload/offermgmt/images/bank-logos/svg/CT_offer.png" />
                            <div className="flight-add-text">
                                Flat 10% off
                                <p>CTDOTW <span>| on Flights to Rajasthan</span></p>
                            </div>
                        </div>

                        <div className="flight-add">
                            <img src="https://fastui.cltpstatic.com/image/upload/offermgmt/images/bank-logos/svg/PNB.svg" />
                            <div className="flight-add-text">
                                Flat 15% off
                                <p>PNBCC <span>| with PNB Credit Cards</span></p>
                            </div>
                        </div>

                        <div className="flight-add">
                            <img src="https://fastui.cltpstatic.com/image/upload/offermgmt/images/bank-logos/svg/OneCard.svg" />
                            <div className="flight-add-text">
                                Flat 10% off + 3 & 6 months NCEMI
                                <p>ONECARDEMI <span>| with OneCard Credit Card EMI</span></p>
                            </div>
                        </div>

                        <div className="flight-add">
                            <img src="https://fastui.cltpstatic.com/image/upload/offermgmt/images/bank-logos/svg/ICICI.svg" />
                            <div className="flight-add-text">
                                Flat 12% off + No Cost EMI
                                <p>ICICIEMI <span>| with ICICI Credit Card EMI</span></p>
                            </div>
                        </div>

                        <div className="flight-add">
                            <img src="https://fastui.cltpstatic.com/image/upload/offermgmt/images/bank-logos/svg/IDBI.svg" />
                            <div className="flight-add-text">
                                Flat 15% off
                                <p>IDBICC <span>| with IDBI Bank Credit Cards</span></p>
                            </div>
                        </div>

                        <div className="flight-add">
                            <img src="https://fastui.cltpstatic.com/image/upload/offermgmt/images/bank-logos/svg/CT_offer.png" />
                            <div className="flight-add-text">
                                Get up to ₹2,500 off
                                <p>CTAISPL <span>| on Air India Flights</span></p>
                            </div>
                        </div>
                    </div>

                    {/* This code is for displaying the helping bar for one-way flight in the top of the flight card that helps the user to know what eact information on the flight card depicts*/}
                    {(selectedFlightTrip === "One way" || selectedFlightTrip === "oneway") &&
                        <div className="flight-help-bar">
                            <div className="flight-help-bar-1">Airlines</div>
                            <div className="flight-help-bar-ultra">
                                <div className="flight-help-bar-2">Departure</div>
                                <div className="flight-help-bar-3">Duration</div>
                                <div className="flight-help-bar-4">Arrival</div>
                            </div>
                            <div className="flight-help-bar-5">Price</div>
                            <div className="flight-help-bar-6"></div>
                        </div>
                    }

                    {/* This code is for showing the user what flight has been selected while on the round trip option */}
                    {(selectedToFlights.length > 0 || selectedBackFlights.length > 0) &&
                        <div className="selected-flight-div-container">
                            <div className="selected-flight-div">
                                {/* Here im mapping out the data that ive stores inside of the state which contains the selected flight */}
                                {selectedToFlights.length > 0 &&
                                    <div className="selected-flight">
                                        {selectedToFlights.map((selectedFlight, index) => (
                                            <div className="selected-flight-card" key={index}>
                                                <div className="selected-flight-name-container">
                                                    <div className="selected-flight-name">
                                                        <img src="https://seeklogo.com/images/I/indigo-logo-EDBB4B3C09-seeklogo.com.png" />
                                                        <span className="selected-airline-name">IndiGo</span>
                                                    </div>
                                                    <span className="selected-flight-id">{selectedFlight.flightID}</span>
                                                </div>

                                                <div className="flight-info-container">
                                                    <div className="flight-source-and-departure-time-container">
                                                        <div className="flight-location-text">{selectedFlight.source}</div>
                                                        <div>{selectedFlight.departureTime}</div>
                                                    </div>

                                                    <div className="flight-duration-and-stop-container">
                                                        <div className="flight-hours">{selectedFlight.duration} hr</div>
                                                        <div className="flight-line-break"></div>
                                                        <div className="flight-stop-text">{selectedFlight.stops} stop</div>
                                                    </div>

                                                    <div className="flight-destination-and-arrival-time-container">
                                                        <div className="flight-location-text">{selectedFlight.destination}</div>
                                                        <div>{selectedFlight.arrivalTime}</div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                }

                                {/* Here im mapping out the data that ive stores inside of the state which contains the selected flight */}
                                {selectedBackFlights.length > 0 &&
                                    <div className="selected-flight">
                                        {selectedBackFlights.map((selectedFlight, index) => (
                                            <div className="selected-flight-card" key={index}>
                                                <div className="selected-flight-name-container">
                                                    <div className="selected-flight-name">
                                                        <img src="https://seeklogo.com/images/I/indigo-logo-EDBB4B3C09-seeklogo.com.png" />
                                                        <span className="selected-airline-name">IndiGo</span>
                                                    </div>
                                                    <span className="selected-flight-id">{selectedFlight.flightID}</span>
                                                </div>

                                                <div className="flight-info-container">
                                                    <div className="flight-source-and-departure-time-container">
                                                        <div className="flight-location-text">{selectedFlight.source}</div>
                                                        <div>{selectedFlight.departureTime}</div>
                                                    </div>

                                                    <div className="flight-duration-and-stop-container">
                                                        <div className="flight-hours">{selectedFlight.duration} hr</div>
                                                        <div className="flight-line-break"></div>
                                                        <div className="flight-stop-text">{selectedFlight.stops} stop</div>
                                                    </div>

                                                    <div className="flight-destination-and-arrival-time-container">
                                                        <div className="flight-location-text">{selectedFlight.destination}</div>
                                                        <div>{selectedFlight.arrivalTime}</div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                }
                            </div>

                            {/* This code displays the flight price and book flight button. it also has a flight detiails button which opens up the hidden modal */}
                            {(selectedToFlights.length > 0 && selectedBackFlights.length > 0) &&
                                <div className="selected-flight-details">
                                    <span onClick={handleRoundFlightHiddenDiv}>Flight details</span>
                                    <div className="selected-flight-price-container">
                                        <div>
                                            <p className="selected-flight-price-text">₹ {selectedToFlights[0].ticketPrice + selectedBackFlights[0].ticketPrice} </p>
                                            <span>Get ₹425 off with CTDOM</span>
                                        </div>
                                        <button onClick={handleBookFlight} className="flight-book-button">Book flight</button>
                                    </div>
                                </div>

                            }
                        </div>
                    }

                    {/* This code is for displaying the helping bar for round-trip flight in the top of the flight card that helps the user to know what eact information on the flight card depicts*/}
                    {selectedFlightTrip === "Round trip" &&
                        <div className="round-flight-help-bar">
                            <div className="round-helpbar">
                                <div className="round-helpbar-name">Airlines</div>
                                <div className="round-helpbar-time">
                                    <div>Departure</div>
                                    <div>Duration</div>
                                    <div>Arrival</div>
                                </div>
                                <div>Price</div>
                            </div>

                            <div className="round-helpbar">
                                <div className="round-helpbar-name">Airlines</div>
                                <div className="round-helpbar-time">
                                    <div>Departure</div>
                                    <div>Duration</div>
                                    <div>Arrival</div>
                                </div>
                                <div>Price</div>
                            </div>
                        </div>
                    }

                    {/* This is the code for the hidden round-trip flight detail modal */}
                    {roundFlightDetailsDiv && selectedToFlights.length > 0 && selectedBackFlights.length > 0 &&
                        <>
                            <div className="round-details-modal-layover">
                                <div className="round-modal-details-container">
                                    {/* Below code just shows a close icon that can be used to close the modal */}
                                    <div className="round-modal-details-close-container">
                                        Details of your round trip
                                        <button onClick={() => setRoundFlightDetailsDiv(false)}>Close</button>
                                    </div>

                                    {/* The below code shows the flight details inside of the modal */}
                                    <div className="hidden-flight-details-container">
                                        <div className="hidden-flight-des-arr-date">
                                            {departure} <FaArrowRightLong /> {arrival} <span>{flightDay}, {startDate}</span>
                                        </div>
                                        <hr />
                                        <div className="hidden-flight-information">
                                            <div className="hidden-flight-logo-name">
                                                <img src="https://seeklogo.com/images/I/indigo-logo-EDBB4B3C09-seeklogo.com.png" />
                                                <span className="hidden-airline-name">IndiGo</span>
                                                <div>
                                                    <span className="hidden-flight-id">{selectedToFlights[0].flightID}</span>
                                                    <span>{flightClass}</span>
                                                </div>
                                            </div>

                                            <div className="hidden-flight-deparr">
                                                <span>{selectedToFlights[0].source} <strong>{selectedToFlights[0].departureTime}</strong></span>
                                                <p>{flightDay}, {startDate}</p>
                                            </div>

                                            <div className="hidden-flight-duration">
                                                <CiClock1 className="hidden-clock-icon" />
                                                <span>{selectedToFlights[0].duration} hr</span>
                                            </div>

                                            <div className="hidden-flight-deparr">
                                                <span>{selectedToFlights[0].destination} <strong>{selectedToFlights[0].arrivalTime}</strong></span>
                                                <p>{flightDay}, {startDate}</p>
                                            </div>

                                            <div className="hidden-flight-excess-information">
                                                <div className="hidden-flight-excess-text">
                                                    Check-in baggage <span>15kg(1 piece) / adult</span>
                                                </div>
                                                <div className="hidden-flight-excess-text">
                                                    Cabin baggage <span>7kg / adult</span>
                                                </div>
                                                <div className="hidden-flight-excess-text-amenities">
                                                    <p>In-flight entertainment</p>
                                                    <p>Complimentary beverage</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* The below code shows the flight details inside of the modal */}
                                    <div className="hidden-flight-details-container">
                                        <div className="hidden-flight-des-arr-date">
                                            {arrival} <FaArrowRightLong /> {departure} <span>{flightDayTwo}, {endDate}</span>
                                        </div>
                                        <hr />
                                        <div className="hidden-flight-information">
                                            <div className="hidden-flight-logo-name">
                                                <img src="https://seeklogo.com/images/I/indigo-logo-EDBB4B3C09-seeklogo.com.png" />
                                                <span className="hidden-airline-name">IndiGo</span>
                                                <div>
                                                    <span className="hidden-flight-id">{selectedBackFlights[0].flightID}</span>
                                                    <span>{flightClass}</span>
                                                </div>
                                            </div>

                                            <div className="hidden-flight-deparr">
                                                <span>{selectedBackFlights[0].source} <strong>{selectedBackFlights[0].departureTime}</strong></span>
                                                <p>{flightDayTwo}, {endDate}</p>
                                            </div>

                                            <div className="hidden-flight-duration">
                                                <CiClock1 className="hidden-clock-icon" />
                                                <span>{selectedBackFlights[0].duration} hr</span>
                                            </div>

                                            <div className="hidden-flight-deparr">
                                                <span>{selectedBackFlights[0].destination} <strong>{selectedBackFlights[0].arrivalTime}</strong></span>
                                                <p>{flightDayTwo}, {endDate}</p>
                                            </div>

                                            <div className="hidden-flight-excess-information">
                                                <div className="hidden-flight-excess-text">
                                                    Check-in baggage <span>15kg(1 piece) / adult</span>
                                                </div>
                                                <div className="hidden-flight-excess-text">
                                                    Cabin baggage <span>7kg / adult</span>
                                                </div>
                                                <div className="hidden-flight-excess-text-amenities">
                                                    <p>In-flight entertainment</p>
                                                    <p>Complimentary beverage</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* The below code shows the price details and a book button */}
                                    <div className="round-modal-price-and-booking">
                                        {(selectedToFlights.length > 0 && selectedBackFlights.length > 0) &&
                                            <div className="selected-flight-price-container">
                                                <div>
                                                    <p className="selected-flight-price-text">₹ {selectedToFlights[0].ticketPrice + selectedBackFlights[0].ticketPrice} </p>
                                                    <span>Get ₹425 off with CTDOM</span>
                                                </div>
                                                <button onClick={handleBookFlight} className="flight-book-button">Book flight</button>
                                            </div>
                                        }
                                    </div>
                                </div>
                            </div>
                        </>
                    }

                    {/* The below code is for the ui of one-way flight card. im basically mapping out the data in each card */}
                    {(selectedFlightTrip === "One way" || selectedFlightTrip === "oneway") &&
                        displayedFlightData.map((flight, index) => (
                            <div className="flight-information-container" key={index}>
                                <div className="flightinfo-container">
                                    <div className="flight-name-container">
                                        <img src="https://seeklogo.com/images/I/indigo-logo-EDBB4B3C09-seeklogo.com.png" />
                                        <span className="airline-name">IndiGo</span>
                                        <span onClick={() => handleToggleDetails(index)} className="flight-details-button">
                                            {selectedFlightIndex === index ? 'Hide Details' : 'Flight Details'}
                                        </span>
                                    </div>

                                    <div className="flight-info-container">
                                        <div className="flight-source-and-departure-time-container">
                                            <div className="flight-location-text">{flight.source}</div>
                                            <div>{flight.departureTime}</div>
                                        </div>

                                        <div className="flight-duration-and-stop-container">
                                            <div className="flight-hours">{flight.duration} hr</div>
                                            <div className="flight-line-break"></div>
                                            <div className="flight-stop-text">{flight.stops} stop</div>
                                        </div>

                                        <div className="flight-destination-and-arrival-time-container">
                                            <div className="flight-location-text">{flight.destination}</div>
                                            <div>{flight.arrivalTime}</div>
                                        </div>
                                    </div>

                                    <div className="flight-price-container">
                                        <div className="flight-seats-text">{flight.availableSeats} seats left</div>
                                        <div className="flight-price-text">₹ {flight.ticketPrice}</div>
                                    </div>

                                    <div className="flight-book-button-container">
                                        <button onClick={() => handleOneWayFlight(flight)} className="flight-select-button">Book</button>
                                    </div>
                                </div>

                                {/* This code is displayed only when the flight details button on a specific card is clicked. it checks for the selected index and executes accordingly */}
                                {selectedFlightIndex === index && (
                                    <div className="hidden-flight-details-container">
                                        <div className="hidden-flight-des-arr-date">
                                            {departure} <FaArrowRightLong /> {arrival} <span>{flightDay}, {startDate}</span>
                                        </div>
                                        <hr />
                                        <div className="hidden-flight-information">
                                            <div className="hidden-flight-logo-name">
                                                <img src="https://seeklogo.com/images/I/indigo-logo-EDBB4B3C09-seeklogo.com.png" />
                                                <span className="hidden-airline-name">IndiGo</span>
                                                <div>
                                                    <span className="hidden-flight-id">{flight.flightID}</span>
                                                    <span>{flightClass}</span>
                                                </div>
                                            </div>

                                            <div className="hidden-flight-deparr">
                                                <span>{flight.source} <strong>{flight.departureTime}</strong></span>
                                                <p>{flightDay}, {startDate}</p>
                                            </div>

                                            <div className="hidden-flight-duration">
                                                <CiClock1 className="hidden-clock-icon" />
                                                <span>{flight.duration} hr</span>
                                            </div>

                                            <div className="hidden-flight-deparr">
                                                <span>{flight.destination} <strong>{flight.arrivalTime}</strong></span>
                                                <p>{flightDay}, {startDate}</p>
                                            </div>

                                            <div className="hidden-flight-excess-information">
                                                <div className="hidden-flight-excess-text">
                                                    Check-in baggage <span>15kg(1 piece) / adult</span>
                                                </div>
                                                <div className="hidden-flight-excess-text">
                                                    Cabin baggage <span>7kg / adult</span>
                                                </div>
                                                <div className="hidden-flight-excess-text-amenities">
                                                    <p>In-flight entertainment</p>
                                                    <p>Complimentary beverage</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))
                    }

                    {/* The below code is for the ui of round-trip flight card. im basically mapping out the data in each card */}
                    {selectedFlightTrip === "Round trip" &&
                        <div className="round-trip-flight-container">
                            <div className="roundtrip-flight-information-section">
                                {/* Here im mapping out the data for the departure to arrival flight */}
                                {displayedFlightData.map((flight, index) => (
                                    <div
                                        className={`round-trip-flightinfo-container ${selectedRoundFlightIndex1 === index ? 'selected-flight-card-in-roundtrip' : ''}`}
                                        key={index} onClick={() => handleSelectFlight(flight, index)}
                                    >
                                        <div className="round-trip-flight-name-container">
                                            <img src="https://seeklogo.com/images/I/indigo-logo-EDBB4B3C09-seeklogo.com.png" />
                                            <span className="airline-name">IndiGo</span>
                                            <span className="flight-id">{flight.flightID}</span>
                                        </div>

                                        <div className="round-trip-flight-info-container">
                                            <div className="flight-source-and-departure-time-container">
                                                <div className="flight-location-text">{flight.source}</div>
                                                <div>{flight.departureTime}</div>
                                            </div>

                                            <div className="flight-duration-and-stop-container">
                                                <div className="flight-hours">{flight.duration} hr</div>
                                                <div className="flight-line-break"></div>
                                                <div className="flight-stop-text">{flight.stops} stop</div>
                                            </div>

                                            <div className="flight-destination-and-arrival-time-container">
                                                <div className="flight-location-text">{flight.destination}</div>
                                                <div>{flight.arrivalTime}</div>
                                            </div>
                                        </div>

                                        <div className="round-trip-flight-price-container">
                                            <div className="flight-seats-text">{flight.availableSeats} seats left</div>
                                            <div className="flight-price-text">₹ {flight.ticketPrice}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="roundtrip-flight-information-section">
                                {/* Here im mapping out the data for the reverse(departure to arrival) flight */}
                                {displayedFlightDataTwo.map((flight, index) => (
                                    <div
                                        className={`round-trip-flightinfo-container ${selectedRoundFlightIndex2 === index ? 'selected-flight-card-in-roundtrip' : ''}`}
                                        key={index} onClick={() => handleSelectFlight2(flight, index)}
                                    >
                                        <div className="round-trip-flight-name-container">
                                            <img src="https://seeklogo.com/images/I/indigo-logo-EDBB4B3C09-seeklogo.com.png" />
                                            <span className="airline-name">IndiGo</span>
                                            <span className="flight-id">{flight.flightID}</span>
                                        </div>

                                        <div className="round-trip-flight-info-container">
                                            <div className="flight-source-and-departure-time-container">
                                                <div className="flight-location-text">{flight.source}</div>
                                                <div>{flight.departureTime}</div>
                                            </div>

                                            <div className="flight-duration-and-stop-container">
                                                <div className="flight-hours">{flight.duration} hr</div>
                                                <div className="flight-line-break"></div>
                                                <div className="flight-stop-text">{flight.stops} stop</div>
                                            </div>

                                            <div className="flight-destination-and-arrival-time-container">
                                                <div className="flight-location-text">{flight.destination}</div>
                                                <div>{flight.arrivalTime}</div>
                                            </div>
                                        </div>

                                        <div className="round-trip-flight-price-container">
                                            <div className="flight-seats-text">{flight.availableSeats} seats left</div>
                                            <div className="flight-price-text">₹ {flight.ticketPrice}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    }

                    {/* Here im firing up my loading and error divs*/}
                    {loading && <p className="api-loading"></p>}
                    {error && <p className="api-error">{error}</p>}
                </div>
            </div>
        </div>
    </>
} 