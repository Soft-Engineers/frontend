import React from 'react';
import '@testing-library/jest-dom';
import {fireEvent, render, screen} from '@testing-library/react';
import Header from './../../../src/components/Header';

describe('Header', () => {
    it('Renderiza sin errores', () => {

        render(<Header />);

        expect(screen.getByText('La Cosa')).toBeInTheDocument();
        expect(screen.getByRole('img', { name: 'The Thing Icon' })).toBeInTheDocument();
        expect(screen.getByRole('button', { name: 'Reglas' })).toBeInTheDocument();
        // Checkeo que ciertos elementos se renderizen correctamente
    });
    it ('Clickear "Reglas" abre una nueva ventana y me lleva al url correcto', () => {

        const originalOpen = window.open;
        window.open = jest.fn();

        render(<Header />);

        const reglasButton = screen.getByText('Reglas');

        fireEvent.click(reglasButton);

        expect(window.open).toHaveBeenCalledWith(
            'https://famaf.aulavirtual.unc.edu.ar/pluginfile.php/27371/mod_resource/content/1/Reglas%20del%20Juego_%20La%20Cosa.pdf',
            '_blank'
        );

        window.open = originalOpen;
    });
});