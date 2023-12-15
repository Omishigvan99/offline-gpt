import React, { useState, useEffect } from 'react';
import './main-layout/ChatWindow.css';
import { useLocation } from 'react-router-dom';
import { RingLoader } from 'react-spinners';

const InnerComponent = () => {
    const location = useLocation();
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoading(true);
                await new Promise((resolve) => setTimeout(resolve, 2000));

                setIsLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
                setIsLoading(false);
            }
        };
        fetchData();
    }, [location.pathname]);

    return (
        <div className='chat-window'>
            <div className='chat-header' style={{ padding: '17px' }}>
                {location.pathname === '/summarize' ? 'Summarization' : 'Grammar Checking'}
            </div>
            <div
                className='chat-body'
                style={{
                    display: isLoading && 'flex',
                    justifyContent: isLoading && 'center',
                    alignItems: isLoading && 'center',
                }}
            >
                {isLoading ? (
                    <div className='overlay'>
                        <RingLoader color='#36D7B7' size={100} loading={isLoading} />
                    </div>
                ) : (
                    <div>hello</div>
                )}
            </div>
        </div>
    );
};

export default InnerComponent;
