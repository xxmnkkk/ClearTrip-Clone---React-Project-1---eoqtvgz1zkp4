import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "./App";
import SlideShow from "./SlideShow";
import { useNavigate } from "react-router-dom";

export default function Hotel() {
    // Here im importing all the states that i want to use inside of this component
    const { hotelLocation, setSelectedHotel, setSelectedFlightData } = useContext(AuthContext);

    const navigate = useNavigate();

    // Here im setting the stored flight data to null
    setSelectedFlightData(null);

    // Here i have defined some local states for hotel data to store the data that is received from the api and also for the loading and error
    const [hotelData, setHotelData] = useState({ data: { hotels: [] } });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // The below states are for the filter and storing in the index
    const [selectedMinRating, setSelectedMinRating] = useState(0);
    const [selectedMaxRating, setSelectedMaxRating] = useState(5);
    const [selectedMaxPrice, setSelectedMaxPrice] = useState(10000);

    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    // Just defining an array with rating range and the price range
    const ratingOptions = [0, 1, 2, 3, 4, 5];
    const priceOptions = [1000, 2000, 3000, 4000, 5000, 6000, 7000, 8000, 9000, 10000];

    // Here im calling the api for hotel list, now im useing the hotel location state for getting the location that ive selected
    useEffect(() => {
        console.log("hotelLocation:", hotelLocation);

        // Here inside the configuration im passing in the hotel location
        const config = {
            search: {
                location: hotelLocation,
            },
            headers: {
                "Content-Type": "application/json",
                "projectID": "f104bi07c490",
            },
        };

        // Calling the api with respective details 
        axios.get(`https://academics.newtonschool.co/api/v1/bookingportals/hotel`, config)
            .then((response) => {
                // Setting the data inside of the state
                setHotelData(response.data);
                setLoading(false);
                console.log(response.data);


                // const locations = response.data.data.hotels.map((hotel) => hotel.location);
                // setHotelLocationArray(locations);

            })
            .catch((error) => {
                setError(error);
                setLoading(false);
            });
    }, [hotelLocation]);

    // Here ive performed a logic for the image slideshow that is executed whenever the current image index changes inside of the searched hotel card
    useEffect(() => {
        // Here im setting the next index of the current index inside of nextImage.
        const nextImage = (currentImageIndex + 1) % 4;

        // And then setting the current index inside of the state in an interval of three seconds 
        const interval = setInterval(() => {
            setCurrentImageIndex(nextImage);
        }, 3000);

        return () => {
            clearInterval(interval);
        };
    }, [currentImageIndex]);

    // If loading is true then it shows the loading div
    if (loading) {
        return <div className="api-loading-container">
            <div className="api-loading"></div>
        </div>
    }

    // If error, then it shows the error message
    if (error) {
        return <div className="api-error">{error.message}</div>
    }

    // This function is handling the selected hotel details and just storing it inside of the state and navigating the user to the hotel modal
    const handleSelectedHotel = (hotelId) => {
        setSelectedHotel(hotelId);
        navigate("/hotelModal");
    }

    // Here im getting the hotel data for the selected hotel
    const filteredHotels = hotelData.data.hotels.filter((hotel) => hotel.location === hotelLocation);
    const images = filteredHotels.map(hotel => hotel.images).flat();
    // const image = images.length > 0 ? images : [];

    return (
        <div className="hotel-display-section">
            <div className="hotel-filter-container">
                {/* The below code is for the filter option's. Im just mapping out the data from the above mentioned arrays*/}
                <div className="filter-buttons">
                    <label>Minimum Rating</label>
                    <select value={selectedMinRating} onChange={(e) => setSelectedMinRating(parseInt(e.target.value))}>
                        {ratingOptions.map((option, index) => (
                            <option key={index} value={option}>{option}</option>
                        ))}
                    </select>
                </div>
                <div className="filter-buttons">
                    <label>Maximum Rating</label>
                    <select value={selectedMaxRating} onChange={(e) => setSelectedMaxRating(parseInt(e.target.value))}>
                        {ratingOptions.map((option, index) => (
                            <option key={index} value={option}>{option}</option>
                        ))}
                    </select>
                </div>
                <div className="filter-buttons">
                    <label>Maximum Price</label>
                    <select value={selectedMaxPrice} onChange={(e) => setSelectedMaxPrice(parseInt(e.target.value))}>
                        {priceOptions.map((option, index) => (
                            <option key={index} value={option}>{option > 1000 ? `₹${option}` : "1000+"}</option>
                        ))}
                    </select>
                </div>
            </div>

            {/* This code is for my searched hotel data */}
            <div className="filtered-hotel-card-section">
                {filteredHotels.map((hotel, index) => (
                    <div className="filtered-hotel-card" key={index}>
                        <div className="filtered-hotel-card-image-container">
                            {/* Here im mapping out the images from the filtere hotel data. Ive given inline style where if the index is equal to the current image index only then it will be displayed*/}
                            {images.map((image, index) => (
                                <img
                                    key={index}
                                    src={image}
                                    alt={`Image ${index}`}
                                    style={{ display: index === currentImageIndex ? 'block' : 'none' }}
                                    className="filtered-image"
                                />
                            ))}
                        </div>

                        {/* Just adding some of the details from the data */}
                        <div className="filtered-hotel-data-section" onClick={() => handleSelectedHotel(hotel._id)}>
                            <div className="filtered-hotelname-and-rating-container">
                                <span className="filtered-hotel-name">{hotel.name}</span>
                                <span className="filtered-hotel-rating">{hotel.rating} / 5</span>
                            </div>
                            <div className="filtered-hotel-location-container">
                                <span className="filtered-hotel-location">{hotel.location}</span>
                            </div>
                            <div className="filtered-hotel-amenities">
                                <strong>Amenities</strong>
                                {hotel.amenities.map((amenitie, index) => (
                                    <div className="hotel-amenities" key={index}>
                                        {amenitie}
                                    </div>
                                ))}
                            </div>
                            <div className="filtered-hotel-price">
                                <div>
                                    <span style={{ fontWeight: 'bold', fontSize: "18px" }}>₹{hotel.rooms[0].price}</span> + ₹{hotel.rooms[0].costDetails.taxesAndFees} tax <span style={{ color: 'gray' }}> / night</span>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="hotel-card-section">
                {/* Here im checking if any filter is added and filtering out the data accordingly and just mapping out the data */}
                {hotelData.data.hotels
                    .filter(
                        (hotel) =>
                            hotel.rating >= selectedMinRating &&
                            hotel.rating <= selectedMaxRating &&
                            hotel.rooms[0].price <= selectedMaxPrice
                    )
                    .map((hotel, index) => (
                        <div className="hotel-card" key={index}>
                            <div className="hotel-card-image-container">
                                <SlideShow images={hotel.images} />
                            </div>
                            <div className="hotel-card-info" onClick={() => handleSelectedHotel(hotel._id)}>
                                <div className="hotelname-and-rating-container">
                                    <span className="hotel-name">{hotel.name}</span>
                                    <span className="hotel-rating">{hotel.rating} / 5</span>
                                </div>
                                <div className="hotel-location-container">
                                    <span className="hotel-location">{hotel.location}</span>
                                </div>
                                <div className="hotel-price">
                                    <div>
                                        <span style={{ fontWeight: 'bold', fontSize: "18px" }}>₹{hotel.rooms[0].price}</span> + ₹{hotel.rooms[0].costDetails.taxesAndFees} tax <span style={{ color: 'gray' }} >/ night</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    );
}
