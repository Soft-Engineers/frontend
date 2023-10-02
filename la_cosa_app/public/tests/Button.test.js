import React from 'react';
import '@testing-library/jest-dom';
import {render, fireEvent} from '@testing-library/react';
import RButton from '../../src/components/Button/index.jsx';

describe('Button', () => {
    it('Renderiza sin errores', () => {

        const { getByText } = render(
            <RButton text="Ok" action={() => console.log('Ok')} />
        );

        expect(getByText('Ok')).toBeInTheDocument();
        // Checkeo que ciertos elementos se renderizen correctamente
    });
    it ('OnClickMock se llama cuando se apreta el boton', () => {

        const onClickMock = jest.fn();

        const { getByText } = render(
            <RButton text="Ok" action={onClickMock} />
        );

        const button = getByText('Ok');

        fireEvent.click(button);

        expect(onClickMock).toHaveBeenCalled();
    });
});