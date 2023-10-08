import React, { useState } from 'react';
import Stack from '@mui/material/Stack';
import Carta from '../../components/Carta';

// Regular Button
const Mano = ({ cartas }) => {
    const [hoveredCard, setHoveredCard] = useState(null);

    const manoStyles = {
        display: 'flex',
        justifyContent: 'center',
    };

    const handleCardHover = (index) => {
        setHoveredCard(index);
    };

    const handleCardLeave = () => {
        setHoveredCard(null);
    };

    return (
        <Stack direction="row" spacing={2} style={manoStyles}>
            {cartas.map((idCarta, index) => (
                <div
                    key={index}
                    onMouseEnter={() => handleCardHover(index)}
                    onMouseLeave={handleCardLeave}
                    style={{
                        transform: hoveredCard === index ? 'translateY(-1cm)' : 'none',
                        transition: 'transform 0.2s',
                    }}
                >
                    <Carta id={idCarta} />
                </div>
            ))}
        </Stack>
    );
}

export default Mano;