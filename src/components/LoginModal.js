import React, { useContext, useState } from 'react';
import { AiOutlineClose } from "react-icons/ai";
import axios from 'axios';
import { AuthContext } from './App';
import image from '../image/login-img.jpg';

const LoginModal = ({ onClose , onLoginSuccess }) => {
    // const {loggedInUserName,setLoggedInUserName} = useContext(AuthContext);

    const [activeForm, setActiveForm] = useState('sign-in');
    const [loginError, setLoginError] = useState('');
    const [signupError, setSignupError] = useState('');

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
                localStorage.setItem(`userDetails_${loginDetails.email}`, JSON.stringify(loginDetails)); 
                onLoginSuccess();
            }

            if(response.data.data.name){
                sessionStorage.setItem('loggedInUserName', response.data.data.name)
                console.log("logged in user name in login component: ", response.data.data.name);
            }

            if(response.data.data._id)(
                sessionStorage.setItem("userId", response.data.data._id)
            )
        })
        .catch((error) => {
            console.log(error)
            setLoginError(error.response.data.message)
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
                localStorage.setItem(`newUser_${signupDetails.email}`, JSON.stringify(signupDetails)); 
            }
        })
        .catch((error) => {
            console.log(error);
            setSignupError(error.response.data.message)
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
                <img src={image} width="400px" />
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

                        <div className='error-div-loginandsignup'>{loginError}</div>
                    </div>
                ) : (
                    <div className='sign-up-div'>
                        <h2>Sign up </h2>
                        <div className='login-name-div'>name: <input type='text' name='name' value={signupDetails.name} onChange={handleSignupInput} /></div>
                        <div className='login-email-div'>email:<input type='email' name='email' value={signupDetails.email} onChange={handleSignupInput} /></div>
                        <div className='login-password-div'>password: <input type='password' name='password' value={signupDetails.password} onChange={handleSignupInput} /></div>
                        <div className='signin-button-div'><button onClick={handleSignup}>Sign up</button></div>
                        <p>Already a user? <span onClick={() => toggleForm('sign-in')}>Sign in now</span></p>

                        <div className='error-div-loginandsignup'>{signupError}</div>
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
