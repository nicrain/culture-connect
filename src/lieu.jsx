import React from 'react';
import ReactDOM from 'react-dom';
import AccessibilityButton from './Components/Accessibilite/btn_access';
import BackToTop from './Components/BackToTop/BackToTop';
import Lieux from './Components/Lieux/Lieux';
import Navbar from './Components/Navbar/Navbar';
import './index.css';

const Lieu = () => {
    return (
      <div className='container'>
  
        <Navbar />
        <Lieux />
        <AccessibilityButton />
        <BackToTop />
      </div>
    )
  }


export default Lieu
ReactDOM.createRoot(document.getElementById('root')).render( // Rendre l'application ici
    <React.StrictMode>
        <Lieu />
    </React.StrictMode>
);
