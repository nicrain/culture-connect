import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.6.3/firebase-app.js';
import AccessibilityButton from './Components/Accessibilite/btn_access';
import Acceuil1 from './Components/Acceuil1/Acceuil1';
import SearchComponent from './Components/Acceuil2/Acceuil2';
import AcceuilTest from './Components/AcceuilTest/AcceuilTest';

import BackToTop from './Components/BackToTop/BackToTop';
import Navbar from './Components/Navbar/Navbar';
import { getLoggedInStatus } from './authUtils';


import { getAuth } from 'https://www.gstatic.com/firebasejs/9.6.3/firebase-auth.js';
import React from 'react';
// import { isUserPro } from "../../gettypeuser";
//import { getUserData } from "../Connection/Connection";
const Dys = localStorage.getItem('Dys');

if (Dys == 'true') {
  import('./indexDys.css')
    .then(() => console.log('ConnectionNetB.css has been loaded'))
    .catch(error => console.error('Error loading ConnectionNetB.css:', error));
}
let fontSize = localStorage.getItem('FontSize');
document.documentElement.style.fontSize = `${fontSize}%`;
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
const App = () => {
  const isUserLoggedIn = getLoggedInStatus();
  return (
    <div className='container'>

      <div className='container'>
        <Navbar />
        <Acceuil1 />
        <SearchComponent />
        <AcceuilTest />
        <AccessibilityButton />
        <BackToTop />
      </div>
    </div>
  )
}
export default App