import React from 'react';

import { Loader, Placeholder } from 'rsuite';

const CircleLoader = () => (
    <div style={{ flex: 1 }}>
        <Placeholder.Paragraph rows={8} />
        <Loader color='white' backdrop content='loading...' vertical />
    </div>
);

export default CircleLoader;
