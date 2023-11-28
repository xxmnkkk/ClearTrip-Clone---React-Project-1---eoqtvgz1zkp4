import { useContext } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { GiWitchFlight } from 'react-icons/gi'
import { NavLink } from "react-router-dom";
import { AuthContext } from "./App";
import profile from "../image/profile.jpg"

export default function Profile({ onClose, onLogout }) {

    // const {loggedInUserName} = useContext(AuthContext);
    const userName = sessionStorage.getItem('loggedInUserName');
    // console.log("loggedin use name: ", loggedInUserName);

    const handleLogout = () => {
        sessionStorage.removeItem("userToken");
        sessionStorage.removeItem("loggedInUser");
        onLogout();
    };

    return (
        <div className="profile-modal">
            <div className="profile-img-div">
                <img src={profile} className="profile-top-img" />
            </div>
            <div className="modal-content">
                <div className="profile-close-icon">
                    <AiOutlineClose onClick={onClose} className="icon" />
                </div>
                <div className="user-details">
                    <div>Welcome <span>{userName.toUpperCase()}</span></div>
                </div>
                <NavLink to="/mytrip" className="mytrip-navlink" onClick={onClose}>
                    <div className="my-trip">
                        <GiWitchFlight />
                        My trips
                    </div>
                </NavLink>
                <div className="profile-logout-button" onClick={handleLogout}>Logout</div>
            </div>
            <div className="profile-img-div-2">
                <img src={profile} className="profile-bottom-img" />
            </div>
        </div>
    )
}