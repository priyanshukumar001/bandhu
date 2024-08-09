import { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { useVerify, useUser } from "../../config/globalVariables.js";


const DropMenu = () => {
    const navigate = useNavigate();
    const [isVerified, setIsVerified] = useVerify();
    const [userInfo, setUserInfo] = useUser();
    const list = [
        { str: 'Dashboard', nav: '/dashboard' },
        { str: 'ChatBot', nav: '/chatbot' },
        { str: 'Activity', nav: '/' },
        { str: 'Logout', nav: '/' },
    ];
    const [isClicked, setIsClicked] = useState(false);

    return (
        <>
            <div className="dropButton"
                // onMouseOver={(e) => {
                //     setIsClicked(true);
                //     e.target.innerHTML = '&#11161;';
                // }}
                // onMouseOut={(e) => {
                //     setIsClicked(false);
                //     e.target.innerHTML = '&#11163;';
                // }}
                onClick={(e) => {
                    const dropBox = document.getElementById('dropBox');

                    if (isClicked == true) {
                        setIsClicked(false);
                        e.target.innerHTML = '&#11163;';
                        dropBox.style.padding = '0';

                    }
                    else {
                        setIsClicked(true);
                        e.target.innerHTML = '&#11161;';
                        dropBox.style.padding = '0.5em';
                    }
                }}
            >&#11163;
            </div>
            <div className="dropBox" id="dropBox">
                {(isClicked) ? (
                    (list?.map((ele, idx) => {
                        if (ele.str.toLowerCase() !== 'logout') {
                            return (<Link to={`${ele.nav}`} key={200 + idx}><div className="dropOptions" >
                                {ele.str}
                            </div></Link>);
                        } else {
                            return (
                                <div className="dropOptions"
                                    onClick={(e) => {
                                        // isVerified = false;
                                        setIsVerified(false);
                                        setUserInfo({});
                                        // console.log('logout');
                                        // console.log(isVerified);
                                        navigate('/');
                                    }}
                                    key={200 + idx}
                                > {ele.str}</div>
                            )
                        }

                    }))
                ) : (<></>)}
            </div >
        </>

    );
}

export default DropMenu;
