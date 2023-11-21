import axios from "axios"
import { useContext, useEffect, useState, useRef } from "react";
import { AuthContext } from "./App";
import DesAndArr from "./DesAndArr";
import DateSelector from "./DateSelector";
import { FaArrowRightLong } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";




export default function Flight() {
    const { startDay, endDay, startDate, endDate, isLoggedIn, setLoginModal, departure, arrival, flightDay, flightDayTwo, selectedFlightTrip, selectedFlightData, setSelectedFlightData } = useContext(AuthContext);

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

    const [flightsTwo, setFlightsTwo] = useState({
        data: {
            flights: []
        }
    });

    const [selectedToFlights, setSelectedToFlights] = useState([]);
    const [selectedBackFlights, setSelectedBackFlights] = useState([]);
    const [selectedStopsFilter, setSelectedStopsFilter] = useState(null);
    const [priceFilter, setPriceFilter] = useState({ min: null, max: null });

    const [selectedSort, setSelectedSort] = useState(null);


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
        return <div className="api-loading"></div>;
    }

    if (error) {
        return <div className="api-error">{error}</div>;
    }

    const flightData = flights.data.flights;
    const flightDataTwo = flightsTwo.data.flights;

    const handleSelectFlight = (flight) => {
        setSelectedToFlights([flight]);

        if (selectedFlightDivRef.current) {
            selectedFlightDivRef.current.scrollIntoView({ behavior: "smooth" });
        }
    };

    const handleSelectFlight2 = (flight) => {
        setSelectedBackFlights([flight]);

        if (selectedFlightDivRef.current) {
            selectedFlightDivRef.current.scrollIntoView({ behavior: "smooth" });
        }
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



    return <>
        <div className="flight-container" ref={selectedFlightDivRef}>
            <div className="flight-modify-search-container">
                <div className="dep-and-arr-div">
                    <DesAndArr />
                    {/* <DateSelector /> */}
                </div>
            </div>

            <div className="flight-filter-and-flightinfo-container">
                <div className="filter-container">
                    <div className="filter-stop-container">
                        <h2>Stops</h2>
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

                        <h2>Sort By Price</h2>
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

                    </div>
                </div>

                <div className="flight-information-section">
                    <div className="selected-flight-div">
                        {selectedToFlights.length > 0 &&
                            <div className="selected-flight-to">
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

                                        <div className="selected-flight-price-container">
                                            <div className="selected-flight-price-text">₹ {selectedFlight.ticketPrice}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        }


                        {selectedBackFlights.length > 0 &&
                            <div className="selected-flight-from">
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

                                        <div className="selected-flight-price-container">
                                            <div className="selected-flight-price-text">₹ {selectedFlight.ticketPrice}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        }

                        {(selectedToFlights.length > 0 || selectedBackFlights.length > 0) && (
                            <button onClick={handleBookFlight} className="flight-book-button">Book flight</button>
                        )}
                    </div>

                    <h1 className="flight-heading">{departure} <FaArrowRightLong /> {arrival}</h1>
                    {displayedFlightData.map((flight, index) => (
                        <div className="flightinfo-container" key={index}>
                            <div className="flight-name-container">
                                <img src="https://seeklogo.com/images/I/indigo-logo-EDBB4B3C09-seeklogo.com.png" />
                                <span className="airline-name">IndiGo</span>
                                <span className="flight-id">{flight.flightID}</span>
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
                                <button onClick={() => handleSelectFlight(flight)} className="flight-select-button">Select</button>
                            </div>
                        </div>
                    ))}

                    <br />
                    <br />
                    <br />

                    {selectedFlightTrip === "Round trip" &&
                        <>
                            <h1 className="flight-heading">{arrival} <FaArrowRightLong /> {departure}</h1>
                            {displayedFlightDataTwo.map((flight, index) => (
                                <div className="flightinfo-container" key={index}>
                                    <div className="flight-name-container">
                                        <img src="https://seeklogo.com/images/I/indigo-logo-EDBB4B3C09-seeklogo.com.png" />
                                        <span className="airline-name">IndiGo</span>
                                        <span className="flight-id">{flight.flightID}</span>
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
                                        <button onClick={() => handleSelectFlight2(flight)} className="flight-select-button">Select</button>
                                    </div>
                                </div>
                            ))}


                        </>
                    }
                    {/* {loading && <p className="api-loading"></p>}
                    {error && <p className="api-error">{error}</p>} */}
                </div>
            </div>
        </div>
    </>
} 