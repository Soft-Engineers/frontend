import React, { useState } from 'react';
import { useMatchC } from '../../screens/Match/matchContext.jsx';
import Tooltip from '@mui/material/Tooltip';
import ClickAwayListener from '@mui/material/ClickAwayListener';

const RoleSign = () => {
    const { state, actions } = useMatchC();
    const [open, setOpen] = useState(false);

    let color = null;
    let fontSize = '35px';
    let fontWeight = 'bold';
    let description = 'Su objetivo es destruir a todos los Humanos, convirtiéndolos en aliados Infectados o eliminándolos de la partida.';

    if (state.role === 'INFECTADO') {
        color = 'red';
        description = 'Su objetivo es trabajar con la Cosa para infectar al resto de los humanos o eliminarlos de la partida';
    } else if (state.role === 'LA_COSA') {
        actions.setRole('LA COSA');
        color = 'black';
    }else if (state.role === 'HUMANO') {
        color = 'blue';
        description = 'Su objetivo es trabajar juntos para identificar qué jugador es La Cosa y asarlo con una carta de "Lanzallamas"';

    }

    const style = {
        color,
        fontSize,
        fontWeight,
        cursor: 'pointer',
        margin: '1rem',
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
                interactive="true"
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
