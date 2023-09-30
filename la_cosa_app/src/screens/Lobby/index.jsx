import ListaJugadores from "../../components/ListaJugadores";
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import { useEffect, useState } from "react";
import { getJugadores } from "../../utils/api";
import { useNavigate } from "react-router-dom";

const styles = {
    title: {
        textAlign: 'center',
        backgroundColor: 'black',
    },
    content: {
        display: 'flex',
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
        color: '#E3E014',
        fontWeight: 'bold',
    },


};

const Lobby = () => {
    const match_id = 123;
    const is_host = true;
    const navigate = useNavigate();
    const [jugadores, setJugadores] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const res = await getJugadores(match_id);
            setJugadores(res);
        }
        fetchData();
    }, []);

    return (
        <Container maxWidth={false}>
            <Grid container spacing={2}>

                <Grid item xs={12} md={12}>
                    <Box sx={styles.title} >
                        <Typography variant="h4" sx={styles.customText}>Lobby</Typography>
                    </Box>
                </Grid>

                <Grid item xs={12} md={12} sx={styles.content}>
                    <Box>
                        <ListaJugadores jugadores={jugadores} />
                    </Box>

                    {is_host && (<Box sx={styles.button}>
                        <Button variant="outlined" color="success" sx={{ backgroundColor: '#E3E014', color: '#000000' }}
                            onClick={() => {
                                navigate("/Partida_iniciada");
                            }}>
                            Iniciar Partida
                        </Button>
                    </Box>)}

                </Grid>
            </Grid>
        </Container>
    )
}

export default Lobby;