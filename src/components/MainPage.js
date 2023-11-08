import React, { useState, useEffect } from 'react';
import { BiSupport } from 'react-icons/bi';
import FlightBookingSection from './FlightBookingSection';
import HotelBookingSection from './HotelBookingSection';
import UselessText from './UselessText';
import Card from './Card';
import SideNavBar from './SideNavBar';

const MainPage = () => {
    const [selectedSection, setSelectedSection] = useState('flight');

    const renderSection = () => {
        switch (selectedSection) {
            case 'flights':
                return <FlightBookingSection />;
            case 'hotels':
                return <HotelBookingSection />;
            default:
                return null;
        }
    };

    return (
        <>
            <div className='cleartrip-nav-and-content-section'>
                <SideNavBar selectedSection={selectedSection} setSelectedSection={setSelectedSection} />

                <div className="content-container">
                    {renderSection()}
                </div>

                <Card />

            </div>

            <div className='app-download-div'><img src='https://fastui.cltpstatic.com/image/upload/f_auto,q_auto,w_983,h_247,dpr_2/offermgmt/images/qrCode_6.png'></img></div>

            <UselessText />
        </>
    )
}

export default MainPage;