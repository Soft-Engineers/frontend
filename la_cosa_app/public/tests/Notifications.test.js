import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import Notifications from '../../src/components/Notifications';
import {MatchProvider} from '../../src/screens/Match/matchContext';

jest.mock('../../src/screens/Match/matchContext', () => {
    const state = {
        currentTurn: 'Ramon',
    };

    const actions = {
        setCurrentTurn: jest.fn(),
    };

    return {
        useMatchC: jest.fn(() => ({ state, actions })),
        MatchProvider: ({ children }) => children,
    };
});


describe('Notifications', () => {
    it('Renderiza bien mensajes de turno y jugada', () => {
        const { getByText } = render(
            <MatchProvider>
                <Notifications messages={['Raúl jugó sospecha']} />
            </MatchProvider>
        );
        expect(getByText('Raúl jugó sospecha')).toBeInTheDocument();
        const mensajeTurno = getByText('Es el turno de Ramon');
        expect(mensajeTurno).toBeInTheDocument();
        expect(mensajeTurno).toHaveStyle('color: green; borderBottom: 2px solid black');
    });

    it('Renderiza bien mensajes de infeccion', () => {
        const { getByText } = render(
            <MatchProvider>
                <Notifications messages={['LA COSA TE INFECTÓ!!']} />
            </MatchProvider>
        );
        const mensajeInfeccion = getByText('LA COSA TE INFECTÓ!!');
        expect(mensajeInfeccion).toBeInTheDocument();
        expect(mensajeInfeccion.parentElement).toHaveStyle('color: red;');
    });
});