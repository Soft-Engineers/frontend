import React from 'react';
import { render, fireEvent, getByText } from '@testing-library/react';
import '@testing-library/jest-dom';
import Notifications from '../../src/components/Notifications';
import { MatchProvider, useMatchC } from '../../src/screens/Match/matchContext';

jest.mock('../../src/screens/Match/matchContext', () => {

    const state = {
        currentTurn: 'Ramon',
        logs: [],
        notifications: [],
    };

    const actions = {
        setCurrentTurn: jest.fn(),
        setLogs: jest.fn(),
        setNotifications: jest.fn().mockImplementation((notifications) => {
            state.notifications = notifications;
        }
        ),
    };

    return {
        turnStates: {
            DRAW_CARD: 1,
            PLAY_TURN: 2,
            FINISHED: 3,
            EXCHANGE: 4,
            WAIT_EXCHANGE: 5,
            WAIT_DEFENSE: 6,
            PANIC: 7,
            VUELTA_Y_VUELTA: 8,
            REVELACIONES: 9,
            DISCARD: 10,
        },
        useMatchC: jest.fn(() => ({ state, actions })),
        MatchProvider: ({ children }) => children,
    };
});


describe('Notifications', () => {

    // should render correctly
    it('deberia renderizar correctamente', () => {
        const { getByTestId, getByText } = render(
            <MatchProvider>
                <Notifications />
            </MatchProvider>
        );
        expect(getByTestId('notifications')).toBeInTheDocument();
        const mensajeTurno = getByText('Es el turno de Ramon');

        expect(mensajeTurno).toBeInTheDocument();
        expect(mensajeTurno).toHaveStyle('color: green');
    });
    it('deberia renderizar mensaje de infeccion correctamente', () => {
        const { actions } = useMatchC();
        actions.setNotifications(["LA COSA TE INFECTÓ!!"]);
        const { getByText } = render(
            <MatchProvider>
                <Notifications />
            </MatchProvider>
        );
        const mensajeInfeccion = getByText('LA COSA TE INFECTÓ!!');
        expect(mensajeInfeccion).toBeInTheDocument();
        expect(mensajeInfeccion.parentElement.parentElement).toHaveStyle('color: red');
    });
    it('despliega el tooltip correctamente', () => {
        const { actions } = useMatchC();
        actions.setNotifications(["Ramon jugó Sospecha a Raul"]);
        const { getByTestId, getByText } = render(
            <MatchProvider>
                <Notifications />
            </MatchProvider>
        );
        const texto_clickeable = getByText("Sospecha");
        expect(texto_clickeable).toBeInTheDocument();
        expect(getByText("a Raul")).toBeInTheDocument();
        expect(texto_clickeable).toHaveStyle("color: #9ecb60");
        fireEvent.click(texto_clickeable);
        const tooltip = getByTestId("toolTip");
        expect(tooltip).toBeInTheDocument();
    });
    // should display notifications correctly
    it('deberia desplegar las notificaciones correctamente', () => {
        const initialState = {
            currentTurn: 'Ramon',
            logs: [],
            notifications: [],
        };

        const mockActions = {
            setCurrentTurn: jest.fn(),
            setLogs: jest.fn(),
        };
        const mockNotifications = ['Notificación 1', 'Notificación 2', 'Notificación 3'];
        useMatchC.mockImplementation(() => ({
            state: { ...initialState, notifications: mockNotifications },
            actions: mockActions,
        }));

        const { queryByText } = render(
            <MatchProvider>
                <Notifications />
            </MatchProvider>
        );

        mockNotifications.forEach(notification => {
            expect(queryByText(notification)).toBeInTheDocument();
        });
    });
});
