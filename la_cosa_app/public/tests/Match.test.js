import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import Match from '../../src/screens/Match/index.jsx';
import { MatchProvider } from '../../src/screens/Match/matchContext';
import { useMatchC } from '../../src/screens/Match/matchContext';
import { waitFor } from '@testing-library/dom';
import { act } from "react-dom/test-utils";

jest.mock('../../src/screens/Match/matchContext', () => {
    const originalModule = jest.requireActual('../../src/screens/Match/matchContext');
    const mockState = {
        jugadores: [{ player_name: 'Raul' }, { player_name: 'Javier' }, { player_name: 'Player3' }, { player_name: 'Ramon' }],
        currentTurn: 'Ramon',
        hand: [{ card_name: 'Sospecha' }, { card_name: 'Sospecha' }, { card_name: 'Lanzallamas' }, { card_name: 'Hacha' }],
        role: 'HUMANO',
        deadPlayerNames: [],
        selectedCard: null,
        avisos: 'Es el turno de Raul',
        isDeadPlayer: false,
        turnState: 2,
        DtimeoutEnded: false,
        isTurn: true,
        socket: { send: jest.fn() },
    };

    const mockActions = {
        setCurrentTurn: jest.fn(),
        setSelectedCard: jest.fn(),
        setHand: jest.fn(),
        setSocket: jest.fn(),
        setIsDeadPlayer: jest.fn().mockImplementation((bool) => { mockState.isDeadPlayer = bool; }),
        setTurnState: jest.fn().mockImplementation((state) => { mockState.turnState = state; }),
        setDTimeoutEnded: jest.fn().mockImplementation((bool) => { mockState.DtimeoutEnded = bool; }),
        setIsTurn: jest.fn(),
    };

    return {
        ...originalModule,
        useMatchC: jest.fn(() => ({
            state: mockState,
            actions: mockActions,
        })),
    };
});



describe('Match', () => {

    it('debería renderizar la pantalla de juego correctamente', () => {
        sessionStorage.setItem('player_name', 'Ramon');
        sessionStorage.setItem('match_name', 'ramoncito_match');
        const { getByTestId } = render(
            <MatchProvider>
                <Match />
            </MatchProvider>
        );
        const PlayersHand = getByTestId("playersHand");
        const PlayersRound = getByTestId("playersRound");
        const Notifications = getByTestId("notifications");
        const ButtonsBox = getByTestId("buttonsBox");
        const Chat = getByTestId("chat")
        expect(PlayersHand).toBeInTheDocument();
        expect(PlayersRound).toBeInTheDocument();
        expect(Notifications).toBeInTheDocument();
        expect(ButtonsBox).toBeInTheDocument();
        expect(Chat).toBeInTheDocument();
    });
    it('debería renderizar la pantalla de muerto correctamente', () => {
        const { actions } = useMatchC();
        actions.setIsDeadPlayer(true);
        const { getByTestId, getByText } = render(
            <MatchProvider>
                <Match />
            </MatchProvider>
        );

        getByText('Has muerto...');
        const Chat = getByTestId("chat");
        const Notifications = getByTestId("notifications");
        expect(Chat).toBeInTheDocument();
        expect(Notifications).toBeInTheDocument();
    });
    it('debería renderizar la pantalla de defensa correctamente', async () => {
        const { actions } = useMatchC();

        actions.setTurnState(6);
        actions.setIsDeadPlayer(false);
        jest.useFakeTimers();
        const { getByTestId } = render(
            <MatchProvider>
                <Match />
            </MatchProvider>
        );
        const progressBar = getByTestId('progressBar');

        expect(progressBar).toHaveStyle({ opacity: '1' });

        const PlayersHand = getByTestId("playersHand");
        const PlayersRound = getByTestId("playersRound");
        const Notifications = getByTestId("notifications");
        const ButtonsBox = getByTestId("buttonsBox");
        const Chat = getByTestId("chat")

        expect(PlayersHand).toBeInTheDocument();
        expect(PlayersRound).toBeInTheDocument();
        expect(Notifications).toBeInTheDocument();
        expect(ButtonsBox).toBeInTheDocument();
        expect(Chat).toBeInTheDocument();


        act(() => {
            jest.advanceTimersByTime(20000);
            actions.setTurnState(2);//deberia chequear que se envia un mensaje por el websocket ,
            //y deberia mockear la respuesta del back con el cambio de estado, esta dificil :P
        });





        await waitFor(() => {
            expect(progressBar).toHaveStyle({ opacity: '0' });
        }, { timeout: 500 });

    });
});