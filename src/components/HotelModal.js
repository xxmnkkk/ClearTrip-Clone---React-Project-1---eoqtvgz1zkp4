import { useContext, useState, useEffect, useRef } from "react";
import { AuthContext } from "./App";
import axios from "axios";
import { MdOutlineFastfood, MdOutlineMeetingRoom } from 'react-icons/md';
import { BsClockHistory, BsCreditCard2Back, BsPersonVcard, BsEmojiHeartEyes, BsTextareaResize } from 'react-icons/bs';
import { GiBeerBottle } from 'react-icons/gi';
import { ImManWoman } from 'react-icons/im';
import { LiaDogSolid, LiaSmokingSolid, LiaBedSolid } from 'react-icons/lia';
import { TbLocationCheck } from 'react-icons/tb';
import { IoPricetagsOutline } from 'react-icons/io5';
import { NavLink, useNavigate } from "react-router-dom";

function HotelModal() {
    const { selectedRoom, setSelectedRoom , hotelDetail , setHotelDetail , setLoginModal , isLoggedIn , selectedHotelData, setSelectedHotelData} = useContext(AuthContext);

    const { selectedHotel } = useContext(AuthContext);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const images = selectedHotelData.images || [];

    console.log(selectedHotel);
    console.log("selected hotel data: ", selectedHotelData);

    const roomOptionsRef = useRef(null);
    const navigate = useNavigate();

    console.log("selected room: ", selectedRoom);
    console.log("selected room hote and location: ", hotelDetail.name, hotelDetail.location)

    useEffect(() => {
        const config = {
            headers: {
                "Content-Type": "application/json",
                "projectID": "f104bi07c490",
            },
        };

        axios.get(`https://academics.newtonschool.co/api/v1/bookingportals/hotel/${selectedHotel}`, config)
            .then((response) => {
                console.log(response.data);
                setSelectedHotelData(response.data.data);
                setLoading(false);
            })
            .catch((error) => {
                setError(error);
                setLoading(false);
            });
    }, [selectedHotel]);

    useEffect(() => {
        const nextImage = (currentImageIndex + 1) % images.length;
        const interval = setInterval(() => {
            setCurrentImageIndex(nextImage);
        }, 10000);

        return () => {
            clearInterval(interval);
        };
    }, [currentImageIndex, images]);

    if (loading) {
        return <div className="api-loading"></div>;
    }

    if (error) {
        return <div className="api-error"></div>;
    }

    const handleScrollToRoomOptions = () => {
        roomOptionsRef.current.scrollIntoView({ behavior: 'smooth' });
    };

    const handleBookRoom = (room) => {
        setSelectedRoom(room);
        setHotelDetail({
            name: selectedHotelData.name,
            location: selectedHotelData.location,
            rating: selectedHotelData.rating
        })

        if (isLoggedIn) {
            navigate("/checkout")
        } else {
            setLoginModal(true);
        }
    };

    return (
        <div className="selected-hotel-container">
            <div className="selected-hotel-info-img">
                <div className="selected-hotel-info-container">
                    <div className="selected-hotel-name">
                        {selectedHotelData.name}
                    </div>
                    <div className="selected-hotel-star">
                        {Math.floor(selectedHotelData.rating)}-star Hotel · {selectedHotelData.location}
                    </div>
                    <div className="selected-hotel-rating">
                        {selectedHotelData.rating}/5 Rating
                    </div>
                    <div className="selected-hotel-meal">
                        <div>
                            <p className="meal-1"><TbLocationCheck /> Great location</p>
                            <p className="meal-2">Explore the beautiful location</p>
                        </div>
                        <div>
                            <p className="meal-1"><MdOutlineFastfood /> Free breakfast on select plans</p>
                            <p className="meal-2">Some plans include free breakfast</p>
                        </div>
                    </div>

                    <div className="line-break">
                        <hr />
                    </div>

                    <div className="selected-hotel-amenities">
                        <h2>Amenities</h2>
                        <div>
                            {selectedHotelData.amenities && selectedHotelData.amenities.map((amenity, index) => (
                                <p key={index}>{amenity}</p>
                            ))}
                        </div>
                    </div>

                    <div className="selected-hotel-propertyrules">
                        <h2>Property rules</h2>
                        <div>
                            <p><BsClockHistory /> Check-in: After 02:00 PM, Check-out: 12:00 PM</p>
                            <p><GiBeerBottle /> Alcohol consumption allowed within the premises</p>
                            <p>
                                <ImManWoman /> {selectedHotelData.houseRules && selectedHotelData.houseRules.guestProfile ?
                                    (selectedHotelData.houseRules.guestProfile.unmarriedCouplesAllowed ?
                                        "Un-Married couples are allowed" :
                                        "Un-Married couples are not allowed"
                                    ) :
                                    "Guest profile information not available"
                                }
                            </p>
                            <p>
                                <LiaDogSolid /> {selectedHotelData.houseRules && selectedHotelData.houseRules.restrictions.petsAllowed ?
                                    "Pets are ALLOWED within the premises." :
                                    "Pets are NOT allowed on the premises."
                                }
                            </p>
                            <p>
                                <LiaSmokingSolid /> {selectedHotelData.houseRules && selectedHotelData.houseRules.restrictions.smokingAllowed ?
                                    "Smoking is ALLOWED within the premises." :
                                    "Smoking is NOT allowed."
                                }
                            </p>
                            <p>
                                <BsPersonVcard />
                                {selectedHotelData.houseRules && selectedHotelData.houseRules.idProofRelated.idProofsAccepted &&
                                    selectedHotelData.houseRules.idProofRelated.idProofsAccepted.map((ids, index) => (
                                        <span key={index}> {ids}, </span>
                                    ))
                                }
                                are accepted ID proofs
                            </p>
                            <p>
                                <BsCreditCard2Back /> Guests can pay by Debit/ Credit Card (VISA & Mastercard)
                            </p>
                        </div>
                    </div>
                </div>
                <div className="selected-hotel-image-and-add-container">
                    <div className="selected-hotel-image-container">
                        {images.map((image, index) => (
                            <img
                                key={index}
                                src={image}
                                alt={`Image ${index}`}
                                style={{ display: index === currentImageIndex ? 'block' : 'none' }}
                            />
                        ))}
                    </div>
                    <div className="select-room-button" onClick={handleScrollToRoomOptions}>
                        Select room
                    </div>
                </div>
            </div>

            <div className="map">
                Location
                <iframe
                    title="Google Map"
                    src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d223994.09818129404!2d77.09004195!3d28.692405!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sin!4v1699640662870!5m2!1sen!2sin"
                    width="600"
                    height="450"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
            </div>

            <div className="selected-hotel-review-container">
                <span>Reviews</span>
                <div className="selected-hotel-reviews">
                    <div className="reviews">
                        <h3>Awesome stay</h3>
                        <p className="review-rating"><BsEmojiHeartEyes /> 5/5 · Go48193515841 on Nov 09, 2023</p>
                        <p>Thankyou Hard rock Rock for giving us an amazing stay. Special thanks to Vilatha(Guest relation) who was spot on to welcome, take care of all arrangements through out our stay. We were in the hotel for 5 days and she took care of each and every request from us with utmost care and...</p>
                    </div>
                    <div className="reviews">
                        <h3>Great time!!</h3>
                        <p className="review-rating"><BsEmojiHeartEyes /> 5/5 · shaikesh on Nov 09, 2023</p>
                        <p>In particular a young lady named Jeru understood our needs and conversed with me excellently. A great location and friendly people everywhere great rooms and facilities. Well done all. Thank you shailesh and friends.</p>
                    </div>
                    <div className="reviews">
                        <h3>From 6104</h3>
                        <p className="review-rating"><BsEmojiHeartEyes /> 5/5 · Voyager51845330904 on Nov 08, 2023</p>
                        <p>It's a wonderful stay at hard rock . We are visit to first time in hard hock , it's expreance was too good . Mainly pool n , food very good , housekeeping staff are very helpful mainly Animesh Debnath he was help me lot during my stay . Thank you hard rock</p>
                    </div>
                    <div className="reviews">
                        <h3>tejus is best boy in hard rock</h3>
                        <p className="review-rating"><BsEmojiHeartEyes /> 5/5 · Dream51917177728 on Nov 07, 2023</p>
                        <p>All staff is good but tejus is my favourite n all are very good n breakfast good n masala chai is awesome n swimming pool is well developed n all are in good perform i fully satisfied this hotel n hotel is amazing</p>
                    </div>
                    <div className="reviews">
                        <h3>Awesome service</h3>
                        <p className="review-rating"><BsEmojiHeartEyes /> 5/5 · 741mdf on Nov 07, 2023</p>
                        <p>House keeping is exceptionally good with Sameer pradhan . He is excellent, polite and very good. Ambience is soothing and the environment Rahul Kumar in front office (bill desk) is phenomenally good to receive people</p>
                    </div>
                </div>
            </div>

            <div ref={roomOptionsRef} className="selected-hotel-room-options">
                <span>Select Room</span>
                <div className="selected-hotel-room-container">
                    {selectedHotelData.rooms && selectedHotelData.rooms.map((room, index) => (
                        <div className="room-container" key={room._id} onClick={() => setSelectedRoom(room)}>
                            <h3>Room {room.roomNumber}</h3>
                            <p><MdOutlineMeetingRoom /> {room.roomType} room</p>
                            <p><IoPricetagsOutline /> {room.costDetails.baseCost} rupees per night</p>
                            <p><BsTextareaResize /> {room.roomSize} sq. ft Room size</p>
                            <p><LiaBedSolid /> {room.bedDetail}</p>
                            <p className="selected-hotel-room-price">₹ {room.price} /-</p>
                            <div className="room-line-break">
                                <hr />
                            </div>
                            <p className="room-cancellation">{room.cancellationPolicy}</p>
                            <button className="room-button" key={index} onClick={() => handleBookRoom(room)}>Book</button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default HotelModal