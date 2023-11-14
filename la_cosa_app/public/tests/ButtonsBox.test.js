import React from 'react';
import '@testing-library/jest-dom';
import { render, fireEvent, waitFor } from '@testing-library/react';
import ButtonsBox from '../../src/components/ButtonsBox/index.jsx';

// Mock del useMatchC hook
jest.mock('../../src/screens/Match/matchContext', () => ({
  ...jest.requireActual('../../src/screens/Match/matchContext'), // Mantener funcionalidad original si es necesario
  useMatchC: jest.fn(() => ({
    state: {
      isTurn: true,
      turnState: 2,
      role: 'LA_COSA',
      selectedCard: {
        card_name: 'ExampleCard',
        card_id: '123',
      },
      target_name: 'ExampleTarget',
      targetDoor: null,
      socket: global.socket,
    },
    actions: {
      setSeverity: jest.fn(),
      setBody: jest.fn(),
      setOpen: jest.fn(),
      setDefenseTimeoutEnded: jest.fn(),
    },
  })),
}));

// Mock del objeto socket
global.socket = {
  send: jest.fn(),
};

// Limpiar mocks después de cada prueba
afterEach(() => {
  jest.clearAllMocks();
});

// Mock de ConfirmWindow component
jest.mock('../../src/components/ConfirmWindow/index.jsx', () => ({ open, onClose, onConfirm }) => (
    open && (
        <div>
          <div data-testid="confirm-window">Confirm Window Content</div>
          <button onClick={onClose} data-testid="close-button">Close</button>
          <button onClick={onConfirm} data-testid="confirm-button">Confirm</button>
        </div>
    )
));

describe('ButtonsBox Component', () => {
  it('handles button click for playing a card', async () => {
    const { getByText } = render(<ButtonsBox />);
    const playCardButton = getByText('Jugar carta');
    fireEvent.click(playCardButton);

    const expected_msg = {
      message_type: 'jugar carta',
      message_content: {
        card_name: 'ExampleCard',
        card_id: '123',
        target: 'ExampleTarget',
      },
    };
    expect(global.socket.send).toHaveBeenCalledWith(JSON.stringify({ ...expected_msg }));
  });
  it('handles button click for playing a card with target door', async () => {
    // Cambia el estado del turno para que el target sea una puerta
    jest.spyOn(require('../../src/screens/Match/matchContext'), 'useMatchC').mockImplementationOnce(() => ({
      state: {
        isTurn: true,
        turnState: 2,
        role: 'LA_COSA',
        selectedCard: {
          card_name: 'ExampleCard',
          card_id: '123',
        },
        targetDoor: '1',
        socket: global.socket,
      },
      actions: {
        setSeverity: jest.fn(),
        setBody: jest.fn(),
        setOpen: jest.fn(),
        setDefenseTimeoutEnded: jest.fn(),
      },
    }));

    const { getByText } = render(<ButtonsBox />);
    const playCardButton = getByText('Jugar carta');
    fireEvent.click(playCardButton);

    const expected_msg = {
      message_type: 'jugar carta',
      message_content: {
        card_name: 'ExampleCard',
        card_id: '123',
        target: 1,
      },
    };
    expect(global.socket.send).toHaveBeenCalledWith(JSON.stringify({ ...expected_msg }));

  } );

  it('handles button click for discarding a card', async () => {
    const { getByText } = render(<ButtonsBox />);
    const discardCardButton = getByText('Descartar carta');

    fireEvent.click(discardCardButton);
    const expected_msg = {
      message_type: 'descartar carta',
      message_content: {
        card_id: '123',
      },
    };
    expect(global.socket.send).toHaveBeenCalledWith(JSON.stringify({ ...expected_msg }));
  });

  it('handles button click for exchanging a card', async () => {
    // Cambia el estado del turno a INTERCAMBIO
    jest.spyOn(require('../../src/screens/Match/matchContext'), 'useMatchC').mockImplementationOnce(() => ({
      state: {
        isTurn: true,
        turnState: 4, // Cambia el estado a INTERCAMBIO
        selectedCard: {
          card_name: 'ExampleCard',
          card_id: '123',
        },
        socket: global.socket,
      },
    }));

    const { getByText } = render(<ButtonsBox />);
    const exchangeCardButton = getByText('Intercambiar');
    fireEvent.click(exchangeCardButton);

    const expected_msg = {
      message_type: 'intercambiar carta',
      message_content: {
        card_id: '123',
      },
    };
    expect(global.socket.send).toHaveBeenCalledWith(JSON.stringify({ ...expected_msg }));
  });

  it('handles button click for skipping defense', async () => {
    // Cambia el estado del turno a ESPERAR DEFENSA
    jest.spyOn(require('../../src/screens/Match/matchContext'), 'useMatchC').mockImplementationOnce(() => ({
      state: {
        isTurn: true,
        turnState: 6, // Cambia el estado a ESPERAR DEFENSA
        socket: global.socket,
      },
    }));

    const { getByText } = render(<ButtonsBox />);
    const skipDefenseButton = getByText('Pasar');
    fireEvent.click(skipDefenseButton);

    const expected_msg = {
      message_type: 'omitir defensa',
      message_content: {},
    };
    expect(global.socket.send).toHaveBeenCalledWith(JSON.stringify({ ...expected_msg }));
  });
  it('handles defense timeout', async () => {
    // Cambia el estado del turno a ESPERAR DEFENSA y configura el tiempo de defensa agotado
    jest.spyOn(require('../../src/screens/Match/matchContext'), 'useMatchC').mockImplementationOnce(() => ({
      state: {
        isTurn: true,
        turnState: 6, // Cambia el estado a ESPERAR DEFENSA
        socket: global.socket,
        defenseTimeoutEnded: true,
      },
      actions: {
        setSeverity: jest.fn(),
        setBody: jest.fn(),
        setOpen: jest.fn(),
        setDefenseTimeoutEnded: jest.fn(),
      },
    }));

    const { getByText } = render(<ButtonsBox />);
    const skipDefenseButton = getByText('Pasar');
    fireEvent.click(skipDefenseButton);

    const expected_msg = {
      message_type: 'omitir defensa',
      message_content: {},
    };
    expect(global.socket.send).toHaveBeenCalledWith(JSON.stringify({ ...expected_msg }));
  });

  it('handles button click for "No quedan más humanos"', async () => {
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
  it ('handles closing confirm window', async () => {
    const { getByText, getByTestId } = render(<ButtonsBox />);
    fireEvent.click(getByText('¡No quedan más humanos!'));

    await waitFor(() => {
      expect(getByTestId('confirm-window')).toBeInTheDocument();
    });

    fireEvent.click(getByTestId('close-button'));
  } );
  it('handles button click for revealing hand', async () => {
    jest.spyOn(require('../../src/screens/Match/matchContext'), 'useMatchC').mockImplementationOnce(() => ({
      state: {
        isTurn: true,
        socket: global.socket,
        hand: [{ card_name: '¡Infectado!' }, { card_name: 'Card2' }],
        turnState: 9, // Estado de REVELACIONES
      },
    }));

    const { getByText } = render(<ButtonsBox />);
    const revealHandButton = getByText('Revelar mano');
    fireEvent.click(revealHandButton);

    const expected_msg = {
      message_type: 'revelaciones',
      message_content: {
        decision: 'revelar mano',
      },
    };
    expect(global.socket.send).toHaveBeenCalledWith(JSON.stringify({ ...expected_msg }));
  });

  it('handles button click for revealing infected card', async () => {
    jest.spyOn(require('../../src/screens/Match/matchContext'), 'useMatchC').mockImplementationOnce(() => ({
      state: {
        isTurn: true,
        socket: global.socket,
        hand: [{ card_name: '¡Infectado!' }, { card_name: 'Card2' }],
        turnState: 9, // Estado de REVELACIONES
      },
    }));

    const { getByText } = render(<ButtonsBox />);
    const revealInfectedCardButton = getByText('Revelar carta ¡Infectado!');
    fireEvent.click(revealInfectedCardButton);

    const expected_msg = {
      message_type: 'revelaciones',
      message_content: {
        decision: 'revelar carta',
      },
    };
    expect(global.socket.send).toHaveBeenCalledWith(JSON.stringify({ ...expected_msg }));
  });

  it('handles button click for skipping revelations', async () => {
    jest.spyOn(require('../../src/screens/Match/matchContext'), 'useMatchC').mockImplementationOnce(() => ({
      state: {
        isTurn: true,
        socket: global.socket,
        hand: [{ card_name: '¡Infectado!' }, { card_name: 'Card2' }],
        turnState: 9, // Estado de REVELACIONES
      },
    }));

    const { getByText } = render(<ButtonsBox />);
    const skipRevelationsButton = getByText('Pasar');
    fireEvent.click(skipRevelationsButton);

    const expected_msg = {
      message_type: 'revelaciones',
      message_content: {
        decision: 'omitir revelaciones',
      },
    };
    expect(global.socket.send).toHaveBeenCalledWith(JSON.stringify({ ...expected_msg }));
  });
  it('handles else case for discarding card', async () => {
    // Cambia el estado del turno para que la carta seleccionada sea null
    jest.spyOn(require('../../src/screens/Match/matchContext'), 'useMatchC').mockImplementationOnce(() => ({
      state: {
        isTurn: true,
        turnState: 2,
        role: 'LA_COSA',
        selectedCard: null,
        target_name: 'ExampleTarget',
        targetDoor: null,
        socket: global.socket,
      },
      actions: {
        setSeverity: jest.fn(),
        setBody: jest.fn(),
        setOpen: jest.fn(),
        setDefenseTimeoutEnded: jest.fn(),
      },
    }));

    const { getByText } = render(<ButtonsBox />);
    const discardCardButton = getByText('Descartar carta');
    fireEvent.click(discardCardButton);

    const expected_msg = {
      message_type: 'descartar carta',
      message_content: {
        card_id: null, // Ajusta este valor según tu lógica de manejo de null
      },
    };
    expect(global.socket.send).not.toHaveBeenCalled(); // No se debe llamar a send ya que la carta seleccionada es null
  });

  it('handles else case for playing card', async () => {
    // Cambia el estado del turno para que la carta seleccionada sea null
    jest.spyOn(require('../../src/screens/Match/matchContext'), 'useMatchC').mockImplementationOnce(() => ({
      state: {
        isTurn: true,
        turnState: 2,
        role: 'LA_COSA',
        selectedCard: null,
        target_name: 'ExampleTarget',
        targetDoor: null,
        socket: global.socket,
      },
      actions: {
        setSeverity: jest.fn(),
        setBody: jest.fn(),
        setOpen: jest.fn(),
        setDefenseTimeoutEnded: jest.fn(),
      },
    }));

    const { getByText } = render(<ButtonsBox />);
    const playCardButton = getByText('Jugar carta');
    fireEvent.click(playCardButton);

    const expected_msg = {
      message_type: 'jugar carta',
      message_content: {
        card_name: null, // Ajusta este valor según tu lógica de manejo de null
        card_id: null, // Ajusta este valor según tu lógica de manejo de null
        target: 'ExampleTarget',
      },
    };
    expect(global.socket.send).not.toHaveBeenCalled(); // No se debe llamar a send ya que la carta seleccionada es null
  });

  it('handles else case for exchanging card', async () => {
    // Cambia el estado del turno para que la carta seleccionada sea null
    jest.spyOn(require('../../src/screens/Match/matchContext'), 'useMatchC').mockImplementationOnce(() => ({
      state: {
        isTurn: true,
        turnState: 4,
        role: 'LA_COSA',
        selectedCard: null,
        target_name: 'ExampleTarget',
        targetDoor: null,
        socket: global.socket,
      },
      actions: {
        setSeverity: jest.fn(),
        setBody: jest.fn(),
        setOpen: jest.fn(),
        setDefenseTimeoutEnded: jest.fn(),
      },
    }));

    const { getByText } = render(<ButtonsBox />);
    const exchangeCardButton = getByText('Intercambiar');
    fireEvent.click(exchangeCardButton);

    const expected_msg = {
      message_type: 'intercambiar carta',
      message_content: {
        card_id: null, // Ajusta este valor según tu lógica de manejo de null
      },
    };
    expect(global.socket.send).not.toHaveBeenCalled(); // No se debe llamar a send ya que la carta seleccionada es null
  });
  it('renders the correct content for turnState: DRAW_CARD', () => {
    jest.spyOn(require('../../src/screens/Match/matchContext'), 'useMatchC').mockImplementationOnce(() => ({
      state: {
        isTurn: true,
        turnState: 1,
      },
    }));

    const { getByText } = render(<ButtonsBox />);
    expect(getByText('Tenés que robar una carta del mazo.')).toBeInTheDocument();
  });
  it ('renders the correct content for turnState: WAIT_EXCHANGE', () => {
    jest.spyOn(require('../../src/screens/Match/matchContext'), 'useMatchC').mockImplementationOnce(() => ({
      state: {
        isTurn: true,
        turnState: 5,
      },
    }));

    const { getByText } = render(<ButtonsBox />);
    expect(getByText('Intercambiar')).toBeInTheDocument();
    expect(getByText('Jugar carta')).toBeInTheDocument();
  });
  it ('renders the correct content for turnState: PANIC' , () => {
    jest.spyOn(require('../../src/screens/Match/matchContext'), 'useMatchC').mockImplementationOnce(() => ({
      state: {
        isTurn: true,
        turnState: 7,
        role: 'LA_COSA',
        selectedCard: {
          card_name: 'Cita a ciegas',
          card_id: '123',
        },
      },
    }));

    const { getByText } = render(<ButtonsBox />);
  });
  it ('renders the correct content for turnState: DISCARD' , () => {
    jest.spyOn(require('../../src/screens/Match/matchContext'), 'useMatchC').mockImplementationOnce(() => ({
      state: {
        isTurn: true,
        turnState: 10,
        role: 'LA_COSA',
        selectedCard: {
          card_name: 'Cita a ciegas',
          card_id: '123',
        },
      },
    }));

    const { getByText } = render(<ButtonsBox />);
  });
  it ('renders the correct content for out of turn and turnState: WAIT_DEFENSE' , () => {
    jest.spyOn(require('../../src/screens/Match/matchContext'), 'useMatchC').mockImplementationOnce(() => ({
      state: {
        isTurn: false,
        turnState: 6,
        role: 'LA_COSA',
        selectedCard: {
          card_name: 'Cita a ciegas',
          card_id: '123',
        },
      },
    }));

    const { getByText } = render(<ButtonsBox />);
    expect(getByText('Esperando defensa...')).toBeInTheDocument();
  } );
  it ('renders the correct content for out of turn and turnState: WAIT_EXCHANGE' , () => {
    jest.spyOn(require('../../src/screens/Match/matchContext'), 'useMatchC').mockImplementationOnce(() => ({
      state: {
        isTurn: false,
        turnState: 5,
        role: 'LA_COSA',
        selectedCard: {
          card_name: 'Cita a ciegas',
          card_id: '123',
        },
      },
    }));

    const { getByText } = render(<ButtonsBox />);
    expect(getByText('Esperando intercambio...')).toBeInTheDocument();
  });
  it ('renders the correct content for out of turn and turnState: REVELACIONES' , () => {
    jest.spyOn(require('../../src/screens/Match/matchContext'), 'useMatchC').mockImplementationOnce(() => ({
      state: {
        isTurn: false,
        turnState: 9,
        role: 'LA_COSA',
      },
    }));

    const { getByText } = render(<ButtonsBox />);
    expect(getByText('Esperando a los demás jugadores...')).toBeInTheDocument();
  });
    it ('renders the correct content for out of turn and turnState: VUELTA_Y_VUELTA' , () => {
        jest.spyOn(require('../../src/screens/Match/matchContext'), 'useMatchC').mockImplementationOnce(() => ({
        state: {
            isTurn: false,
            turnState: 8,
            role: 'LA_COSA',
        },
        }));

        const { getByText } = render(<ButtonsBox />);
    });
  it ('renders the correct content for out of turn' , () => {
    jest.spyOn(require('../../src/screens/Match/matchContext'), 'useMatchC').mockImplementationOnce(() => ({
      state: {
        isTurn: false,
        turnState: 10,
        role: 'LA_COSA',
        selectedCard: {
          card_name: 'Cita a ciegas',
          card_id: '123',
        },
      },
    }));

    const { getByText } = render(<ButtonsBox />);
    expect(getByText('Esperando turno...')).toBeInTheDocument();
  });
  it('renders "Esperando a los demás jugadores..." when alreadySelected is true', () => {
    jest.spyOn(require('../../src/screens/Match/matchContext'), 'useMatchC').mockImplementationOnce(() => ({
      state: {
        isTurn: true,
        turnState: 8,
        alreadySelected: true,
        },
    }));

    const { getByText } = render(<ButtonsBox />);
    expect(getByText('Esperando a los demás jugadores...')).toBeInTheDocument();
  });

  it('renders Exchange button when alreadySelected is false in VUELTA_Y_VUELTA state', () => {
    jest.spyOn(require('../../src/screens/Match/matchContext'), 'useMatchC').mockImplementationOnce(() => ({
      state: {
        isTurn: true,
        turnState: 8,
        alreadySelected: false,
      },
    }));

    const { getByText } = render(<ButtonsBox />);
    const exchangeButton = getByText('Intercambiar');
    expect(exchangeButton).toBeInTheDocument();
  });
});
