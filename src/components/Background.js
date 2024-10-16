// src/components/Background.js
import React from 'react';
import './styles/Background.css';

const Background = ({ movie }) => {
    const backgroundStyle = movie ? {
        backgroundImage: `url(${movie.img})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    } : {};

    return <div className="background" style={backgroundStyle}></div>;
};

export default Background;
