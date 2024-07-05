import React from 'react';
import { createRoot } from 'react-dom/client';
import App from '../src/App';
import { RouterProvider } from 'react-router-dom';


const root = createRoot(document.getElementById('root'));
console.log("all set!");

root.render(<RouterProvider router={App} />);
