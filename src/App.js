// App.js
import React, { useState } from 'react';
import './App.css';
import MovieSuggestions from './components/MovieSuggestions';

const App = () => {
  const [mood, setMood] = useState('');
  const [submittedMood, setSubmittedMood] = useState('');

  const handleInputChange = (event) => {
    setMood(event.target.value);
  };

  const handleSubmit = () => {
    setSubmittedMood(mood);
  };

  return (
    <div className="App">
      <h1>Film Önerisi için Modunu Yaz</h1>
      <input
        type="text"
        placeholder="Enter your mood"
        value={mood}
        onChange={handleInputChange}
      />
      <br />
      <button onClick={handleSubmit}>Yolla ve Öneriyi Getir</button>
      {submittedMood && <MovieSuggestions mood={submittedMood} />}
    </div>
  );
};

export default App;
