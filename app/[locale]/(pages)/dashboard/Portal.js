'use client'

import { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';

const Portal = ({ children }) => {
    const [container] = useState(() => {
        const newContainer = document.createElement('div');
        return newContainer;
    });

    useEffect(() => {
        document.body.appendChild(container);
        return () => {
            document.body.removeChild(container);
        };
    }, []);
    
    return ReactDOM.createPortal(children, container);
};

export default Portal;
