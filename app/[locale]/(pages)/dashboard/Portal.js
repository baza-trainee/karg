'use client'

import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';

const Portal = ({ children }) => {
    const [container] = useState(() => {
        return document.createElement('div');
    });

    useEffect(() => {
        document.body.appendChild(container);
        return () => {
            document.body.removeChild(container);
        };
    }, [container]);

    return ReactDOM.createPortal(children, container);
};

export default Portal;
