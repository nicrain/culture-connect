// authUtils.js

// Fonction pour définir l'état de connexion de l'utilisateur dans le stockage local
export const setLoggedInStatus = (isLoggedIn) => {
    localStorage.setItem('isLoggedIn', isLoggedIn);
  };
  
  // Fonction pour obtenir l'état de connexion de l'utilisateur depuis le stockage local
  export const getLoggedInStatus = () => {
    return localStorage.getItem('isLoggedIn') === 'true';
  };

  
  