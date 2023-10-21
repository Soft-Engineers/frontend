import React, { useState } from 'react';
import { useMatchC } from '../../screens/Match/matchContext.jsx';
import Tooltip from '@mui/material/Tooltip';
import ClickAwayListener from '@mui/material/ClickAwayListener';

const RoleSign = () => {
    const { state, actions } = useMatchC();
    const [open, setOpen] = useState(false);

    let color = null;
    let fontSize = '25px'; // Default font size
    let fontWeight = 'bold'; // Default font weight
    let description = ''; // Default description

    if (state.role === 'INFECTADO') {
        color = 'red';
        description = 'Infectados: Su objetivo es trabajar con la Cosa para infectar al resto de los humanos o eliminarlos de la partida';
    } else if (state.role === 'LA_COSA') {
        actions.setRole('LA COSA');
        color = 'black';
        description = 'La Cosa: Su objetivo es destruir a todos los Humanos, convirtiéndolos en aliados Infectados o eliminándolos de la partida.';
    }else if (state.role === 'HUMANO') {
        color = 'blue';
        description = 'Los Humanos: Su objetivo es trabajar juntos para identificar qué jugador es La Cosa y asarlo con una carta de "Lanzallamas"';

    }

    const style = {
        color,
        fontSize,
        fontWeight,
        cursor: 'pointer',
    };

    const handleTooltipClose = () => {
        setOpen(false);
    };

    const handleTooltipOpen = () => {
        setOpen(true);
    };

    return (
        <ClickAwayListener onClickAway={handleTooltipClose}>
            <Tooltip
                open={open}
                title={
                    <div style={{ fontSize: '16px' }}>{description}</div>
                }
                placement="bottom-end"
                arrow
                interactive
            >
                <span
                    style={style}
                    onClick={handleTooltipOpen}
                >
                    {state.role}
                </span>
            </Tooltip>
        </ClickAwayListener>
    );
};

export default RoleSign;
