import React, {useState} from 'react';

const MoodSelector = ({setMood}) => {
    const [userMood, setUserMood] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if(userMood.trim()){
            setMood(userMood);
            setUserMood('');
        }
    };


return (
    <div>
      <h2>Modunu Yaz: </h2>
      <form onSubmit={handleSubmit}>
        <input
        type="text"
        value={userMood}
        onChange={(e) => setUserMood(e.target.value)}
        placeholder='Modunu buraya yazz..'
        />
        <button type="submit">
            Yolla
        </button>
      </form>
    </div>
    );
};

export default MoodSelector;