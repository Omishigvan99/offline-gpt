import React, { useState } from 'react';
import Sidebar from './sidebar/Sidebar.jsx';
import MainLayout from './main-layout/MainLayout.jsx';
import '../App.css';

const AppContainer = () => {
    const [isUploaded, setIsUploaded] = useState(false);

    return (
        <div className='app-Container'>
            <Sidebar isUploaded={isUploaded} />
            <MainLayout setIsUploaded={setIsUploaded} />
        </div>
    );
};

export default AppContainer;
