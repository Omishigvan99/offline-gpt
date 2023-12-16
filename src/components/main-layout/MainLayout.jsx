import React from 'react';
import { Route, Routes } from 'react-router-dom';
import DragDropView from '../../views/dragAndDropView/DragDropView.jsx';
import ChatView from '../../views/chatView/ChatView.jsx';
import SumOuterView from '../../views/SumOuterView.jsx';

const MainLayout = ({ setIsUploaded = () => {} }) => {
    return (
        <div
            style={{
                padding: '24px',
                minHeight: 500,
                flexGrow: 1,
            }}
        >
            <Routes>
                <Route
                    path='/main_window'
                    element={<DragDropView setIsUploaded={setIsUploaded} />}
                />
                <Route path='/main_window/chat' element={<ChatView />} />
                <Route path='/main_window/summarize' element={<SumOuterView />} />{' '}
                <Route path='/main_window/grammar' element={<SumOuterView />} />
            </Routes>
        </div>
    );
};

export default MainLayout;
