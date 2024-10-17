import { collection, getDocs } from "firebase/firestore"; 
import { db } from './firebase'; // Firebase yapılandırmanı buradan alıyoruz

// Film önerilerini Firebase'den çeken fonksiyon
const fetchMovieSuggestions = async () => {
  const movieSuggestions = {}; // Film önerilerini tutacağımız boş obje

  try {
    // Firebase'den movieSuggestions koleksiyonunu al
    const querySnapshot = await getDocs(collection(db, "movieSuggestions"));

    // Her mood için filmleri ekle
    querySnapshot.forEach((doc) => {
      const mood = doc.id; // mood adı (mutlu, hüzünlü, aksiyon vb.)
      const movies = doc.data().titles; // filmler listesi
      movieSuggestions[mood] = movies;
    });

    console.log("Movie Suggestions:", movieSuggestions); // Kontrol için log at
  } catch (error) {
    console.error("Veriler alınırken hata oluştu:", error);
  }

  return movieSuggestions; // Filmleri döndür
};

export default fetchMovieSuggestions;
