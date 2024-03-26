import { createContext, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import "../styles/App.css";
import MainPage from "./MainPage";
import Flight from './Flight';
import Hotel from './Hotel';
import MyTrip from './MyTrip';
import Header from './Header';
import HotelModal from './HotelModal';
import Checkout from './Checkout';
import Payment from './Payment';
import SuccessModal from './SuccessModal';
import Footer from './Footer';

// This is where the whole website starts from

// So here im just defining my context name which i initially names as authContext and did not change as i got busy with how everything was supposed to work and focused more on that

export const AuthContext = createContext();

function App() {

  // Here im checking is a user is present inside of the session storage and if there is then im just setting the logged in state to true
  let loggedInState;
  const user = sessionStorage.getItem('loggedInUser');

  if (user) {
    loggedInState = true;
  } else {
    loggedInState = false;
  }

  // Here im defining all of my states
  const [roomCount, setRoomCount] = useState(1);
  const [isLoggedIn, setIsLoggedIn] = useState(loggedInState);
  const [loginModal, setLoginModal] = useState();
  const [profileModal, setProfileModal] = useState(false);
  const [departure, setDeparture] = useState('');
  const [arrival, setArrival] = useState('');
  const [hotelLocation, setHotelLocation] = useState('');
  const [selectedHotel, setSelectedHotel] = useState('');
  const [hotelLocationArray, setHotelLocationArray] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState({});
  const [hotelDetail, setHotelDetail] = useState({});
  const [flightDay, setFlightDay] = useState("");
  const [flightDayTwo, setFlightDayTwo] = useState("");
  const [selectedFlightTrip, setSelectedFlightTrip] = useState("");
  const [selectedFlightData, setSelectedFlightData] = useState();
  const [selectedHotelData, setSelectedHotelData] = useState({});
  const [calenderDateDifference, setCalenderDateDifference] = useState();
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [flightClass, setFlightClass] = useState('Economy');
  const [adultCount, setAdultCount] = useState(1);
  const [childCount, setChildCount] = useState(0);
  const [infantCount, setInfantCount] = useState(0);
  const [hotelAdultCount, setHotelAdultCount] = useState(0);
  const [hotelChildCount, setHotelChildCount] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [isActivePassanger, setIsActivePassanger] = useState(false);
  const [flightDepartureHiddenDiv, setFlightDepartureHiddenDiv] = useState(false);
  const [flightArrivalHiddenDiv, setFlightArrivalHiddenDiv] = useState(false);
  const [showDate, setShowDate] = useState(false);
  const [hiddenDiv, setHiddenDiv] = useState(false);
  const [hotelLocationHiddenDiv, setHotelLocationHiddenDiv] = useState(false);
  const [loggedInUserName, setLoggedInUserName] = useState();
  const [fareType, setFareType] = useState('Regular fare');
  const [checkoutStartDate, setCheckoutStartDate] = useState('');
  const [checkoutEndDate, setCheckoutEndDate] = useState('');
  const [roundFlightDetailsDiv, setRoundFlightDetailsDiv] = useState(false);
  const [selectedTrip, setSelectedTrip] = useState("oneway");
  const [paymentSuccessDiv, setPaymentSuccessDiv] = useState(false);
  const [paymentFailureDiv, setPaymentFailureDiv] = useState(false);

  // Here i have defined some functions to update the values of state when called. This was very early stage of development
  const updateDeparture = (value) => {
    setDeparture(value);
  };

  const updateArrival = (value) => {
    setArrival(value);
  };

  const updateHotelLocation = (value) => {
    setHotelLocation(value);
  }

  return (
    // Here im providing the value to the context so that i can use in anywhere i want and also i have defined my routes
    <>
      <AuthContext.Provider value={{
        isActive, setIsActive, isActivePassanger, setIsActivePassanger, flightDepartureHiddenDiv, setFlightDepartureHiddenDiv, flightArrivalHiddenDiv, setFlightArrivalHiddenDiv, showDate, setShowDate, hiddenDiv, setHiddenDiv, hotelLocationHiddenDiv, setHotelLocationHiddenDiv, roomCount, setRoomCount, isLoggedIn, setIsLoggedIn, loginModal, setLoginModal, profileModal, setProfileModal, departure, arrival, updateDeparture, updateArrival, updateHotelLocation, hotelLocation, selectedHotel, setSelectedHotel, hotelLocationArray, setHotelLocationArray, selectedRoom, setSelectedRoom, hotelDetail, setHotelDetail, flightDay, setFlightDay, flightDayTwo, setFlightDayTwo, selectedFlightTrip, setSelectedFlightTrip, selectedFlightData, setSelectedFlightData, selectedHotelData, setSelectedHotelData, calenderDateDifference, setCalenderDateDifference, startDate, setStartDate, endDate, setEndDate, flightClass, setFlightClass, adultCount, setAdultCount, childCount, setChildCount, infantCount, setInfantCount, hotelAdultCount, setHotelAdultCount, hotelChildCount, setHotelChildCount, loggedInUserName, setLoggedInUserName, fareType, setFareType, checkoutStartDate, setCheckoutStartDate, checkoutEndDate, setCheckoutEndDate, paymentSuccessDiv, setPaymentSuccessDiv, paymentFailureDiv, setPaymentFailureDiv, roundFlightDetailsDiv, setRoundFlightDetailsDiv, selectedTrip, setSelectedTrip
      }}>
        <Header />

        <Routes>
          <Route path='' element={<MainPage />} />
          <Route path='/main' element={<MainPage />} />
          <Route path='/flight' element={<Flight />} />
          <Route path='/hotel' element={<Hotel />} />
          <Route path='/mytrip' element={<MyTrip />} />
          <Route path='/hotelModal' element={<HotelModal />} />
          <Route path='/checkout' element={<Checkout />} />
          <Route path='/payment' element={<Payment />} />
          <Route path="/payment/success" element={<SuccessModal />} />
        </Routes>

        <Footer />
      </AuthContext.Provider>
    </>
  )
}

export default App;
