import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import img2 from '../../public/static/img/2.jpg';
import DropMenu from './dropmenu';



const Profile = (props) => {
    // console.log(isVerified);
    const [isNew, setIsNew] = useState(true);
    const location = useLocation();
    const navigate = useNavigate();

    const handleClick = (e) => {
        navigate('/dashboard');
    }

    const options = [
        { value: '/login', label: 'Login' },
        { value: '/signup', label: 'Signup' }
    ];

    // useEffect(() => {
    //     if (location.pathname === '/login') setIsNew(false);
    //     else if (location.pathname === '/signup') setIsNew(true);
    // }, [location]);
    return (
        <div className='profile'>
            <img className='profile_img' src={img2} style={{ cursor: "pointer" }} onClick={handleClick} />

            <DropMenu></DropMenu>
        </div>
    )
}


export default Profile;
