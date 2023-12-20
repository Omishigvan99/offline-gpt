/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import '../chatView/ChatView.css';
import { useLocation } from 'react-router-dom';
import CircleLoader from '../../components/ui/CircleLoader.jsx';

const SummaryView = ({ setIsLoading = () => {}, isLoading }) => {
    const location = useLocation();
    const [summary, setSummary] = useState('');

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

    useEffect(() => {
        window.electron.ipcRenderer.on('message', (arg) => {
            let { data } = JSON.parse(arg);
            setSummary(data);
        });
        setIsLoading(false);
    }, []);

    return (
        <div className='chat-window'>
            <div className='chat-header' style={{ padding: '17px' }}>
                Summarization
            </div>
            <div
                className='chat-body'
                style={{
                    display: isLoading && 'flex',
                    justifyContent: isLoading && 'center',
                    alignItems: isLoading && 'center',
                }}
            >
                {summary ? (
                    <div
                        className='sumDisplay'
                        style={{
                            backgroundColor: 'hsla(0, 0%, 96%, 0.826)',
                            borderRadius: '8px',
                            padding: '1px 10px',
                        }}
                    >
                        <p
                            style={{
                                fontSize: '14px',
                                lineHeight: '20px',
                                textAlign: 'justify',
                            }}
                        >
                            {summary}
                        </p>
                    </div>
                ) : (
                    <CircleLoader/>
                )}
            </div>
        </div>
    );
};

export default SummaryView;
