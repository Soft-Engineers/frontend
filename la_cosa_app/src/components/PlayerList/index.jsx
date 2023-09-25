import { Container } from '@mui/material';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const playerListStyles = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
};

function PlayerList({ players }) {
    return (
        <div style={playerListStyles}>
            <Typography variant="h6">Lista de Jugadores</Typography>
            <List>
                {players.map((player, index) => (
                    <ListItem key={index}>{player}</ListItem>
                ))}
            </List>
        </div>
    );
}

export default PlayerList;