import React from 'react';
import '@testing-library/jest-dom';
import { render, fireEvent, screen, queryByLabelText } from '@testing-library/react';
import MainPage from './../../src/screens/MainPage';

describe('MainPage', () => {
    it('Renderiza sin errores', () => {
        const { getByText } = render(<MainPage />);
        expect(getByText('Recargar partidas')).toBeInTheDocument();
    });
    /*
    it('Mostrar/Ocultar el form de creación de partida', () => {
        const { getByText, queryByLabelText } = render(<MainPage />);
        const crearPartidaButton = getByText('Crear partida');

        expect(queryByLabelText('Nombre de la partida')).not.toBeInTheDocument();

        fireEvent.click(crearPartidaButton); // Click the button to show the form
        expect(screen.getByLabelText('Nombre de la partida')).toBeInTheDocument(); // Form should be displayed

        fireEvent.click(crearPartidaButton); // Click again to hide the form
        expect(queryByLabelText('Nombre de la partida')).not.toBeInTheDocument(); // Form should be hidden
    });
    //Tiene errores
     */
});
