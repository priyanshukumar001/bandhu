import dotenv from 'dotenv';
dotenv.config();
import React, { useState, useEffect, useRef } from "react";
import { Navigate } from 'react-router-dom';
import StartChat from "../../utils/startchat.js";
import { chatHistory } from '../../config/globalVariables.js';
import formatText, { parseBasics } from '../../config/formatText.js';
import { useVerify } from '../../config/globalVariables.js';


const Chatbot = (props) => {
    const [isVerified, setIsVerified] = useVerify();
    const [message, setMessage] = useState('');
    // const [botResponse, setBotResponse] = useState('Loading.....');
    const textareaRef = useRef(null);

    useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.style.height = 'auto';
            textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
        }
    }, [message]);



    const handleClick = async (e) => {
        e.preventDefault();
        const chat_box = document.getElementById('chat-box');
        try {
            if (message.trim() != '') {
                const msgDiv1 = document.createElement('div');
                msgDiv1.className = 'bot-message';
                const msgDiv2 = document.createElement('div');
                msgDiv2.className = 'message-sent';
                const msgPara = document.createElement('pre');
                msgPara.className = 'chat-message';
                // msgPara.innerHTML = `${formatText(message)}`;
                msgPara.innerHTML = parseBasics(message.trim());
                msgDiv2.appendChild(msgPara);
                msgDiv1.appendChild(msgDiv2);
                chat_box.appendChild(msgDiv1);
                chat_box.scrollTop = chat_box.scrollHeight;
                //settin input null
                setMessage('');

                //creating and sending default message from server
                const resDiv1 = document.createElement('div');
                resDiv1.className = 'bot-message';
                const resDiv2 = document.createElement('div');
                resDiv2.className = 'message-recieved';
                const resPara = document.createElement('pre');
                resPara.className = 'chat-message';
                resPara.innerHTML = `Loading.....`;
                // resPara.innerHTML = (botResponse);
                resDiv2.appendChild(resPara);
                resDiv1.appendChild(resDiv2);
                chat_box.appendChild(resDiv1);
                chat_box.scrollTop = chat_box.scrollHeight;
                const response = await StartChat(message, chatHistory);
                // console.log(chatHistory);
                try {
                    if (response) {
                        resPara.innerHTML = `${formatText(response)}`;
                        // para.innerHTML = `${botResponse}`;

                    }
                    else {
                        resPara.innerHTML = `AI Server not responding! Please try again.....`;
                        // console.error("server not responding!");
                    }
                } catch (error) {
                    resPara.innerHTML = `Following error Occurred:-<br/> <span style="color:red">${error}</span>`;
                }

            } else {
                console.error("message is missing!");
            }

        } catch (error) {
            console.error(error);
        }



    }

    const handleKeyDown = (e) => {
        // Check if Shift+Enter is pressed
        if (e.shiftKey && e.key === "Enter") {
            // Insert a new line into the text
            setMessage((prevText) => prevText + "\n");
            e.preventDefault(); // Prevent the default behavior of Enter key
        } else if (e.key === "Enter") {
            handleClick(e);
            // console.log('fns called');
            e.preventDefault(); // Prevent the default behavior of Enter key
        }
    };

    return ((!isVerified) ? <Navigate to="/login" /> : (
        <div className="chat-container" >
            <div id="chat-box">
                <div className="bot-message ">
                    <div className='message-recieved'>
                        <p className="chat-message" >Hello! How can I assist you today? </p>
                    </div>
                </div>
                {/* <div className="bot-message ">
                    <div className='message-sent'>
                        <p className="chat-message" >Good! Tell me something about yourself!</p>
                    </div>
                    <p className="chat-message" >Hello! <br />How<br /> can<br /> I <br />assist<br /> you<br /> today? </p>

                </div>
                <div className="bot-message message-sent">
                    <p className="chat-message" >{message}</p>
                </div> */}
                {/* <p class="bot-message message-sent">Good! Tell me something about yourself!</p> */}
            </div>
            <div id="messages" className="input-container" >
                <form >
                    {/* {% csrf_token %} */}
                    {/* <input name="client_msg" type="text" id="user-input" placeholder="Type your message here..."
                        value={message}
                        onChange={(e) => { setMessage(e.target.value) }}
                    /> */}
                    <div className='user-input-area'>
                        <textarea id='user-input'
                            ref={textareaRef}
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            onKeyDown={handleKeyDown}
                            autoFocus
                        ></textarea>
                        <button id="send-button" type="submit" value='submit' onClick={handleClick}>Send</button>

                    </div>
                    {/* <button id="send-button" type="submit" value='submit' onClick={msgParser.bind(null, message, 'server')} >Send</button> */}
                    {/*using bind method to pass on arguments to the main funcion; as it ensures the function is called after the component has been rendered */}
                </form>
            </div>

        </div>
    ));
}

export default Chatbot;

//writing code for event of chatbot
//these statements are already beign declared and used in above component


// export const msgParser = (msg, type = 'client', event) => {
//     if (event) { event.preventDefault(); }

//     const chat_box = document.getElementById('chat-box');
//     // const send_button = document.getElementById('send-buton');

//     if (type == 'client') {
//         const div = document.createElement('div');
//         div.className = 'bot-message message-sent';
//         const para = document.createElement('p');
//         para.className = 'chat-message';
//         para.innerText = msg;
//         div.appendChild(para);
//         chat_box.appendChild(div);
//     }

//     else {
//         const div = document.createElement('div');
//         div.className = 'bot-message message-recieved';
//         const para = document.createElement('p');
//         para.className = 'chat-message';
//         para.innerText = msg;
//         div.appendChild(para);
//         chat_box.appendChild(div);
//     }

// }