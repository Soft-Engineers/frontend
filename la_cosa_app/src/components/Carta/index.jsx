import Stack from '@mui/material/Stack';
import { Card } from '@mui/material';
import lacosa from '../../assets/cartas_recortadas/001.png';
import infectado1 from '../../assets/cartas_recortadas/002.png';
import lanzallamas from '../../assets/cartas_recortadas/007.png';
import analisis from '../../assets/cartas_recortadas/008.png';
import hacha from '../../assets/cartas_recortadas/009.png';
import sospecha from '../../assets/cartas_recortadas/010.png';
import determinacion from '../../assets/cartas_recortadas/012.png';
import vigilaespaldas from '../../assets/cartas_recortadas/013.png';
import cambiolugar from '../../assets/cartas_recortadas/014.png';
import masvalequecorras from '../../assets/cartas_recortadas/015.png';
import seduccion from '../../assets/cartas_recortadas/016.png';
import aterrador from '../../assets/cartas_recortadas/017.png';
import aquiestoybien from '../../assets/cartas_recortadas/018.png';
import nogracias from '../../assets/cartas_recortadas/019.png';
import fallaste from '../../assets/cartas_recortadas/020.png';
import nadadebarbacoas from '../../assets/cartas_recortadas/021.png';
import cuarentena from '../../assets/cartas_recortadas/022.png';
import puertatrancada from '../../assets/cartas_recortadas/023.png';
import whisky from '../../assets/cartas_recortadas/024.png';
import cuerdaspodridas from '../../assets/cartas_recortadas/025.png';
import unodos from '../../assets/cartas_recortadas/026.png';
import trescuatro from '../../assets/cartas_recortadas/027.png';
import esaqui from '../../assets/cartas_recortadas/028.png';
import saldeaqui from '../../assets/cartas_recortadas/029.png';
import olvidadizo from '../../assets/cartas_recortadas/030.png';
import vueltayvuelta from '../../assets/cartas_recortadas/031.png';
import nopodemosseramigos from '../../assets/cartas_recortadas/032.png';
import citaciegas from '../../assets/cartas_recortadas/033.png';
import ups from '../../assets/cartas_recortadas/034.png';
import quequedeentre from '../../assets/cartas_recortadas/035.png';
import revelaciones from '../../assets/cartas_recortadas/036.png';

import rev from '../../assets/cartas_recortadas/rev.png';





const mapaCartas = {
    'rev': rev,
    'La Cosa': lacosa,
    '¡Infectado!': infectado1,
    'Lanzallamas': lanzallamas,
    'Análisis': analisis,
    'Hacha': hacha,
    'Sospecha': sospecha,
    'Determinación': determinacion,
    'Vigila tus espaldas': vigilaespaldas,
    '¡Cambio de Lugar!': cambiolugar,
    '¡Más vale que corras!': masvalequecorras,
    'Seducción': seduccion,
    'Puerta atrancada': puertatrancada,
    'Aquí estoy bien' : aquiestoybien,
    'Aterrador': aterrador,
    'Cuarentena': cuarentena,
    '¡No, gracias!': nogracias,
    '¡Fallaste!': fallaste,
    '¡Nada de barbacoas!': nadadebarbacoas,
    'Revelaciones': revelaciones,
    'Cuerdas podridas': cuerdaspodridas,
    '¡Sal de aquí!': saldeaqui,
    'Olvidadizo': olvidadizo,
    'Uno, dos..': unodos,
    'Tres, cuatro..': trescuatro,
    '¿Es aquí la fiesta?': esaqui,
    'Que quede entre nosotros...': quequedeentre,
    'Vuelta y vuelta': vueltayvuelta,
    '¿No podemos ser amigos?': nopodemosseramigos,
    'Cita a ciegas': citaciegas,
    '¡Ups!': ups,
    'Whisky': whisky,
};


// Regular Button
const Carta = ({nombre}) => {
    const imgSrc = mapaCartas[nombre];

    const cartaStyles = {
        width: '100px',
        height: '150px', // Para mantener la proporción original
        gap: '1rem', // Espaciado entre las cartas
        backgroundColor: 'grey', // Color de fondo
        borderRadius: '10px', // Bordes redondeados
    };  // estos estilos estan a ojo, es probable que tengan que cambiar


    return (
        <Stack direction="row">
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