import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import RButton from "../Button/index.jsx";
import {useGameLogic} from "../../utils/gameLogic.js";

const ButtonsBar = ({ gameState }) => {
    const {handlePlayCard} = useGameLogic();
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static" sx={{ background: 'black' }}>
                <Toolbar variant="dense">
                    <Box sx={{ marginLeft: 'auto' }}>
                        {(gameState === 'InTurn') && (
                            <>
                                <RButton text="Jugar carta" action={handlePlayCard} />
                                <RButton text="Descartar carta"/>
                            </>
                        )}
                    </Box>
                </Toolbar>
            </AppBar>
        </Box>
    );
}

export default ButtonsBar;