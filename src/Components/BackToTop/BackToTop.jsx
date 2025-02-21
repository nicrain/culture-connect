import React, { useEffect, useState } from 'react';
import fleche from '../../assets/fleche.png';
import './BackToTop.css';
const NetB = localStorage.getItem('NetB');
console.log("salut" + NetB);
if (NetB == 'true') {
  import('./BackToTopNetB.css')
    .then(() => console.log('Acceuil1NetB.css has been loaded'))
    .catch(error => console.error('Error loading Acceuil1NetB.css:', error));
}
const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Fonction qui vérifie si le bouton doit être visible en fonction de la position de défilement
  const toggleVisibility = () => {
    if (window.scrollY > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  // Ajoute un écouteur d'événements pour détecter le défilement de la page
  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);
    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  // Fonction pour faire défiler vers le haut de la page
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <div className="scroll-to-top">
      {isVisible && (
        <button onClick={scrollToTop} className="scroll-to-top-button">
          <img src={fleche} alt='retourner en haut de page' className='fleche' width={65} height={65} />
        </button>
      )}
    </div>
  );
};

export default ScrollToTopButton;
