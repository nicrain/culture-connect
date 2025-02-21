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

// export const get_description = async (id) => {
//     const Ref = ref(database, 'etablissement/' + id + '/description');
//     try {
//         const snapshot = await get(Ref);
//         const description = snapshot.val();
//         localStorage.setItem('Description', description);
//         console.log(localStorage.getItem('Description'));
//         return localStorage.getItem('Description');
//     } catch (error) {
//         console.error("Error fetching description:", error);
//         return null;
//     }
// }

export const get_titre1 =(id) => {
    const Ref = ref(database, 'etablissement/' + id + '/titre1');
    let titre1;
        get(Ref)
            .then((snapshot)=>{
                titre1=snapshot.val();
                localStorage.setItem('Titre1', titre1);
            });
        return localStorage.getItem('Titre1');
    
}

export const set_titre1 = (titre1, id) => {
    const lieuxRef1 = ref(database, 'etablissement/' + id);
    return update(lieuxRef1, {
        titre1: titre1
    });
}

