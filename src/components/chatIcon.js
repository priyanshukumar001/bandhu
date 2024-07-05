import React from 'react';
import { Link } from 'react-router-dom';

const ChatIcon = () => {

    return (
        <>
            <Link to='/chatbot'>
                <div id="chat"  >
                    <p>&lt;&#9432;&gt;</p>
                </div>
            </Link>
        </>
    )
}

export default ChatIcon;