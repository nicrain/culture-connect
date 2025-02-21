import React, { useEffect, useState } from 'react';
import CardLieu from '../CardLieu/CardLieu';

const apiKey = "rdpM6zH4.WAhwx4zoVvrI3ICXwg1eudkxslwVNWI9";
const params = new URLSearchParams(window.location.search);
const name = params.get("nom");

const Filtres2 = () => {
  const [nom, setNom] = useState(name || "");
  const [lieux, setLieux] = useState([]);
  const [loading, setLoading] = useState(false);


  useEffect(() => {
    if (nom) {
      setLoading(true);
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
            setLoading(false); // Stop loading when filtered data is found
          }
        } catch (error) {
          console.error("Error fetching data:", error);
          setLoading(false); // Stop loading if there's an error
        }
      };

      const complementUrl = `q=${nom}`;
      const apiUrl = `https://acceslibre.beta.gouv.fr/api/erps/?${complementUrl}`;
      fetchDataRecursively(apiUrl);
    }
  }, [nom]);

  return (
    <div className="container">
      <h1>Résultat pour votre recherche "{nom}".</h1>
      <div className="lieux-list-container">
        {loading ? (
          <p>Loading...</p>
        ) : (
          <ul className="lieux-list">
            {lieux.slice(0, 20).map((lieu) => (
              <li key={lieu.id} style={{ marginBottom: '10px', fontSize: '16px', fontFamily: 'Arial, sans-serif' }}>
                <CardLieu key={lieu.id} url={`lieu.html?url=${lieu.url}`} text={lieu.nom} lieuID={lieu.uuid} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Filtres2;
