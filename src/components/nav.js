import React from 'react';
import img1 from '../../public/static/img/1.jpg';
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
            <img id='logo' src={img1} />
            <input id="search" type='search' name='query' placeholder='Enter your query.....'
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onKeyDown={handleSearchSubmit}
            />
            {/* <p>{search}</p> */}
            {/* <Profile chatHistory={chatHistory} />    */}
            {(isVerified) ? (<Profile />) : (
                <div className='register'>
                    <Link to='/login'><button>Login</button></Link>
                    <Link to='/signup'><button>Signup</button></Link>
                </div>
            )}

        </div>

    );
}

export default Nav;