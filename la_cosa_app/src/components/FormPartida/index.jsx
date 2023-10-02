import { Formik, Form, Field } from 'formik';
import { Grid, TextField } from '@mui/material';
import RButton from '../../components/Button';
import ForwardOutlinedIcon from '@mui/icons-material/ForwardOutlined';
import { createPartida } from '../../utils/api';
import { useNavigate } from 'react-router-dom';
import React , { useState } from 'react';
import SnackBar from '../../components/SnackBar';


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
  const Navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [severity, setSeverity] = useState('success');
  const [body, setBody] = useState('');

  const handleClose = (reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  return (
    <div>
    <Formik
      initialValues={{
        nombrePartida: '',
        minJugadores: '',
        maxJugadores: '',
      }}
      onSubmit={async (values) => {
        try {
          const player_name = localStorage.getItem('player_name');
          const response = await createPartida(values.nombrePartida, player_name ,values.minJugadores, values.maxJugadores);
          if (response.status === 201) { 
            Navigate(`/lobby/${values.nombrePartida}`)
          }
        } catch (err) {
          setOpen(true);
          setSeverity('error');
          setBody(err.response.data.detail);
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
              placeholder="Min 4"
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
              placeholder="Max 12"
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
    <SnackBar
      open={open}
      handleClose={handleClose}
      severity={severity}
      body={body}
    />
    </div>
  );
};

export default FormPartida;
