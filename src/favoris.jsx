import React from 'react';
import ReactDOM from 'react-dom';
import Navbar from './Components/Navbar/Navbar';
import './index.css';
import Favourites from './Components/Favourites/favourites';

const Favoris = () => {
    return (
      <div className='container'>
        <Navbar />
        <Favourites />
      </div>
    )
  }


export default Favoris
ReactDOM.createRoot(document.getElementById('root')).render( // Rendre l'application ici
    <React.StrictMode>
        <Favoris />
    </React.StrictMode>
);