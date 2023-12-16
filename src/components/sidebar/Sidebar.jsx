import React from 'react';
import './Sidebar.css';
import { NavLink } from 'react-router-dom';

const Sidebar = ({ isUploaded }) => {
    return (
        <div className='side-panel'>
            <div className='sidebar'>
                <span className='logo'>S</span>
                <a className='logo-expand'>Offline GPT</a>
                <div className='side-wrapper'>
                    <div className='side-title'>MENU</div>
                    <div className='side-menu'>
                        <NavLink
                            className='nav-link'
                            to='/main_window/summarize'
                            style={({ isActive }) => ({
                                color: isActive && '#fff',
                                fontSize: '19px',
                                fontWeight: isActive ? '600' : '500',
                                alignItems: 'center',
                                textDecoration: 'none',
                                pointerEvents: !isUploaded && 'none',
                            })}
                        >
                            <svg
                                xmlns='http://www.w3.org/2000/svg'
                                data-name='Layer 1'
                                viewBox='0 0 24 24'
                                id='left-to-right-text-direction'
                            >
                                <path
                                    fill='#FFFF'
                                    fillRule='evenodd'
                                    clipRule='evenodd'
                                    d='M21.42,17.62a1,1,0,0,0-.21-.33l-3-3a1,1,0,0,0-1.42,1.42L18.09,17H3.5a1,1,0,0,0,0,2H18.09l-1.3,1.29a1,1,0,0,0,0,1.42,1,1,0,0,0,1.42,0l3-3a1,1,0,0,0,.21-.33A1,1,0,0,0,21.42,17.62ZM8.5,10v4a1,1,0,0,0,2,0V4h2V14a1,1,0,0,0,2,0V4h1a1,1,0,0,0,0-2h-7a4,4,0,0,0,0,8Zm0-6V8a2,2,0,0,1,0-4Z'
                                ></path>
                            </svg>
                            Summarize
                        </NavLink>
                        <NavLink
                            className='nav-link'
                            to='/main_window/chat'
                            style={({ isActive }) => ({
                                color: isActive && '#fff',
                                fontSize: '19px',
                                fontWeight: isActive ? '600' : '500',
                                alignItems: 'center',
                                textDecoration: 'none',
                                pointerEvents: !isUploaded && 'none',
                            })}
                        >
                            <svg
                                xmlns='http://www.w3.org/2000/svg'
                                viewBox='0 0 24 24'
                                id='comment-alt'
                            >
                                <path
                                    fill='#FFFF'
                                    fillRule='evenodd'
                                    clipRule='evenodd'
                                    d='M19,2H5A3,3,0,0,0,2,5V15a3,3,0,0,0,3,3H16.59l3.7,3.71A1,1,0,0,0,21,22a.84.84,0,0,0,.38-.08A1,1,0,0,0,22,21V5A3,3,0,0,0,19,2Zm1,16.59-2.29-2.3A1,1,0,0,0,17,16H5a1,1,0,0,1-1-1V5A1,1,0,0,1,5,4H19a1,1,0,0,1,1,1Z'
                                ></path>
                            </svg>
                            Chat
                        </NavLink>
                        <NavLink
                            className='nav-link'
                            to='/main_window/grammar'
                            style={({ isActive }) => ({
                                color: isActive && '#fff',
                                fontSize: '19px',
                                fontWeight: isActive ? '600' : '500',
                                alignItems: 'center',
                                textDecoration: 'none',
                                pointerEvents: !isUploaded && 'none',
                            })}
                        >
                            <svg
                                xmlns='http://www.w3.org/2000/svg'
                                data-name='Layer 1'
                                viewBox='0 0 24 24'
                                id='letter-english-a'
                            >
                                <path
                                    fillRule='evenodd'
                                    clipRule='evenodd'
                                    fill='#FFFF'
                                    d='M18.97021,19.75732,15.34912,5.27246A2.9958,2.9958,0,0,0,12.43848,3h-.877A2.9958,2.9958,0,0,0,8.65088,5.27246L5.02979,19.75732a1.0001,1.0001,0,0,0,1.94042.48536L8.28082,15h7.43836l1.31061,5.24268a1.0001,1.0001,0,0,0,1.94042-.48536ZM8.78082,13l1.81049-7.24219A.99825.99825,0,0,1,11.56152,5h.877a.99825.99825,0,0,1,.97021.75781L15.21918,13Z'
                                ></path>
                            </svg>
                            Grammar
                        </NavLink>
                        <NavLink
                            className='nav-link'
                            to='/main_window'
                            style={({ isActive }) => ({
                                color: isActive && '#fff',
                                fontSize: '19px',
                                fontWeight: isActive ? '600' : '500',
                                alignItems: 'center',
                                textDecoration: 'none',
                                marginTop: '100px',
                            })}
                        >
                            <svg
                                xmlns='http://www.w3.org/2000/svg'
                                viewBox='0 0 24 24'
                                id='file-download'
                            >
                                <path
                                    fill='#FFFF'
                                    fillRule='evenodd'
                                    clipRule='evenodd'
                                    d='M20,8.94a1.31,1.31,0,0,0-.06-.27l0-.09a1.07,1.07,0,0,0-.19-.28h0l-6-6h0a1.07,1.07,0,0,0-.28-.19l-.1,0A1.1,1.1,0,0,0,13.06,2H7A3,3,0,0,0,4,5V19a3,3,0,0,0,3,3H17a3,3,0,0,0,3-3V9S20,9,20,8.94ZM14,5.41,16.59,8H15a1,1,0,0,1-1-1ZM18,19a1,1,0,0,1-1,1H7a1,1,0,0,1-1-1V5A1,1,0,0,1,7,4h5V7a3,3,0,0,0,3,3h3Zm-4.71-4.71-.29.3V12a1,1,0,0,0-2,0v2.59l-.29-.3a1,1,0,0,0-1.42,1.42l2,2a1,1,0,0,0,.33.21.94.94,0,0,0,.76,0,1,1,0,0,0,.33-.21l2-2a1,1,0,0,0-1.42-1.42Z'
                                ></path>
                            </svg>
                            {isUploaded ? 'File Uploaded' : 'Drag#Drop'}
                        </NavLink>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
