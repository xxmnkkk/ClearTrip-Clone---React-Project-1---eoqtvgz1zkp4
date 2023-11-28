import React, { useContext , useState} from "react"
import { AuthContext } from "./App"
import { AiOutlineUser, AiOutlinePlusCircle, AiOutlineMinusCircle } from 'react-icons/ai';
import { RiArrowDropUpLine, RiArrowDropDownLine } from 'react-icons/ri';



const tripOption = [
    {
        dropdown: <RiArrowDropDownLine className='main-icons' />,
        dropup: <RiArrowDropUpLine className='main-icons' />
    },
    {
        dropdown: <RiArrowDropDownLine className='main-icons' />,
        dropup: <RiArrowDropUpLine className='main-icons' />
    }
]

function PassangerFlight() {

    const {adultCount, setAdultCount, childCount, setChildCount, infantCount, setInfantCount , isActivePassanger, setIsActivePassanger , flightClass, setFlightClass , setIsActive , setFlightDepartureHiddenDiv , setFlightArrivalHiddenDiv , setShowDate} = useContext(AuthContext);

    const [index, setIndex] = useState(0);

    const toggleHiddenPassangerDiv = (e) => {
        setIsActivePassanger(!isActivePassanger);
        setIsActive(false);

        setFlightDepartureHiddenDiv(false);
        setFlightArrivalHiddenDiv(false);
        setShowDate(false);
    }

    const updateCount = (type, action) => {
        if (action === 'increment') {
            if (type === 'adult') {
                setAdultCount(adultCount + 1);
            } else if (type === 'child') {
                setChildCount(childCount + 1);
            } else if (type === 'infant') {
                setInfantCount(infantCount + 1);
            }
        } else if (action === 'decrement') {
            if (type === 'adult' && adultCount > 0) {
                setAdultCount(adultCount - 1);
            } else if (type === 'child' && childCount > 0) {
                setChildCount(childCount - 1);
            } else if (type === 'infant' && infantCount > 0) {
                setInfantCount(infantCount - 1);
            }
        }
    };

    return (
        <div className='passanger-button-container'>
            <div className='passenger-button' onClick={toggleHiddenPassangerDiv}>
                <AiOutlineUser />
                {`${adultCount > 0 ? `${adultCount} ${adultCount === 1 ? 'Adult, ' : 'Adults, '}` : ''}`}
                {`${childCount > 0 ? `${childCount} ${childCount === 1 ? 'Child, ' : 'Children, '}` : ''}`}
                {`${infantCount > 0 ? `${infantCount} ${infantCount === 1 ? 'Infant, ' : 'Infants, '}` : ''}`}
                {flightClass}
                {isActivePassanger ? tripOption[index].dropup : tripOption[index].dropdown}
            </div>

            {isActivePassanger && <div className='passanger-hidden-div'>
                <div className='passanger-div-section'>
                    <div className='passanger-text-content'>
                        <span><strong>Adults</strong></span>
                        <span style={{ color: "#808080" }}>(12+ years)</span>
                    </div>
                    <div className='passanger-inc-dec-button'>
                        <AiOutlineMinusCircle className='main-icons' onClick={() => updateCount('adult', 'decrement')} />
                        {adultCount}
                        <AiOutlinePlusCircle className='main-icons' onClick={() => updateCount('adult', 'increment')} />
                    </div>
                </div>
                <div className='passanger-div-section'>
                    <div className='passanger-text-content'>
                        <span><strong>Children</strong></span>
                        <span style={{ color: "#808080" }}>(2 - 12 yrs)</span>
                    </div>
                    <div className='passanger-inc-dec-button'>
                        <AiOutlineMinusCircle className='main-icons' onClick={() => updateCount('child', 'decrement')} />
                        {childCount}
                        <AiOutlinePlusCircle className='main-icons' onClick={() => updateCount('child', 'increment')} />
                    </div>
                </div>
                <div className='passanger-div-section'>
                    <div className='passanger-text-content'>
                        <span><strong>Infants</strong></span>
                        <span style={{ color: "#808080" }}>(Below 2 yrs)</span>
                    </div>
                    <div className='passanger-inc-dec-button'>
                        <AiOutlineMinusCircle className='main-icons' onClick={() => updateCount('infant', 'decrement')} />
                        {infantCount}
                        <AiOutlinePlusCircle className='main-icons' onClick={() => updateCount('infant', 'increment')} />
                    </div>
                </div>
                <div className='passanger-div-section'>
                    <div
                        className={`class-buttons ${flightClass === 'Economy' ? 'selected-flight-class-button' : ''}`}
                        onClick={() => setFlightClass("Economy")}
                    >
                        Economy
                    </div>
                    <div
                        className={`class-buttons ${flightClass === 'Business class' ? 'selected-flight-class-button' : ''}`} onClick={() => setFlightClass("Business class")}
                    >
                        Business class
                    </div>
                    <div
                        className={`class-buttons ${flightClass === 'First class' ? 'selected-flight-class-button' : ''}`} onClick={() => setFlightClass("First class")}
                    >
                        First class
                    </div>
                    <div
                        className={`class-buttons ${flightClass === 'Premium economy' ? 'selected-flight-class-button' : ''}`} onClick={() => setFlightClass("Premium economy")}
                    >
                        Premium economy
                    </div>
                </div>
            </div>
            }
        </div>
    )
}

export default PassangerFlight