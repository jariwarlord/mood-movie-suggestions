import './styles/MovieSuggestions.css';
import React, { useState, useEffect } from 'react';

const API_KEY = '69b08da2'; // API anahtarınızı buraya ekleyin

const MovieSuggestions = ({ mood }) => {
  const [movie, setMovie] = useState(null);
  const [error, setError] = useState(null);

  // Film verileri
  const movieSuggestions = {
    mutlu: [
      'The Pursuit of Happyness', 'La La Land', 'Amélie', 'Forrest Gump',
      'The Intouchables', 'Little Miss Sunshine', 'Up', 'Sing Street',
      'Chef', 'Julie & Julia', 'The Secret Life of Walter Mitty',
      'The Grand Budapest Hotel', 'Paddington', 'About Time',
      'Zootopia', 'Yes Man', 'The Holiday', 'Ratatouille',
      '500 Days of Summer', 'Mamma Mia!', 'The Greatest Showman',
      'Coco', 'Wonder'
    ],
    hüzünlü: [
      'Schindler\'s List', 'Grave of the Fireflies', 'Requiem for a Dream',
      'The Green Mile', 'Atonement', 'Blue Valentine', 'Manchester by the Sea',
      'The Boy in the Striped Pajamas', 'Million Dollar Baby',
      'The Fault in Our Stars', 'My Sister\'s Keeper', '12 Years a Slave',
      'Eternal Sunshine of the Spotless Mind', 'The Pianist', 
      'Dancer in the Dark', 'Leaving Las Vegas', 'Brokeback Mountain', 
      'Hachi: A Dog\'s Tale', 'One Day', 'The Lovely Bones', 
      'If Beale Street Could Talk', 'Lion'
    ],
    aksiyon: [
      'Mad Max: Fury Road', 'Die Hard', 'John Wick', 'Venom', 'Blade Runner'
    ],
    rastgele: [
      'Bullet Train', 'Jumper', 'The Greatest Showman'
    ],
  };

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
      {error && <h2 style={{ color: 'red' }}>{error}</h2>}
      {movie ? (
        <div>
          <h2>Önerilen Film: {movie.title}</h2>
          <h3>IMDB Puanı: {movie.imdb}</h3>
          <img src={movie.img} alt={movie.title} />
          <br />
          <button onClick={handleGetNewSuggestion}>Yeni Öneri Al</button>
        </div>
      ) : (
        <h2>Film önerisi alınıyor...</h2>
      )}
    </div>
  );
};

export default MovieSuggestions;
