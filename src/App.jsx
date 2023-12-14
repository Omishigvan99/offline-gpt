import React from 'react';
import { createRoot } from 'react-dom/client';

function App() {
    return (
        <div>
            <h1>Hello this is Electron+React app created using electron-forge</h1>
            {/* Insert your react containers and compnents here */}
        </div>
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
