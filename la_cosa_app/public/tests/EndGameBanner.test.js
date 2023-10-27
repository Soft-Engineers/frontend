import React from 'react';
import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';

import { MemoryRouter, useNavigate } from 'react-router-dom';


jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: jest.fn(), // Mock de useNavigate
}));


import EndGameBanner from '../../src/components/EndGameBanner';
describe('EndGameBanner', () => {
    it('renderiza sin errores', () => {
        render(<MemoryRouter>
            <EndGameBanner winners={['Player1', 'Player2']} reason="La cosa ha muerto" />
        </MemoryRouter>);

        expect(screen.getByText('¡Fin de partida!')).toBeInTheDocument();
        expect(screen.getByText('Ganadores:')).toBeInTheDocument();
        expect(screen.getByText('Player1')).toBeInTheDocument();
        expect(screen.getByText('Player2')).toBeInTheDocument();
        expect(screen.getByText('La cosa ha muerto')).toBeInTheDocument();
    });
    it('boton volver al inicio funciona y renderiza correctamente', () => {

        const navigateMock = jest.fn();
        useNavigate.mockReturnValue(navigateMock);
        sessionStorage.setItem('player_name', 'Player1');

        render(
            <MemoryRouter>
                <EndGameBanner winners={['Player1', 'Player2']} reason="La cosa ha muerto" />
            </MemoryRouter>
        );

        const backButton = screen.getByText('Volver a inicio');
        fireEvent.click(backButton);

        expect(navigateMock).toHaveBeenCalledWith(`/mainpage/Player1`);
    });
});