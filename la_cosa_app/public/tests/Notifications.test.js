import React from 'react';
import { render, fireEvent } from '@testing-library/react';
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
    };
});


describe('Notifications', () => {

    // should render correctly
    it('should render correctly', () => {
        const { getByTestId } = render(
            <MatchProvider>
                <Notifications />
            </MatchProvider>
        );
        expect(getByTestId('notifications')).toBeInTheDocument();
    });


    // should display notifications correctly
    it('should display notifications correctly', () => {
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
