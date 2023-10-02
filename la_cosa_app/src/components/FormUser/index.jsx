import React, {useState} from 'react';
import { Formik, Form, Field } from 'formik';
import { Grid, TextField } from '@mui/material';
import RButton from '../Button';
import ForwardOutlinedIcon from '@mui/icons-material/ForwardOutlined';
import {createUser} from '../../utils/api';
import {useNavigate} from "react-router-dom";
import SnackBar from "../../components/SnackBar";
import * as Yup from 'yup';


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

const validationSchema = Yup.object().shape({
  name_player: Yup.string()
      .required('Este campo es obligatorio'),
});

const FormUser = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [severity, setSeverity] = useState("success");
  const [body, setBody] = useState("");

  const handleClose = (reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  return (
    <div>
    <Formik
      initialValues={{
        name_player: '',
      }}
      validationSchema={validationSchema}
      onSubmit={async (values) => {
        try {
          // Guardo el usuario en el localStorage
          localStorage.setItem("player_name", values.name_player);
          const response = await createUser(values.name_player);
          if (response.status === 200) {
            navigate(`/mainpage/${values.name_player}`);
          }
        } catch (err) {
          setOpen(true);
          setSeverity("error");
          setBody(err.response.data.detail);
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
    <SnackBar
      open={open}
      body={body}
      severity={severity}
      handleClose={handleClose}
    />
    </div>
  );
};

export default FormUser;

