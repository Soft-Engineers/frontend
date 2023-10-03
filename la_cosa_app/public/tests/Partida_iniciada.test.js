import React from 'react';
import '@testing-library/jest-dom';
import {render, getByText} from '@testing-library/react';
import {MemoryRouter, Route, Routes} from "react-router-dom";
import Partida_iniciada from "../../src/screens/Partida_iniciada/index.jsx";

describe('Partida_iniciada', () => {
    it('Renderiza sin errores', () => {
        const { getByText } = render(
            <MemoryRouter initialEntries={['/']}>
                <Routes>
                    <Route path="/" element={<Partida_iniciada />} />
                </Routes>
            </MemoryRouter>
        );

        expect(getByText('Screen sin implementacion')).toBeInTheDocument();
    });
});
