import React, { useState } from 'react';
import FileUploader from './FileUploader.jsx';

const fileTypes = ['pdf'];

const DragDrop = ({ setIsUploaded = () => {} }) => {
    const [file, setFile] = useState(null);

    const handleFileChange = (selectedFile) => {
        setFile(selectedFile);
        selectedFile && setIsUploaded(true);
        console.log('File selected:', selectedFile);
    };

    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '90vh',
                padding: '20px',
                borderRadius: '10px',
                boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
                maxWidth: '500px',
                margin: '0 auto',
            }}
        >
            <h1 style={{ marginBottom: '20px' }}>Drag and Drop Files</h1>
            <FileUploader onFileChange={handleFileChange} fileTypes={fileTypes} />
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

export default DragDrop;
