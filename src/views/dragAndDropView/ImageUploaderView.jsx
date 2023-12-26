/* eslint-disable react/prop-types */
import React from 'react';

const ImageUploadView = ({ handleChange, setImageFile = () => {}, imageFile }) => {
    return (
        <div
            style={{
                // width: "100%",
                padding: '20px',
                borderRadius: '8px',
                border: '2px dashed #ccc',
                textAlign: 'center',
                cursor: 'pointer',
                transition: 'border 0.3s ease-in-out',
            }}
        >
            <input
                type='file'
                accept={'image/*'}
                onChange={handleChange}
                style={{
                    display: 'none',
                }}
                id='ImgInput'
            />

            <label
                htmlFor='ImgInput'
                style={{
                    color: '#1890ff',
                    cursor: 'pointer',
                    display: 'block',
                }}
            >
                Upload Image here
            </label>
        </div>
    );
};

export default ImageUploadView;
