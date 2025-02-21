import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.6.3/firebase-app.js';
import { createUserWithEmailAndPassword, getAuth } from 'https://www.gstatic.com/firebasejs/9.6.3/firebase-auth.js';
import { getDatabase, ref, set } from 'https://www.gstatic.com/firebasejs/9.6.3/firebase-database.js';
import BrickLayout from '../BrickLayout/BrickLayout';


import React, { useState } from 'react';
import './inscription.css';

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

const Inscription = () => {
  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        const userId = user.uid;
        const userRef = ref(database, 'users/' + userId);
        const userData = {
          name: name,
          lastName: lastName,
          etablissement: 'rien',
          is_pro: false
        };

        set(userRef, userData)
          .then(() => {
            alert("User created successfully!");
            window.location.href = "espace_personnel.html?name=" + encodeURIComponent(userData.name) + "&last_name=" + encodeURIComponent(userData.lastName);
          })
          .catch((error) => {
            alert("Error saving data: " + error.message);
          });
      })
      .catch((error) => {
        alert("Error creating user: " + error.message);
      });
  };

  return (
    <section className="vh-100">
      <div className="row">
        <div className="last-div">


          <div className="d-flex ">
            <form className="form">

              <div className="form-group">
                <label className="form-label" htmlFor="form2Example28">Votre Nom</label><br />
                <input
                  type="text"
                  name="name"
                  className="form-control form-control-lg"
                  placeholder="Votre nom"
                  id="last_name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />

              </div>
              <br />
              <div className="form-group mt-2">
                <label className="form-label" htmlFor="form2Example28">Votre Prénom</label><br />

                <input
                  type="text"
                  name="prenom"
                  className="form-control form-control-lg"
                  placeholder="Votre prénom"
                  id="name"
                  autoComplete="off"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />

              </div>
              <br />
              <div className="form-group mt-2">
                <label className="form-label" htmlFor="form2Example28">Votre Email</label><br />

                <input
                  type="email"
                  name="email"
                  className="form-control form-control-lg"
                  placeholder="Your Email"
                  id="email"
                  autoComplete="off"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />

              </div>
              <br />
              <div className="form-group mt-2">
                <label className="form-label" htmlFor="form2Example28">Votre mot de passe</label><br />

                <input
                  type="password"
                  name="logpass"
                  className="form-control form-control-lg"
                  placeholder="Your Password"
                  id="password"
                  autoComplete="off"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />

              </div>
              <br />
              <button className="btn" onClick={handleSubmit}>Crée mon compte</button>
              <br />
              <br />
              <p className="mb-0 mt-4 text-center"><a href="connexion.html" className="link">Vous avez déjà un compte?</a></p>
              <p className="mb-0 mt-4 text-center"><a href="inscriptionPro.html" className="link">Vous êtes professionel dans la culture?</a></p>
            </form>
          </div>

        </div>


        <div className="col-sm-6 px-0 d-none d-sm-block">
          <BrickLayout texte="Bienvenue sur la page d'inscription" />
        </div>
      </div>
    </section>
  );
}

export default Inscription;
