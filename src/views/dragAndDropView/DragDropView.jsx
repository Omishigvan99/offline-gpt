/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import FileUploaderView from './FileUploaderView.jsx';
import ImageUploadView from './ImageUploaderView.js';
import { json, useNavigate } from 'react-router-dom';

const fileTypes = ['pdf'];

const DragDropView = ({ setIsUploaded = () => {}, setIsLoading = () => {}, isLoading }) => {
    const [file, setFile] = useState(null);
    const [textAreaValue, setTextAreaValue] = useState('');
    const handleTextAreaChange = (event) => {
        setTextAreaValue(event.target.value);
    };
    const [imageFile, setImageFile] = useState(null);

    let navigate = useNavigate();

    const handleFileChange = (selectedFile) => {
        setFile(selectedFile);
        selectedFile && setIsUploaded(true);
        textAreaValue && setIsUploaded(true);
        console.log('File selected:', selectedFile);
    };

    const handleChange = (event) => {
        const file = event.target.files[0];
        setImageFile(file);
    };

    const texthandler = () => {
        console.log(textAreaValue);
    };
    const imageHandler = () => {
        console.log(imageFile);
    };

    const buttonHandler = () => {
        if (textAreaValue) {
            setIsLoading(true);
            window.electron.ipcRenderer.send(
                'text',
                JSON.stringify({
                    text: textAreaValue,
                }),
            );
            setIsUploaded(true);
        }
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

    useEffect(() => {
        if (!imageFile) return;
        window.electron.ipcRenderer.send('ocr', imageFile.path);
    }, [imageFile]);

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

        window.electron.ipcRenderer.on('ocrtext', (arg) => {
            setTextAreaValue(arg);
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
            <hr
                style={{
                    borderBottom: '1px solid rgb(128 129 145 / 24%)',
                    width: '100%',
                    margin: ' 35px 0',
                }}
            ></hr>

            <div className='image-container' style={{ width: '100%' }}>
                <h1 style={{ marginBottom: '20px' }}>Upload Images</h1>
                <ImageUploadView
                    handleChange={handleChange}
                    selectedFile={setImageFile}
                    imageFile={imageFile}
                />
                Or
                <textarea
                    style={{
                        marginTop: '20px',
                        width: '100%',
                        height: '220px',
                        padding: '10px',
                        borderRadius: '8px',
                        border: '1px solid #ccc',
                        resize: 'none',
                    }}
                    placeholder='Type your text here...'
                    value={textAreaValue}
                    onChange={handleTextAreaChange}
                />
                <button style={{ height: '30px' }} onClick={buttonHandler}>
                    Upload
                </button>
            </div>
            <div style={{ marginTop: '20px', width: '100%', minHeight: '95px' }}>
                {file && (
                    <>
                        <h3>File Details:</h3>
                        <p>Name: {file.name}</p>
                    </>
                )}
            </div>
        </div>
    );
};

export default DragDropView;
