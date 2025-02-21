import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.6.3/firebase-app.js';
import { getAuth } from 'https://www.gstatic.com/firebasejs/9.6.3/firebase-auth.js';
import { getDatabase } from 'https://www.gstatic.com/firebasejs/9.6.3/firebase-database.js';
import { getStorage } from 'https://www.gstatic.com/firebasejs/9.6.3/firebase-storage.js';
import { get_uid } from '../../userdata';
import { get_nomEtab } from './NomEtab';
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

const App = () => {
    const [isOpendescription2, set_isOpendescription2] = useState(false);
    const [localdescription2, setLocaldescription2] = useState('');
    const [etablissement, setEtablissement] = useState('');
    const [descrip,setdescription2]=useState('')
    let description2;
    useEffect(() => {
        async function fetchData() {
            const uid = get_uid();
            const code_id = get_id(uid);
            description2 = await get_description2(code_id);
            setLocaldescription2(description2);
            setdescription2(description2);
            const nomEtab = await get_nomEtab(uid);
            setEtablissement(nomEtab);
        }

        fetchData();
    }, []);

    const toggledescription2 = () => {
        set_isOpendescription2(!isOpendescription2);
    };

    const handledescription2Change = (e) => {
        setLocaldescription2(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const code_id = get_id(get_uid());
        await set_description2(localdescription2, code_id);
        toggledescription2();
    };

    return (
        <div className="App">
            <h3>Deuxième partie de la description</h3>
            <br/>
            <p className='what'>La il faut ce lacher et dire tout ce qui est important sur votre etéblissement </p>
            {isOpendescription2 ? (
                <div className='cadre'>
                    <div className='item-cadre'>

                <form>
                    
                    <input id="description2" value={localdescription2} type="text" min="200" onChange={handledescription2Change} />
                    <button className="btn mt-4" onClick={(e)=>{ e.preventDefault();toggledescription2();setLocaldescription2(descrip);}}>Annulez</button>
                    <button className="btn mt-4" onClick={handleSubmit}>Validez</button>
                </form>
                </div>
                </div>
            ) : (
                <div className='cadre'>
                    <p>description2: </p>
                    <div className='item-cadre'>

                    
                    <p>{localdescription2}</p>
                    <button className="btn mt-4" onClick={toggledescription2}>Modifier</button>
                </div>
                </div>
            )}
        </div>
    );
};

export default App;

