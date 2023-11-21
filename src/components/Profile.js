import { useContext } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { GiWitchFlight } from 'react-icons/gi'
import { NavLink } from "react-router-dom";
import { AuthContext } from "./App";

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
                <img src="https://images.unsplash.com/photo-1506929562872-bb421503ef21?auto=format&fit=crop&q=80&w=2755&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" className="profile-top-img" />
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
                <img src="https://images.unsplash.com/photo-1506929562872-bb421503ef21?auto=format&fit=crop&q=80&w=2755&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" className="profile-bottom-img" />
            </div>
        </div>
    )
}