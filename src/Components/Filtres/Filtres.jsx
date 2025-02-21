import React, { useState } from 'react';
import CardLieu from '../CardLieu/CardLieu';

const apiKey = "rdpM6zH4.WAhwx4zoVvrI3ICXwg1eudkxslwVNWI9";

const Filtres = () => {
  const [codePostal, setCodePostal] = useState("");
  const [ville, setVille] = useState("");
  const [nom, setNom] = useState("");
  const [activite, setActivite] = useState("");
  const [lieux, setLieux] = useState([]);
  const handleSubmit = (e) => {
    e.preventDefault();
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


    fetch(apiUrl, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${apiKey}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`API request failed with status ${response.status}`);
        }
        return response.json();
      })
      .then((dataArray) => {
        const filteredData = dataArray.results.filter(item => ["musée", "lieu de visite", "stade", "club"].includes(item.activite.nom.toLowerCase()));
        setLieux(filteredData);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  const handleNextClick = (e) => {
    e.preventDefault();
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="code_postal">Code Postal:</label>
        <input
          type="text"
          id="code_postal"
          value={codePostal}
          onChange={(e) => setCodePostal(e.target.value)}
        />
        <label htmlFor="ville">Ville:</label>
        <input
          type="text"
          id="ville"
          value={ville}
          onChange={(e) => setVille(e.target.value)}
        />
        <label htmlFor="nom">Nom:</label>
        <input
          type="text"
          id="nom"
          value={nom}
          onChange={(e) => setNom(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
      <button id="next" onClick={handleNextClick}>Next</button>

      <ul className="lieux-list">
        {lieux.map((lieu) => (
          <li key={lieu.id} style={{ marginBottom: '10px', fontSize: '16px', fontFamily: 'Arial, sans-serif' }}>
            <CardLieu url={`lieu.html?url=${lieu.url}`} text={lieu.nom} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Filtres;