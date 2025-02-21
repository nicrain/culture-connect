import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.6.3/firebase-app.js';
import { getAuth, signInWithEmailAndPassword } from 'https://www.gstatic.com/firebasejs/9.6.3/firebase-auth.js';
import { get, getDatabase, ref } from 'https://www.gstatic.com/firebasejs/9.6.3/firebase-database.js';
import BrickLayout from '../BrickLayout/BrickLayout';


import React, { useState } from 'react';
import { setLoggedInStatus } from '../../authUtils';
import { setUserData } from '../../userdata';
import { set_Api_URL, set_nomEtab } from '../Etablissement/NomEtab';


import './Connection.css';
const NetB = localStorage.getItem('NetB');
console.log("salut" + NetB);
if (NetB == 'true') {
  import('./ConnectionNetB.css')
    .then(() => console.log('ConnectionNetB.css has been loaded'))
    .catch(error => console.error('Error loading ConnectionNetB.css:', error));
}

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

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [user, setUser] = useState(null); // Ajout du state pour stocker l'utilisateur

  const getUserData = async (loggedInUser) => {
    const database = getDatabase(app); // 'app' est votre instance Firebase initialisée

    const { uid } = loggedInUser;

    try {
      const nameRef = ref(database, 'users/' + uid + '/name');
      const lastNameRef = ref(database, 'users/' + uid + '/lastName');
      const isProRef = ref(database, 'users/' + uid + '/is_pro');
      const etablissementRef = ref(database, 'users/' + uid + '/etablissement');

      const nameSnapshot = await get(nameRef);
      const lastNameSnapshot = await get(lastNameRef);
      const isProSnapshot = await get(isProRef);
      const etablissementSnapshot = await get(etablissementRef);

      const nom = nameSnapshot.val();
      const last_name = lastNameSnapshot.val();
      const is_pro = isProSnapshot.val();
      const etablissement = etablissementSnapshot.val();

      console.log('Nom:', nom);
      console.log('Last Name:', last_name);
      console.log('Is Pro:', is_pro);
      console.log('Etablissement:', etablissement);
      set_nomEtab(uid);
      set_Api_URL(uid);
      setUserData(nom, last_name, is_pro, etablissement, uid);
    } catch (error) {
      console.error('Error getting user data:', error);
    }
  };

  const signIn = async (e) => {
    e.preventDefault(); // Empêcher le comportement par défaut du formulaire

    try {
      console.log("Email:", email);
      console.log("Password:", password);

      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log("User credential:", userCredential);

      const loggedInUser = userCredential.user;
      console.log("Logged in user:", loggedInUser);
      setLoggedInStatus(true);
      setUser(loggedInUser);
      getUserData(loggedInUser);

      setMessage(`Bonjour ${loggedInUser.email}, vous êtes connecté.`);
      setTimeout(() => {
        window.location.href = 'index.html';
      }, 2000);
    } catch (error) {
      console.error('Sign-in error:', error);
      setMessage('Mot de passe incorrect.');
    }
  };

  return (
    <section className="vh-100">

      <div className="row">
        <div className="last-div">


          <div className="d-flex ">
            <form className="form">
              <div data-mdb-input-init className="form-outline">
                <label className="form-label" htmlFor="form2Example18">Adresse Mail</label><br />
                <input
                  type="email"
                  name="mail"
                  className="form-control form-control-lg"
                  placeholder="Your Email"
                  id="mail"
                  autoComplete="off"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)} />

              </div>
              <br />
              <div data-mdb-input-init className="form-outline mb-4">
                <label className="form-label" htmlFor="form2Example28">Mot de passe</label><br />
                <input
                  type="password"
                  name="logpass"
                  className="form-control form-control-lg"
                  placeholder="Your Password"
                  id="logpass"
                  autoComplete="off"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)} />

              </div>
              <br />
              <div className="bouton button-container">
                <button type="submit" className="btn" onClick={signIn}>Connection</button>
              </div>
              <br />
              <p className="message">{message}</p>
              <p className="P"><a href="" className="link">Mot de passe oublié?</a></p>
              <p className="P"><a href="inscription.html" className="link-info">Crée un compte</a></p>
            </form>
          </div>
        </div>
        <div className="col-sm-6 px-0 d-none d-sm-block">
          <BrickLayout texte="Bienvenue sur la page de connexion" />
        </div>
      </div>

    </section>
  );
}

export default Login;