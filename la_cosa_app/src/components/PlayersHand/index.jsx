import { useState } from 'react';
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
        if (index === selectedCard){
            setSelectedCard(null);
            setHoveredCard(null);
        } else {
        setSelectedCard(index);
        setHoveredCard(index);
        onSelectCard(index);
        }
    };

    return (
        <Stack direction="row" spacing={-10} style={styles.mano}>
            {cartas.map((nombreCarta, index) => (
                <div
                    key={index}
                    onMouseEnter={() => handleCardHover(index)}
                    onMouseLeave={handleCardLeave}
                    onClick={() => handleCardClick(index)}
                    style={hoveredCard === index ? styles.cartaHovered : {}}
                >
                    <Carta nombre={nombreCarta} />
                </div>
            ))}
        </Stack>
    );
};


export default PlayersHand;
