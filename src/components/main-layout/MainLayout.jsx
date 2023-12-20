import React from 'react';
import { Route, Routes } from 'react-router-dom';
import DragDropView from '../../views/dragAndDropView/DragDropView.jsx';
import ChatView from '../../views/chatView/ChatView.jsx';
import SummaryView from '../../views/summaryView/SummaryView.jsx';
import GrammarView from '../../views/grammarView/GrammarView.jsx';

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
                <Route path='/main_window/summarize' element={<SummaryView />} />
                <Route path='/main_window/grammar' element={<GrammarView />} />
            </Routes>
        </div>
    );
};

export default MainLayout;
