import React, { useEffect, useState } from 'react';
import './LineHeightAdjuster.css';

const LineHeightAdjuster = () => {
    const initialLineHeight = parseFloat(localStorage.getItem('LineHeight')) || 1.6; // Interligne initiale en valeur numérique
    const [lineHeight, setLineHeight] = useState(initialLineHeight);

    useEffect(() => {
        localStorage.setItem('LineHeight', lineHeight);
        document.documentElement.style.lineHeight = lineHeight;
    }, [lineHeight]);

    const increaseLineHeight = () => {
        setLineHeight(prevLineHeight => prevLineHeight + 0.1);
    };

    const decreaseLineHeight = () => {
        setLineHeight(prevLineHeight => Math.max(0.5, prevLineHeight - 0.1)); // Éviter des interlignes trop petites
    };

    return (
        <div className="line-height-adjuster">
            <p>Interligne</p>
            <div className="control-panel">
                <button onClick={decreaseLineHeight} className="control-button">−</button>
                <span className="line-height-display">{(lineHeight * 100).toFixed(0)}%</span>
                <button onClick={increaseLineHeight} className="control-button">+</button>
            </div>
        </div>
    );
};

export default LineHeightAdjuster;
