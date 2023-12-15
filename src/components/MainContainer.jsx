import React, { useState } from 'react';
import Sidebar from './sidebar/Sidebar.jsx';
import MainLayout from './main-layout/MainLayout.jsx';
import '../App.css';

const MainContainer = () => {
    const [isUploaded, setIsUploaded] = useState(false);

    return (
        <div className='mainContainer'>
            <Sidebar isUploaded={isUploaded} />
            <MainLayout setIsUploaded={setIsUploaded} />
        </div>
    );
};

export default MainContainer;
