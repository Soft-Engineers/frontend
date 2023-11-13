import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import Notifications from '../../src/components/Notifications';
import {MatchProvider} from '../../src/screens/Match/matchContext';

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
    it('should render correctly', () => {
        const { getByTestId } = render(
            <MatchProvider>
                <Notifications />
            </MatchProvider>
        );
        expect(getByTestId('notifications')).toBeInTheDocument();
    });
});