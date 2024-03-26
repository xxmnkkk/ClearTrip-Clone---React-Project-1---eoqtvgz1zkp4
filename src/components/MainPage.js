import React, { useState } from 'react';
import FlightBookingSection from './FlightBookingSection';
import HotelBookingSection from './HotelBookingSection';
import UselessText from './UselessText';
import Card from './Card';
import SideNavBar from './SideNavBar';

const MainPage = () => {
    // This is my mainpage component

    // Defining my states that is require, for example the section that i have selected namely flight or hotel
    const [selectedSection, setSelectedSection] = useState('flight');

    // Function which returns a component when the state above changes
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
        // Basic code for layering out my mainpage
        <>
            <div className='cleartrip-nav-and-content-section'>
                <SideNavBar selectedSection={selectedSection} setSelectedSection={setSelectedSection} />

                <div className="content-container">
                    {renderSection()}
                </div>

                <Card />

            </div>

            {/* Here ive included an image of appstore and playstore download link */}
            <div className='app-download-div'><img src='https://fastui.cltpstatic.com/image/upload/f_auto,q_auto,w_983,h_247,dpr_2/offermgmt/images/qrCode_6.png'></img></div>

            {/* Here ive imported a component with some texts containing information about cleartrip website */}
            <UselessText />
        </>
    )
}

export default MainPage;