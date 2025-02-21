import { onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/9.6.3/firebase-auth.js';
import { get, push, ref, set } from 'https://www.gstatic.com/firebasejs/9.6.3/firebase-database.js';
import React, { useEffect, useState } from 'react';
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';
import back from '../../assets/back.png';
import { auth, database } from '../ChatRoom/firebase'; // Assurez-vous que ce fichier est correctement configuré
import './AfficheEvent.css';


const params = new URLSearchParams(window.location.search);
const id = params.get("id");


function Info_lieu() {

    const [imageUrl1, setImageUrl1] = useState("");
    const [imageUrl2, setImageUrl2] = useState("");
    const [imageUrl3, setImageUrl3] = useState("");
    const [events, setEvents] = useState([]);
    const [description, setDescription] = useState("");
    const [nomEtab, setnomEtab] = useState("");



    const [description2, setDescription2] = useState("");
    const [eventName, setName] = useState(""); // State to store the ERP name
    const [uuid_etab, Setuuid_etab] = useState("");
    const [selectedInfo, setSelectedInfo] = useState(""); // State to store selected information
    const [user, setUser] = useState(null); // State to store the authenticated user


    useEffect(() => {
        const fetchData = async () => {

            console.log(id);
            afficherImage(id); // Appel de la fonction pour afficher l'image
            afficherDescriptions(id); // Appeler la fonction pour afficher les descriptions
            getNom(id);
            getEbat(uuid_etab);

        };
        fetchData();


        const fetchEvents = async () => {
            const eventsRef = ref(database, `evenement/${id}/evenements`);
            try {
                const eventsSnapshot = await get(eventsRef);
                const evenements = eventsSnapshot.val();
                if (evenements) {
                    const listEvent = Object.keys(evenements).map((key) => ({
                        id_event: evenements[key].id_event, // Ensure proper extraction of IdEvent
                    }));

                    // Debugging logs
                    console.log("ListEvent:", listEvent);

                    const eventNamesPromises = listEvent.map(async (event) => {
                        console.log("event: " + event);
                        const { id_event } = event;
                        const eventRef = ref(database, `evenement/${id_event}/nom`);
                        const snapshot = await get(eventRef);
                        const nom = snapshot.val();
                        return { ...event, name: nom };
                    });

                    const eventNames = await Promise.all(eventNamesPromises);
                    // More debugging logs
                    console.log("EventNames:", eventNames);
                    setEvents(eventNames);
                } else {
                    setEvents([]);
                }
            } catch (error) {
                console.error('Erreur lors de la récupération des événements:', error);
            }
        }

        fetchEvents();

        onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user);
            } else {
                setUser(null);
            }
        });
    }, [id]);


    async function afficherImage(id) {

        const imageRef = ref(database, `evenement/${id}/images/image`);
        try {
            const snapshot = await get(imageRef);
            if (snapshot.exists()) {
                const data = snapshot.val();
                setImageUrl1(data); // Supposons que l'URL de l'image est stockée dans la propriété 'imageUrl'
            } else {
                console.log("No data available");
            }
        } catch (error) {
            console.error("Error fetching image:", error);
        }
        const imageRef2 = ref(database, `evenement/${id}/images/image2`);
        try {
            const snapshot2 = await get(imageRef2);
            if (snapshot2.exists()) {
                const data2 = snapshot2.val();
                setImageUrl2(data2); // Supposons que l'URL de l'image est stockée dans la propriété 'imageUrl'
            } else {
                console.log("No data available");
            }
        } catch (error) {
            console.error("Error fetching image:", error);
        }
        const imageRef3 = ref(database, `evenement/${id}/images/image3`);
        try {
            const snapshot3 = await get(imageRef3);
            if (snapshot3.exists()) {
                const data3 = snapshot3.val();
                setImageUrl3(data3); // Supposons que l'URL de l'image est stockée dans la propriété 'imageUrl'
            } else {
                console.log("No data available");
            }
        } catch (error) {
            console.error("Error fetching image:", error);
        }

    }
    async function afficherDescriptions(id) {
        console.log(`Fetching descriptions for UUID: ${id}`);
        const descriptionRef = ref(database, `evenement/${id}/description_event`);
        const description2Ref = ref(database, `evenement/${id}/description2_event`);
        const titleRef = ref(database, `evenement/${id}/titre1`);
        const title2Ref = ref(database, `evenement/${id}/titre2`);
        const uuidRef = ref(database, `evenement/${id}/uuid_etab`);

        const titleSnapshot = await get(titleRef);
        const title2Snapshot = await get(title2Ref);
        const uuidRefSnapchot = await get(uuidRef);
        try {
            const snapshot = await get(descriptionRef);
            if (snapshot.exists()) {
                setDescription({ title: titleSnapshot.val(), content: snapshot.val() });
            } else {
                console.log("No description data available");
            }
            const snapshot2 = await get(description2Ref);
            if (snapshot2.exists()) {
                setDescription2({ title: title2Snapshot.val(), content: snapshot2.val() });
            } else {
                console.log("No description2 data available");
            }
        } catch (error) {
            console.error("Error fetching descriptions:", error);
        }
        try {
            Setuuid_etab(uuidRefSnapchot.val());
        } catch (error) {
            console.error("Error fetching descriptions:", error);
        }
    }


    async function getNom(id) {
        const NomRef = ref(database, `evenement/${id}/nom`);
        try {
            const snapshot = await get(NomRef);
            if (snapshot.exists()) {
                const data = snapshot.val();
                setName(data); // Supposons que l'URL de l'image est stockée dans la propriété 'imageUrl'
            } else {
                console.log("No data available");
            }
        } catch (error) {
            console.error("Error fetching descriptions:", error);
        }

    }
    async function getEbat(uuid_etab) {
        const NomEtabRef = ref(database, `etablissement/${uuid_etab}/nom_etab`);
        try {
            const snapshot = await get(NomEtabRef);
            if (snapshot.exists()) {
                const data = snapshot.val();
                setnomEtab(data); // Supposons que l'URL de l'image est stockée dans la propriété 'imageUrl'
                console.log(nomEtab);
            } else {
                console.log("No data available");
            }
        } catch (error) {
            console.error("Error fetching descriptions:", error);

        }
    }

    const generateLinkWithParam = (paramValue) => {
        return `./showrooms?param=${paramValue}`;
    };

    const handleButtonClick = () => {
        window.location.href = generateLinkWithParam(id);
    };

    const handleListClick = (info) => {
        setSelectedInfo(info);
    }
    const addFavourite = async () => {
        if (!user) {
            console.error('User not authenticated');
            return;
        }
        const userId = user.uid;
        console.log(userId)
        const favouritesRef = ref(database, `users/${userId}/favoris`);
        console.log(favouritesRef)
        const newFavouriteRef = push(favouritesRef); // Generate a new unique key for the favourite

        try {
            await set(newFavouriteRef, {
                nom: erpName,
                id: id,
                url: erpurl
            });
            console.log('Favourite added successfully.');
        } catch (error) {
            console.error('Error adding favourite:', error);
        }
    };
    const slideImages = [
        {
            url: imageUrl1,
            caption: 'Slide 1'
        },
        {
            url: imageUrl2,
            caption: 'Slide 2'
        },
        {
            url: imageUrl3,
            caption: 'Slide 3'
        }
    ]

    const retourPagePrecedente = () => {
        window.history.back();
    };

    return (

        <div className="container">
            <div className='filAriane'>
                <p><a href='acceuil.html'>acceuil/</a><a href='visiter.html'>Visiter/</a>{eventName}</p>
            </div>
            <button onClick={retourPagePrecedente} className='back'>
                <img src={back} alt='retourner en haut de page' width={15} height={15} />Retourner à la page précédente
            </button>

            <div className="header">
                <h1>{eventName}</h1>

            </div>

            <div className="slide-container">
                <Slide>
                    {slideImages.map((slideImage, index) => (
                        <div className="each-slide" key={index} style={{ 'backgroundImage': `url(${slideImage.url})` }}>
                            <span>{slideImage.caption}</span>
                        </div>
                    ))}
                </Slide>
            </div>

            <div className="sections">
                <div>
                    <h2>Info pratique</h2>
                </div>
                <p>Cet évènement ce passe au </p>
                <p>{nomEtab}</p>
                <p>Pour en savoir plus sur l'etablissement cliquez <a href={generateLinkWithParam}>ici</a></p>
                <br></br>
                <button onClick={addFavourite} className='btn_lieu'>Ajouter aux favoris ❤️</button> <br />
                <button onClick={handleButtonClick} className='btn_lieu'>Je veux visiter</button>
            </div>
            <div className="accessibilite">
                <h2>{selectedInfo === "transport" ? "Transport et stationnement" : selectedInfo === "entree" ? "Entrée" : selectedInfo === "commentaire" ? "Commentaire" : ""}</h2>
                <p>
                    {selectedInfo === "transport" && transportAccess.map((item, index) => (
                        <span key={index}>{item}<br /></span>
                    ))}
                    {selectedInfo === "entree" && entreeAccess.map((item, index) => (
                        <span key={index}>{item}<br /></span>
                    ))}
                    {selectedInfo === "commentaire" && commentaire}
                </p>
            </div>
            {description && (
                <div className="description">
                    <h2>{description.title}</h2>
                    <p>{description.content}</p>
                </div>
            )}
            {description2 && (
                <div className="description2">
                    <h2>{description2.title}</h2>
                    <p>{description2.content}</p>
                </div>
            )}
            <h2> En ce moment au musée du louvre</h2>


        </div>
    );
}

export default Info_lieu;