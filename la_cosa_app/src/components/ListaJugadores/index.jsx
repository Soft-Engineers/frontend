import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Typography from '@mui/material/Typography';


const listItemStyles = {
    item: {
        border: '1px solid #000',
        borderRadius: '5px', // Añade bordes redondeados
        marginBottom: '5px', // Espacio entre los elementos de la lista
        padding: '5px', // Espacio interno del ListItem
        backgroundColor: '#E3E014'
    },
    customText: {
        color: 'black',
        fontWeight: 'bold'
    }

};

function ListaJugadores({ jugadores }) {
    return (
        <List>
            <ListItem>
                <Typography variant="h5" sx={listItemStyles.customText}>Lista de Jugadores</Typography>
            </ListItem>

            {jugadores.map((jugador, index) => (
                <ListItem key={index} sx={listItemStyles.item} >{jugador}</ListItem>
            ))}
        </List>
    );
}

export default ListaJugadores;