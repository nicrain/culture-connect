import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.6.3/firebase-app.js';
import { getAuth } from 'https://www.gstatic.com/firebasejs/9.6.3/firebase-auth.js';
import { getDatabase } from 'https://www.gstatic.com/firebasejs/9.6.3/firebase-database.js';
import { getStorage } from 'https://www.gstatic.com/firebasejs/9.6.3/firebase-storage.js';
import { get_uid } from '../../userdata';
import { get_nomEtab } from './NomEtab';
import { get_id } from './codeIDetab';
import { get_description, set_description } from './descriptionEtab';

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

const App = () => {
    const [isOpenDescription, set_isOpenDescription] = useState(false);
    const [localdescription, setLocalDescription] = useState('');
    const [etablissement, setEtablissement] = useState('');
    const [descrip,setdescription]=useState('')
    let description;
    useEffect(() => {
        async function fetchData() {
            const uid = get_uid();
            const code_id = get_id(uid);
            console.log('coucou' +code_id);
            description = await get_description(code_id);
            setLocalDescription(description);
            setdescription(description);
            const nomEtab = await get_nomEtab(uid);
            setEtablissement(nomEtab);
        }

        fetchData();
    }, []);

    const toggleDescription = () => {
        set_isOpenDescription(!isOpenDescription);
    };

    const handleDescriptionChange = (e) => {
        setLocalDescription(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const code_id = get_id(get_uid());
        await set_description(localdescription, code_id);
        toggleDescription();
    };

    return (
        <div className="App">
            <h3>Première partie de la description</h3>
            <br/>
            <p className='what'>La il faut ce lacher et dire tout ce qui est important sur votre etéblissement </p>
            
            {isOpenDescription ? (
                <div className='cadre'>
                    <div className='item-cadre'>

                <form>
                    
                    <input id="description" value={localdescription} type="text" min="200" onChange={handleDescriptionChange} />
                    <button className="btn mt-4" onClick={(e)=>{ e.preventDefault();toggleDescription();setLocalDescription(descrip);}}>Annulez</button>
                    <button className="btn mt-4" onClick={handleSubmit}>Validez</button>
                </form>
                </div>
                </div>
            ) : (
                <div className='cadre'>
                    <p>Votre description actuelle: </p>
                    <div className='item-cadre'>


                    
                    <p>{localdescription}</p>
                    <button className="btn mt-4" onClick={toggleDescription}>Modifier</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default App;

