import React, { useEffect, useState } from 'react';
import './FontSizeAdjusted.css';

const FontSizeAdjuster = () => {
    const initialFontSize = parseInt(localStorage.getItem('FontSize'), 10) || 100; // Taille de police initiale en pourcentage
    const [fontSize, setFontSize] = useState(initialFontSize);

    useEffect(() => {
        localStorage.setItem('FontSize', fontSize);
        document.documentElement.style.fontSize = `${fontSize}%`;
    }, [fontSize]);

    const increaseFontSize = () => {
        setFontSize(prevSize => prevSize + 5);
    };

    const decreaseFontSize = () => {
        setFontSize(prevSize => prevSize - 5); // Permettre une taille de police négative
    };

    return (
        <div className="font-size-adjuster">
            <p>Taille de la police</p>
            <div className="control-panel">
                <button onClick={decreaseFontSize} className="control-button">−</button>
                <span className="font-size-display">{fontSize}%</span>
                <button onClick={increaseFontSize} className="control-button">+</button>
            </div>
        </div>
    );
};

export default FontSizeAdjuster;
