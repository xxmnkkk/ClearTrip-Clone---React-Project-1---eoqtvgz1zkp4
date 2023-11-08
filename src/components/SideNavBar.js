import { createContext, useState, useEffect } from 'react';
import { MdFlight } from 'react-icons/md';
import { RiHotelLine } from 'react-icons/ri';

export default function SideNavBar({ selectedSection, setSelectedSection }) {

    useEffect(() => {
        setSelectedSection('flights');
    }, []);

    return (
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
            </aside>
        </div >
    )
}