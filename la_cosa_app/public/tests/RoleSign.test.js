import {render, fireEvent, waitForElementToBeRemoved, queryByText, waitFor} from '@testing-library/react';
import '@testing-library/jest-dom';
import RoleSign from './../../src/components/RoleSign';
import { MatchProvider, useMatchC } from '../../src/screens/Match/matchContext';
import React from 'react';

jest.mock('../../src/screens/Match/matchContext', () => {
    const state = {
        role: 'HUMANO',
    };
    const actions = {
        setRole: jest.fn(),
    }

    return {
        useMatchC: jest.fn(() => ({ state, actions })),
        MatchProvider: ({ children }) => children,
    };
});

describe('RoleSign', () => {
    it('renders with role information and tooltip for HUMANO role', async () => {
        // Mock the state for HUMANO role
        useMatchC.mockReturnValue({
            state: { role: 'HUMANO' },
            actions: { setRole: jest.fn() },
        });

        const { getByText, getByTestId } = render(
            <MatchProvider>
                <RoleSign />
            </MatchProvider>
        );

        const roleText = getByText('HUMANO');
        expect(roleText).toBeInTheDocument();
        fireEvent.mouseEnter(roleText);
        await waitFor(() =>
            expect(getByTestId('tooltip-content')).toBeVisible()
        );
        fireEvent.mouseLeave(roleText);

    });

    it('renders with role information and tooltip for INFECTADO role', async () => {
        // Mock the state for INFECTADO role
        useMatchC.mockReturnValue({
            state: { role: 'INFECTADO' },
            actions: { setRole: jest.fn() },
        });

        const { getByText , getByTestId} = render(
            <MatchProvider>
                <RoleSign />
            </MatchProvider>
        );

        // Find the role text
        const roleText = getByText('INFECTADO');

        expect(roleText).toBeInTheDocument();

        const tooltip = getByText('INFECTADO');

        fireEvent.mouseEnter(tooltip);
        await waitFor(() =>
            expect(getByTestId('tooltip-content')).toBeVisible()
        );
        fireEvent.mouseLeave(tooltip);
    });

    it('renders with role information and tooltip for LA_COSA role', async () => {
        // Mock the state for LA_COSA role
        useMatchC.mockReturnValue({
            state: { role: 'LA_COSA' },
            actions: { setRole: jest.fn() },
        });

        const { getByText, queryByText, getByTestId } = render(
            <MatchProvider>
                <RoleSign />
            </MatchProvider>
        );

        // Find the role text
        const roleText = getByText('LA COSA');
        expect(roleText).toBeInTheDocument();

        // Find the Tooltip
        const tooltip = getByText('LA COSA');
        fireEvent.mouseEnter(tooltip);

        await waitFor(() =>
            expect(getByTestId('tooltip-content')).toBeVisible()
        );

        fireEvent.mouseLeave(tooltip);

    });
});