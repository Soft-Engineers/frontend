import React from 'react';
import '@testing-library/jest-dom';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from "react-router-dom";
import Lobby from "../../src/screens/Lobby/index.jsx";
import React from 'react';

describe('Lobby', () => {
    it('Renderizado sin errores', () => {
        const { getByText } = render(
            <MemoryRouter initialEntries={['/']}>
                <Routes>
                    <Route path="/" element={<Lobby />} />
                </Routes>
            </MemoryRouter>
        );
        expect(getByText('Lista de Jugadores')).toBeInTheDocument();
    });

});