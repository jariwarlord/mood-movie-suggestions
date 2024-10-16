// src/components/Error.js
import React from 'react';
import './styles/Error.css';

const Error = ({ message }) => {
    return message ? <h2 className="error">{message}</h2> : null;
};

export default Error;
