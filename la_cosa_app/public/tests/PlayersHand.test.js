import { render, fireEvent, getAllByAltText } from '@testing-library/react';
import PlayersHand from './../../src/components/PlayersHand';
import { MatchProvider, useMatchC, state, actions } from '../../src/screens/Match/matchContext';
import React from 'react';

jest.mock('../../src/screens/Match/matchContext');

describe('PlayersHand', () => {


    const mockContext = {
        state: {
            //...state,
            currentTurn: 1,
            hand: [{ card_name: 'La Cosa' }, { card_name: 'Sospecha' }, { card_name: 'Sospecha' }, { card_name: 'Sospecha' }],
            selectedCard: null,
        },
        actions: {
            //...actions,
            setSelectedCard: jest.fn(),
        },
    };

    const setMockContext = () => {
        useMatchC.mockReturnValue(mockContext);
    };

    beforeEach(() => {
        setMockContext();
    });



    it('renderiza las cartas de la mano correctamente', () => {

        const { state, actions } = useMatchC();
        // Renderiza el componente
        const { getAllByAltText } = render(
            <MatchProvider>
                <PlayersHand />
            </MatchProvider>
        );
        console.log("hand:", state.hand);
        console.log("deadPlayer:", state.isDeadPlayer);


        // Asegúrate de que las cartas estén presentes en el render
        const carta1 = getByAltText(`Carta La Cosa`);
        //const carta2 = getByAltText(`Carta Sospecha`);
        //const carta3 = getByAltText(`Carta Sospecha`);
        //const carta4 = getByAltText(`Carta Sospecha`);


        expect(carta1).toBeInTheDocument();
        //expect(carta2).toBeInTheDocument();
        //expect(carta3).toBeInTheDocument();
        //expect(carta4).toBeInTheDocument();

    });
});