import React, { useState, useEffect } from 'react';
import '../chatView/ChatView.css';
import { useLocation } from 'react-router-dom';
import { RingLoader } from 'react-spinners';
import send from '../../assets/images/send.png';

const GrammarView = () => {
    const location = useLocation();
    const [isLoading, setIsLoading] = useState(false);
    const [grammar, setGrammar] = useState('');
    const [data, setData] = useState();

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
        // window.electron.ipcRenderer.send(
        //     'message',
        //     JSON.stringify({
        //         type: 'grammar',
        //         text: 'Please review the provided context for grammar and syntax errors, ensuring clarity and coherence in communication. Additionally, reformat the text to enhance readability, considering proper paragraph structure, punctuation usage, and overall flow. Address any awkward phrasing or ambiguity in the language. Provide suggestions for improvement where necessary, and aim for a polished and well-organized final version of the context',
        //     }),
        // );
        window.electron.ipcRenderer.on('message', (arg) => {
            let { data } = JSON.parse(arg);
            setGrammar(data);
        });
    }, []);

    useEffect(() => {
        console.log('second');
        // window.electron.ipcRenderer.send(() => {
        //     'message',
        //         JSON.stringify({
        //             type: 'grammar',
        //             text: 'Please review the provided context for grammar and syntax errors, ensuring clarity and coherence in communication. Additionally, reformat the text to enhance readability, considering proper paragraph structure, punctuation usage, and overall flow. Address any awkward phrasing or ambiguity in the language. Provide suggestions for improvement where necessary, and aim for a polished and well-organized final version of the text',
        //         });
        // });
    }, [location.pathname]);

    return (
        <div className='chat-window'>
            <div className='chat-header' style={{ padding: '17px' }}>
                Grammar Checking
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
                    <div
                        className='sumDisplay'
                        style={{
                            backgroundColor: 'hsla(0, 0%, 96%, 0.826)',
                            borderRadius: '8px',
                            padding: '1px 10px',
                        }}
                    >
                        <p style={{ fontSize: '14px', lineHeight: '20px', textAlign: 'justify' }}>
                            {grammar}
                        </p>
                    </div>
                )}
            </div>
            <div className='chat-footer'>
                <textarea
                    style={{
                        width: '100%',
                        height: 'auto',
                        padding: '10px',
                        borderRadius: '8px',
                        border: '1px solid #ccc',
                        resize: 'none',
                    }}
                    type='text'
                    placeholder='Type a message...'
                    value={data}
                    onChange={(e) => setData(e.target.value)}
                />
                <button
                    onClick={() => {
                        console.log(data);
                        // window.electron.ipcRenderer.send('grammar', data);
                    }}
                >
                    <img src={send} />
                </button>
            </div>
        </div>
    );
};

export default GrammarView;
