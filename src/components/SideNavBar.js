import { useEffect } from 'react';
import { MdFlight } from 'react-icons/md';
import { RiHotelLine } from 'react-icons/ri';
import { IoBusOutline } from "react-icons/io5";
import { BiSolidOffer, BiSupport } from "react-icons/bi";


// This is the code for my sidenavbar where ive passed in props for setting in the state
export default function SideNavBar({ selectedSection, setSelectedSection }) {

    // By default on loading i want to set the selected option in side nav bar as flight so thats being handled here
    useEffect(() => {
        setSelectedSection('flights');
    }, []);

    return (
        // Basic code for the ui of sidenavbar  where on each button im conditionally checking if that is what is stored innside of the state and setting a classname accordingly
        <div className='side-navbar-container' >
            <aside id="side-nav-bar">
                <div
                    className={`side-nav-bar-button ${selectedSection === 'flights' ? 'active' : ''
                        }`}
                    onClick={() => setSelectedSection('flights')}
                >
                    <MdFlight />
                    Flights
                </div>

                <div
                    className={`side-nav-bar-button ${selectedSection === 'hotels' ? 'active' : ''
                        }`}
                    onClick={() => setSelectedSection('hotels')}
                >
                    <RiHotelLine />
                    Hotels
                </div>

                <div className="side-nav-bar-button side-nav-bar-button-not">
                    <IoBusOutline />
                    Bus
                </div>

                <div className="side-nav-bar-button side-nav-bar-button-not">
                    <BiSolidOffer />
                    Offers
                </div>

                <div className="side-nav-bar-button side-nav-bar-button-not">
                    <BiSupport />
                    Support
                </div>
            </aside>
        </div >
    )
}