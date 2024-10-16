import React, { useState } from 'react';

const MovieSuggestions = ({ mood }) => {
  // Mood'lara göre film listesi
  const movieList = {
    mutlu: ['The Pursuit of Happyness', 'La La Land', 'Amélie'],
    üzgün: ['Schindler\'s List', 'A Beautiful Mind', 'The Green Mile'],
    aksiyon: ['Mad Max: Fury Road', 'Die Hard', 'John Wick']
  };

  // Rastgele film seçen fonksiyon
  const getRandomMovie = (movies) => {
    const randomIndex = Math.floor(Math.random() * movies.length);
    return movies[randomIndex];
  };

  // Kullanıcının moduna göre film listesi
  const normalizedMood = mood.toLowerCase();
  const moviesForMood = movieList[normalizedMood];

  // Rastgele seçilen film için state oluştur
  const [randomMovie, setRandomMovie] = useState(null);

  const handleNewSuggestion = () => {
    if (moviesForMood) {
      const movie = getRandomMovie(moviesForMood);
      setRandomMovie(movie); // Yeni rastgele filmi set et
    }
  };

  return (
    <div>
      {moviesForMood ? (
        <div>
          <h2> "{mood}" için film önerileri </h2>
          {randomMovie ? <p>{randomMovie}</p> : <p>Click the button for a suggestion!</p>}
          <button onClick={handleNewSuggestion}>Yeni Öneri Yolla!</button>
        </div>
      ) : (
        <h2>Sorry, we don't have suggestions for "{mood}" mood.</h2>
      )}
    </div>
  );
};

export default MovieSuggestions;