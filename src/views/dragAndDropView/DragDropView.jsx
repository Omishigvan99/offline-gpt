import React, { useEffect, useState } from 'react';
import FileUploaderView from './FileUploaderView.jsx';
import { useNavigate } from 'react-router-dom';

const fileTypes = ['pdf'];

const DragDropView = ({ setIsUploaded = () => {} }) => {
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
                        text: "Generate a detailed summary of the main ideas, arguments, and evidence presented in the given document. Pay special attention to the key concepts, supporting details, and the overall structure of the content. Provide a thorough analysis of the context's central themes and any implications discussed. Additionally, identify and summarize the author's perspective, addressing any potential counter arguments or alternative viewpoints presented. Strive for a comprehensive and nuanced summary that captures the essence of the entire context",
                    }),
                );
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

            <textarea
                style={{
                    marginTop: '20px',
                    width: '100%',
                    padding: '10px',
                    borderRadius: '8px',
                    border: '1px solid #ccc',
                    resize: 'vertical',
                }}
                placeholder='Type your text here...'
                value={textAreaValue}
                onChange={handleTextAreaChange}
            />
            {file && (
                <div style={{ marginTop: '20px', width: '100%' }}>
                    <h3>File Details:</h3>
                    <p>Name: {file.name}</p>
                    <p>Type: {file.type}</p>
                    <p>Size: {file.size} bytes</p>
                </div>
            )}
        </div>
    );
};

export default DragDropView;
