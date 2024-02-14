import React from 'react'

function Messages({ messages }) {
    return (
        <>
            <div className="content-container__chat">
                <div className="content-container__chat__area messages">
                    {messages.map((message, index) => (
                        <div key={index} className={`message ${message.sender}-message ${message.animation}`}>
                            {message.text}
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}

export default Messages;