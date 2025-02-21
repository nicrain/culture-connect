import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.6.3/firebase-app.js';
import { getAuth } from 'https://www.gstatic.com/firebasejs/9.6.3/firebase-auth.js';
import { get, getDatabase, ref } from 'https://www.gstatic.com/firebasejs/9.6.3/firebase-database.js';
import { getFirestore } from 'https://www.gstatic.com/firebasejs/9.6.3/firebase-firestore.js';
import { getStorage } from 'https://www.gstatic.com/firebasejs/9.6.3/firebase-storage.js';
import { useEffect, useState } from 'react';
import App from './HTML_description';
import App2 from './HTML_description2';
import AppImage from './HTML_image';
import AppSmall from './HTML_smallDescription';
import AppT1 from './HTML_titre1';
import AppT2 from './HTML_titre2';
import './evenement.css';

const firebaseConfig = {
    apiKey: "AIzaSyDrUZ7SdmGYarxvIN7ikrUr5AzKeDIScW8",
    authDomain: "cultureapp-a1c9c.firebaseapp.com",
    databaseURL: "https://cultureapp-a1c9c-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "cultureapp-a1c9c",
    storageBucket: "cultureapp-a1c9c.appspot.com",
    messagingSenderId: "885088600367",
    appId: "1:885088600367:web:2b5d6f33e92435849fe1da",
    measurementId: "G-PQ7DPJJJFT"
}

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app);
const storage = getStorage(app);
const firestore = getFirestore(app);

const EventList = () => {
  const [events, setEvents] = useState([]);
  const [nom, setNom] = useState('');
  const params = new URLSearchParams(window.location.search);
  const id_event = params.get("event_id");

  useEffect(() => {
    const get_nom = async () => {
      try {
        const eventRef = ref(database, 'evenement/' + id_event + '/nom');
        const snapshot = await get(eventRef);
        const nom = snapshot.val();
        setNom(nom);
      } catch (error) {
        console.error('Erreur lors de la récupération du nom:', error);
      }
    };

    get_nom();
  }, [id_event]);

  return (
    <div>
      <div className='etablissement'>
        
      </div>
      <h2>{nom}</h2>
      <p>Ici vous pouvez modifier votre évènement</p>
      <App />
      <App2 />
      <AppSmall />
      <AppT1 />
      <AppT2 />

      <AppImage />

    </div>
  );
};

export default EventList;
