import { collection, addDoc } from "firebase/firestore"; 
import { db } from './firebase.js';  // Firebase yapılandırmasının yapıldığı dosya
import movieSuggestions from './components/MovieList.js'; // movieSuggestions verilerini içeren dosya

const uploadMoviesToFirestore = async () => {
  try {
    // movieSuggestions'daki her mood'u dönüyoruz
    for (const mood in movieSuggestions) {
      const movies = movieSuggestions[mood]; // o mood içindeki filmler

      for (const title of movies) {
        // movies koleksiyonuna film ekliyoruz
        await addDoc(collection(db, "movies"), {
          mood: mood,  // Mood adı (örneğin 'mutlu')
          title: title // Film adı (örneğin 'The Pursuit of Happyness')
        });
      }
    }

    console.log("Tüm veriler başarıyla yüklendi!");
  } catch (err) {
    console.error("Veri yüklenirken bir hata oluştu: ", err);
  }
};

uploadMoviesToFirestore();
