// components/Movie.js
import React from 'react';

const Movie = ({ movie, onNewSuggestion }) => {
  return (
    <div className="movie-info">
      <h2>Önerilen Film: {movie.title}</h2>
      <button onClick={onNewSuggestion}>Yeni Öneri Al</button>
      <h3>IMDB Puanı: {movie.imdb}</h3>
      <img src={movie.img} alt={movie.title} />
    </div>
  );
};

export default Movie;
