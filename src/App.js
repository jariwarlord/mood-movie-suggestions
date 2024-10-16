// App.js
import React, { useState } from 'react';
import './components/styles/App.css';
import MovieSuggestions from './components/MovieSuggestions';
import logo from './popcorn.png'

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
      <h1>
      <img src={logo} alt="Logo" style={{ width: '50px', height: 'auto', marginRight: '10px' }} />
        Film Önerisi için Modunu Yaz
        </h1>
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
