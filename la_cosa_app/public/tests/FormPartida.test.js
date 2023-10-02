import React from 'react';
import '@testing-library/jest-dom';
import {fireEvent, render, waitFor} from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import FormPartida from './../../src/components/FormPartida';
import axios from "axios";

jest.mock('axios', () => ({
    post: jest.fn(() => Promise.resolve({ data: 'success' })),
}));

describe('FormPartida', () => {
    it('Renderiza sin errores', () => {
        const { getByLabelText, getByPlaceholderText } = render(
            <MemoryRouter initialEntries={['/']}>
                <Routes>
                    <Route path="/" element={<FormPartida />} />
                </Routes>
            </MemoryRouter>
        );

        expect(getByLabelText('Ingrese nombre de la partida')).toBeInTheDocument();
        expect(getByPlaceholderText('Nombre de la partida')).toBeInTheDocument();
        // Add additional assertions for other form elements as needed
    });

    it('Envio exitoso', async () => {

        const localStorageMock = {
            getItem: jest.fn(() => 'Juan'),
        };
        Object.defineProperty(window, 'localStorage', { value: localStorageMock });


        const { getByPlaceholderText, getByText } = render(
            <MemoryRouter initialEntries={['/']}>
                <Routes>
                    <Route path="/" element={<FormPartida />} />
                </Routes>
            </MemoryRouter>
        );

        const nombrePartidaInput = getByPlaceholderText('Nombre de la partida');
        const minJugadoresInput = getByPlaceholderText('Min 4');
        const maxJugadoresInput = getByPlaceholderText('Max 12');
        const createPartidaButton = getByText('Crear partida');

        fireEvent.change(nombrePartidaInput, { target: { value: 'TestPartida' } });
        fireEvent.change(minJugadoresInput, { target: { value: '2' } });
        fireEvent.change(maxJugadoresInput, { target: { value: '4' } });

        fireEvent.click(createPartidaButton);

        await waitFor(() => {
            expect(axios.post).toHaveBeenCalledWith(
                'http://localhost:8000/match/create',
                expect.objectContaining({
                    match_name: 'TestPartida',
                    player_name: 'Juan',
                    min_players: '2',
                    max_players: '4',
                })
                // Checkeo que el post se haga con los argumentos correctos
            );
        });
    });
});
