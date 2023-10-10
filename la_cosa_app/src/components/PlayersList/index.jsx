import React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box'; // Importa el componente Box de Material-UI

const styles = {
    // paper
    paper: {
        padding: '10px',
        margin: '10px',
        display: 'flex',
        flexDirection: 'column',
    },
    box: {
        maxHeight: '80vh',
        overflow: 'auto',
        width: '100%',
    }
};

function PlayersList({ jugadores }) {
    return (
        <Box sx={styles.box}>
            <List>
                <ListItem>
                    <Typography variant="h5" >Lista de Jugadores</Typography>
                </ListItem>

                {jugadores ? jugadores.map((jugador) => (
                    <ListItem key={jugador}>
                        <Paper sx={styles.paper} elevation={3}>
                            <Typography variant="h6" >{jugador}</Typography>
                        </Paper>
                    </ListItem>
                )) : null }

            </List>
        </Box>
    );
}

export default PlayersList;
