import { AiOutlineClose } from "react-icons/ai";
import { GiWitchFlight } from 'react-icons/gi'
import { NavLink } from "react-router-dom";
import profile from "../image/profile.jpg"

// This is my component for the basic profile modal
export default function Profile({ onClose, onLogout }) {
    // Here im getting in the username from the session storage
    const userName = sessionStorage.getItem('loggedInUserName');

    // Here inside of the handle logout function, im handling the process of logging out the user. Just removing the details from the local storage
    const handleLogout = () => {
        sessionStorage.removeItem("userToken");
        sessionStorage.removeItem("loggedInUser");

        // On logout im just setting the logged in state to false and setting the profile modal to false
        onLogout();
    };

    return (
        // Simple component for my profile modal
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

                {/* Below ive included a link to navigate the user to the mytrip page */}
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