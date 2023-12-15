import React from 'react';
import { Route, Routes } from 'react-router-dom';

import { Layout } from 'antd';
import DragDrop from './DragDrop.jsx';
import Chat from './Chat.jsx';
import InnerComponent from '../InnerComponent.jsx';
const { Content } = Layout;

const MainLayout = ({ setIsUploaded = () => {} }) => {
    return (
        <Content
            style={{
                padding: '0 24px',
                minHeight: 500,
                flexGrow: 1,
            }}
        >
            <Routes>
                <Route path='/main_window' element={<DragDrop setIsUploaded={setIsUploaded} />} />
                <Route path='/main_window/chat' element={<Chat />} />
                <Route path='/main_window/summarize' element={<InnerComponent />} />{' '}
                <Route path='/main_window/grammar' element={<InnerComponent />} />
            </Routes>
        </Content>
    );
};

export default MainLayout;
