import { Formik, Form, Field } from 'formik';
import { Grid, TextField} from '@mui/material'; // Import Button from Material UI
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import RButton from '../../components/Button';
import ForwardOutlinedIcon from '@mui/icons-material/ForwardOutlined';
import { createPartida } from '../../utils/api';
import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import SnackBar from '../../components/SnackBar';
import * as Yup from 'yup';
import IconButton from "@mui/material/IconButton";

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
    width: '85%',
    height: '60%',
    marginBottom: '16px',
    marginTop : '10px',
  },
  label: {
    justifyContent: 'center',
    paddingBottom: '5px',
  },
};

const validationSchema = Yup.object().shape({
  nombrePartida: Yup.string().required('Este campo es obligatorio'),
});

const FormPartida = () => {
  const Navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [severity, setSeverity] = useState('success');
  const [body, setBody] = useState('');
  const [minPlayers, setMinPlayers] = useState(4); // Initialize with default values
  const [maxPlayers, setMaxPlayers] = useState(12);

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
            }}
            validationSchema={validationSchema}
            onSubmit={async (values) => {
              try {
                const player_name = sessionStorage.getItem('player_name');
                const response = await createPartida(
                    values.nombrePartida,
                    player_name,
                    minPlayers, // Use minPlayers and maxPlayers instead of values.minJugadores and values.maxJugadores
                    maxPlayers
                );
                if (response.status === 201) {
                  Navigate(`/lobby/${values.nombrePartida}`);
                  sessionStorage.setItem('match_name', values.nombrePartida);
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
              <Grid item xs={12} sx={styles.label}>
                <label  htmlFor="nombrePartida">Ingrese nombre de la partida:</label>
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
                <label>Minimo de jugadores:</label>
                <div>
                  <IconButton
                      onClick={() => setMinPlayers(Math.max(4, minPlayers - 1))} // Decrement minPlayers
                      variant="outlined"
                  >
                    <RemoveIcon/>
                  </IconButton>
                  {minPlayers}
                  <IconButton
                      onClick={() => setMinPlayers(Math.min(12, minPlayers + 1))}
                      variant="outlined"
                  >
                    <AddIcon/>
                  </IconButton>
                </div>
              </Grid>
              <Grid item xs={6}>
                <label>Maximo de jugadores:</label>
                <div>
                  <IconButton
                      onClick={() => setMaxPlayers(Math.max(4, maxPlayers - 1))}
                      variant="outlined"
                  >
                    <RemoveIcon/>
                  </IconButton>
                  {maxPlayers}
                  <IconButton
                      onClick={() => setMaxPlayers(Math.min(12, maxPlayers + 1))}
                      variant="outlined"
                  >
                    <AddIcon/>
                  </IconButton>
                </div>
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
        <SnackBar open={open} handleClose={handleClose} severity={severity} body={body} />
      </div>
  );
};

export default FormPartida;
