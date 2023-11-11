import React from 'react';
import { useMatchC } from '../../src/screens/Match/matchContext';


// Mock the useMatchC hook
jest.mock('../../src/screens/Match/matchContext', () => ({
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
    useMatchC: jest.fn(() => ({
      state: {
        // Mock your state properties here based on the component's usage
        isTurn: true,
        turnState: 2, // Adjust based on your actual states
        role: 'LA_COSA',
        selectedCard: {
          card_name: 'ExampleCard',
          card_id: '123',
        },
        target_name: 'ExampleTarget',
        socket: global.socket,
        // ... other state properties
      },
      actions: {
        setSeverity: jest.fn(),
        setBody: jest.fn(),
        setOpen: jest.fn(),
        setDefenseTimeoutEnded: jest.fn(),
      },
    })),
  }));

  import { render, fireEvent, waitFor} from '@testing-library/react';
  import ButtonsBox from '../../src/components/ButtonsBox/index.jsx';

// Mock the socket object
global.socket = {
    send: jest.fn(),
  };
  
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

      await waitFor(() => {});
      expect(global.socket.send).toHaveBeenCalledWith(JSON.stringify({ ...expected_msg }));
    });
  });
  
  
  
  
  
  
  