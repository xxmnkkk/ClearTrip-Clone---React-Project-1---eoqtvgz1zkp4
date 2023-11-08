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

    return (
        <div className="hotel-display-section">
            <div className="hotel-filter-container">

            </div>

            <div className="filtered-hotel-card-section">
                {filteredHotels.map((hotel, index) => (
                    <div className="filtered-hotel-card" onClick={() => handleSelectedHotel(hotel._id)} key={index}>
                        <div className="filtered-hotel-card-image-container">
                            <img src={hotel.images}></img>
                        </div>
                        <div className="filtered-hotel-data-section">
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
                {hotelData.data.hotels.map((hotel, index) => (
                    <div className="hotel-card" onClick={() => handleSelectedHotel(hotel._id)} key={index}>
                        <div className="hotel-card-image-container">
                            <SlideShow images={hotel.images} />
                        </div>
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
                ))}
            </div>
        </div>
    );
}
