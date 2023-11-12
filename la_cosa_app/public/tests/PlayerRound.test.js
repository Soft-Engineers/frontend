import React from 'react';
import { render, screen } from '@testing-library/react';
import PlayerRound from '../../src/components/PlayerRound';
import { useMatchC } from '../../src/screens/Match/matchContext';

// Mock useMatchC
jest.mock('../../src/screens/Match/matchContext', () => ({
    ...jest.requireActual('../../src/screens/Match/matchContext'),
    useMatchC: jest.fn(),
}));

describe('PlayerRound', () => {
    test('renders correct number of PlayerCard', () => {
        // Mock estado jugadores y role
        const mockJugadores = [
            { player_name: 'Player 1', position: 1 },
            { player_name: 'Player 2', position: 2 },
        ];

        // Mock del contexto
        useMatchC.mockImplementation(() => ({
            state: {
                jugadores: mockJugadores,
                posiciones: [],
                role: 'HUMANO', // Asegúrate de que este valor esté definido
                deadPlayerNames: [],
                selectedCard: null,
                avisos:'Es el turno de Player 1',
                isDeadPlayer: false,
                turnState: 2,
                DtimeoutEnded: false,
                isTurn: true,
                Obstacles: [],
                logs: [],
                chatHistory: [],
            },
            // Funciones del contexto...
        }));

        // Renderizar componente
        render(
            <PlayerRound />
        );

        // Verificar que se renderizaron los componentes
        const playerCards = screen.getAllByTestId('player-cards');
        expect(playerCards).toHaveLength(mockJugadores.length);
    });
});
