import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.6.3/firebase-app.js';
import { getAuth } from 'https://www.gstatic.com/firebasejs/9.6.3/firebase-auth.js';
import { getDatabase } from 'https://www.gstatic.com/firebasejs/9.6.3/firebase-database.js';
import { getStorage } from 'https://www.gstatic.com/firebasejs/9.6.3/firebase-storage.js';
import { get_uid } from '../../userdata';

import { get_id } from './codeIDetab';
import { get_small_description, set_small_description } from './small_description';

import React, { useEffect, useState } from 'react';

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

const AppSmall = () => {
    const [isOpensmall_description, set_isOpensmall_description] = useState(false);
    const [titre1, setTitre1] = useState('');
    const [image, setImage] = useState(null);
    const [editing, setEditing] = useState(false);
    const [existingData, setExistingData] = useState(null);
    const params = new URLSearchParams(window.location.search);
    const code_id = params.get("event_id");
    const [localsmall_description, setlocalsmall_description] = useState('');
    const [defaultsmall_description, setdefaultsmall_description] = useState('');


    let small_description;

    useEffect(() => {
        // Utilisez une fonction asynchrone pour récupérer la valeur de titre1
        async function fetch_smallDescription() {
            const code_id = get_id(get_uid());
            const small_description = await get_small_description(code_id);
            setlocalsmall_description(small_description);
            setdefaultsmall_description(small_description);
            const nomEtab = await get_nomEtab(uid);
            setEtablissement(nomEtab);
        }

        fetch_smallDescription();
    }, []);

    const togglesmall_description = () => {
        set_isOpensmall_description(!isOpensmall_description);
    };

    const handlesmall_description = (e) => {
        setlocalsmall_description(e.target.value);
    };

    return (
        <div className="App">


            <h3>Description générale</h3>
            <br />
            <p className='what'>Cette petite description sera la première approche que l'utilisateur aura sur votre établissemnt. Il faut quelle soit pertinante et quelle donne envie à celui qui la lira  </p>
            {isOpensmall_description ? (
                <div className='cadre'>
                    <div className='item-cadre'>

                        <form>
                            <label htmlFor="small_description">une petite description :</label>

                            <p className='small'>max 100 caratères</p>
                            <input id="small_description" value={localsmall_description} type="text" onChange={(e) => handlesmall_description(e)} />
                            <button className="btn mt-4" onClick={(e) => {
                                e.preventDefault();
                                togglesmall_description();
                                setlocalsmall_description(defaultsmall_description);
                            }}>Annulez</button>
                            <button className="btn mt-4" onClick={(e) => {
                                e.preventDefault();

                                set_small_description(localsmall_description, code_id);
                                small_description = get_small_description(code_id);
                                togglesmall_description();
                                window.location.reload();
                            }}>Validez</button>
                        </form>
                    </div>
                </div>
            ) : (
                <div className='cadre'>
                    <p>Votre description actuelle: </p>

                    <div className='item-cadre'>


                        <p>{localsmall_description}</p>
                        <button className="btn mt-4" onClick={togglesmall_description}>Modifier</button>
                    </div>
                </div>
            )}
        </div>
    );
}


export default AppSmall;


