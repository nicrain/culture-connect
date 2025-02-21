import { default as React, useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import AccessibilityButton from './Components/Accessibilite/btn_access';
import BackToTop from './Components/BackToTop/BackToTop';
import Navbar from './Components/Navbar/Navbar';
import SalonsUsers from './Components/SalonUsers/SalonsUsers';
import back from './assets/back.png';

import './index.css';
const Dys=localStorage.getItem('Dys');
if (Dys=='true') {
  import('./indexDys.css')
      .then(() => console.log('ConnectionNetB.css has been loaded'))
      .catch(error => console.error('Error loading ConnectionNetB.css:', error));
}
let fontSize=localStorage.getItem('FontSize');
document.documentElement.style.fontSize = `${fontSize}%`;
function App() {
  const useMediaQuery = (query) => {
    const [matches, setMatches] = useState(window.matchMedia(query).matches);
  
    useEffect(() => {
        const media = window.matchMedia(query);
  
        const listener = (e) => setMatches(e.matches);
        media.addEventListener('change', listener);
  
        return () => media.removeEventListener('change', listener);
    }, [query]);
  
    return matches;
};
const retourPagePrecedente = () => {
    window.history.back();
  };

const isSmallScreen = useMediaQuery('(max-width: 600px)');
    return (
      <div className="App">
        <Navbar />
        <button onClick={retourPagePrecedente} className='back'>
      <img src={back} alt='retourner en haut de page'  width={15} height={15}/>Retourner à la page précédente
    </button>
        <SalonsUsers />
        <AccessibilityButton />
        <BackToTop />
      </div>
    );
  }

  

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);
