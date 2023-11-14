import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { useMatchC } from '../../src/screens/Match/matchContext';
import {DoorBtPlayers} from '../../src/components/PlayerRound';

// Mock useMatchC
jest.mock('../../src/screens/Match/matchContext', () => ({
    ...jest.requireActual('../../src/screens/Match/matchContext'),
    useMatchC: jest.fn(),
}));

describe('DoorBtPlayers', () => {
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

    test('se renderiza correctamente y maneja clics en la puerta', () => {
        useMatchC.mockImplementation(() => ({
            state: mockState,
            actions: mockActions,
        }));

        const angle = 0;
        const radiusX = 100;
        const radiusY = 100;
        const index = 1;

        // Renderiza el componente
        render(<DoorBtPlayers angle={angle} radiusX={radiusX} radiusY={radiusY} index={index} />);

        // Simula un clic en la puerta
        const door = screen.getByTestId('door-bt-players');
        fireEvent.click(door);

        // Verifica si la acción setTargetDoor fue llamada
        expect(mockActions.setTargetDoor).toHaveBeenCalledWith(index.toString());
        // Verifica que si vuelvo a clickear la puerta, la acción setTargetDoor se llama con null
        fireEvent.click(door);

        expect(mockActions.setTargetDoor).toHaveBeenCalledWith(null);
    });
});