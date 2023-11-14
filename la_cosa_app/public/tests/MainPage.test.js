import React from 'react';
import '@testing-library/jest-dom';
import {render, fireEvent, waitFor} from '@testing-library/react';
import {MemoryRouter, Route, Routes} from "react-router-dom";
import Main from "../../src/screens/MainPage/index.jsx";
import axios from "axios";

jest.mock('axios');
beforeEach(() => {
    jest.clearAllMocks();
});
describe('MainPage', () => {
    it('Renderizado sin errores', () => {
        const { getByText } = render(
            <MemoryRouter initialEntries={['/']}>
                <Routes>
                    <Route path="/" element={<Main />} />
                </Routes>
            </MemoryRouter>
        );
        expect(getByText('¡Crea o unite a una partida para empezar a jugar!')).toBeInTheDocument();
        expect(getByText('Recargar partidas')).toBeInTheDocument();
        expect(getByText('Crear partida')).toBeInTheDocument();
    });

    it('Recargar partidas - No hay nuevas partidas', async () => {

        axios.get.mockResolvedValueOnce({
            status: 200,
            data: { Matches: [] },
        });

        const { container, getByText } = render(
            <MemoryRouter initialEntries={['/']}>
                <Routes>
                    <Route path="/" element={<Main />} />
                </Routes>
            </MemoryRouter>
        );

        const initialRows = container.querySelectorAll('tr').length;

        fireEvent.click(getByText('Recargar partidas'));

        await waitFor(() => {});

        const updatedRows = container.querySelectorAll('tr').length;
        expect(updatedRows).toEqual(initialRows);
    });

    it('Recargar partidas - Éxito', async () => {

        const sampleMatches = [
            { name: 'Match1', min_players: 2, max_players: 4, players: 3 },
            { name: 'Match2', min_players: 3, max_players: 6, players: 4 },
        ];

        axios.get.mockResolvedValueOnce({ status: 200, data: { Matches: sampleMatches } });

        const { container, getByText,getByPlaceholderText } = render(
            <MemoryRouter initialEntries={['/']}>
                <Routes>
                    <Route path="/" element={<Main />} />
                </Routes>
            </MemoryRouter>
        );

        const initialRows = container.querySelectorAll('tr').length;

        await waitFor(() => {});

        fireEvent.click(getByText('Recargar partidas'));

        const updatedRows = container.querySelectorAll('tr').length;

        expect(updatedRows).toBeGreaterThan(initialRows);
        // Si hago click en crear partida, se renderiza el form
        fireEvent.click(getByText('Crear partida'));
        expect(getByPlaceholderText('Nombre de la partida')).toBeInTheDocument();

    });
});
