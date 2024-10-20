import React, { useState, useEffect } from 'react';
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from '../firebase.js';
import Movie from './Movie.js';
import Error from './Error.js';
import Background from './Background.js';

const API_KEY = '69b08da2'; // OMDB API key

const MovieSuggestions = ({ mood }) => {
  const [movie, setMovie] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false); 

  useEffect(() => {
    if (mood) {
      getMovieFromFirebase(); // Ruh hali değiştiğinde film getir
    }
  }, [mood]);

  const getMovieFromFirebase = async () => {
    try {
      setLoading(true); // Başlamadan önce loading state'i başlat
      const q = query(collection(db, "movies"), where("mood", "==", mood.toLowerCase()));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const movies = querySnapshot.docs.map(doc => doc.data().title); // Filmleri listeye ekliyoruz

        // Random bir film seçiyoruz
        const randomIndex = Math.floor(Math.random() * movies.length);
        const movieTitle = movies[randomIndex];

        // OMDB API'den film detaylarını getir
        fetchMovieDetails(movieTitle);
      } else {
        setError('Belirtilen ruh hali için film bulunamadı.');
        setMovie(null);
        setLoading(false); // Yükleme bitti
      }
    } catch (err) {
      setError('Veri çekerken bir hata oluştu. Lütfen tekrar deneyin.');
      setMovie(null);
      setLoading(false); // Hata durumunda yüklemeyi bitir
    }
  };

  const fetchMovieDetails = async (movieTitle) => {
    try {
      const response = await fetch(`https://www.omdbapi.com/?t=${encodeURIComponent(movieTitle)}&apikey=${API_KEY}`);
      const data = await response.json();

      if (data.Response === 'True') {
        setMovie({
          title: data.Title,
          imdb: data.imdbRating,
          img: data.Poster,
        });
        setError(null);
      } else {
        setError('OMDB API\'de film bulunamadı.');
        setMovie(null);
      }
      setLoading(false); // Yükleme bitti
    } catch (error) {
      setError('Film detayları alınırken bir hata oluştu.');
      setMovie(null);
      setLoading(false); // Hata durumunda yüklemeyi bitir
    }
  };

  return (
    <div>
      <Background movie={movie} />
      <Error message={error} />
      {loading ? (  // Yükleniyorsa "Film önerisi alınıyor" gösterecek
        <h2>Film önerisi alınıyor...</h2>
      ) : movie ? (  // Film varsa filmi göster
        <Movie movie={movie} onNewSuggestion={getMovieFromFirebase} />  // Yeni öneri fonksiyonunu buraya bağladık
      ) : (
        <h2>Film önerisi bulunamadı.</h2>  // Film yoksa hata veya mesaj gösterecek
      )}
    </div>
  );
};

export default MovieSuggestions;
