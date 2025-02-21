import { default as React, useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import AccessibilityButton from './Components/Accessibilite/btn_access';
import BackToTop from './Components/BackToTop/BackToTop';
import ChatRoom from "./Components/ChatRoom/ChatRoom"; // Chemin vers votre composant Inscription
import ListChatrooms from './Components/ListChatRooms/ListChatRooms';
import Navbar from './Components/Navbar/Navbar';
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

const isSmallScreen = useMediaQuery('(max-width: 600px)');
    return (
      <div className="App">
        <Navbar />
        {!isSmallScreen && <ListChatrooms />}
        <ChatRoom />
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
