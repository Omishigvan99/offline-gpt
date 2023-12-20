import React, { useState, useRef, useEffect } from 'react';
import './ChatView.css';
import send from '../../assets/images/send.png';
import ChatLoader from '../../components/ui/chatLoader/ChatLoader.jsx';
const ChatView = () => {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const messagesEndRef = useRef(null);
    const [isChatLoading, setIsChatLoading] = useState(false);
    const inputRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(scrollToBottom, [messages]);

    const handleSendMessage = () => {
        // chk if msg is blnk
        if (newMessage.trim() !== '') {
            setMessages((prevMessages) => [...prevMessages, { text: newMessage, sender: 'user' }]);
            setNewMessage('');

            setTimeout(() => {
                setMessages((prevMessages) => [...prevMessages]);
                setIsChatLoading(true);
            }, 1000);

            setTimeout(() => {
                setMessages((prevMessages) =>
                    prevMessages.map((message, index) => ({
                        ...message,
                        visible: index === prevMessages.length - 1 ? true : message.visible,
                    })),
                );
            }, 50);

            // send msg to backend
            window.electron.ipcRenderer.send(
                'message',
                JSON.stringify({
                    type: 'chat',
                    text: newMessage,
                }),
            );
        } else {
            inputRef.current.focus();
        }
    };

    //effect for handling message received from backend
    useEffect(() => {
        window.electron.ipcRenderer.on('message', (arg) => {
            const { data } = JSON.parse(arg);
            setMessages((prevMessages) => [
                ...prevMessages,
                { text: data, sender: 'bot', visible: true },
            ]);
        });
        setIsChatLoading(false);
    }, []);

    return (
        <div
            style={{
                paddingTop: '10px',
                backgroundcolor: '#1f1d2b',
            }}
        >
            <div className='chat-window'>
                <div className='chat-header'>Chat Window</div>
                <div className='chat-body'>
                    {messages.map((message, index) => (
                        <div
                            key={index}
                            className={`message ${message.sender} ${
                                message.visible ? 'visible' : ''
                            }`}
                        >
                            <span className='message-sender'>
                                {message.sender === 'user' ? 'You: ' : 'Bot: '}
                            </span>
                            {message.text}
                        </div>
                    ))}

                    <div ref={messagesEndRef} />
                    {isChatLoading && <ChatLoader />}
                </div>
                <div className='chat-footer'>
                    <input
                        ref={inputRef}
                        type='text'
                        placeholder='Type a message...'
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                    />
                    <button onClick={handleSendMessage}>
                        <img src={send} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ChatView;
