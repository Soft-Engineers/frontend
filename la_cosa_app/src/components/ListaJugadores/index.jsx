import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Typography from '@mui/material/Typography';

const playerListStyles = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
};

function ListaJugadores({ jugadores }) {
    return (
        <div style={playerListStyles}>
            <Typography variant="h6">Lista de Jugadores</Typography>
            <List>
                {jugadores.map((jugador, index) => (
                    <ListItem key={index}>{jugador}</ListItem>
                ))}
            </List>
        </div>
    );
}

export default ListaJugadores;