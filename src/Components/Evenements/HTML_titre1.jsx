import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.6.3/firebase-app.js';
import { getAuth } from 'https://www.gstatic.com/firebasejs/9.6.3/firebase-auth.js';
import { getDatabase } from 'https://www.gstatic.com/firebasejs/9.6.3/firebase-database.js';
import { getStorage } from 'https://www.gstatic.com/firebasejs/9.6.3/firebase-storage.js';
import { get_uid } from '../../userdata';
import { get_id } from './codeIDetab';

import React, { useEffect, useState } from 'react';
import { get_titre1, set_titre1 } from './titre1';

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

const AppT1 = () => {
    const [isOpentitre1, set_isOpentitre1] = useState(false);
    const params = new URLSearchParams(window.location.search);
    const code_id = params.get("event_id");
    const [localtitre1, setlocaltitre1] = useState('');
    const [defaulttitre1, set_defaulttitre1] = useState('');
    let titre1;
    const toggletitre1 = () => {
        set_isOpentitre1(!isOpentitre1);
    };
    useEffect(() => {
        async function fetchTitre1() {
            const code_id = get_id(get_uid());
            const titre1 = await get_titre1(code_id);
            setlocaltitre1(titre1);
            set_defaulttitre1(titre1);
        }

        fetchTitre1();
    }, []);

    const handleTitleChange = (e) => {
        setlocaltitre1(e.target.value);
    };
    return (
        <div className="App">
            <h3>Premier Titre</h3>
            <br />
            <p className='what'>Ce titre sera le titre de la première partie de votre description. </p>
            {isOpentitre1 ? (
                <div className='cadre'>
                    <div className='item-cadre'>
                        <form>
                            <input id="titre1" value={localtitre1} type="text" max="50" onChange={(e) => handleTitleChange(e)} />
                            <button className="btn mt-4" onClick={(e) => {
                                e.preventDefault();
                                toggletitre1();
                                setlocaltitre1(defaulttitre1)
                            }}>Annulez</button>
                            <button className="btn mt-4" onClick={(e) => {
                                e.preventDefault();
                                set_titre1(localtitre1, code_id);
                                titre1 = get_titre1(code_id);
                                toggletitre1();
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
                        <p>{localtitre1}</p>
                        <button className="btn mt-4" onClick={toggletitre1}>Modifier</button>
                        <br />
                    </div>
                </div>
            )}
        </div>
    );
}


export default AppT1;


