import { render, fireEvent, getAllByAltText } from '@testing-library/react';
import '@testing-library/jest-dom';
import PlayersHand from './../../src/components/PlayersHand';
import { MatchProvider, useMatchC } from '../../src/screens/Match/matchContext';
import React from 'react';

jest.mock('../../src/screens/Match/matchContext', () => {
    let selectedCard = null;

    const state = {
        hand: [{ card_name: 'La Cosa' }, { card_name: 'Sospecha' }, { card_name: 'Lanzallamas' }, { card_name: 'Hacha' }],
        currentTurn: 1,
        selectedCard: null, // Usa el estado definido
    };

    const actions = {
        setSelectedCard: jest.fn().mockImplementation((card) => { state.selectedCard = card; }),
        setHand: jest.fn(),
        setCurrentTurn: jest.fn(),
    };

    return {
        useMatchC: jest.fn(() => ({ state, actions })),
        MatchProvider: ({ children }) => children,
    };
});

describe('PlayersHand', () => {

    it('renderiza las cartas de la mano correctamente', () => {

        const { getByAltText } = render(
            <MatchProvider>
                <PlayersHand />
            </MatchProvider>
        );

        // Asegúrate de que las cartas estén presentes en el render
        const carta1 = getByAltText(`Carta La Cosa`);
        const carta2 = getByAltText(`Carta Sospecha`);
        const carta3 = getByAltText(`Carta Lanzallamas`);
        const carta4 = getByAltText(`Carta Hacha`);


        expect(carta1).toBeInTheDocument();
        expect(carta2).toBeInTheDocument();
        expect(carta3).toBeInTheDocument();
        expect(carta4).toBeInTheDocument();

    });

    it('selecciona una carta correctamente', () => {
        const { getByAltText } = render(
            <MatchProvider>
                <PlayersHand />
            </MatchProvider>
        );
        const carta1 = getByAltText(`Carta La Cosa`);

        fireEvent.click(carta1);

        //expect(mockContext.actions.setSelectedCard).toHaveBeenCalledWith({ card_name: 'La Cosa' });
        expect(useMatchC().actions.setSelectedCard).toHaveBeenCalledWith({ card_name: 'La Cosa' });
        expect(useMatchC().state.selectedCard).toEqual({ card_name: 'La Cosa' });

        fireEvent.click(carta1);

        expect(useMatchC().actions.setSelectedCard).toHaveBeenCalledWith(null);

    });


});