import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.6.3/firebase-app.js';
import { getAuth } from 'https://www.gstatic.com/firebasejs/9.6.3/firebase-auth.js';
import { get, getDatabase, ref, update } from 'https://www.gstatic.com/firebasejs/9.6.3/firebase-database.js';
import { getStorage } from 'https://www.gstatic.com/firebasejs/9.6.3/firebase-storage.js';



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


export const get_small_description =(id) => {
    const Ref = ref(database, 'etablissement/' + id + '/small_description');
    let small_description;
        get(Ref)
            .then((snapshot)=>{
                small_description=snapshot.val();
                localStorage.setItem('small_description', small_description);
            });
        return localStorage.getItem('small_description');
    
}

export const set_small_description = (small_description, id) => {
    const lieuxRef1 = ref(database, 'etablissement/' + id);
    return update(lieuxRef1, {
        small_description: small_description
    });
}

export const set_isOpensmall_description = (isOpensmall_description) => {
    localStorage.setItem('isOpensmall_description', isOpensmall_description);
};

export const get_isOpensmall_description = () => {
    return localStorage.getItem('isOpensmall_description') === 'true';
};