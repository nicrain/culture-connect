import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.6.3/firebase-app.js';
import { getAuth } from 'https://www.gstatic.com/firebasejs/9.6.3/firebase-auth.js';

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

const Dys=localStorage.getItem('Dys');
console.log("salut"+Dys);
if (Dys=='true') {
  import('./indexDys.css')
      .then(() => console.log('ConnectionNetB.css has been loaded'))
      .catch(error => console.error('Error loading ConnectionNetB.css:', error));
}

export const setUserData=(nom,last_name,is_pro,etablissement,uid)=>{
    localStorage.setItem('nom', nom);
    localStorage.setItem('last_name', last_name);
    localStorage.setItem('is_pro', is_pro);
    localStorage.setItem('etablissement', etablissement);
    localStorage.setItem('uid', uid);
    console.log('Nom:', nom);
    console.log('Last Name:', last_name);
    console.log('Is Pro:', is_pro);
    console.log('Etablissement:', etablissement);
    
}

export const is_pro = () => {
    return localStorage.getItem('is_pro') === 'true';
};

export const get_name =()=>{
    console.log("test "+ localStorage.getItem('last_name'));
    return localStorage.getItem('last_name');
}

export const get_etablissement =()=>{
    console.log("test "+ localStorage.getItem('etablissement'));
    return localStorage.getItem('etablissement');
}

export const get_uid =()=>{
    console.log("uid "+ localStorage.getItem('uid'));
    return localStorage.getItem('uid');
}

