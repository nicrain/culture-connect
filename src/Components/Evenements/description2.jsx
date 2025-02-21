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


export const get_description2  =(id) => {
    const Ref = ref(database, 'evenement/' + id + '/description2_event');
    let description2_event ;
        get(Ref)
            .then((snapshot)=>{
                description2_event =snapshot.val();
                localStorage.setItem('description2_event ', description2_event );
            });
        return localStorage.getItem('description2_event ');
    
}

export const set_description2  = (description_event2 , id) => {
    const lieuxRef1 = ref(database, 'evenement/' + id);
    return update(lieuxRef1, {
        description2_event : description_event2 
    });
}

export const set_isOpendescription2  = (isOpendescription2_event ) => {
    localStorage.setItem('isOpendescription2_event ', isOpendescription2_event );
};

export const get_isOpendescription_event  = () => {
    return localStorage.getItem('isOpendescription2_event ') === 'true';
};