import { useEffect, useState, React } from 'react';
import Stack from '@mui/material/Stack';
import Carta from '../../components/Carta';
import { useMatchC } from '../../screens/Match/matchContext.jsx';

const styles = {
    cartaHovered: {
        transform: 'translateY(-1cm)',
        transition: 'transform 0.2s',
    },
};

const PlayersHand = () => {
    const { state, actions } = useMatchC();
    const [hoveredCard, setHoveredCard] = useState(null);

    const handleCardHover = (card) => {
        if (state.selectedCard === null) {
            setHoveredCard(card);
        }
    };

    const handleCardLeave = () => {
        if (state.selectedCard === null) {
            setHoveredCard(null);
        }
    };

    const handleCardClick = (card) => {
        if (card === state.selectedCard) {
            actions.setSelectedCard(null);
            setHoveredCard(null);
        } else {
            actions.setSelectedCard(card);
            setHoveredCard(card);
        }
    };

    useEffect(() => {
        actions.setSelectedCard(null);
        setHoveredCard(null);
    }, [state.currentTurn, state.hand]);

    return (
        <Stack direction="row" spacing={-0.1}>
            {state.hand.map((objCarta, index) => (
                <div
                    key={index}
                    onMouseEnter={() => handleCardHover(objCarta)}
                    onMouseLeave={handleCardLeave}
                    onClick={() => handleCardClick(objCarta)}
                    style={hoveredCard === objCarta ? styles.cartaHovered : {}}
                >
                    <Carta nombre={objCarta.card_name} />
                </div>
            ))}
        </Stack>
    );
};

export default PlayersHand;
