import React, { useState } from 'react';
import FileUploaderView from './FileUploaderView.jsx';

const fileTypes = ['pdf'];

const DragDropView = ({ setIsUploaded = () => {} }) => {
    const [file, setFile] = useState(null);
    const [textAreaValue, setTextAreaValue] = useState('');
    const handleTextAreaChange = (event) => {
        setTextAreaValue(event.target.value);
    };

    const handleFileChange = (selectedFile) => {
        setFile(selectedFile);
        selectedFile && setIsUploaded(true);
        textAreaValue && setIsUploaded(true);
        console.log('File selected:', selectedFile);
    };

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
