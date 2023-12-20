/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import FileUploaderView from './FileUploaderView.jsx';
import { useNavigate } from 'react-router-dom';

const fileTypes = ['pdf'];

const DragDropView = ({ setIsUploaded = () => {}, setIsLoading = () => {}, isLoading }) => {
    const [file, setFile] = useState(null);
    const [textAreaValue, setTextAreaValue] = useState('');
    const handleTextAreaChange = (event) => {
        setTextAreaValue(event.target.value);
    };

    let navigate = useNavigate();

    const handleFileChange = (selectedFile) => {
        setFile(selectedFile);
        selectedFile && setIsUploaded(true);
        textAreaValue && setIsUploaded(true);
        console.log('File selected:', selectedFile);
    };

    //effect for handling file change (sending file to backend)
    useEffect(() => {
        if (!file) return;

        setIsLoading(true);
        window.electron.ipcRenderer.send(
            'file-upload',
            JSON.stringify({
                file: file.path,
            }),
        );
    }, [file]);

    //registering event listener for file upload response
    useEffect(() => {
        window.electron.ipcRenderer.on('message', (arg) => {
            let data = JSON.parse(arg);
            if (data.data === 'ready for input') {
                window.electron.ipcRenderer.send(
                    'summarize',
                    JSON.stringify({
                        type: 'summarize',
                        text: 'summarize this context in 1000 words or more',
                    }),
                );
                setIsLoading(false);
                navigate('/main_window/summarize');
            }
        });
    }, []);

    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                minHeight: '90vh',
                padding: '20px',
                borderRadius: '10px',
                boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
                maxWidth: '500px',
                margin: '0 auto',
            }}
        >
            <h1 style={{ marginBottom: '20px' }}>Drag and Drop Files</h1>
            <FileUploaderView onFileChange={handleFileChange} fileTypes={fileTypes} />
            <div style={{ marginTop: '20px', width: '100%', minHeight: '95px' }}>
                {file && (
                    <>
                        <h3>File Details:</h3>
                        <p>Name: {file.name}</p>
                    </>
                )}
            </div>
            <textarea
                style={{
                    marginTop: '20px',
                    width: '100%',
                    height: 'auto',
                    padding: '10px',
                    borderRadius: '8px',
                    border: '1px solid #ccc',
                    resize: 'none',
                }}
                placeholder='Type your text here...'
                value={textAreaValue}
                onChange={handleTextAreaChange}
            />
        </div>
    );
};

export default DragDropView;
