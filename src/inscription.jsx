import React from 'react';
import ReactDOM from 'react-dom';
import AccessibilityButton from './Components/Accessibilite/btn_access';
import BackToTop from './Components/BackToTop/BackToTop';
import Inscription from "./Components/Inscription/inscription.jsx"; // Chemin vers votre composant Inscription
import Navbar from './Components/Navbar/Navbar';
import './index.css';
const Dys=localStorage.getItem('Dys');
if (Dys=='true') {
  import('./indexDys.css')
      .then(() => console.log('ConnectionNetB.css has been loaded'))
      .catch(error => console.error('Error loading ConnectionNetB.css:', error));
}
let fontSize=localStorage.getItem('FontSize');
document.documentElement.style.fontSize = `${fontSize}%`;
const App = () => {
  return (
    <div className='container'>
      <Navbar />
      <Inscription />
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
