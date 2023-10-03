import React from 'react';
import '@testing-library/jest-dom';
import {fireEvent, render, waitFor} from '@testing-library/react';
import {MemoryRouter, Routes, Route, useNavigate} from 'react-router-dom';
import FormPartida from './../../src/components/FormPartida';
import axios from "axios";
import Main from "../../src/screens/MainPage/index.jsx";
import Lobby from "../../src/screens/Lobby/index.jsx";

jest.mock('axios');
beforeEach(() => {
    jest.clearAllMocks();
});

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: jest.fn(), // Mock de useNavigate
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
    });

    it('Envio exitoso', async () => {

        axios.post.mockResolvedValueOnce({
            status: 201,
            data: 'success',
        });

        const navigateMock = jest.fn();
        useNavigate.mockReturnValue(navigateMock);

        const localStorageMock = {
            getItem: jest.fn(() => 'Juan'),
        };
        Object.defineProperty(window, 'localStorage', { value: localStorageMock });


        const { getByPlaceholderText, getByText } = render(
            <MemoryRouter initialEntries={['/']}>
                <Routes>
                    <Route path="/" element={<FormPartida />} />
                    <Route path="/lobby" element={<Lobby />} />
                </Routes>
            </MemoryRouter>
        );

        const nombrePartidaInput = getByPlaceholderText('Nombre de la partida');
        const minJugadoresInput = getByPlaceholderText('Min 4');
        const maxJugadoresInput = getByPlaceholderText('Max 12');
        const createPartidaButton = getByText('Crear partida');

        fireEvent.change(nombrePartidaInput, { target: { value: 'TestPartida' } });
        fireEvent.change(minJugadoresInput, { target: { value: '4' } });
        fireEvent.change(maxJugadoresInput, { target: { value: '6' } });

        fireEvent.click(createPartidaButton);

        await waitFor(() => {
            expect(axios.post).toHaveBeenCalledWith(
                'http://localhost:8000/match/create',
                expect.objectContaining({
                    match_name: 'TestPartida',
                    player_name: 'Juan',
                    min_players: '4',
                    max_players: '6',
                })
                // Checkeo que el post se haga con los argumentos correctos
            );
            expect(navigateMock).toHaveBeenCalledWith('/lobby/TestPartida');
        });
    });
    it('Input invalido', async () => {

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
        fireEvent.change(minJugadoresInput, { target: { value: '1' } });
        fireEvent.change(maxJugadoresInput, { target: { value: '6' } });

        fireEvent.click(createPartidaButton);

        await waitFor(() => {
            expect(axios.post).not.toHaveBeenCalled();
        });
    });
});
