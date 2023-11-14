import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { useMatchC } from '../../src/screens/Match/matchContext';
import { PlayerCard } from '../../src/components/PlayerRound';

// Mock useMatchC
jest.mock('../../src/screens/Match/matchContext', () => ({
    ...jest.requireActual('../../src/screens/Match/matchContext'),
    useMatchC: jest.fn(),
}));

describe('PlayerCards', () => {
    const mockState = {
        isTurn: true,
        turnState: 2,
        targetDoor: null,
        currentTurn: 'Player 1',
        posiciones: [],
        Obstacles: [],
        role: 'HUMANO',
    };

    const mockActions = {
        setTargetDoor: jest.fn(),
        setTargetName: jest.fn(),
    };

    test('se renderiza correctamente y maneja clics en jugadores', () => {
        const mockPlayer = {
            player_name: 'Player 1',
            // Add other required properties here
        };

        useMatchC.mockImplementation(() => ({
            state: mockState,
            actions: mockActions,
        }));

        const angle = 0;
        const radiusX = 100;
        const radiusY = 100;
        const index = 1;

        // Renderiza el componente
        render(
            <PlayerCard
                player={mockPlayer}
                angle={angle}
                radiusX={radiusX}
                radiusY={radiusY}
                index={index}
            />
        );

        // Simula un clic en el jugador
        const player = screen.getByTestId('player-cards');
        fireEvent.click(player);

        // Verifica si la acción setTargetName fue llamada
        expect(mockActions.setTargetName).toHaveBeenCalledWith('Player 1');

        fireEvent.click(player);

        expect(mockActions.setTargetName).toHaveBeenCalledWith(null);
    });
});
