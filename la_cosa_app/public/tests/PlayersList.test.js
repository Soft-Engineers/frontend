import React from 'react';
import { render, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';
import PlayersList from '../../src/components/PlayersList';

// Mock para sessionStorage
const sessionStorageMock = (function() {
  let store = {};
  return {
    getItem: function(key) {
      return store[key] || null;
    },
    setItem: function(key, value) {
      store[key] = value.toString();
    },
    clear: function() {
      store = {};
    }
  };
})();

Object.defineProperty(window, 'sessionStorage', {
  value: sessionStorageMock
});

describe('PlayersList Component', () => {
  afterEach(cleanup);

  it('should render player names', () => {
    const players = ['Alice', 'Bob', 'Charlie'];
    const { getByText } = render(<PlayersList jugadores={players} />);

    players.forEach(player => {
      expect(getByText(player)).toBeInTheDocument();
    });
  });

  it('should highlight the current player', () => {
    const players = ['Alice', 'Bob', 'Charlie'];
    window.sessionStorage.setItem('player_name', 'Bob');
    const { getByText } = render(<PlayersList jugadores={players} />);

    const highlightedPlayer = getByText('Bob').parentNode;
    expect(highlightedPlayer).toHaveStyle(`backgroundColor: lightblue`);
  });
});
