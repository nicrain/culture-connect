// App.js
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

// Configure Firebase
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

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const firestore = firebase.firestore();


// ChatRoom.js
import React, { useEffect, useState } from 'react';

function ChatRoom() {
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState('');

  useEffect(() => {
    const unsubscribe = firestore.collection('messages').orderBy('createdAt').onSnapshot(snapshot => {
      const data = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setMessages(data);
    });
    return unsubscribe;
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    try {
      await firestore.collection('messages').add({
        text,
        createdAt: firebase.firestore.FieldValue.serverTimestamp()
      });
      setText('');
    } catch (error) {
      console.error('Error adding message: ', error);
    }
  };

  return (
    <div>
      <ul>
        {messages.map(message => (
          <li key={message.id}>{message.text}</li>
        ))}
      </ul>
      <form onSubmit={handleSubmit}>
        <input type="text" value={text} onChange={(e) => setText(e.target.value)} />
        <button type="submit">Envoyer</button>
      </form>
    </div>
  );
}

export default ChatRoom;
