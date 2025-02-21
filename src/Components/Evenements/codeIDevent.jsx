import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.6.3/firebase-app.js';
import { getAuth } from 'https://www.gstatic.com/firebasejs/9.6.3/firebase-auth.js';
import { getDatabase, push, ref, update } from 'https://www.gstatic.com/firebasejs/9.6.3/firebase-database.js';
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

export const create_new_event = (uid, id_event, nom, datestrat, dateend) => {
    const database = getDatabase();
    const eventRef = ref(database, 'evenement/' + id_event);
    const etabRef = ref(database, 'etablissement/' + uid + '/evenements/');
    const newEventRef = push(etabRef);


    return Promise.all([
        update(eventRef, {
            'nom': nom,
            'date_debut': datestrat,
            'date_fin': dateend,
            'uuid_etab': uid
        }),
        update(newEventRef, { 'id_event': id_event })

    ]);
};




