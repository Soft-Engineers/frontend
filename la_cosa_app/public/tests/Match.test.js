import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import Match from '../../src/screens/Match/index.jsx';
import { MatchProvider } from '../../src/screens/Match/matchContext';
import PlayersHand from '../../src/components/PlayersHand/index.jsx';

jest.mock('../../src/screens/Match/matchContext', () => {
    const originalModule = jest.requireActual('../../src/screens/Match/matchContext');
    const mockState = {
        jugadores: [{ player_name: 'Raul' }, { player_name: 'Javier' }, { player_name: 'Player3' }, { player_name: 'Ramon' }],
        currentTurn: 'Ramon',
        hand: [{ card_name: 'La Cosa' }, { card_name: 'Sospecha' }, { card_name: 'Lanzallamas' }, { card_name: 'Hacha' }],
        role: 'HUMANO',
        deadPlayerNames: '',
        selectedCard: null,
        avisos: 'Es el turno de Raul',
    };

    const mockActions = {
        setCurrentTurn: jest.fn(),
        setSelectedCard: jest.fn(),
        setHand: jest.fn(),
        setSocket: jest.fn(),
    };

    return {
        ...originalModule,
        useMatchC: jest.fn(() => ({
            state: mockState,
            actions: mockActions,
        })),
    };
});


describe('Match', () => {
    it('debería renderizar el componente correctamente', () => {
        sessionStorage.setItem('player_name', 'Ramon');
        const { getByTestId } = render(
            <MatchProvider>
                <Match />
            </MatchProvider>
        );
        const PlayersHand = getByTestId("playersHand");
        const PlayersRound = getByTestId("playersRound");
        const Notifications = getByTestId("notifications")
        expect(PlayersHand).toBeInTheDocument();
        expect(PlayersRound).toBeInTheDocument();
        expect(Notifications).toBeInTheDocument();
    });

    // Agrega más pruebas según sea necesario
});