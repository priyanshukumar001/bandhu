import React, { useEffect, useState } from 'react';
import { createBrowserRouter, Outlet, Link, Navigate } from 'react-router-dom';
import { useVerify } from '../../config/globalVariables.js';
import { Url } from '../constants';

//for minimum age 12
const today = new Date();
const requiredAge = new Date(today.getFullYear() - 12, today.getMonth(), today.getDate());
const minAge = requiredAge.toISOString().split('T')[0];

const Signup = () => {
    const [isVerified, setIsVerified] = useVerify();

    const [userName, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [passWord, setPaasWord] = useState('');
    const [dateOfBirth, setDateOfBirth] = useState('');
    const [passwordCheck, setPasswordCheck] = useState('');
    const [inputType, setInputType] = useState('text');


    const handleSubmit = async (e) => {
        e.preventDefault();
        const error = document.getElementById('sign_error');
        const success = document.getElementById('sign_success');
        if (userName !== '') {
            if (passWord !== '') {
                if (passwordCheck !== '') {
                    if (passWord === passwordCheck) {
                        try {
                            const response = await fetch(`${Url}/signup`, {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json'
                                },
                                body: JSON.stringify({ name: userName, email: email, password: passWord, dateOfBirth: dateOfBirth })
                            });
                            const result = await response.json();

                            // console.log(response);
                            if (response.ok) {
                                error.innerText = '';
                                // console.log('signed up');
                                //server side response
                                //if verified
                                if (result.status === "SUCCESS") {
                                    setPaasWord('');
                                    setUserName('');
                                    setPasswordCheck('');
                                    success.innerText = 'Successfully Created New User!';
                                    setIsVerified(true);
                                } else {
                                    error.innerText = result.message;
                                }

                            } else {
                                // console.log('Error: ' + response.status);
                                error.innerText = response.status;
                            }
                        } catch (e) {
                            error.innerText = "Check your connection!";
                        }
                    } else {
                        error.innerText = 'Password does not match!';
                    }
                } else {
                    error.innerText = 'Re-enter password!';
                }
            } else {
                error.innerText = 'Enter Password!';
            }
        } else {
            error.innerText = 'Enter Username!';
        }



    }
    return ((isVerified) ? <Navigate to='/dashboard' /> :
        (<>
            <div className="container">
                <h2>Sign Up</h2>
                <form >
                    <input type="text" placeholder="Username" name="username" required value={userName} onChange={(e) => setUserName(e.target.value)} />
                    <input type="email" placeholder="Email" name="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
                    <input type={inputType} placeholder="Enter Date of Birth" name="dateOfBirth" required
                        value={dateOfBirth}
                        onChange={(e) => setDateOfBirth(e.target.value)}
                        max={minAge}
                        onFocus={() => setInputType('date')}
                        onBlur={() => setInputType('text')}
                    />
                    <input type="password" placeholder="Password" name="password" required value={passWord} onChange={(e) => setPaasWord(e.target.value)} />
                    <input type="password" placeholder="Re-enter password" name="passcheck" required value={passwordCheck} onChange={(e) => setPasswordCheck(e.target.value)} />
                    <input type="submit" value="Sign Up" onClick={handleSubmit} />
                </form>
                <div>
                    <div id='sign_error'></div>
                    <div id='sign_success' style={{ color: "green" }}></div>
                    <h3>Already a User !</h3>
                    <Link to="/login">Login</Link>
                </div>
            </div>
        </>)
    );
}

export default Signup;