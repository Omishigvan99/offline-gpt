import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import AppContainer from './components/AppContainer.jsx';

function App() {
    return (
        <BrowserRouter>
            <div className='App'>
                <AppContainer />
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
