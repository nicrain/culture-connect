import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.6.3/firebase-app.js';
import { createUserWithEmailAndPassword, getAuth } from 'https://www.gstatic.com/firebasejs/9.6.3/firebase-auth.js';
import { getDatabase, ref, set } from 'https://www.gstatic.com/firebasejs/9.6.3/firebase-database.js';
import React, { useEffect, useState } from 'react';
import './inscriptionpro.css';

const apiKey = "rdpM6zH4.WAhwx4zoVvrI3ICXwg1eudkxslwVNWI9";

const firebaseConfig = {
  apiKey: "AIzaSyDrUZ7SdmGYarxvIN7ikrUr5AzKeDIScW8",
  authDomain: "cultureapp-a1c9c.firebaseapp.com",
  databaseURL: "https://cultureapp-a1c9c-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "cultureapp-a1c9c",
  storageBucket: "cultureapp-a1c9c.appspot.com",
  messagingSenderId: "885088600367",
  appId: "1:885088600367:web:2b5d6f33e92435849fe1da",
  measurementId: "G-PQ7DPJJJFT"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app);

function App() {
  const [secteurs, setSecteurs] = useState([]);
  const [etablissements, setEtablissements] = useState([]);
  const [codePostal, setCodePostal] = useState('');
  const [ville, setVille] = useState('');
  const [nom, setNom] = useState('');
  const [selectedActivite, setSelectedActivite] = useState('');
  const [nextUrl, setNextUrl] = useState('');
  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [URLapi, setUrlAPI] = useState('');
  const [selectedEtablissement, setSelectedEtablissement] = useState(null);



  useEffect(() => {
    fetchSecteurs();
  }, []);

  useEffect(() => {
    handleSubmit();
  }, [codePostal, ville, nom, selectedActivite]);

  const fetchSecteurs = () => {
    const mockSecteurs = ["musée", "stade", "monument", "lieu de visite", "salle de spectacle"];
    setSecteurs(mockSecteurs);
  };

  const handleSubmit = () => {
    let complementUrl = "";

    if (codePostal !== "") {
      complementUrl += "code_postal=" + codePostal;
    }

    if (ville !== "") {
      complementUrl += "&commune=" + ville;
    }

    if (selectedActivite !== "") {
      complementUrl += "&q=" + selectedActivite;
    }

    if (nom !== "") {
      complementUrl += "&q=" + nom;
    }

    const apiUrl = "https://acceslibre.beta.gouv.fr/api/erps/?" + complementUrl;


    fetch(apiUrl, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${apiKey}`,
      },
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(`API request failed with status ${response.status}`);
        }
        return response.json();
      })
      .then(data => {

        setNextUrl(data.next);
        setEtablissements(data.results);
      })
      .catch(error => {
        console.error("Error fetching data:", error);
      });
  };

  const handleNext = (e) => {
    e.preventDefault();
    if (nextUrl !== "") {
      fetch(nextUrl, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${apiKey}`,
        },
      })
        .then(response => {
          if (!response.ok) {
            throw new Error(`API request failed with status ${response.status}`);
          }
          return response.json();
        })
        .then(data => {

          setNextUrl(data.next);
          setEtablissements(data.results);
        })
        .catch(error => {
          console.error("Error fetching data:", error);
        });
    }
  }

  const handleFormSubmit = (e) => {
    e.preventDefault();
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        const userId = user.uid;
        const userRef = ref(database, 'users/' + userId);
        const userData = {
          etablissement: selectedEtablissement,
          URL: "https://acceslibre.beta.gouv.fr/api/erps/?q=" + encodeURIComponent(selectedEtablissement.nom),
          is_pro: true,
          lastName: lastName
        };

        set(userRef, userData)
          .then(() => {
            alert("Utilisateur créé avec succès !");

            setTimeout(() => {
              window.location.href = 'connexion.html';
            }, 2000);
          })
          .catch((error) => {
            alert("Erreur lors de la sauvegarde des données : " + error.message);
          });
      })
      .catch((error) => {
        alert("Erreur lors de la création de l'utilisateur : " + error.message);
      });
  };







  return (
    <div className="section">
      <div className='filAriane'>
        <p><a href='connexion.html'>Connection&gt;</a><a href='inscription.html'>Inscription&gt;</a>Inscription professionel</p>
      </div>
      <div className="container">
        <div className="row full-height justify-content-center">
          <div className="col-14 text-center py-10">
            <div className="section pb-5 pt-5 pt-sm-2 text-center">
              <div className="card-3d-wrap mx-auto">
                <div className="card-3d-wrapper">
                  <div className="card-front">

                    <div className="section text-center">
                      <h1 className="mb-4 pb-3">Création d'un compte professionel</h1>
                      <p className='para'>Vous êtes un établissement culturel et vous voulez ajouter votre établissement à CultureCo pour partager vos évènements? Inscrivez-vous! </p>
                      <h2 className="mb-4 pb-3">Etape 1 - Rechercher votre établissement </h2>


                      <div className="form-group">
                        <div>
                          <form>
                            <label>
                              Code Postal
                            </label><br />
                            <input className="form-control form-control-lg" type="text" value={codePostal} onChange={(e) => setCodePostal(e.target.value)} />

                            <br />
                            <label>
                              Ville
                            </label><br />
                            <input className="form-control form-control-lg" type="text" value={ville} onChange={(e) => setVille(e.target.value)} />

                            <br />
                            <label>
                              Nom de l'établissement
                            </label> <br />
                            <input type="text" value={nom} onChange={(e) => setNom(e.target.value)} />

                            <br />
                            <label>
                              Secteur d'activité
                            </label><br />
                            <select value={selectedActivite} onChange={(e) => setSelectedActivite(e.target.value)}>
                              <option value="">Sélectionner une activité</option>
                              {secteurs.map((secteur, index) => (
                                <option key={index} value={secteur}>{secteur}</option>
                              ))}
                            </select>
                          </form>
                          <br />
                          <div>
                            <h2 className="mb-4 pb-3">Etape 2 - Selectionné votre établissement </h2>

                            <p className='para'>Selectionné votre établissement dans la liste.</p>
                            <p className='para'>
                              Si votre établissement n'est pas dans cette liste, veuillez vous rapprocher de la base de donnée nationale "AccèsLibre".
                            </p>
                            <select value={selectedEtablissement ? selectedEtablissement.nom : ''} onChange={(e) => {
                              const selectedNom = e.target.value;
                              const selectedEtablissement = etablissements.find(etablissement => etablissement.nom === selectedNom);
                              setSelectedEtablissement(selectedEtablissement);
                            }}>
                              <option value="">Sélectionner un établissement</option>
                              {etablissements.map((etablissement, index) => (
                                <option key={index} value={etablissement.nom}>{etablissement.nom}</option>
                              ))}
                            </select>
                            {nextUrl && <button onClick={handleNext}>Suivant</button>}
                          </div>
                          <div className="form-group mt-2">
                            <h2 className="mb-4 pb-3">Etape 3 - Crée un compte</h2>
                            <label>
                              Email Professionel
                            </label><br />
                            <input
                              type="email"
                              name="email"
                              className="form-style"
                              placeholder="Votre email"
                              id="email"
                              autoComplete="off"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                            />
                            <i className="input-icon uil uil-at"></i>
                          </div>
                          <div className="form-group mt-2">
                            <label>
                              Mot de passe
                            </label><br />
                            <input
                              type="password"
                              name="logpass"
                              className="form-style"
                              placeholder="Votre mot de passe"
                              id="password"
                              autoComplete="off"
                              value={password}
                              onChange={(e) => setPassword(e.target.value)}
                            />
                            <i className="input-icon uil uil-lock-alt"></i>
                          </div>
                          <p className='lapse'>La création d'un compte professionel est soumis à vérification. Vous recevrez un mail de confirmation au plus vite. </p>

                          <button className="btn mt-4" onClick={handleFormSubmit}>Envoyer</button>
                          <p className="mb-0 mt-4 text-center"><a href="connexion.html" className="link">Vous avez déjà un compte ?</a></p>
                          <p className="mb-0 mt-4 text-center"><a href="inscription.html" className="link">Vous n'êtes pas professionnel dans la culture ?</a></p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
