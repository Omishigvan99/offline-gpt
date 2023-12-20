import React, { useState, useEffect } from 'react';
import '../views/chatView/ChatView.css';
import { useLocation } from 'react-router-dom';
import { RingLoader } from 'react-spinners';

const SumOuterView = ({ setIsLoading = () => {}, isLoading }) => {
    const location = useLocation();

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
                {location.pathname === '/main_window/summarize'
                    ? 'Summarization'
                    : 'Grammar Checking'}
            </div>
            <div className='chat-body'>{!isLoading && <div>hello</div>}</div>
        </div>
    );
};

export default SumOuterView;
