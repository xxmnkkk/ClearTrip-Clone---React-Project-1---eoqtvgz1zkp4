import { NavLink } from "react-router-dom"

export default function FailureModal() {
    // This component is for my payment error modal
    const error = sessionStorage.getItem('paymentError');
    return (
        // Simple code for the payment error modal
        // Ive included a failed image and some texts regarding the failed process and proceed link to the homepage.
        <div className="failure-modal-container">
            <div className="failure-modal">
                <div className="failure-image">
                    <img src="https://printme.online/wp-content/uploads/2020/04/payment_fail_icon.png" />
                </div>
                <div className="payment-failure">PAYMENT FAILED</div>
                <NavLink to="/main" className="failure-navlink">
                    <div className="failure-button">GO TO HOME</div>
                </NavLink>
                <p><strong>{error}</strong>Visit the home page to book flights/hotel by simply clicking the above link</p>
            </div>
        </div>
    )
}