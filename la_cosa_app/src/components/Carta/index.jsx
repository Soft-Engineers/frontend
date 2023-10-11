import Stack from '@mui/material/Stack';
import { backdropClasses, Card } from '@mui/material';
import backImage from '../../assets/cartas_recortadas/back.png';
import lanzallamaimg from '../../assets/cartas_recortadas/02.png';
import lacosaimg from '../../assets/cartas_recortadas/00.png';
import infectadoimg from '../../assets/cartas_recortadas/01.png';

const mapaCartas = {
    'back': backImage,
    'Lanzallamas': lanzallamaimg,
    'La Cosa': lacosaimg,
    '¡Infectado!': infectadoimg
    // Agregar las cartas
};


// Regular Button
const Carta = ({ nombre }) => {
    const imgSrc = mapaCartas[nombre];

    const cartaStyles = {
        width: '60%',
        height: '60%', // Para mantener la proporción original
        gap: '1rem', // Espaciado entre las cartas
        backgroundColor: 'grey', // Color de fondo
        borderRadius: '10px', // Bordes redondeados
    };  // estos estilos estan a ojo, es probable que tengan que cambiar


    return (
        <Stack direction="row" spacing={2}>
            <Card style={cartaStyles} >
                <img
                    src={imgSrc} // Reemplaza 'ruta_de_la_imagen.jpg' con la ruta de tu imagen
                    style={{ maxWidth: '100%', maxHeight: '100%' }} // Ajusta el tamaño de la imagen
                    alt={`Carta ${nombre}`}
                />
            </Card>
        </Stack>
    );
}

export default Carta;