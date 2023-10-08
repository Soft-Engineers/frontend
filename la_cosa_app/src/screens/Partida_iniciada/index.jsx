import React from 'react';
import Carta from '../../components/Carta'
import Mano from '../../components/Mano'

const Partida_iniciada = () => {
    const cartasEnMano = [1, 1, 1, 1];
    return (
        <div>
            <Mano cartas={cartasEnMano} />
        </div>
    );
};
// 
export default Partida_iniciada;