import React from 'react';
import backImage from '../../assets/cartas_recortadas/back.png';

const styles = {
    deck: {
        width: '100px',
        height: '150px',
        cursor: 'pointer',
    },
};

const Deck = ({ onDrawCard }) => {
    const handleDeckClick = () => {
        onDrawCard();
    };

    return (
        <img
            src={backImage}
            alt="Card Back"
            style={styles.deck}
            onClick={handleDeckClick}
        />
    );
};

export default Deck;