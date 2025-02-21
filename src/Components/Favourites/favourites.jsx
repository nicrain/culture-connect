import React, { useState, useEffect } from 'react';
import { getDatabase, ref, get } from 'https://www.gstatic.com/firebasejs/9.6.3/firebase-database.js';
import { getAuth, onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/9.6.3/firebase-auth.js';
import { auth, database } from '../ChatRoom/firebase'; // Ensure this file initializes Firebase correctly
import CardLieu from '../CardLieu/CardLieu';

const Favourites = () => {
  const [favourites, setFavourites] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        const fetchUserFavourites = async () => {
          const userId = user.uid;
          const userFavouritesRef = ref(database, `users/${userId}/favoris`);
          try {
            const snapshot = await get(userFavouritesRef);
            const userFavourites = snapshot.val();

            if (userFavourites) {
              const favouriteList = Object.keys(userFavourites).map((key) => ({
                uuid: key,
                nom: userFavourites[key].nom,
                url: userFavourites[key].url,
              }));

              setFavourites(favouriteList);
            } else {
              setFavourites([]);
            }
          } catch (error) {
            setError(error.message);
          }
        };

        fetchUserFavourites();
      }
    });

    return () => unsubscribe(); // Cleanup function
  }, []); // Run once when component mounts

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h2>Mes favoris</h2>
      <ul>
        {favourites.map((favourite) => (
          <li key={favourite.uuid}>
                  <CardLieu key={favourite.uuid} url={`lieu.html?url=${favourite.url}`} text={favourite.nom} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Favourites;