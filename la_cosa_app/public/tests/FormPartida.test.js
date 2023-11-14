import React from 'react';
import '@testing-library/jest-dom';
import {fireEvent, render, waitFor, waitForElementToBeRemoved} from '@testing-library/react';
import { MemoryRouter, Routes, Route, useNavigate } from 'react-router-dom';
import FormPartida from './../../src/components/FormPartida';
import axios from "axios";
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
        const { getByLabelText, getByPlaceholderText, getByText } = render(
            <MemoryRouter initialEntries={['/']}>
                <Routes>
                    <Route path="/" element={<FormPartida />} />
                </Routes>
            </MemoryRouter>
        );

        expect(getByLabelText('Ingrese nombre de la partida:')).toBeInTheDocument();
        expect(getByPlaceholderText('Nombre de la partida')).toBeInTheDocument();
        expect(getByText('Mínimo de jugadores:')).toBeInTheDocument();
        expect(getByText('Máximo de jugadores:')).toBeInTheDocument();
        expect(getByText('Crear partida')).toBeInTheDocument();
        // Checkear que los botones para ajustar la cantidad de jugadores se renderizen correctamente
    });


    it('Envio exitoso', async () => {
        sessionStorage.setItem('player_name', 'Juan');

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
        const createPartidaButton = getByText('Crear partida');

        fireEvent.change(nombrePartidaInput, { target: { value: 'TestPartida' } });

        fireEvent.click(createPartidaButton);

        await waitFor(() => {
            expect(axios.post).toHaveBeenCalledWith(
                'http://localhost:8000/match/create',
                expect.objectContaining({
                    match_name: 'TestPartida',
                    player_name: 'Juan',
                    min_players: 4,
                    max_players: 12,
                })
            );
            expect(navigateMock).toHaveBeenCalledWith('/lobby/TestPartida');
        });
    });

    it('Envio con error', async () => {

        sessionStorage.setItem('player_name', 'Juan');
        const navigateMock = jest.fn();
        useNavigate.mockReturnValue(navigateMock);

        const localStorageMock = {
            getItem: jest.fn(() => 'Juan'),
        };
        Object.defineProperty(window, 'localStorage', { value: localStorageMock });

        axios.post.mockRejectedValueOnce({
            response: {
                data: {
                    detail: 'Cantidad inválida de jugadores',
                },
            },
        });


        const { getByPlaceholderText, getByText } = render(
            <MemoryRouter initialEntries={['/']}>
                <Routes>
                    <Route path="/" element={<FormPartida />} />
                    <Route path="/lobby" element={<Lobby />} />
                </Routes>
            </MemoryRouter>
        );

        const nombrePartidaInput = getByPlaceholderText('Nombre de la partida');
        const createPartidaButton = getByText('Crear partida');

        fireEvent.change(nombrePartidaInput, { target: { value: 'TestPartida' } });

        fireEvent.click(createPartidaButton);

        await waitFor(() => {
            expect(getByText('Cantidad inválida de jugadores')).toBeInTheDocument();
            expect(navigateMock).not.toHaveBeenCalled();
        });
        //Testeo si hago click en cualquier lado se cierra el mensaje de error y si hago click en el mensaje no se cierra
        fireEvent.click(getByText('Cantidad inválida de jugadores'))
        expect(getByText('Cantidad inválida de jugadores')).toBeInTheDocument();
        fireEvent.click(document)
        await waitForElementToBeRemoved(() => getByText('Cantidad inválida de jugadores'));
    });


    it('debería actualizar minPlayers y maxPlayers correctamente', () => {

        const { getByText, getByLabelText } = render(
            <MemoryRouter initialEntries={['/']}>
                <Routes>
                    <Route path="/" element={<FormPartida />} />
                    <Route path="/lobby" element={<Lobby />} />
                </Routes>
            </MemoryRouter>
        );

        expect(getByText('4')).toBeInTheDocument();
        expect(getByText('12')).toBeInTheDocument();

        const minIncrButton = getByLabelText('minPlayersIncrease');
        const maxDecrButton = getByLabelText('maxPlayersDecrease');
        const minDecrButton = getByLabelText('minPlayersDecrease');
        const maxIncrButton = getByLabelText('maxPlayersIncrease');

        fireEvent.click(maxDecrButton);
        fireEvent.click(minIncrButton);


        // Verifica que los valores se hayan actualizado correctamente
        expect(getByText('5')).toBeInTheDocument(); // Actualizado minPlayers
        expect(getByText('11')).toBeInTheDocument(); // Actualizado maxPlayers

        fireEvent.click(minDecrButton);
        fireEvent.click(maxIncrButton);

        expect(getByText('4')).toBeInTheDocument(); // Actualizado minPlayers
        expect(getByText('12')).toBeInTheDocument(); // Actualizado maxPlayers

    });
});
