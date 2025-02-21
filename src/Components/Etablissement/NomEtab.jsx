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

export const get_nomEtab=(id)=>{ // depuis etab pour afficher
    const Ref = ref(database, 'etablissement/' + id + '/nom');
    let nom;
        get(Ref)
            .then((snapshot) => {
                nom = snapshot.val();
                });
            
    return localStorage.getItem('nom_etab');
}

export const set_nomEtab = (uid) => {   //depuis user vers etab
    const etablissementRef = ref(database, 'users/' + uid + '/etablissement/nom');
    const etablissementidRef = ref(database, 'users/' + uid + '/etablissement/uuid');

    get(etablissementidRef).then((snapshot) => {
        const id = snapshot.val();
        const lieuxRef1 = ref(database, 'etablissement/' + id);

        return get(etablissementRef).then((snapshot) => {
            const nom = snapshot.val();
            localStorage.setItem('nom_etab', nom);
            return update(lieuxRef1, {
                nom_etab: nom
            });
        });
    }).catch((error) => {
        console.error('Error setting etablissement nom:', error);
    });
}

export const set_Api_URL = (uid) => {   //depuis user vers etab
    const etablissementRef = ref(database, 'users/' + uid + '/etablissement/accessibilite/url');
    const etablissementidRef = ref(database, 'users/' + uid + '/etablissement/uuid');

    get(etablissementidRef).then((snapshot) => {
        const uuid = snapshot.val();
        const lieuxRef1 = ref(database, 'etablissement/' + uuid);

        return get(etablissementRef).then((snapshot) => {
            const API_URL = snapshot.val();
            localStorage.setItem('Api_Url', API_URL);
            return update(lieuxRef1, {
                API_URL: API_URL
            });
        });
    }).catch((error) => {
        console.error('Error setting etablissement nom:', error);
    });
}
