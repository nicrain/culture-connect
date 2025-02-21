import React, { useState } from 'react';
import logo from '../../assets/192.png';
import loupe from '../../assets/loupe.png';
import { getLoggedInStatus, setLoggedInStatus } from '../../authUtils';
import { is_pro, setUserData } from '../../userdata';
import './Navbar.css';
const apiKey = "rdpM6zH4.WAhwx4zoVvrI3ICXwg1eudkxslwVNWI9";
const NetB = localStorage.getItem('NetB');
if (NetB == 'true') {
    import('./NavbarNetB.css')
        .then(() => console.log('ConnectionNetB.css has been loaded'))
        .catch(error => console.error('Error loading ConnectionNetB.css:', error));
}

const signOut = async () => {
    setLoggedInStatus(false);
    var nom = null;
    var last_name = null;
    var is_pro = null;
    var etablissement = null;
    setUserData(nom, last_name, is_pro, etablissement);
    setTimeout(() => {
        window.location.href = 'index.html';
    }, 2000); // Mettre à jour l'état de connexion de l'utilisateur
};

const Navbar = () => {
    const [nom, setNom] = useState("");
    const [formSubmitted, setFormSubmitted] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const isUserLoggedIn = getLoggedInStatus(); // Correction ici
    const isPro = is_pro();

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
        navbar(); // Appel de la fonction navbar() lorsque le menu est ouvert ou fermé
    };
    const generateLinkWithParam = () => {
        return `./recherche.html?nom=${nom}`;
    };




    return (
        <div className={menuOpen ? 'navbarresponsive' : 'navbar'} id='myTopnav'>
            <img src={logo} alt='logo' className='logo' />

            <ul>
                <li><a className="a-navbar" href='index.html'>Acceuil</a></li>
                <li><a className="a-navbar" href='visiter.html'>Visiter</a></li>
                <li><a className="a-navbar" href='whoweare.html'>A propos</a></li>
            </ul>
            <div className='search-box'>

                <input type="text" value={nom} onChange={(e) => setNom(e.target.value)} placeholder='Search' />
                <a href={generateLinkWithParam()} ><img src={loupe} alt="valider la recherche" className='loupe' /></a>

            </div>
            {isUserLoggedIn ? (
                isPro ? (
                    <div className="dropdown">
                        <button className="dropbtn">Mon Compte</button>
                        <div className="dropdown-content">
                            <a className="a-navbar" href="etablissement.html">Mon etablissement</a>
                            <a className="a-navbar" href="evenement.html">Mes évènements</a>
                            <a className="a-navbar" href="#">Parametre</a>
                            <a className="a-navbar" href="#" onClick={signOut}>Déconnexion</a>
                        </div>
                    </div>
                ) : (
                    <div className="dropdown">
                        <button className="dropbtn">Mon Compte</button>
                        <div className="dropdown-content">
                            <a className="a-navbar" href="messagerie1.html">Messagerie</a>
                            <a className="a-navbar" href="favoris.html">Favoris</a>
                            <a className="a-navbar" href="setting.html">Parametre</a>
                            <a className="a-navbar" href="#" onClick={signOut}>Déconnexion</a>
                        </div>
                    </div>
                )
            ) : (
                <ul>
                    <li className="connection">
                        <a className="a-navbar-co" href="connexion.html">Se connecter</a>
                    </li>
                </ul>
            )}
            <a href="#" className="icon" onClick={toggleMenu}>
                <div className='menu-icon'>
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </a>
        </div>
    );
}

export default Navbar;
