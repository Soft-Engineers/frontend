import { Formik, Form, Field } from 'formik';
import { Grid, TextField } from '@mui/material';
import RButton from '../../components/Button';
import ForwardOutlinedIcon from '@mui/icons-material/ForwardOutlined';
import { createPartida } from '../../utils/api';

const styles = {
  form: {
    minHeight: '40vh',
    width: '90%',
    maxWidth: '50vh',
    border: '1px solid #ccc',
    padding: '16px',
    borderRadius: '10px',
  },
  input: {
    width: '100%',
    marginBottom: '16px',
  },
};

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
        try {
          const response = await createPartida(values.nombrePartida, values.minJugadores, values.maxJugadores); //TODO: Pasar id
          if (response.status === 200) {
            alert('Partida creada exitosamente');
          }
        } catch (err) {
          console.log(err);
        }
      }}
    >
      <Form>
        <Grid container spacing={2} sx={styles.form}>
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
};

export default FormPartida;
