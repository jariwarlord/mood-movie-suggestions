// components/Background.js
import React from 'react';
import './styles/Background.css';

const Background = ({ movie }) => {
  const backgroundStyle = movie ? {
    backgroundImage: `url(${movie.img})`, // Film posterini arka plan resmi olarak ayarlayın
    backgroundSize: 'cover', // Arka plan resminin kaplamasını sağlamak için
    backgroundPosition: 'center', // Arka planın ortalanmasını sağlamak için
  } : {};

  return <div className="background" style={backgroundStyle}></div>;
};

export default Background;
