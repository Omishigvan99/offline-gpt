import React, { useState, useEffect } from 'react';
import '../chatView/ChatView.css';
import { useLocation } from 'react-router-dom';
import { RingLoader } from 'react-spinners';

const GrammarView = () => {
    const location = useLocation();
    const [isLoading, setIsLoading] = useState(false);
    const [grammar, setGrammar] = useState('');

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
        window.electron.ipcRenderer.send(
            'message',
            JSON.stringify({
                type: 'grammar',
                text: 'Please review the provided context for grammar and syntax errors, ensuring clarity and coherence in communication. Additionally, reformat the text to enhance readability, considering proper paragraph structure, punctuation usage, and overall flow. Address any awkward phrasing or ambiguity in the language. Provide suggestions for improvement where necessary, and aim for a polished and well-organized final version of the context',
            }),
        );
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
                    grammar
                )}
            </div>
        </div>
    );
};

export default GrammarView;
