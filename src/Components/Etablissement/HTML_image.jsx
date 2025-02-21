import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.6.3/firebase-app.js';
import { getAuth } from 'https://www.gstatic.com/firebasejs/9.6.3/firebase-auth.js';
import { get, getDatabase, ref, update } from 'https://www.gstatic.com/firebasejs/9.6.3/firebase-database.js';
import { getDownloadURL, getStorage, ref as storageRef, uploadString } from 'https://www.gstatic.com/firebasejs/9.6.3/firebase-storage.js';
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';
import { get_uid } from '../../userdata';
import { get_id } from './codeIDetab';


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
    const [isOpenimage, set_isOpenimage] = useState(false);
    const [image, setImage] = useState(null);
    let code_id;
    let uid = get_uid();
    code_id = get_id(uid);
    console.log(code_id);


    const handleImageChange = (e) => {
        if (e && e.target && e.target.files) {
            const selectedFiles = e.target.files;
            if (selectedFiles.length > 0) {
                const file = selectedFiles[0];
                const reader = new FileReader();
                reader.onload = function (event) {
                    const dataURL = event.target.result;
                    setImage(dataURL);
                    handleFormSubmit(dataURL);
                };
                reader.readAsDataURL(file);
            }
        } else {
            console.error("L'événement ou ses propriétés ne sont pas définis.");
        }
    };

    const handleImageChange2 = (e) => {
        if (e && e.target && e.target.files) {
            const selectedFiles = e.target.files;
            if (selectedFiles.length > 0) {
                const file = selectedFiles[0];
                const reader = new FileReader();
                reader.onload = function (event) {
                    const dataURL = event.target.result;
                    setImage(dataURL);
                    handleFormSubmit2(dataURL);
                };
                reader.readAsDataURL(file);
            }
        } else {
            console.error("L'événement ou ses propriétés ne sont pas définis.");
        }
    };

    const handleImageChange3 = (e) => {
        if (e && e.target && e.target.files) {
            const selectedFiles = e.target.files;
            if (selectedFiles.length > 0) {
                const file = selectedFiles[0];
                const reader = new FileReader();
                reader.onload = function (event) {
                    const dataURL = event.target.result;
                    setImage(dataURL);
                    handleFormSubmit3(dataURL);
                };
                reader.readAsDataURL(file);
            }
        } else {
            console.error("L'événement ou ses propriétés ne sont pas définis.");
        }
    };


    const toggleimage = () => {
        set_isOpenimage(!isOpenimage);
    };
    const handleFormSubmit = (dataURL) => {
        const imageRef = storageRef(storage, `etablissement/${uid}/${Date.now()}.jpg`);
        return uploadString(imageRef, dataURL, 'data_url')
            .then((snapshot) => {
                console.log("coucou je suis ici");
                return getDownloadURL(snapshot.ref);
            })
            .then((downloadURL) => {
                const lieuxRef2 = ref(database, 'etablissement/' + code_id + '/images');
                return update(lieuxRef2, {
                    image: downloadURL,
                });
            })
            .then(() => {
                console.log("Image uploaded and database updated successfully!");
            })
            .catch((error) => {
                console.error("Error uploading image or updating database:", error);
            });
    };

    const handleFormSubmit2 = (dataURL) => {
        const imageRef = storageRef(storage, `etablissement/${uid}/${Date.now()}.jpg`);
        return uploadString(imageRef, dataURL, 'data_url')
            .then((snapshot) => {
                console.log("coucou je suis ici");
                return getDownloadURL(snapshot.ref);
            })
            .then((downloadURL) => {
                const lieuxRef2 = ref(database, 'etablissement/' + code_id + '/images/');
                return update(lieuxRef2, {
                    image2: downloadURL,
                });
            })
            .then(() => {
                console.log("Image uploaded and database updated successfully!");
            })
            .catch((error) => {
                console.error("Error uploading image or updating database:", error);
            });
    };

    const handleFormSubmit3 = (dataURL) => {
        const imageRef = storageRef(storage, `etablissement/${uid}/${Date.now()}.jpg`);
        return uploadString(imageRef, dataURL, 'data_url')
            .then((snapshot) => {
                console.log("coucou je suis ici");
                return getDownloadURL(snapshot.ref);
            })
            .then((downloadURL) => {
                const lieuxRef3 = ref(database, 'etablissement/' + code_id + '/images/');
                return update(lieuxRef3, {
                    image3: downloadURL,
                });
            })
            .then(() => {
                console.log("Image uploaded and database updated successfully!");
            })
            .catch((error) => {
                console.error("Error uploading image or updating database:", error);
            });
    };




    const [imageUrl, setImageUrl] = useState(null);
    const [imageUrl2, setImageUrl2] = useState(null);
    const [imageUrl3, setImageUrl3] = useState(null);
    const images = [
        imageUrl,
        imageUrl2,
        imageUrl3,
    ]
    useEffect(() => {
        const fetchImage = async () => {
            try {
                const imageRef = ref(database, 'etablissement/' + code_id + '/images/image');
                const imageSnapshot = await get(imageRef);
                const img = imageSnapshot.val();
                setImageUrl(img);
            } catch (error) {
                console.error('Error getting image:', error);
            }
        };

        const fetchImage2 = async () => {
            try {
                const imageRef2 = ref(database, 'etablissement/' + code_id + '/images/image2');
                const imageSnapshot2 = await get(imageRef2);
                const img2 = imageSnapshot2.val();
                setImageUrl2(img2);
            } catch (error) {
                console.error('Error getting image:', error);
            }
        }

        const fetchImage3 = async () => {
            try {
                const imageRef3 = ref(database, 'etablissement/' + code_id + '/images/image3');
                const imageSnapshot3 = await get(imageRef3);
                const img3 = imageSnapshot3.val();
                setImageUrl3(img3);
            } catch (error) {
                console.error('Error getting image:', error);
            }
        }

        fetchImage();
        fetchImage2();
        fetchImage3();
    }, [database]);


    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        cssEase: "linear",
        prevArrow: <div className="slick-prev">Previous</div>,
        nextArrow: <div className="slick-next">Next</div>,
    };


    return (
        <div className="App">
            <h3>Vos Images</h3>
            <br />
            <p className='what'>Les images seront visible par les utilisateurs </p>
            {isOpenimage ? (

                <form>
                    <label htmlFor="photos">Sélectionnez des photos à charger :</label>
                    <input type="file" id="photos" onChange={(e) => handleImageChange(e)} name="photos" accept="image/*" />
                    <input type="file" id="photos" onChange={(e) => handleImageChange2(e)} name="photos" accept="image/*" />
                    <input type="file" id="photos" onChange={(e) => handleImageChange3(e)} name="photos" accept="image/*" />
                    <button className="btn mt-4" onClick={(e) => {
                        e.preventDefault();
                        toggleimage();
                    }}>Annulez</button>

                    <button className="btn mt-4" onClick={(e) => {
                        e.preventDefault();
                        console.log("avant mise à jour base de donnée ")

                        toggleimage();
                        window.location.reload();
                    }}>terminer</button>
                </form>
            ) : (
                <div className='image'>

                    <Slide easing="ease">
                        {images.map((image, index) => (
                            <div key={index} className="each-slide">
                                <img src={image} alt={`Image ${index + 1}`} />
                            </div>
                        ))}
                    </Slide>

                    <button className="btn mt-4" onClick={toggleimage}>Modifier</button>
                </div>
            )}
        </div>
    );
}


export default App;


