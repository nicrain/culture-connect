
import logo from "../../assets/192.png";
import "./Acceuil1.css";

import BrickLayout from "../BrickLayout/BrickLayout";

const NetB = localStorage.getItem('NetB');
console.log("salut" + NetB);
if (NetB == 'true') {
  import('./Acceuil1NetB.css')
    .then(() => console.log('Acceuil1NetB.css has been loaded'))
    .catch(error => console.error('Error loading Acceuil1NetB.css:', error));
}

const Acceuil1 = () => {
  return (
    <header className='styles.header flex justify-content-center'>

      <div className="blur-circle-shape"></div>

      <BrickLayout texte="Trouvez votre prochaine idée de sortie" />

      <div className="headings-header flex justify-content-center flex-column">

        <h1 className="heading-header-second-title">
          Bienvenue sur culture Connect !
        </h1>
        <h2 className="heading-header-title">L'application qui rend la culture accessible. </h2>
        <p className="p">Bienvenue dans notre application dédiée à rendre la culture plus accessible que jamais ! Découvrez un univers foisonnant de structures et d'événements soigneusement sélectionnés pour répondre à tous les goûts et toutes les envies. Que vous soyez passionné d'art, d'histoire, de musique ou de théâtre, nous avons ce qu'il vous faut. </p>
        <img src={logo} alt="" className="logo1" />
      </div>

    </header>
  )
}

export default Acceuil1