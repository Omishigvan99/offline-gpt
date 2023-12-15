import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import MainContainer from './components/MainContainer.jsx';

function App() {
    return (
        <BrowserRouter>
            <div className='App'>
                <MainContainer />
            </div>
        </BrowserRouter>
    );
}

document.addEventListener('DOMContentLoaded', () => {
    let container = document.getElementById('root');
    let root = createRoot(container);
    root.render(
        <React.StrictMode>
            <App />
        </React.StrictMode>,
    );
});
