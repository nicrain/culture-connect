import React from 'react';
import ReactDOM from 'react-dom';
import Navbar from './Components/Navbar/Navbar';
import Lieux from './Components/Recherche/Recherche';
import './index.css';

const Lieu = () => {
    return (
      <div className='container'>
  
        <Navbar />
        <Lieux />
      </div>
    )
  }


export default Lieu
ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <Lieu />
    </React.StrictMode>
);
