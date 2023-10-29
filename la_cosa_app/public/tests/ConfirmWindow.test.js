//test de confirmWindow en ../..//src/components/ConfirmWindow/index.jsx

import React from 'react';
import '@testing-library/jest-dom';
import { render, fireEvent } from '@testing-library/react';
import ConfirmWindow from '../../src/components/ConfirmWindow/index.jsx';

describe('ConfirmWindow', () => {
    it('Renderiza el componente ConfirmWindow y maneja los eventos', () => {
        const onCloseMock = jest.fn();
        const onConfirmMock = jest.fn();

        const { getByText } = render(
            <ConfirmWindow open={true} onClose={onCloseMock} onConfirm={onConfirmMock} />
        );

        expect(getByText('¿Estas seguro?')).toBeInTheDocument();
        expect(getByText('Si te equivocas perdés la partida')).toBeInTheDocument();

        const noButton = getByText('No');
        fireEvent.click(noButton);


        expect(onCloseMock).toHaveBeenCalledTimes(1);

        const siButton = getByText('Si');
        fireEvent.click(siButton);

        expect(onConfirmMock).toHaveBeenCalledTimes(1);
    });
});