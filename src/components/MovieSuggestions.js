import './styles/MovieSuggestions.css';
import React, { useState } from 'react';


const MovieSuggestions = ({ mood }) => {
  const [movie, setMovie] = useState(null);
  const [error, setError] = useState(null);

  // API Key burada tanımlı
  const API_KEY = '69b08da2'; 

  const getMovieFromAPI = async (movieTitle) => {
    try {
      const response = await fetch(`https://www.omdbapi.com/?t=${encodeURIComponent(movieTitle)}&apikey=${API_KEY}`);
      const data = await response.json();

      if (data.Response === "True") {
        setMovie({
          title: data.Title,
          imdb: data.imdbRating,
          img: data.Poster,
        });
        setError(null); // Hata yoksa sıfırla
      } else {
        setError("Film bulunamadı.");
        setMovie(null);
      }
    } catch (error) {
      setError("Bir hata oluştu. Lütfen tekrar deneyin.");
    }
  };

  const handleNewSuggestion = () => {
    const movieSuggestions = {
      mutlu: ['The Pursuit of Happyness', 'La La Land', 'Amélie'],
      üzgün: ['Schindler\'s List', 'A Beautiful Mind', 'The Green Mile'],
      aksiyon: ['Mad Max: Fury Road', 'Die Hard', 'John Wick']
    };

    const normalizedMood = mood.toLowerCase();
    const moviesForMood = movieSuggestions[normalizedMood];

    if (moviesForMood) {
      const randomIndex = Math.floor(Math.random() * moviesForMood.length);
      const randomMovie = moviesForMood[randomIndex];
      getMovieFromAPI(randomMovie); // API'den rastgele film önerisi al
    }
  };

  return (
    <div>
      <h2>Movie Suggestions for "{mood}"</h2>
      <button onClick={handleNewSuggestion}>Get New Suggestion</button>

      {error && <p>{error}</p>}

      {movie && (
        <div className="movie-card">
          <img src={movie.img} alt={movie.title} className="movie-image" />
          <h3>{movie.title}</h3>
          <p>IMDb Rating: {movie.imdb}</p>
        </div>
      )}
    </div>
  );
};

export default MovieSuggestions;
