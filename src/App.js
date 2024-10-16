import React, { useState } from 'react';
import './App.css';
import MovieSuggestions from './components/MovieSuggestions';

const App = () => {
  const [mood, setMood] = useState('');
  const [submittedMood, setSubmittedMood] = useState('');

  const handleInputChange = (event) => {
    setMood(event.target.value); // Kullanıcıdan mood'u alıyoruz
  };

  const handleSubmit = () => {
    setSubmittedMood(mood); // Mood'u öneriye göndermek için ayarlıyoruz
  };

  return (
    <div className="App">
      <h1>Film Önerisi için Modunu Yaz</h1>
      <input
        type="text"
        placeholder="Enter your mood"
        value={mood}
        onChange={handleInputChange} // Mood inputu değişimini takip ediyoruz
      /> <br></br>
      <button onClick={handleSubmit}>
        Yolla ve Öneriyi Getir
      </button>

      {/* MovieSuggestions componenti mood gönderildikten sonra gösterilir */}
      {submittedMood && <MovieSuggestions mood={submittedMood} />}
    </div>
  );
};

export default App;
