// components/Movie.js
import React from 'react';
import './styles/Movie.css';

const Movie = ({ movie, onNewSuggestion }) => {
  return (
    <div className="movie-info">
      <button onClick={onNewSuggestion}>Yeni Öneri Al</button>
      <h2>Önerilen Film: {movie.title}</h2>
      <h3>IMDB Puanı: {movie.imdb}</h3>
      <img src={movie.img} alt={movie.title} />
      
    </div>
  );
};

export default Movie;
