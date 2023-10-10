import React, { useState } from 'react';
import Stack from '@mui/material/Stack';
import Carta from '../../components/Carta';


const styles = {
    mano: {
        display: 'flex',
        justifyContent: 'center',
    },
    cartaHovered: {
        transform: 'translateY(-1cm)',
        transition: 'transform 0.2s',
    },
};

const PlayersHand = ({ cartas, onSelectCard }) => {
    const [hoveredCard, setHoveredCard] = useState(null);
    const [selectedCard, setSelectedCard] = useState(null);

    const handleCardHover = (index) => {
        if (selectedCard === null) {
            setHoveredCard(index);
        }
    };

    const handleCardLeave = () => {
        if (selectedCard === null) {
            setHoveredCard(null);
        }
    };

    const handleCardClick = (index) => {
        setSelectedCard(index);
        setHoveredCard(index); // Set hoveredCard to selectedCard when a card is clicked
        onSelectCard(index);
    };

    return (
        <Stack direction="row" spacing={-10} style={styles.mano}>
            {cartas.map((idCarta, index) => (
                <div
                    key={index}
                    onMouseEnter={() => handleCardHover(index)}
                    onMouseLeave={handleCardLeave}
                    onClick={() => handleCardClick(index)}
                    style={hoveredCard === index ? styles.cartaHovered : {}}
                >
                    <Carta id={idCarta} />
                </div>
            ))}
        </Stack>
    );
};


export default PlayersHand;
