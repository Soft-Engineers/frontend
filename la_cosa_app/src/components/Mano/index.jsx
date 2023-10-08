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

const Mano = ({ cartas }) => {
    const [hoveredCard, setHoveredCard] = useState(null);

    const handleCardHover = (index) => {
        setHoveredCard(index);
    };

    const handleCardLeave = () => {
        setHoveredCard(null);
    };

    return (
        <Stack direction="row" spacing={2} style={styles.mano}>
            {cartas.map((idCarta, index) => (
                <div
                    key={index}
                    onMouseEnter={() => handleCardHover(index)}
                    onMouseLeave={handleCardLeave}
                    style={hoveredCard === index ? styles.cartaHovered : {}}
                >
                    <Carta id={idCarta} />
                </div>
            ))}
        </Stack>
    );
};

export default Mano;
