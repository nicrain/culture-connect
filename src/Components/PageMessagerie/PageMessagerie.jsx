import React, { useEffect, useState } from 'react';
import SalonsUsers from '../SalonUsers/SalonsUsers';
import './pageMessagerie.css';

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
        <div className='etablissement'>
            <SalonsUsers />
            {!isSmallScreen && <p className='page'>Selectionner une de vos discussions</p>}
        </div>
    );
}

export default App;
