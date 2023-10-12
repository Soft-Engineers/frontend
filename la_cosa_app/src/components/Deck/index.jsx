import React from 'react';
import rev from '../../assets/cartas_recortadas/rev.png';

const styles = {
    deck: {
        width: '150px',
        height: '100px',
        cursor: 'pointer',
    },
};

const Deck = ({ onDrawCard }) => {
    const handleDeckClick = () => {
        onDrawCard();
    };

    return (
        <img
            src={rev}
            alt="Card Back"
            style={styles.deck}
            onClick={handleDeckClick}
        />
    );
};

export default Deck;