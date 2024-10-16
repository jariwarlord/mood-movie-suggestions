import './styles/MovieSuggestions.css';
import React, { useState, useEffect } from 'react';

const MovieSuggestions = ({ mood }) => {
  const [movie, setMovie] = useState(null);
  const [error, setError] = useState(null);

  const API_KEY = '69b08da2';

  // Component ilk yüklendiğinde veya mood her değiştiğinde API'den film getir
  useEffect(() => {
    const getMovieFromAPI = async (movieTitle) => {
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

    const movieSuggestions = {
        mutlu : ['The Pursuit of Happyness', 'La La Land', 'Amélie','Forrest Gump','The Intouchables', 'Little Miss Sunshine', 'Up',            'Sing Street',
            'Chef','Julie & Julia','The Secret Life of Walter Mitty', 'The Grand Budapest Hotel','Paddington','About Time',
            'Zootopia','Yes Man','The Holiday','Ratatouille','500 Days of Summer','Mamma Mia!','The Greatest Showman',            'Coco',
            'Wonder'],          
            hüzünlü : [
                'Schindler\'s List', 'Grave of the Fireflies', 'Requiem for a Dream', 'The Green Mile', 
                'Atonement', 'Blue Valentine', 'Manchester by the Sea', 'The Boy in the Striped Pajamas', 
                'Million Dollar Baby', 'The Fault in Our Stars', 'My Sister\'s Keeper', '12 Years a Slave', 
                'Eternal Sunshine of the Spotless Mind', 'The Pianist', 'Dancer in the Dark', 
                'Leaving Las Vegas', 'Brokeback Mountain', 'The Pursuit of Happyness', 'Hachi: A Dog\'s Tale', 
                'One Day', 'The Lovely Bones', 'If Beale Street Could Talk', 'Lion'
              ],
      aksiyon: ['Mad Max: Fury Road', 'Die Hard', 'John Wick','Venom','Blade Runner'],
      rastgele:['Bullet Train', 'Jumper','The Greatest Showman']
    };

    const normalizedMood = mood.toLowerCase();
    const moviesForMood = movieSuggestions[normalizedMood];

    if (moviesForMood) {
      const randomIndex = Math.floor(Math.random() * moviesForMood.length);
      const randomMovie = moviesForMood[randomIndex];
      getMovieFromAPI(randomMovie); // API'den film alıyoruz
    }
  }, [mood]); // Mood her değiştiğinde API'yi yeniden çağırır

  return (
    <div>
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
