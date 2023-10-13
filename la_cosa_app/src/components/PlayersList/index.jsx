import React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';

const styles = {
    paper: {
        padding: '10px',
        margin: '10px',
        width: '90%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
    },
    box: {
        maxHeight: '80vh',
        overflow: 'auto',
        width: '100%',
    },
};

function PlayersList({ jugadores }) {
    return (
        <Box sx={styles.box}>
            <Typography variant="h5" sx={{ marginTop: '10px' }}>
                Lista de Jugadores
            </Typography>
            <List>
                {jugadores.map((jugador, index) => (
                    <ListItem key={index}>
                        <Paper sx={styles.paper} elevation={3}>
                            <Typography variant="h6">{jugador}</Typography>
                        </Paper>
                    </ListItem>
                ))}
            </List>
        </Box>
    );
}

export default PlayersList;
