import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "./App";
import SlideShow from "./SlideShow";
import { useNavigate } from "react-router-dom";

export default function Hotel() {
    const { hotelLocation, selectedHotel, setSelectedHotel, hotelLocationArray, setHotelLocationArray } = useContext(AuthContext);

    const [hotelData, setHotelData] = useState({ data: { hotels: [] } });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [selectedMinRating, setSelectedMinRating] = useState(0);
    const [selectedMaxRating, setSelectedMaxRating] = useState(5);
    const [selectedMaxPrice, setSelectedMaxPrice] = useState(10000);

    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const ratingOptions = [0, 1, 2, 3, 4, 5];
    const priceOptions = [1000, 2000, 3000, 4000, 5000, 6000, 7000, 8000, 9000, 10000];


    console.log(selectedHotel);
    console.log(hotelLocationArray);

    const navigate = useNavigate();

    useEffect(() => {
        console.log("hotelLocation:", hotelLocation);

        const config = {
            search: {
                location: hotelLocation,
            },
            headers: {
                "Content-Type": "application/json",
                "projectID": "f104bi07c490",
            },
        };

        axios.get(`https://academics.newtonschool.co/api/v1/bookingportals/hotel`, config)
            .then((response) => {
                setHotelData(response.data);
                setLoading(false);
                console.log(response.data);

                const locations = response.data.data.hotels.map((hotel) => hotel.location);
                setHotelLocationArray(locations);

            })
            .catch((error) => {
                setError(error);
                setLoading(false);
            });
    }, [hotelLocation]);

    useEffect(() => {
        const nextImage = (currentImageIndex + 1) % 4;
        const interval = setInterval(() => {
            setCurrentImageIndex(nextImage);
        }, 10000);

        return () => {
            clearInterval(interval);
        };
    }, [currentImageIndex]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    const handleSelectedHotel = (hotelId) => {
        setSelectedHotel(hotelId);
        navigate("/hotelModal");
    }

    const filteredHotels = hotelData.data.hotels.filter((hotel) => hotel.location === hotelLocation);
    const images = filteredHotels.map(hotel => hotel.images).flat();
    const image = images.length > 0 ? images : [];

    return (
        <div className="hotel-display-section">
            <div className="hotel-filter-container">
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

            <div className="filtered-hotel-card-section">
                {filteredHotels.map((hotel, index) => (
                    <div className="filtered-hotel-card" key={index}>
                        <div className="filtered-hotel-card-image-container">
                            {/* <img className="filtered-hotel-images" src={hotel.images}></img> */}
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
