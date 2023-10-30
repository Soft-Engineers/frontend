import React from 'react';
import '@testing-library/jest-dom';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import Table from "./../../src/components/Table";
import { MemoryRouter, Route, Routes, useNavigate } from "react-router-dom";
import axios from "axios";

jest.mock('axios');
beforeEach(() => {
    jest.clearAllMocks();
});

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: jest.fn(), // Mock de useNavigate
}));

describe('Table', () => {
    it('Renderiza sin errores', () => {

        const data = [
            { name: 'Table 1', min_players: 2, max_players: 4, players: 3 },];

        render(
            <MemoryRouter initialEntries={['/']}>
                <Routes>
                    <Route path="/" element={<Table data={data} />} />
                </Routes>
            </MemoryRouter>
        );

        expect(screen.getByText('Table 1')).toBeInTheDocument();
        expect(screen.getByText('2')).toBeInTheDocument();
        expect(screen.getByText('4')).toBeInTheDocument();
        expect(screen.getByText('3')).toBeInTheDocument();
        expect(screen.getByText('Name')).toBeInTheDocument();
        expect(screen.getByText('minPlayers')).toBeInTheDocument();
        expect(screen.getByText('maxPlayers')).toBeInTheDocument();
        expect(screen.getByText('Actual Players')).toBeInTheDocument();
    });
    it('Join Match Exitoso', async () => {
        const navigateMock = jest.fn();
        useNavigate.mockReturnValue(navigateMock);
        sessionStorage.setItem('player_name', 'playerName');
        axios.post.mockResolvedValueOnce({ status: 200 });

        const data = [
            { name: 'Table 1', min_players: 2, max_players: 4, players: 3 },
        ];

        const { container, getByText } = render(
            <MemoryRouter initialEntries={['/']}>
                <Routes>
                    <Route path="/" element={<Table data={data} />} />
                </Routes>
            </MemoryRouter>
        );

        const row = getByText('Table 1').parentElement;
        fireEvent.doubleClick(row);

        await waitFor(() => {
            expect(axios.post).toHaveBeenCalledWith('http://localhost:8000/match/join', {
                player_name: 'playerName',
                match_name: 'Table 1',
                password: '',
            });
            expect(navigateMock).toHaveBeenCalledWith('/lobby/Table 1');
        });
    });

    it('Join Match error', async () => {

        const navigateMock = jest.fn();
        useNavigate.mockReturnValue(navigateMock);

        axios.post.mockRejectedValueOnce({
            response: {
                data: {
                    detail: 'Match already started',
                },
            },
        });

        const data = [
            { name: 'Table 1', min_players: 2, max_players: 4, players: 3 },
        ];

        const { container, getByText } = render(
            <MemoryRouter initialEntries={['/']}>
                <Routes>
                    <Route path="/" element={<Table data={data} />} />
                </Routes>
            </MemoryRouter>
        );

        const row = getByText('Table 1').parentElement;
        fireEvent.doubleClick(row);

        await waitFor(() => {
            expect(screen.getByText('Match already started')).toBeInTheDocument();
            expect(navigateMock).not.toHaveBeenCalled();
        });

    });
});