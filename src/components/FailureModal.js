import { NavLink } from "react-router-dom"

export default function FailureModal() {
    const error = sessionStorage.getItem('paymentError');
    return (
        <div className="failure-modal-container">
            <div className="failure-modal">
                <div className="failure-image">
                    <img src="https://printme.online/wp-content/uploads/2020/04/payment_fail_icon.png" />
                </div>
                <div className="payment-failure">PAYMENT FAILED</div>
                <NavLink to="/main" className="failure-navlink">
                    <div className="failure-button">GO TO HOME</div>
                </NavLink>
                <p><strong>{error}</strong>. Visit the home page to book flights/hotel by simply clicking the above link</p>
            </div>
        </div>
    )
}