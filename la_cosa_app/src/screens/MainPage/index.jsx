import { useState, useEffect } from 'react';
import RButton from '../../components/Button';
import Table from '../../components/Table';
import { Box, Grid } from '@mui/material';
import VideogameAssetOutlinedIcon from '@mui/icons-material/VideogameAssetOutlined';
import RotateLeftOutlinedIcon from '@mui/icons-material/RotateLeftOutlined';
import { getPartidas } from '../../utils/api';
import FormPartida from '../../components/FormPartida';

const styles = {
  root: {
    minHeight: '100vh',
    justifyContent: 'center',
    alignItems: 'center',
  },
  left: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  right: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '10px',
  },
};

const MainPage = () => {
  const [partidas, setPartidas] = useState([]);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    getPartidas()
      .then((res) => {
        setPartidas(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const toggleFormVisibility = () => {
    setShowForm(!showForm);
  };

  return (
    <Grid container spacing={2} sx={styles.root}>
      {/* Left part */}
      <Grid item xs={12} sm={6} md={5} sx={styles.left}>
        {!showForm && (
          <RButton
            text="Crear partida"
            action={toggleFormVisibility}
            icon={<VideogameAssetOutlinedIcon />}
          />
        )}
        {showForm && <FormPartida />}
      </Grid>

      {/* Right part */}
      <Grid item xs={12} sm={6} md={7}>
        <Box sx={styles.right}>
          <h1>Unete a una partida!</h1>
        </Box>
        <Box sx={styles.right}>
          <RButton
            text="Recargar partidas"
            action={() => console.log("Recargar partida")}
            icon={<RotateLeftOutlinedIcon />}
          />
        </Box>
        <Table data={partidas} />
      </Grid>
    </Grid>
  );
};

export default MainPage;
