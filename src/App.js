import React, { useState } from 'react';
import MoodSelector from './components/MoodSelector';
import MovieSuggestions from './components/MovieSuggestions';


const App = () => {
  const[mood, setMood] = useState(null);
  return(
    <div>
      <h1>
        Moduna Göre Film Önerileri
         {/* MoodSelector bileşeni ile mood'u al */}
      <MoodSelector setMood={setMood} />
      
      {/* Eğer mood seçildiyse, film önerilerini göster */}
      {mood && <MovieSuggestions mood={mood} />}
      </h1>
    </div>
  )
}

export default App;
