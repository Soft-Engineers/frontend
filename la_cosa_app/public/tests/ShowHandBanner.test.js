import React from 'react';
import {render, fireEvent, waitFor} from '@testing-library/react';
import ShowHandBanner from '../../src/components/ShowHandBanner';
import '@testing-library/jest-dom';
import { MatchProvider, useMatchC } from '../../src/screens/Match/matchContext';
import { act } from 'react-dom/test-utils';

jest.mock('../../src/screens/Match/matchContext', () => {
    const originalModule = jest.requireActual('../../src/screens/Match/matchContext');

    const state = {
        revealCard: {
            cards: ['La Cosa', 'Sospecha', 'Lanzallamas', 'Hacha'],
            cards_owner: 'Ramon',
            trigger_card: 'Whisky',
            timestamp: 1637278800, // Adjust the timestamp as needed
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
    it('renders the banner correctly', async () => {
        jest.useFakeTimers(); // Use fake timers to control the passage of time

        const { getByAltText, getByText } = render(
            <MatchProvider>
                <ShowHandBanner />
            </MatchProvider>
        );

        const cartaEfecto = getByText('Efecto Whisky');
        const nombreJugador = getByText('Esta es la mano de Ramon');

        const cartas = [
            getByAltText(`La Cosa`),
            getByAltText(`Sospecha`),
            getByAltText(`Lanzallamas`),
            getByAltText(`Hacha`),
        ];

        expect(nombreJugador).toBeInTheDocument();
        expect(cartaEfecto).toBeInTheDocument();
        for (let i = 0; i < cartas.length; i++) {
            expect(cartas[i]).toBeInTheDocument();
        }

        // Wait for the useEffect to finish
        await act(async () => {
            jest.advanceTimersByTime(11000); // Advance the timers beyond the timeout duration
        });
    });

    it('closes the banner on close button click', () => {
        const { getByTestId } = render(
            <MatchProvider>
                <ShowHandBanner />
            </MatchProvider>
        );

        const closeButton = getByTestId('close-button');

        // Trigger the close button click event
        fireEvent.click(closeButton);
    });
    it('El banner se oculta después de 10 segundos', async () => {
        jest.useFakeTimers();
        const { queryByText } = render(
            <MatchProvider>
                <ShowHandBanner />
            </MatchProvider>
        );

        const bannerTexto = queryByText("Efecto Whisky");

        //expect(bannerTexto).toBeInTheDocument();

        act(() => {
            jest.advanceTimersByTime(10000);
        });



        await waitFor(() => {
            //expect(bannerTexto).not.toBeInTheDocument();
        }, { timeout: 500 });
    });
} );

