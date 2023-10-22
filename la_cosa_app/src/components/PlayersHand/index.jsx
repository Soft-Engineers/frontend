import { useEffect, useState, React } from 'react';
import Stack from '@mui/material/Stack';
import Carta from '../../components/Carta';
import { useMatchC } from '../../screens/Match/matchContext.jsx';

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

const PlayersHand = () => {
    const { state, actions } = useMatchC();
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
        if (index === selectedCard) {
            setSelectedCard(null);
            setHoveredCard(null);
            actions.setSelectedCard(null);
        } else {
            setSelectedCard(index);
            setHoveredCard(index);
            actions.setSelectedCard(state.hand[index]);
        }
    };

    useEffect(() => {
        setSelectedCard(null);
        actions.setSelectedCard(null);
        setHoveredCard(null);

    }, [state.currentTurn]);

    return (
        <Stack direction="row" spacing={0} style={styles.mano}>
            {state.hand.map((objCarta, index) => (
                <div
                    key={index}
                    onMouseEnter={() => handleCardHover(index)}
                    onMouseLeave={handleCardLeave}
                    onClick={() => handleCardClick(index)}
                    style={hoveredCard === index ? styles.cartaHovered : {}}
                >
                    <Carta nombre={objCarta.card_name} />
                </div>
            ))}
        </Stack>
    );
};

export default PlayersHand;
