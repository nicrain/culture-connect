import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.6.3/firebase-app.js';
import { getAuth } from 'https://www.gstatic.com/firebasejs/9.6.3/firebase-auth.js';
import { getDatabase } from 'https://www.gstatic.com/firebasejs/9.6.3/firebase-database.js';
import { getStorage } from 'https://www.gstatic.com/firebasejs/9.6.3/firebase-storage.js';
import { get_uid } from '../../userdata';
import { get_id } from './codeIDetab';
import { get_description2, set_description2 } from './description2';

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

const App2 = () => {
    const [isOpenDescription2_event, set_isOpenDescription2_event] = useState(false);
    const [localdescription2_event, setLocalDescription2_event] = useState('');
    const [etablissement, setEtablissement] = useState('');
    const [descrip, setdescription2_event] = useState('')
    const params = new URLSearchParams(window.location.search);
    const id_event = params.get("event_id");
    let description2_event;
    useEffect(() => {
        async function fetchData() {
            const uid = get_uid();
            description2_event = await get_description2(id_event);
            setLocalDescription2_event(description2_event);
            setdescription2_event(description2_event);

        }


        fetchData();
    }, []);


    const toggleDescription2_event = () => {
        set_isOpenDescription2_event(!isOpenDescription2_event);
    };

    const handleDescription2_eventChange = (e) => {
        setLocalDescription2_event(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const code_id = get_id(get_uid());
        await set_description2(localdescription2_event, id_event);
        toggleDescription2_event();
    };

    return (
        <div className="App">
            <h3>Première partie de la description2</h3>
            <br />
            <p className='what'>La il faut ce lacher et dire tout ce qui est important sur votre évênement </p>

            {isOpenDescription2_event ? (
                <div className='cadre'>
                    <div className='item-cadre'>

                        <form>

                            <input id="description2_event" value={localdescription2_event} type="text" min="200" onChange={handleDescription2_eventChange} />
                            <button className="btn mt-4" onClick={(e) => { e.preventDefault(); toggleDescription2_event(); setLocalDescription2_event(descrip); }}>Annulez</button>
                            <button className="btn mt-4" onClick={handleSubmit}>Validez</button>
                        </form>
                    </div>
                </div>
            ) : (
                <div className='cadre'>
                    <p>Votre description actuelle: </p>
                    <div className='item-cadre'>



                        <p>{localdescription2_event}</p>
                        <button className="btn mt-4" onClick={toggleDescription2_event}>Modifier</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default App2;

