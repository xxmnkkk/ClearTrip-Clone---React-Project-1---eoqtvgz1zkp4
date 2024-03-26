import { NavLink } from "react-router-dom"

export default function SuccessModal() {
    // This is my component for payment success modal
    return (
        // Here ive included one success image for showing the user that the payment was successfull
        // Also ive included some text's and a link to navigate the user to the my trips page where the user can see his bookings
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