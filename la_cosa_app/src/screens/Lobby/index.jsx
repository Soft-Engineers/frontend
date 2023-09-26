import PlayerList from "../../components/PlayerList";
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';

const styles = {
    title: {
        textAlign: 'center',
        marginTop: '20px', // Agrega espacio inferior para el título
        marginBottom: '20px',
    },
    content: {
        display: 'flex',
        justifyContent: 'space-between', // Espacio entre la lista y el botón
        alignItems: 'flex-start', // Alinea la lista en la parte superior
        width: '100%',
    },
    button: {
        //boton esquina inferior derecha
        position: 'fixed',
        bottom: '50px',
        right: '50px',
    },

    customText: {
        fontSize: '40px',
        fontFamily: 'monospace, sans-serif',
        color: 'green',
        fontWeight: 'bold',
    },


};

const Lobby = () => {
    const players = ['Raul', 'Elpicante', 'El_lobby_esta_feaso']; // para probar playerlist
    return (
        <Container>
            <Grid container spacing={2}>

                <Grid item xs={12} md={12} sx={styles.title}>
                    <Typography variant="h4" sx={styles.customText}>Lobby</Typography>
                </Grid>

                <Grid item xs={12} md={12} sx={styles.content}>
                    <Box>
                        <PlayerList players={players} />
                    </Box>

                    <Box sx={styles.button}>
                        <Button variant="outlined" color="success">
                            Iniciar Partida
                        </Button>
                    </Box>
                </Grid>
            </Grid>
        </Container>
    )
}

export default Lobby;