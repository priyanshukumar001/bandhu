import React from 'react';
import bandhu from '../../public/static/img/bandhu.png';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import Profile from './profile';
import { Url } from '../constants';
import { useVerify } from '../../config/globalVariables.js';


const Nav = (props) => {
    const [isVerified, setIsVerified] = useVerify();
    const [search, setSearch] = useState('');

    const handleSearchSubmit = async (event) => {
        if (event.key === 'Enter') {
            // console.log('Enter pressed!');
            // setSearch('');

            event.preventDefault();
            if (search !== '') {
                try {
                    const response = await fetch(`${Url}?search=${encodeURIComponent(search)}`, {
                        method: 'GET',
                        headers: {
                            'Content-type': 'application/json'
                        },
                        // body: { search: search }
                    })

                    if (response.ok) {
                        // console.log('response sumbmitted');
                        setSearch('');
                        //server response
                    } else {
                        console.log(response.status);
                    }
                } catch (error) {
                    console.log("Check connection!")
                }
            } else {
                console.log('nothing to search');
            }
        }
    }

    return (

        <div className='nav'>
            <Link to="/">
                <h1 id='title'><img id='logo' src={bandhu} />Bandhu</h1>
            </Link>
            {(isVerified) ? (<Profile />) : (
                <div className='register'>
                    <Link to='/login'><button className='register_button'>Login</button></Link>
                    <Link to='/signup'><button className='register_button'>Signup</button></Link>
                </div>
            )}

        </div>

    );
}

export default Nav;