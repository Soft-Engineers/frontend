import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import Match from '../../src/screens/Match/index.jsx';
import React from 'react';
import { useMatchC } from '../../src/screens/Match/matchContext';

function setupMockedContext(state = {}, actions = {}) {
    useMatchC.mockReturnValue({ state: { jugadores: [], ...state }, actions });
}


jest.mock('../../src/screens/Match/matchContext', () => {
    return {
        useMatchC: jest.fn(() => ({ state: { is_dead: true }, actions: {} }))
    };
});

describe('Match', () => {
    it('Renderiza pantalla de un muerto correctamente', () => {
        setupMockedContext({ jugadores: [{ player_name: 'Player 1' }, { player_name: 'Player 2' }] });
        // Renderiza el componente y captura su salida
        const { getByText } = render(
            <MemoryRouter initialEntries={['/']}>
                <Routes>
                    <Route path="/" element={<Match />} />
                </Routes>
            </MemoryRouter>
        );

        expect(getByText('Has muerto...')).toBeInTheDocument(); // Verifica que se muestre el mensaje de muerte
        // Expectativas adicionales según tu componente
    });
});