import React from 'react';
import '@testing-library/jest-dom';
import { render, screen, fireEvent, waitFor } from '@testing-library/react'; // Agrega screen, fireEvent, y waitFor
import { MemoryRouter, Route, Routes } from "react-router-dom";
import Lobby from "../../src/screens/Lobby/index.jsx";
import * as api from '../../src/utils/api';

describe('Lobby', () => {
    it('Renderiza sin errores para jugador normal', () => {
        render(
            <MemoryRouter initialEntries={['/']}>
                <Routes>
                    <Route path="/" element={<Lobby />} />
                </Routes>
            </MemoryRouter>
        );

        expect(screen.getByText('Esperando que el host inicie la partida...')).toBeInTheDocument();
    });

    it('Renderiza sin errores para el host', async () => { // Añade async aquí
        // Realiza los mocks de las funciones necesarias
        jest.spyOn(api, 'isHost').mockResolvedValue({ data: { is_host: true } }); // Mock usando mockResolvedValue
        jest.spyOn(api, 'startMatch');

        render(
            <MemoryRouter initialEntries={['/']}>
                <Routes>
                    <Route path="/" element={<Lobby />} />
                </Routes>
            </MemoryRouter>
        );

        // Asegúrate de que `startMatch` no haya sido llamada antes de hacer clic
        expect(api.startMatch).not.toHaveBeenCalled();

        // Simula hacer clic en el botón "Iniciar Partida" si el jugador es el host
        const startButton = await waitFor(() => screen.getByText('Iniciar Partida'));
        fireEvent.click(startButton);

        // Verifica que `startMatch` haya sido llamada después de hacer clic
        expect(api.startMatch).toHaveBeenCalled();
    });
});