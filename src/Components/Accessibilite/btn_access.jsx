import React, { useState } from 'react';
import Modal from 'react-modal';
import access from '../../assets/access.png';
import FontSizeAdjuster from './FontSizeAdjusted';
import LineHeightAdjuster from './LineHeightAdjuster';
import './btn_access.css';

// Bind Modal to your appElement (https://reactcommunity.org/react-modal/accessibility/)
Modal.setAppElement('#root');
const NetB = localStorage.getItem('NetB');
console.log("salut" + NetB);
if (NetB == 'true') {
    import('./accessNetB.css')
        .then(() => console.log('Acceuil1NetB.css has been loaded'))
        .catch(error => console.error('Error loading Acceuil1NetB.css:', error));
}

const AccessibilityButton = () => {
    //localStorage.setItem('NetB', 'false'); // Stocker en tant que chaîne de caractères
    const [isOpenAccessibility, setIsOpenAccessibility] = useState(false);


    const toggleAccessibility = () => {
        setIsOpenAccessibility(!isOpenAccessibility);
    };

    const set_NetB = () => {
        let is_NetB = get_NetB();
        console.log("Valeur actuelle de 'NetB' avant la mise à jour : " + localStorage.getItem('NetB'));
        console.log("Valeur actuelle de 'is_NetB' avant la mise à jour : " + is_NetB);

        // Inverser la valeur de 'NetB' dans le localStorage
        localStorage.setItem('NetB', !is_NetB);// Inverser la valeur
        console.log("Nouvelle valeur de 'NetB' après la mise à jour : " + localStorage.getItem('NetB'));
        window.location.reload();
    }

    const get_NetB = () => {
        return localStorage.getItem('NetB') === 'true'; // Convertir en booléen
    }

    const checked_NetB = () => {
        if (localStorage.getItem('NetB') == 'true') {
            return true;
        }
        else {
            return false;
        }
    }

    const checkedValueNetB = checked_NetB(); // Récupérer la valeur de checked_NetB

    const set_Dys = () => {
        let is_Dys = get_Dys();


        // Inverser la valeur de 'NetB' dans le localStorage
        localStorage.setItem('Dys', !is_Dys);// Inverser la valeur
        console.log("Nouvelle valeur de 'NetB' après la mise à jour : " + localStorage.getItem('Dys'));
        window.location.reload();
    }

    const get_Dys = () => {
        return localStorage.getItem('Dys') === 'true'; // Convertir en booléen
    }

    const checked_Dys = () => {
        if (localStorage.getItem('Dys') == 'true') {
            return true;
        }
        else {
            return false;
        }
    }

    const checkedValueDys = checked_Dys();

    const set_Titre = () => {
        let is_Titre = get_Titre();


        // Inverser la valeur de 'NetB' dans le localStorage
        localStorage.setItem('Titre', !is_Titre);// Inverser la valeur
        window.location.reload();
    }

    const get_Titre = () => {
        return localStorage.getItem('Titre') === 'true'; // Convertir en booléen
    }
    const ReturnNormal = () => {
        localStorage.setItem('Titre', false);
        localStorage.setItem('NetB', false);
        localStorage.setItem('Dys', false);
        localStorage.setItem('FontSize', null);
        localStorage.setItem('LineHeight', 0);
        window.location.reload();


    }

    const checked_Titre = () => {
        if (localStorage.getItem('Titre') == 'true') {
            return true;
        }
        else {
            return false;
        }
    }

    const checkedValueTitre = checked_Titre();
    return (
        <div>
            <button className="accessibility-button" onClick={toggleAccessibility}>
                <img src={access} alt="bouton pour modifier les paramétre d'accessibilité" width={65} height={65} />
            </button>
            <Modal
                isOpen={isOpenAccessibility}
                onRequestClose={toggleAccessibility}
                contentLabel="Accessibility Options"
                className="modal"
                overlayClassName="overlay"
            >
                <h2>Accessibilité</h2>

                <label className="switch">

                    <input type="checkbox" checked={checkedValueNetB} onChange={set_NetB} />
                    <span className="slider round"></span>
                    <p>Mettre le site en noir et blanc </p>
                </label>


                <label className="switch">

                    <input type="checkbox" checked={checkedValueDys} onChange={set_Dys} />
                    <span className="slider round"></span>
                    <p>Mettre la police adapté pour la dyslexie </p>
                </label>


                <label className="switch">

                    <input type="checkbox" checked={checkedValueTitre} onChange={set_Titre} />
                    <span className="slider round"></span>
                    <p>Mettre les titres en surbrillance </p>
                </label>

                <FontSizeAdjuster />
                <LineHeightAdjuster />
                <button className="btn-access" onClick={ReturnNormal}>Réinitialiser les paramètres</button>
                <button className="btn-access" onClick={toggleAccessibility}>Fermer</button>
            </Modal>
        </div>
    );
};

export default AccessibilityButton;
