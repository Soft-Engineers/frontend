import React from 'react';
import '@testing-library/jest-dom';
import { render, fireEvent, screen, queryByLabelText } from '@testing-library/react';
import {MemoryRouter, Route, Routes} from "react-router-dom";
import Main from "../../src/screens/MainPage/index.jsx";

describe('MainPage', () => {
    it('Successful Rendering', () => {
        const { getByText } = render(
            <MemoryRouter initialEntries={['/']}>
                <Routes>
                    <Route path="/" element={<Main />} />
                </Routes>
            </MemoryRouter>
        );

        expect(getByText('Recargar partidas')).toBeInTheDocument();
    });
});
