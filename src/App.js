// App.js
import React, { useState } from 'react';
import './components/styles/App.css';
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
      <h3>Nasıl hissediyorsun?</h3>
      <input
        type="text"
        placeholder="'Aksiyon','Rastgele' .."
        value={mood}
        onChange={handleInputChange}
      />
      <br />
      <button onClick={handleSubmit}>Yolla</button>
      {submittedMood && <MovieSuggestions mood={submittedMood} />}
    </div>
  );
};

export default App;
