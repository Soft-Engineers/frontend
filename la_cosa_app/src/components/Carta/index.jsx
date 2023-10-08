import Stack from '@mui/material/Stack';
import { Card } from '@mui/material';
import lanzallamaImage from '../../assets/cartas_recortadas/lanzallama.png';

const mapaCartas = {
    1: lanzallamaImage
    // Agregar las cartas
};


// Regular Button
const Carta = ({ id }) => {
    const imgSrc = mapaCartas[id];

    const cartaStyles = {
        width: '145px', // Ancho de la carta
        height: '200px', // Alto de la carta
        backgroundColor: 'white', // Color de fondo
        borderRadius: '10px', // Bordes redondeados
    };  // estos estilos estan a ojo, es probable que tengan que cambiar


    return (
        <Stack direction="row" spacing={2}>
            <Card style={cartaStyles} >
                <img
                    src={imgSrc} // Reemplaza 'ruta_de_la_imagen.jpg' con la ruta de tu imagen
                    style={{ maxWidth: '100%', maxHeight: '100%' }} // Ajusta el tamaño de la imagen
                    alt={`Carta ${id}`}
                />
            </Card>
        </Stack>
    );
}

export default Carta;