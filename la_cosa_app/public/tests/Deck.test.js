import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import Deck from '../../src/components/Deck';
import '@testing-library/jest-dom';
describe('Deck', () => {
    test('renders deck component', () => {
        render(<Deck onDrawCard={() => {}} />);
        const deckElement = screen.getByTestId('deck');
        expect(deckElement).toBeInTheDocument();
    });

    test('clicking on deck calls onDrawCard function', () => {
        const mockOnDrawCard = jest.fn();
        render(<Deck onDrawCard={mockOnDrawCard} />);

        const cardActionAreaElement = screen.getByTestId('card-action-area');
        fireEvent.click(cardActionAreaElement);

        const deckElement = screen.getByTestId('deck');
        fireEvent.click(deckElement);
        expect(mockOnDrawCard).toHaveBeenCalledTimes(1);
    });
});
