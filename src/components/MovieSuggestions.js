import './styles/MovieSuggestions.css';
import React, { useState, useEffect } from 'react';
import Movie from './Movie';
import Error from './Error';
import Background from './Background';
import movieSuggestions from './MovieList';


const API_KEY = '69b08da2'; // API anahtarınızı buraya ekleyin

const MovieSuggestions = ({ mood }) => {
  const [movie, setMovie] = useState(null);
  const [error, setError] = useState(null); 

  useEffect(() => {
    if (mood) {
      getRandomMovie();
    }
  }, [mood]);

  const getRandomMovie = async () => {
    let movies = [];
    
    // Mood'a göre uygun film listesini seç
    if (mood.toLowerCase() === 'mutlu') {
      movies = movieSuggestions.mutlu;
    } else if (mood.toLowerCase() === 'hüzünlü') {
      movies = movieSuggestions.hüzünlü;
    } else if (mood.toLowerCase() === 'aksiyon') {
      movies = movieSuggestions.aksiyon;
    } else if (mood.toLowerCase() === 'rastgele') {
      movies = movieSuggestions.rastgele;
    } else if (mood.toLowerCase() === 'anime') {
        movies = movieSuggestions.anime;
    } else if (mood.toLowerCase() === 'dram') {
        movies = movieSuggestions.dram;    
    } else if (mood.toLowerCase() === 'bilimkurgu') {
        movies = movieSuggestions.bilimkurgu;
    } else if (mood.toLowerCase() === 'romantizm') {
        movies = movieSuggestions.romantizm;           
    } else {
      setError('Lütfen geçerli bir mod yazın (mutlu, hüzünlü, aksiyon, rastgele).');
      return;
    }

    // Rastgele bir film seç
    const randomIndex = Math.floor(Math.random() * movies.length);
    const movieTitle = movies[randomIndex];

    // Seçilen filmi API'den al
    try {
      const response = await fetch(`https://www.omdbapi.com/?t=${encodeURIComponent(movieTitle)}&apikey=${API_KEY}`);
      const data = await response.json();

      if (data.Response === 'True') {
        setMovie({
          title: data.Title,
          imdb: data.imdbRating,
          img: data.Poster,
          plot: data.Plot,
        });
        setError(null); // Hata varsa sıfırlıyoruz
      } else {
        setError('Film bulunamadı.');
        setMovie(null);
      }
    } catch (error) {
      setError('Bir hata oluştu. Lütfen tekrar deneyin.');
    }
  };

  const handleGetNewSuggestion = () => {
    getRandomMovie(); // Tekrar film önerisi al
  };

  return (
    <div>
        <Background movie={movie} />
        <Error message={error} />
        {movie ? (
            <Movie movie={movie} onNewSuggestion={handleGetNewSuggestion} />
        ) : (
            <h2>Film önerisi alınıyor...</h2>
        )}
    </div>
);
};

export default MovieSuggestions;
