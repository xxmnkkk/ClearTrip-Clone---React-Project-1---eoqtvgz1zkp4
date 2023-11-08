import React, { useState } from 'react';
import { AiOutlineClose } from "react-icons/ai";
import axios from 'axios';

const LoginModal = ({ onClose , onLoginSuccess }) => {
    const [activeForm, setActiveForm] = useState('sign-in');

    const [loginDetails, setLoginDetails] = useState({
        email: '',
        password: '',
    });

    const [signupDetails, setSignupDetails] = useState({
        name: '',
        email: '',
        password: '',
    });

    const toggleForm = (e) => {
        setActiveForm(e);

        if (e === 'sign-in') {
            setSignupDetails({
                name: '',
                email: '',
                password: '',
            });
        } else {
            setLoginDetails({
                name: '',
                password: '',
            });
        }
    };

    const handleLogin = (e) => {
        e.preventDefault();
        console.log('Login details:', loginDetails);
        
        const config = {
            headers: {
                "Content-type" : "application/json",
                "projectID" : "f104bi07c490",
            }
        }

        axios.post("https://academics.newtonschool.co/api/v1/bookingportals/login" , {...loginDetails, appType: "bookingportals"} , config)
        .then((response) => {
            console.log("response: ", response.data)

            if (response.data.token) {
                sessionStorage.setItem("userToken", response.data.token);
                sessionStorage.setItem("loggedInUser", JSON.stringify(loginDetails));
                // Use a key that uniquely identifies the user for userDetails
                localStorage.setItem(`userDetails_${loginDetails.email}`, JSON.stringify(loginDetails)); // Store login details
                onLoginSuccess();
            }
        })
        .catch((error) => {
            console.log(error)
        })
    };

    const handleSignup = (e) => {
        e.preventDefault();
        console.log('Signup details:', signupDetails);
        
        const config = {
            headers: {
                "Content-type" : "application/json",
                "projectID" : "f104bi07c490",
            }
        }

        axios.post("https://academics.newtonschool.co/api/v1/bookingportals/signup", {...signupDetails , appType: "bookingportals"} , config)
        .then((response) => {
            console.log("response: " , response.data)

            if (response.data.token) {
                sessionStorage.setItem("userToken", response.data.token);
                // Use a key that uniquely identifies the user for newUser
                localStorage.setItem(`newUser_${signupDetails.email}`, JSON.stringify(signupDetails)); // Store signup details
            }
        })
        .catch((error) => {
            console.log(error);
        })
    };

    const handleLoginInput = (e) => {
        const { name, value } = e.target;
        setLoginDetails({
            ...loginDetails,
            [name]: value
        })
    }

    const handleSignupInput = (e) => {
        const { name, value } = e.target;
        setSignupDetails({
            ...signupDetails,
            [name]: value
        })
    }

    return (
        <div className="modal-overlay">
            <div className='modal-image-container'>
                <img src="https://images.unsplash.com/photo-1574438831746-b3f4bada685d?auto=format&fit=crop&q=80&w=3417&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" width="400px" />
            </div>
            <div className='modal-login-form'>
                <AiOutlineClose onClick={onClose} className='icon' />

                {activeForm === 'sign-in' ? (
                    <div className='sign-in-div'>
                        <h2>Login </h2>
                        <div className='login-name-div'>email: <input type='email' name='email' value={loginDetails.email} onChange={handleLoginInput} /></div>
                        <div className='login-password-div'>password: <input type='password' name='password' value={loginDetails.password} onChange={handleLoginInput} /></div>
                        <div className='signin-button-div'><button onClick={handleLogin}>Sign in</button></div>
                        <p>New user? <span onClick={() => toggleForm('sign-up')}>Sign up now</span></p>
                    </div>
                ) : (
                    <div className='sign-up-div'>
                        <h2>Sign up </h2>
                        <div className='login-name-div'>name: <input type='text' name='name' value={signupDetails.name} onChange={handleSignupInput} /></div>
                        <div className='login-email-div'>email:<input type='email' name='email' value={signupDetails.email} onChange={handleSignupInput} /></div>
                        <div className='login-password-div'>password: <input type='password' name='password' value={signupDetails.password} onChange={handleSignupInput} /></div>
                        <div className='signin-button-div'><button onClick={handleSignup}>Sign up</button></div>
                        <p>Already a user? <span onClick={() => toggleForm('sign-in')}>Sign in now</span></p>
                    </div>
                )}

                <div className='break-line'></div>

                <div className='terms-condition'>
                    By continuing, you agree to Cleartrip's privacy policy &
                    terms of use.
                </div>

            </div>
        </div>
    );
};

export default LoginModal;
