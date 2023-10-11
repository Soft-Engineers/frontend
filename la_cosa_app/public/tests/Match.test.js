import React from 'react';
import '@testing-library/jest-dom';
import {render, getByText} from '@testing-library/react';
import {MemoryRouter, Route, Routes} from "react-router-dom";
import Match from "../../src/screens/Match/index.jsx";

describe('Match', () => {
    it('Renderiza sin errores', () => {
        const { getByText } = render(
            <MemoryRouter initialEntries={['/']}>
                <Routes>
                    <Route path="/" element={<Match />} />
                </Routes>
            </MemoryRouter>
        );

        expect(getByText('Screen sin implementacion')).toBeInTheDocument();
    });
});
