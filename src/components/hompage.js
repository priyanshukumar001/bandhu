import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { typeAnimation } from "../../config/typeAnimation";


window.onload = () => {
    localStorage.setItem('newAPIKey', "");
}
const Homepage = () => {
    const navigate = useNavigate();
    const [key, setKey] = useState("");

    useEffect(() => {
        const heading = document.getElementById('welcome');
        // const apiBox = document.getElementsByClassName('haveApi')[0];
        const apiBox = document.getElementById('apiBox');
        typeAnimation('Welcome!', 100, heading);
        apiBox.style.display = 'flex';
    }, []);


    const handleSubmit = (e) => {
        e.preventDefault();
        if (key !== "") {
            localStorage.setItem('newAPIKey', key);
            // console.log(localStorage.getItem('newAPIKey'));
            setKey("");
            navigate('/login');
        } else {
            window.alert("Please enter valid key!");
        }

    }

    return (
        <>
            {/* <h2>Welcome!.....</h2> */}
            {/* <div id="animationBody"  > */}
            <h2 id="welcome" className="main_heading"></h2>
            <div id='apiBox' className="haveApi">
                <button className="keyButton"
                    onClick={e => {
                        const keyContainer = document.getElementById('keyInputContainer');
                        keyContainer.style.display = 'flex';
                    }
                    }
                >I have a gemini-ai API key?</button>
                <div id="keyInputContainer">
                    <input type="text" id="keyInput" placeholder="Enter API key....."
                        value={key}
                        onChange={(e) => {
                            setKey(e.target.value);
                        }}
                        onSubmit={handleSubmit}
                        onKeyDown={(e) => {
                            if (e.key == "Enter") handleSubmit(e);
                        }}
                    />
                    <button id="markOk" title="Submit"
                        onClick={handleSubmit}
                    >&#10004;</button>
                </div>
                <button className="keyButton"
                    onClick={(e) => {
                        navigate('/login');
                    }}
                >Don't have an key!</button>
            </div>
            <div className="animated2" ></div>
            <div className="animated2 " style={{ animationDuration: "20s", translate: "transformY(50%)" }}></div>
            {/* </div> */}
        </>
    )
}

export default Homepage;