import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import Table from "./../../src/components/Table";

describe('Table', () => {
    it('Renderiza sin errores', () => {

        const data = [
            { name: 'Table 1', min_players: 2, max_players: 4, current_players: 3 },];


        render(<Table data={data} />);

        expect(screen.getByText('Table 1')).toBeInTheDocument();
        expect(screen.getByText('2')).toBeInTheDocument();
        expect(screen.getByText('4')).toBeInTheDocument();
        expect(screen.getByText('3')).toBeInTheDocument();
        expect(screen.getByText('Name')).toBeInTheDocument();
        expect(screen.getByText('minPlayers')).toBeInTheDocument();
        expect(screen.getByText('maxPlayers')).toBeInTheDocument();
        expect(screen.getByText('Actual Players')).toBeInTheDocument();
    });
});
