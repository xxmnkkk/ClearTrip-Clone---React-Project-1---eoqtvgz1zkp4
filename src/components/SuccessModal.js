import { NavLink } from "react-router-dom"

export default function SuccessModal() {

    return (
        <div className="success-modal-container">
            <div className="success-modal">
                <div className="success-image">
                    <img src="https://www.kablooe.com/wp-content/uploads/2019/08/check_mark.png" />
                </div>
                <div className="payment-successful">PAYMENT SUCCESSFUL</div>
                <NavLink to="/mytrip" className="success-navlink">
                <div className="success-button">GO TO YOUR TRIPS</div>
                </NavLink>
                <p>To view your travelling information, visit <strong>my trips</strong> in your profile section or simply click the above link to view your trips.</p>
            </div>
        </div>
    )
}