import React, { useState, useEffect } from 'react';
import { Link, Navigate } from 'react-router-dom';
// import { isVerified } from '../../config/globalVariables';
import { useVerify } from '../../config/globalVariables.js';
import { Url } from '../constants';
const Login = () => {
    const [isVerified, setIsVerified] = useVerify();
    const [userName, setUserName] = useState('');
    const [passWord, setPaasWord] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const error = document.getElementById('login_error')
        if (userName !== '') {
            if (passWord !== '') {
                try {

                    const response = await fetch(`${Url}/login`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({ email: userName, password: passWord })
                    })

                    // console.log(response);
                    const result = await response.json();
                    //removing error message if any

                    error.innerText = '';

                    if (response.ok) {
                        //clearing input fields

                        setPaasWord('');
                        // console.log('login submit!');
                        //if verified
                        if (result.status === "SUCCESS") {
                            setUserName('');
                            setIsVerified(true);
                        }
                        else { error.innerText = result.message }
                        // console.log('response recieved', response.status, result);
                    } else {
                        // console.log("Error: ", response.status);
                        error.innerText = result.status;
                    }

                } catch (e) {
                    error.innerText = 'Check your Connection!';
                }
            } else {
                error.innerText = 'Enter password!'
            }
        } else {
            error.innerText = 'Enter username!';
        }



    }

    return ((isVerified) ? <Navigate to='/dashboard' /> :
        (<>
            <div className="container">
                <h2>Login</h2>
                <form >

                    <input type="text" placeholder="Email" name="username" value={userName} onChange={(e) => setUserName(e.target.value)} required />
                    <input type="password" placeholder="Password" name="password" value={passWord} onChange={(e) => setPaasWord(e.target.value)} required />
                    <input type="submit" value="Login" onClick={handleSubmit} />
                </form>
                <div>
                    <div id='login_error'></div>
                    <h3>Have you Sign-Up!</h3>
                    {/* <a href="{% url 'signup' %}">Signup</a> */}
                    <Link to="/signup">Signup</Link>
                </div>
            </div>
        </>)
    );
}

export default Login;