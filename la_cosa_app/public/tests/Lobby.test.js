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

    it('Renderiza sin errores para el host', async () => {
        jest.spyOn(api, 'isHost').mockResolvedValue({ data: { is_host: true } });
        jest.spyOn(api, 'startMatch');

        render(
            <MemoryRouter initialEntries={['/']}>
                <Routes>
                    <Route path="/" element={<Lobby />} />
                </Routes>
            </MemoryRouter>
        );


        expect(api.startMatch).not.toHaveBeenCalled();


        const startButton = await waitFor(() => screen.getByText('Iniciar Partida'));
        fireEvent.click(startButton);


        expect(api.startMatch).toHaveBeenCalled();
    });
});