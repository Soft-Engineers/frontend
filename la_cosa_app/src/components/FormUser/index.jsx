import { Formik, Form, Field } from 'formik';
import { Grid, TextField } from '@mui/material';
import RButton from '../RButton';
import ForwardOutlinedIcon from '@mui/icons-material/ForwardOutlined';
import {createUser} from '../../utils/api';
import {useNavigate} from "react-router-dom";


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

const FormUser = () => {
  const navigate = useNavigate();


  return (
    <Formik
      initialValues={{
        name_player: '',
      }}
      onSubmit={async (values) => {
        try {
          // Guardo el usuario en el localStorage
          localStorage.setItem("player_name", values.name_player);
          const response = await createUser(values.name_player);
          if (response) navigate("/mainpage");
        } catch (err) {
          alert("Error al crear usuario (El nombre debe tener entre 3 y 16 caracteres)")
          console.log(err);
        }
      }}
    >
      <Form>
        <Grid container spacing={2} sx={styles.form}>
          <Grid item xs={12}>
            <h2>Elija un nombre!</h2>
            <Field
              as={TextField}
              id="name"
              name="name_player"
              placeholder="Por ejemplo: Juan"
              fullWidth
              sx={styles.input}
            />
          </Grid>
          <Grid item xs={12}>
            <RButton
              text="Crear usuario"
              action={() => {}}
              icon={<ForwardOutlinedIcon />}
            />
          </Grid>
        </Grid>
      </Form>
    </Formik>
  );
};

export default FormUser;