import axios from "axios"
import { useContext, useEffect, useState, useRef } from "react";
import { AuthContext } from "./App";
import DesAndArr from "./DesAndArr";
import { FaArrowRightLong } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { CiClock1 } from "react-icons/ci";
import PassangerFlight from "./PassangerFlight";

export default function Flight() {
    const { startDay, endDay, startDate, endDate, isLoggedIn, setLoginModal, departure, arrival, flightDay, flightDayTwo, selectedFlightTrip, selectedFlightData, setSelectedFlightData, setSelectedHotelData, flightClass, roundFlightDetailsDiv, setRoundFlightDetailsDiv , checkoutStartDate , checkoutEndDate} = useContext(AuthContext);

    setSelectedHotelData(null);

    console.log('Startdate : ', checkoutStartDate)
    console.log('Enddate : ', checkoutEndDate)
    console.log('Startdate : ', startDate)
    console.log('Enddate : ', endDate)

    // console.log("start date: ",startDate );
    // console.log("end date: ", endDate);
    // console.log("day: ", flightDay);
    // console.log("day2: ", flightDayTwo);

    const navigate = useNavigate();
    const selectedFlightDivRef = useRef(null);

    const [flights, setFlights] = useState({
        data: {
            flights: []
        }
    });

    console.log(flights);

    const [flightsTwo, setFlightsTwo] = useState({
        data: {
            flights: []
        }
    });

    const [selectedToFlights, setSelectedToFlights] = useState([]);
    const [selectedBackFlights, setSelectedBackFlights] = useState([]);
    const [selectedStopsFilter, setSelectedStopsFilter] = useState(null);
    const [priceFilter, setPriceFilter] = useState({ min: null, max: null });
    console.log("selected to flight: ", selectedToFlights);
    console.log("selected back flight: ", selectedBackFlights);

    const [selectedSort, setSelectedSort] = useState(null);

    const [selectedFlightIndex, setSelectedFlightIndex] = useState(null);
    const [selectedRoundFlightIndex1, setSelectedRoundFlightIndex1] = useState(null);
    const [selectedRoundFlightIndex2, setSelectedRoundFlightIndex2] = useState(null);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // console.log("Selected flight data: ", selectedFlightData);

    // console.log("Flight Data: ", flights.data.flights);
    // console.log("Flight Data Two: ", flightsTwo.data.flights);

    if (selectedFlightTrip === "oneway" || selectedFlightTrip === "One way") {
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

    if (loading) {
        return <div className="api-loading-container">
            <div className="api-loading"></div>
        </div>
    }

    if (error) {
        return <div className="api-error">{error}</div>;
    }

    const flightData = flights.data.flights;
    const flightDataTwo = flightsTwo.data.flights;

    const handleSelectFlight = (flight, index) => {
        setSelectedToFlights([flight]);
        setSelectedRoundFlightIndex1(index);

        // if (selectedFlightDivRef.current) {
        //     selectedFlightDivRef.current.scrollIntoView({ behavior: "smooth" });
        // }
    };

    const handleSelectFlight2 = (flight, index) => {
        setSelectedBackFlights([flight]);
        setSelectedRoundFlightIndex2(index);

        // if (selectedFlightDivRef.current) {
        //     selectedFlightDivRef.current.scrollIntoView({ behavior: "smooth" });
        // }
    };

    const handleBookFlight = () => {
        if (selectedToFlights.length > 0) {
            const selectedFlights = selectedBackFlights.length > 0
                ? [selectedToFlights[0], selectedBackFlights[0]]
                : [selectedToFlights[0]];

            setSelectedFlightData(selectedFlights);
        }

        if (isLoggedIn) {
            navigate("/checkout")
        } else {
            setLoginModal(true);
        }
    };

    const handleOneWayFlight = (flight) => {
        setSelectedFlightData([flight])

        if (isLoggedIn) {
            navigate("/checkout");
        } else {
            setLoginModal(true);
        }
    }

    const handleStopsChange = (event) => {
        setSelectedStopsFilter(event.target.value);
        setPriceFilter({ min: null, max: null });
    };

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

    const handleSortChange = (event) => {
        setSelectedSort(event.target.value);
    };

    const sortedFlightData = [...filteredFlightData];
    const sortedFlightDataTwo = [...filteredFlightDataTwo];

    if (selectedSort === 'lowToHigh') {
        sortedFlightData.sort((a, b) => a.ticketPrice - b.ticketPrice);
        sortedFlightDataTwo.sort((a, b) => a.ticketPrice - b.ticketPrice);
    } else if (selectedSort === 'highToLow') {
        sortedFlightData.sort((a, b) => b.ticketPrice - a.ticketPrice);
        sortedFlightDataTwo.sort((a, b) => b.ticketPrice - a.ticketPrice);
    }

    const displayedFlightData = selectedSort ? sortedFlightData : filteredFlightData;
    const displayedFlightDataTwo = selectedSort ? sortedFlightDataTwo : filteredFlightDataTwo;

    const handleToggleDetails = (index) => {
        setSelectedFlightIndex((prevIndex) => (prevIndex === index ? null : index));
    };

    const handleRoundFlightHiddenDiv = () => {
        setRoundFlightDetailsDiv(true);
    }

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
            <div className="flight-modify-search-container">
                <div className="dep-and-arr-div">
                    <DesAndArr />
                    <div className="flight-passanger-modifier">
                        <PassangerFlight />
                    </div>
                </div>
            </div>

            <div className="flight-filter-and-flightinfo-container">
                <div className="filter-container">
                    <div className="filter-stop-container">
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

                <div className="flight-information-section">
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


                    {(selectedToFlights.length > 0 || selectedBackFlights.length > 0) &&
                        <div className="selected-flight-div-container">
                            <div className="selected-flight-div">
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

                    {roundFlightDetailsDiv && selectedToFlights.length > 0 && selectedBackFlights.length > 0 &&
                        <>
                            <div className="round-details-modal-layover">
                                <div className="round-modal-details-container">
                                    <div className="round-modal-details-close-container">
                                        Details of your round trip
                                        <button onClick={() => setRoundFlightDetailsDiv(false)}>Close</button>
                                    </div>

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

                    {selectedFlightTrip === "Round trip" &&
                        <div className="round-trip-flight-container">
                            <div className="roundtrip-flight-information-section">
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

                    {loading && <p className="api-loading"></p>}
                    {error && <p className="api-error">{error}</p>}
                </div>
            </div>
        </div>
    </>
} 