import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.6.3/firebase-app.js';
import { getAuth } from 'https://www.gstatic.com/firebasejs/9.6.3/firebase-auth.js';
import { get, getDatabase, ref } from 'https://www.gstatic.com/firebasejs/9.6.3/firebase-database.js';
import { getFirestore } from 'https://www.gstatic.com/firebasejs/9.6.3/firebase-firestore.js';
import { getStorage } from 'https://www.gstatic.com/firebasejs/9.6.3/firebase-storage.js';
import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import plus from '../../assets/plus.png';
import { create_new_event } from './codeIDevent';
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
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app);
const storage = getStorage(app);
const firestore = getFirestore(app); // Initialize Firestore correctly

const EventList = () => {
  const [events, setEvents] = useState([]);
  const uuid = localStorage.getItem('uuid');
  const [isOpenNewEvent, setIsOpenNewEvent] = useState(false);
  const [newEventNom, setNewEventNom] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const generateLinkWithParam = (event_id) => {
    return `./evenement2.html?event_id=${event_id}`;
  };
  const toggleNewEvent = () => {
    setIsOpenNewEvent(!isOpenNewEvent);
  };

  const handleClick = async (e) => {
    e.preventDefault();
    let generateRandomNumber = () => Math.floor(Math.random() * 10000001);
    let id_etab = generateRandomNumber();
    try {
      await create_new_event(uuid, id_etab, newEventNom, startDate, endDate);
      console.log('Événement créé avec succès');
      toggleNewEvent();
    } catch (error) {
      console.error('Erreur lors de la création de l\'événement:', error);
    }
  };

  useEffect(() => {
    const fetchEvents = async () => {
      const eventsRef = ref(database, `etablissement/${uuid}/evenements`);
      try {
        const eventsSnapshot = await get(eventsRef);
        const evenements = eventsSnapshot.val();
        if (evenements) {
          const listEvent = Object.keys(evenements).map((key) => ({
            id_event: evenements[key].id_event,
          }));

          const eventNamesPromises = listEvent.map(async (event) => {
            const { id_event } = event;
            const eventRef = ref(database, `evenement/${id_event}/nom`);
            const snapshot = await get(eventRef);
            const nom = snapshot.val();
            return { ...event, name: nom };
          });

          const eventNames = await Promise.all(eventNamesPromises);
          setEvents(eventNames);
        } else {
          setEvents([]);
        }
      } catch (error) {
        console.error('Erreur lors de la récupération des événements:', error);
      }
    };

    fetchEvents();
  }, [uuid]);



  return (
    <div>
      <div className='etablissement'>
        <div className='new-event'>
          <button className="" onClick={toggleNewEvent}>
            <img src={plus} alt="bouton pour modifier les paramètres d'accessibilité" width={65} height={65} />
          </button>
          <Modal
            isOpen={isOpenNewEvent}
            onRequestClose={toggleNewEvent}
            contentLabel="New Event Options"
            className="modal"
            overlayClassName="overlay"
          >
            <form onSubmit={handleClick}>
              <h3>Créer un nouvel événement</h3>
              <label>
                Nom de l'événement:
                <input type="text" value={newEventNom} onChange={(e) => setNewEventNom(e.target.value)} />
              </label>
              <label>
                Date de début:
                <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
              </label>
              <label>
                Date de fin:
                <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
              </label>
              <button type="submit">Créer un nouvel événement</button>
            </form>
          </Modal>
        </div>
      </div>
      <h2>Événements</h2>
      <ul>
        {events.map((event) => (

          <li key={event.id_event} >
            <a className='list' href={generateLinkWithParam(event.id_event)}>{event.name}</a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EventList;
