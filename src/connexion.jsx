import React from 'react';
import { createRoot } from 'react-dom/client'; // 导入 createRoot
import AccessibilityButton from './Components/Accessibilite/btn_access';
import BackToTop from './Components/BackToTop/BackToTop';
import Connection from './Components/Connection/Connection'; // Importer l'élément BoutonFiltre correctement
import Navbar from './Components/Navbar/Navbar';
import './index.css';

const Dys = localStorage.getItem('Dys');

if (Dys == 'true') {
  import('./indexDys.css')
    .then(() => console.log('ConnectionNetB.css has been loaded'))
    .catch(error => console.error('Error loading ConnectionNetB.css:', error));
}

const Titre = localStorage.getItem('Titre');

if (Titre == 'true') {
  import('./indexTitre.css')
    .then(() => console.log('ConnectionTitre.css has been loaded'))
    .catch(error => console.error('Error loading ConnectionNetB.css:', error));
}

const FontSize = localStorage.getItem('FontSize');
document.documentElement.style.fontSize = `${FontSize}%`;

const Connexion = () => {
  return (
    <div className='container'>
      <Navbar />
      <Connection />
      <AccessibilityButton />
      <BackToTop />
    </div>
  );
};

// 使用 createRoot 渲染应用
const root = createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Connexion />
  </React.StrictMode>
);

export default Connexion;

/*
import React from 'react';
import ReactDOM from 'react-dom';
import AccessibilityButton from './Components/Accessibilite/btn_access';
import BackToTop from './Components/BackToTop/BackToTop';
import Connection from './Components/Connection/Connection'; // Importer l'élément BoutonFiltre correctement
import Navbar from './Components/Navbar/Navbar';
import './index.css';
const Dys = localStorage.getItem('Dys');

if (Dys == 'true') {
  import('./indexDys.css')
    .then(() => console.log('ConnectionNetB.css has been loaded'))
    .catch(error => console.error('Error loading ConnectionNetB.css:', error));
}
const Titre = localStorage.getItem('Titre');

if (Titre == 'true') {
  import('./indexTitre.css')
    .then(() => console.log('ConnectionTitre.css has been loaded'))
    .catch(error => console.error('Error loading ConnectionNetB.css:', error));
}
const FontSize = localStorage.getItem('FontSize');
document.documentElement.style.fontSize = `${FontSize}%`;
const Connexion = () => {
  return (
    <div className='container'>

      <Navbar />
      <Connection />
      <AccessibilityButton />
      <BackToTop />
    </div>
  )
}


export default Connexion
ReactDOM.render(
  <React.StrictMode>
    <Connexion />
  </React.StrictMode>,
  document.getElementById('root')
);
*/