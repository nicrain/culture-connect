import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.6.3/firebase-app.js';
import { getAuth } from 'https://www.gstatic.com/firebasejs/9.6.3/firebase-auth.js';
import { getDatabase } from 'https://www.gstatic.com/firebasejs/9.6.3/firebase-database.js';
import { getStorage } from 'https://www.gstatic.com/firebasejs/9.6.3/firebase-storage.js';
import { get_uid } from '../../userdata';
import { get_id } from './codeIDetab';

import React, { useEffect, useState } from 'react';
import { get_titre2, set_titre2 } from './titre2';

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

const AppT2 = () => {
    const [isOpentitre2, set_isOpentitre2] = useState(false);

    const params = new URLSearchParams(window.location.search);
    const code_id = params.get("event_id");


    const [localtitre2, setlocaltitre2] = useState('');
    const [defaulttitre2, set_defaulttitre2] = useState('');
    let titre2;


    const toggletitre2 = () => {
        set_isOpentitre2(!isOpentitre2);
    };
    useEffect(() => {
        // Utilisez une fonction asynchrone pour récupérer la valeur de titre2
        async function fetchTitre2() {
            const code_id = get_id(get_uid());
            const titre2 = await get_titre2(code_id);
            setlocaltitre2(titre2);
            set_defaulttitre2(titre2);
        }

        fetchTitre2();
    }, []);

    const handleTitleChange = (e) => {
        setlocaltitre2(e.target.value);
    };
    return (
        <div className="App">
            <h3>Second Titre</h3>
            <br />
            <p className='what'>Ce titre sera le titre de la première partie de votre description. </p>
            {isOpentitre2 ? (
                <div className='cadre'>
                    <div className='item-cadre'>
                        <form>
                            <input id="titre2" value={localtitre2} type="text" max="50" onChange={(e) => handleTitleChange(e)} />
                            <button className="btn mt-4" onClick={(e) => {
                                e.preventDefault();
                                toggletitre2();
                                setlocaltitre2(defaulttitre2)
                            }}>Annulez</button>
                            <button className="btn mt-4" onClick={(e) => {
                                e.preventDefault();
                                set_titre2(localtitre2, code_id);
                                titre2 = get_titre2(code_id);
                                toggletitre2();
                                window.location.reload();
                            }}>Validez</button>
                            <br />
                        </form>
                    </div>
                </div>
            ) : (
                <div className='cadre'>
                    <p>Votre titre actuelle: </p>
                    <div className='item-cadre'>
                        <p>{localtitre2}</p>
                        <button className="btn mt-4" onClick={toggletitre2}>Modifier</button>
                        <br />
                    </div>
                </div>
            )}
        </div>
    );
}


export default AppT2;


