import React from 'react';
import '@testing-library/jest-dom';
import { render, fireEvent, waitFor} from '@testing-library/react';
import ButtonsBox from '../../src/components/ButtonsBox/index.jsx';

// Mock the useMatchC hook
jest.mock('../../src/screens/Match/matchContext', () => {
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
      useMatchC: jest.fn(() => {
        return {
          state: {
            isTurn: true,
            turnState: 2, 
            role: 'LA_COSA',
            selectedCard: {
              card_name: 'ExampleCard',
              card_id: '123',
            },
            target_name: 'ExampleTarget',
            socket: global.socket,
          },
          actions: {
            setSeverity: jest.fn(),
            setBody: jest.fn(),
            setOpen: jest.fn(),
            setDefenseTimeoutEnded: jest.fn(),
          },
        };
      }),
    };
  });


// Mock the socket object
global.socket = {
    send: jest.fn(),
  };

  afterEach(() => {
    jest.clearAllMocks();
  });
  
  describe('ButtonsBox Component', () => {
    it('handles button click for playing a card', async () => {
      // Render the component
      const { getByText } = render(<ButtonsBox />);
      const playCardButton = getByText('Jugar carta');
      fireEvent.click(playCardButton);

      const expected_msg  = {
            message_type: 'jugar carta',
            message_content: {
                card_name: 'ExampleCard',
                card_id: '123',
                target: 'ExampleTarget',
            },
        };
      expect(global.socket.send).toHaveBeenCalledWith(JSON.stringify({ ...expected_msg }));
    });
  });
  
  describe('ButtonsBox Component', () => {
    it('handles button click for discarding a card', async () => {
      const { getByText } = render(<ButtonsBox />);
      const discardCardButton = getByText('Descartar carta');

      fireEvent.click(discardCardButton);
        const expected_msg  = {
            message_type: 'descartar carta',
            message_content: {
                card_id: '123',
            },
        };
        expect(global.socket.send).toHaveBeenCalledWith(JSON.stringify({ ...expected_msg }));
    });
  });
  
    // Mock the ConfirmWindow component
    jest.mock('../../src/components/ConfirmWindow/index.jsx', () => ({ open, onClose, onConfirm }) => (
        open && (
          <div>
            <div data-testid="confirm-window">Confirm Window Content</div>
            <button onClick={onClose} data-testid="close-button">Close</button>
            <button onClick={onConfirm} data-testid="confirm-button">Confirm</button>
          </div>
        )
      ));

      test('No quedan mas humanos', async () => {
        const { getByText, getByTestId } = render(<ButtonsBox />);
        fireEvent.click(getByText('¡No quedan más humanos!'));
        
        await waitFor(() => {
            expect(getByTestId('confirm-window')).toBeInTheDocument();
        });
        fireEvent.click(getByTestId('confirm-button'));
        const expected_msg = {
            message_type: 'declaración',
            message_content: {},
        };
        expect(global.socket.send).toHaveBeenCalledWith(JSON.stringify({ ...expected_msg }));
    });