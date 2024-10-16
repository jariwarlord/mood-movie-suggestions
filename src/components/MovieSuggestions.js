import React, { useState } from 'react';
import Modal from "react-modal";
import './styles/MovieSuggestions.css';

const MovieSuggestions = ({ mood }) => {
  // Mood'lara göre film listesi
  const movieList = {
    mutlu: [
        { title: 'The Pursuit of Happyness', imdb: '8.0', img: 'https://imageurl1.com' },
        { title: 'La La Land', imdb: '8.0', img: 'https://imageurl2.com' },
        { title: 'Amélie', imdb: '8.3', img: 'https://imageurl3.com' }
      ],
      üzgün: [
        { title: 'Schindler\'s List', imdb: '8.9', img: 'https://imageurl4.com' },
        { title: 'A Beautiful Mind', imdb: '8.2', img: 'https://imageurl5.com' },
        { title: 'The Green Mile', imdb: '8.6', img: 'https://imageurl6.com' }
      ],
      aksiyon: [
        { title: 'Mad Max: Fury Road', imdb: '8.1', img: 'https://imageurl7.com' },
        { title: 'Die Hard', imdb: '8.2', img: 'https://imageurl8.com' },
        { title: 'John Wick', imdb: '7.4', img: 'https://imageurl9.com' }
      ]
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
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const handleNewSuggestion = () => {
    if (moviesForMood) {
      const movie = getRandomMovie(moviesForMood);
      setRandomMovie(movie); // Yeni rastgele filmi set et
      setModalIsOpen(true);
    }
  };
  const closeModal = () => {
    setModalIsOpen(false); // Modalı kapat
  };
  return (
    <div>
      {moviesForMood ? (
        <div>
          <h2>Movie Suggestions for "{mood}"</h2>
          <button onClick={handleNewSuggestion}>Get New Suggestion</button>
          
          {/* Modal */}
          <Modal isOpen={modalIsOpen} onRequestClose={closeModal} contentLabel="Movie Suggestion">
            <div className="movie-card">
              {randomMovie && (
                <>
                  <img src={randomMovie.img} alt={randomMovie.title} className="movie-image" />
                  <h3>{randomMovie.title}</h3>
                  <p>IMDb Rating: {randomMovie.imdb}</p>
                  <button onClick={closeModal}>Close</button>
                </>
              )}
            </div>
          </Modal>
        </div>
      ) : (
        <h2>Sorry, we don't have suggestions for "{mood}" mood.</h2>
      )}
    </div>
  );
};

export default MovieSuggestions;