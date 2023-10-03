import React from 'react';
import '@testing-library/jest-dom';
import {render, getByText} from '@testing-library/react';
import {MemoryRouter, Route, Routes} from "react-router-dom";
import Lobby from "../../src/screens/Lobby/index.jsx";

describe('Lobby', () => {
    it('Renderiza sin errores', () => {
        const { getByText } = render(
            <MemoryRouter initialEntries={['/']}>
                <Routes>
                    <Route path="/" element={<Lobby />} />
                </Routes>
            </MemoryRouter>
        );

        expect(getByText('Iniciar Partida')).toBeInTheDocument();
    });
});
