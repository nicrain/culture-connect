import React from 'react';
//import ReactDOM from 'react-dom';
import { createRoot } from 'react-dom/client';
import AccessibilityButton from './Components/Accessibilite/btn_access.jsx';
import BackToTop from './Components/BackToTop/BackToTop.jsx';
import Filtres2 from './Components/Filtres2/Filtres2.jsx';
import Navbar from './Components/Navbar/Navbar.jsx';
import './index.css';
const Dys=localStorage.getItem('Dys');
console.log("salut"+Dys);
if (Dys=='true') {
  import('./indexDys.css')
      .then(() => console.log('ConnectionNetB.css has been loaded'))
      .catch(error => console.error('Error loading ConnectionNetB.css:', error));
}
let fontSize=localStorage.getItem('FontSize');
document.documentElement.style.fontSize = `${fontSize}%`;
const Visiter = () => {
    return (
        <div className='container'>
            <Navbar />
            <h1>Trouvez un établissement grace à nos filtres </h1><br/>
            <Filtres2 /> {/* Utiliser BoutonFiltre ici */}
            <AccessibilityButton />
            <BackToTop />
        </div>
    );
};

const root = createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Visiter />
  </React.StrictMode>
);
/*
ReactDOM.createRoot(document.getElementById('root')).render( // Rendre l'application ici
    <React.StrictMode>
        
        <Visiter />
    </React.StrictMode>
);
*/