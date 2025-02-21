import React, { useEffect, useState } from 'react';
import CardLieu from '../CardLieu/CardLieu';
import './Filtre2.css';

const apiKey = "rdpM6zH4.WAhwx4zoVvrI3ICXwg1eudkxslwVNWI9";

const Filtres2 = () => {
  const [codePostal, setCodePostal] = useState("");
  const [ville, setVille] = useState("");
  const [nom, setNom] = useState("");
  const [activite, setActivite] = useState("");
  const [lieux, setLieux] = useState([]);
  const [loading, setLoading] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isFormVisible, setIsFormVisible] = useState(false);

  const fetchDataRecursively = async (url) => {
    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${apiKey}`,
        },
      });
      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
      }
      const data = await response.json();
      const newData = [...lieux, ...data.results];
      const filteredData = newData.filter(item => ["musée", "lieu de visite", "stade", "club"].includes(item.activite.nom.toLowerCase()));
      setLieux(filteredData);
      if (filteredData.length === 0 && data.next) {
        await fetchDataRecursively(data.next);
      } else {
        setLoading(false);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  };


  useEffect(() => {
    if (formSubmitted) {
      setLoading(true);
      setLieux([]);
      let complementUrl = "";
      if (codePostal !== "") {
        complementUrl += `code_postal=${codePostal}`;
      }
      if (ville !== "") {
        complementUrl += complementUrl === "" ? `commune=${ville}` : `&commune=${ville}`;
      }
      if (activite !== "") {
        complementUrl += complementUrl === "" ? `q=${activite}` : `&q=${activite}`;
      }
      if (nom !== "") {
        complementUrl += complementUrl === "" ? `q=${nom}` : `&q=${nom}`;
      }
      const apiUrl = `https://acceslibre.beta.gouv.fr/api/erps/?${complementUrl}`;
      fetchDataRecursively(apiUrl);
      setFormSubmitted(false);
    }
  }, [formSubmitted]);
  const renderFilteredItems = () => {
    return (
      <ul className="lieux-list">
        {lieux.slice(0, 20).map((lieu) => (
          <li key={lieu.id} style={{ marginBottom: '10px', fontSize: '16px', fontFamily: 'Arial, sans-serif' }}>
            <CardLieu key={lieu.id} url={`lieu.html?url=${lieu.url}`} text={lieu.nom} lieuID={lieu.uuid} />
          </li>
        ))}
      </ul>
    );
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setLieux([]);
    setFormSubmitted(true);
  };


  const toggleFormVisibility = () => {
    setIsFormVisible(!isFormVisible);
  };

  return (
    <div className="container">

      <button className="form-button" onClick={toggleFormVisibility}>
        {isFormVisible ? 'Cacher le formulaire' : 'Afficher le formulaire'}
      </button>

      <div className="form-container" style={{ display: isFormVisible || window.innerWidth > 768 ? 'block' : 'none' }}>

        <form onSubmit={handleSubmit}>
          <input type="text" value={codePostal} onChange={(e) => setCodePostal(e.target.value)} placeholder="Code Postal" />
          <input type="text" value={ville} onChange={(e) => setVille(e.target.value)} placeholder="Ville" />
          <input type="text" value={nom} onChange={(e) => setNom(e.target.value)} placeholder="Nom" />
          <select value={activite} onChange={(e) => setActivite(e.target.value)}>
            <option value="">Sélectionner une activité</option>
            <option value="musée">Musée</option>
            <option value="lieu de visite">Lieu de visite</option>
            <option value="stade">Stade</option>
            <option value="club">Club</option>
          </select>
          <button type="submit">Rechercher</button>
        </form>
      </div>
      <div className="lieux-list-container">
        {renderFilteredItems()}
      </div>
    </div>
  );
};

export default Filtres2;
