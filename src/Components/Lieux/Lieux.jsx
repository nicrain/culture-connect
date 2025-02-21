import { onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/9.6.3/firebase-auth.js';
import { get, push, ref, set } from 'https://www.gstatic.com/firebasejs/9.6.3/firebase-database.js';
import React, { useEffect, useState } from 'react';
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';
import back from '../../assets/back.png';
import CardEvent from '../CardLieu/CardEvent';
import { auth, database } from '../ChatRoom/firebase'; // Assurez-vous que ce fichier est correctement configuré
import './lieux.css';

const apiKey = "rdpM6zH4.WAhwx4zoVvrI3ICXwg1eudkxslwVNWI9";
const apiUrl = "https://acceslibre.beta.gouv.fr/api/accessibilite/13040/";
var uuid;
var erpurl;

function Info_lieu() {
  const [transportAccess, setTransportAccess] = useState([]);
  const [entreeAccess, setEntreeAccess] = useState([]);
  const [commentaire, setCommentaire] = useState("");
  const [imageUrl1, setImageUrl1] = useState("");
  const [imageUrl2, setImageUrl2] = useState("");
  const [imageUrl3, setImageUrl3] = useState("");
  const [events, setEvents] = useState([]);
  const [description, setDescription] = useState("");
  const [description2, setDescription2] = useState("");
  const [erpName, setErpName] = useState(""); // State to store the ERP name
  const [erpAdresse, setErpAdresse] = useState("");
  const [selectedInfo, setSelectedInfo] = useState(""); // State to store selected information
  const [user, setUser] = useState(null); // State to store the authenticated user


  useEffect(() => {
    const fetchData = async () => {
      try {
        const params = new URLSearchParams(window.location.search);
        const url = params.get("url");
        const response = await fetch(url, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${apiKey}`,
          },
        });
        if (!response.ok) {
          throw new Error(`API request failed with status ${response.status}`);
        }
        const erp = await response.json();;
        uuid = erp.uuid;
        erpurl = erp.url
        setErpName(erp.nom);
        setErpAdresse(erp.adresse);
        afficherAccessibilite(erp.accessibilite);
        afficherImage(uuid); // Appel de la fonction pour afficher l'image
        afficherDescriptions(uuid); // Appeler la fonction pour afficher les descriptions
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });
    const fetchEvents = async () => {
      const eventsRef = ref(database, `etablissement/${uuid}/evenements`);
      try {
        const eventsSnapshot = await get(eventsRef);
        const evenements = eventsSnapshot.val();
        if (evenements) {
          const listEvent = Object.keys(evenements).map((key) => ({
            id_event: evenements[key].id_event, // Ensure proper extraction of IdEvent
          }));


          const eventNamesPromises = listEvent.map(async (event) => {
            const { id_event } = event;
            const eventRef = ref(database, `evenement/${id_event}/nom`);
            const snapshot = await get(eventRef);
            const nom = snapshot.val();
            return { ...event, name: nom };
          });

          const eventNames = await Promise.all(eventNamesPromises);
          setEvents(eventNames);
        } else {
          setEvents([]);
        }
      } catch (error) {
        console.error('Erreur lors de la récupération des événements:', error);
      }
    };

    fetchEvents();
  }, [uuid]);

  function afficherTransport(accessibilite) {
    const transportListe = [];
    if (accessibilite.transport.stationnement_ext_presence) {
      transportListe.push("Places de parking à proximité");
    } else {
      transportListe.push("Pas de places de parking à proximité");
    }
    if (accessibilite.transport.stationnement_ext_pmr) {
      transportListe.push(" comprenant des places PMR");
    }
    if (accessibilite.transport.stationnement_presence) {
      transportListe.push("Places de parking au sein de l'établissement");
    } else {
      transportListe.push("Pas de places de parking au sein de l'établissement");
    }
    if (accessibilite.transport.transport_information) {
      transportListe.push("Transport en commun à proximité " + accessibilite.transport.transport_information);
    }

    setTransportAccess(transportListe);
  }

  function afficherEntree(accessibilite) {
    const entreeListe = [];
    if (accessibilite.entree.entree_plain_pied) {
      entreeListe.push("Entrée de plain pied");
    }
    if (accessibilite.entree.entree_reperage) {
      entreeListe.push("Entrée bien visible");
    }
    if (accessibilite.entree.entree_pmr) {
      entreeListe.push("Présence d'une entrée PMR");
    }
    if (accessibilite.entree.entree_pmr_informations) {
      entreeListe.push("Informations entrée PMR: " + accessibilite.entree.entree_pmr_informations);
    }
    if (accessibilite.entree.entree_vitree) {
      entreeListe.push("Porte vitrée avec éléments contrastés sur la partie vitrée");
    }
    if (accessibilite.entree.entree_aide_humaine) {
      entreeListe.push("Aide humaine possible");
    }
    if (accessibilite.entree.entree_dispositif_appel) {
      entreeListe.push("Dispositif d'appel à l'entrée");
    }

    setEntreeAccess(entreeListe);
  }

  function afficherCommentaire(accessibilite) {
    if (accessibilite.commentaire.commentaire) {
      setCommentaire(accessibilite.commentaire.commentaire);
    }
  }

  function afficherAccessibilite(accessibilite) {
    afficherTransport(accessibilite);
    afficherEntree(accessibilite);
    afficherCommentaire(accessibilite);
  }

  async function afficherImage(uuid) {

    const imageRef = ref(database, `etablissement/${uuid}/images/image`);
    try {
      const snapshot = await get(imageRef);
      if (snapshot.exists()) {
        const data = snapshot.val();
        setImageUrl1(data);
      } else {
        console.log("No data available");
      }
    } catch (error) {
      console.error("Error fetching image:", error);
    }
    const imageRef2 = ref(database, `etablissement/${uuid}/images/image2`);
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
    const imageRef3 = ref(database, `etablissement/${uuid}/images/image3`);
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
  async function afficherDescriptions(uuid) {
    console.log(`Fetching descriptions for UUID: ${uuid}`);
    const descriptionRef = ref(database, `etablissement/${uuid}/description`);
    const description2Ref = ref(database, `etablissement/${uuid}/description2`);
    const titleRef = ref(database, `etablissement/${uuid}/titre1`);
    const title2Ref = ref(database, `etablissement/${uuid}/titre2`);
    const titleSnapshot = await get(titleRef);
    const title2Snapshot = await get(title2Ref);
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
  }

  const generateLinkWithParam = (paramValue) => {
    return `./showrooms?param=${paramValue}`;
  };

  const handleButtonClick = () => {
    window.location.href = generateLinkWithParam(uuid);
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
    const favouritesRef = ref(database, `users/${userId}/favoris`);
    const newFavouriteRef = push(favouritesRef);

    try {
      await set(newFavouriteRef, {
        nom: erpName,
        uuid: uuid,
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

    <div className="container2">
      <div className='filAriane'>
        <p><a href='acceuil.html'>acceuil/</a><a href='visiter.html'>Visiter/</a>{erpName}</p>
      </div>
      <button onClick={retourPagePrecedente} className='back'>
        <img src={back} alt='retourner en haut de page' width={15} height={15} />  Retourner à la page précédente
      </button>

      <div className="header">
        <h1>{erpName}</h1>

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
          <ul>
            <li>Adresse: {erpAdresse}</li>
            {transportAccess.length > 0 && <li onClick={() => handleListClick("transport")}>Transport</li>}
            {entreeAccess.length > 0 && <li onClick={() => handleListClick("entree")}>Entrée</li>}
            {commentaire && <li onClick={() => handleListClick("commentaire")}>Commentaire</li>}
          </ul>
        </div>
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

      <ul className="lieux-list">
        {events.slice(0, 20).map((event) => (
          <li key={event.id_event} style={{ marginBottom: '10px', fontSize: '16px', fontFamily: 'Arial, sans-serif' }}>
            <CardEvent key={event.id_event} url={`AffichEvent.html?id=${event.id_event}`} text={event.name} lieuID={event.id_event} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Info_lieu;