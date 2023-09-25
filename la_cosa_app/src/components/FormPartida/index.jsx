import { Formik, Form, Field } from 'formik';
import { Grid, TextField } from '@mui/material'; // Importa TextField de @mui/material
import RButton from '../../components/Button';
import ForwardOutlinedIcon from '@mui/icons-material/ForwardOutlined';
import { createPartida } from '../../utils/api'; 

const styles = {
  form: {
    height: '40vh',
    width: '50vh',
    border: '1px solid #ccc',
  },
  input: {
    width: '90%',
    padding: '4px', 
    borderRadius: '10px',
    border: 'none', 
    backgroundColor: '#eee', 
  },
}

const FormPartida = () => {

  return (
    <Formik
      initialValues={{
        nombrePartida: '',
        minJugadores: '',
        maxJugadores: '',
      }}
      onSubmit={async (values) => {
        console.log(values);
        try{
          const response = await createPartida(values);
          if (response.status === 200){
            alert('Partida creada exitosamente');
          }
        }
        catch(err){
          console.log(err);
        }
      }}
    >
      <Form>
        <Grid sx={styles.form} container spacing={2}>
          <Grid item xs={12}>
            <label htmlFor="nombrePartida">Ingrese nombre de la partida</label>
            <Field
              as={TextField} 
              id="nombrePartida"
              name="nombrePartida"
              placeholder="Nombre de la partida"
              fullWidth
              sx={styles.input} 
            />
          </Grid>
          <Grid item xs={6}>
            <label htmlFor="minJugadores">Minimo de jugadores</label>
            <Field
              as={TextField}
              id="minJugadores"
              name="minJugadores"
              placeholder="Minimo de jugadores"
              fullWidth
              sx={styles.input}
            />
          </Grid>
          <Grid item xs={6}>
            <label htmlFor="maxJugadores">Maximo de jugadores</label>
            <Field
              as={TextField}
              id="maxJugadores"
              name="maxJugadores"
              placeholder="Maximo de jugadores"
              fullWidth
              sx={styles.input}
            />
          </Grid>
          <Grid item xs={12}>
            <RButton
              text="Crear partida"
              action={() => {}}
              icon={<ForwardOutlinedIcon />}
            />
          </Grid>
        </Grid>
      </Form>
    </Formik>
  );
}

export default FormPartida;
