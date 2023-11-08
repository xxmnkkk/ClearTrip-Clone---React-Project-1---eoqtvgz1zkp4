import { createContext, useState } from 'react';
import { Route, Routes, NavLink } from 'react-router-dom';
import "../styles/App.css";
import MainPage from "./MainPage";
import Flight from './Flight';
import Hotel from './Hotel';
import MyTrip from './MyTrip';
import Header from './Header';
import LoginModal from './LoginModal';
import HotelModal from './HotelModal';

export const AuthContext = createContext();

function App() {
  let loggedInState;
  let loginModalState;
  const user = sessionStorage.getItem('loggedInUser');

  if (user) {
    loggedInState = true;
  } else {
    loggedInState = false;
    // loginModalState = true;
  }

  // if(loginModalState){
  //   return <LoginModal />
  // }

  const [isLoggedIn, setIsLoggedIn] = useState(loggedInState);
  const [loginModal, setLoginModal] = useState();
  const [profileModal, setProfileModal] = useState(false);
  const [departure, setDeparture] = useState('');
  const [arrival, setArrival] = useState(''); 
  const [hotelLocation , setHotelLocation] = useState('');
  const [selectedHotel , setSelectedHotel] = useState('');
  const [hotelLocationArray, setHotelLocationArray] = useState([]);

  const updateDeparture = (value) => {
    setDeparture(value);
  };

  const updateArrival = (value) => {
    setArrival(value);
  };

  const updateHotelLocation = (value) => {
    setHotelLocation(value);
  }

  return (<>
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn, loginModal, setLoginModal, profileModal, setProfileModal , departure , arrival , updateDeparture , updateArrival , updateHotelLocation , hotelLocation , selectedHotel , setSelectedHotel , hotelLocationArray , setHotelLocationArray}}>
      <Header />

      <Routes>
        <Route path='' element={<MainPage />} />
        <Route path='/main' element={<MainPage />} />
        <Route path='/flight' element={<Flight />} />
        <Route path='/hotel' element={<Hotel />} />
        <Route path='/mytrip' element={<MyTrip />} />
        <Route path='/hotelModal' element={<HotelModal />} />
      </Routes>
    </AuthContext.Provider>
  </>
  )
}

export default App;
