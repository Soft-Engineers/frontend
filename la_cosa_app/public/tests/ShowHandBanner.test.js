import React from 'react';
import { render } from '@testing-library/react';
import ShowHandBanner from '../../src/components/ShowHandBanner';
import '@testing-library/jest-dom';
import { MatchProvider, useMatchC } from '../../src/screens/Match/matchContext';
import { waitFor } from '@testing-library/dom';
import {act} from "react-dom/test-utils";

jest.mock('../../src/screens/Match/matchContext', () => {
    const state = {
        revealCard: {
            cards: ['La Cosa', 'Sospecha', 'Lanzallamas', 'Hacha'],
            cards_owner: 'Ramon',
            trigger_card: 'Whisky'
        },
        currentTurn: 1,
        selectedCard: null,
    };

    const actions = {
        setReveal: jest.fn(),
        setHand: jest.fn(),
        setCurrentTurn: jest.fn(),
    };

    return {
        useMatchC: jest.fn(() => ({ state, actions })),
        MatchProvider: ({ children }) => children,
    };
});

describe('ShowHandBanner', () => {
    it('renderiza el banner correctamente', () => {
        const { getByAltText, getByText } = render(
            <MatchProvider>
                <ShowHandBanner />
            </MatchProvider>
        );

        const cartaEfecto = getByText('Efecto Whisky');
        const nombreJugador = getByText('Esta es la mano de Ramon');

        const cartas = [getByAltText(`Carta La Cosa`), getByAltText(`Carta Sospecha`), getByAltText(`Carta Lanzallamas`), getByAltText(`Carta Hacha`)];


        expect(nombreJugador).toBeInTheDocument();
        expect(cartaEfecto).toBeInTheDocument();
        for (let i = 0; i < cartas.length; i++) {
            expect(cartas[i]).toBeInTheDocument();
        }
    });


    it('El banner se oculta después de 10 segundos', async () => {
        jest.useFakeTimers();
        const { queryByText } = render(
            <MatchProvider>
                <ShowHandBanner />
            </MatchProvider>
        );

        const bannerTexto = queryByText("Efecto Whisky");

        expect(bannerTexto).toBeInTheDocument();

        act(() => {
            jest.advanceTimersByTime(10000);
        });



        await waitFor(() => {
            expect(bannerTexto).not.toBeInTheDocument();
        }, { timeout: 500 });
    });

});
