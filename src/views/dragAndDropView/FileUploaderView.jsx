import React, { useState } from 'react';

const FileUploaderView = ({ onFileChange, fileTypes }) => {
    const [isDragging, setIsDragging] = useState(false);

    const handleDragEnter = (e) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = (e) => {
        e.preventDefault();
        setIsDragging(false);
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setIsDragging(false);

        const droppedFiles = e.dataTransfer.files;

        if (droppedFiles.length > 0) {
            const allowedTypes = fileTypes || [];

            if (
                allowedTypes.length === 0 ||
                allowedTypes.some((type) => droppedFiles[0].type.includes(type))
            ) {
                onFileChange(droppedFiles[0]);
            } else {
                alert('Invalid file type. Please upload a valid file.');
            }
        }
    };

    const handleFileInput = (e) => {
        const selectedFile = e.target.files[0];
        onFileChange(selectedFile);
    };

    return (
        <div
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
            style={{
                width: '100%',
                padding: '20px',
                borderRadius: '8px',
                border: isDragging ? '2px dashed #ccc' : '2px solid #ccc',
                textAlign: 'center',
                cursor: 'pointer',
                transition: 'border 0.3s ease-in-out',
            }}
        >
            <input
                type='file'
                accept={fileTypes?.join(',')}
                onChange={handleFileInput}
                style={{
                    display: 'none',
                }}
                id='fileInput'
            />
            <label
                htmlFor='fileInput'
                style={{
                    color: '#1890ff',
                    cursor: 'pointer',
                    display: 'block',
                }}
            >
                Drag and drop files here or click to select files
            </label>
        </div>
    );
};

export default FileUploaderView;
