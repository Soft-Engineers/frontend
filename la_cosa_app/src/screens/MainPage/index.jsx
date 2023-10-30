import React, { useState, useEffect } from 'react';
import RButton from '../../components/Button';
import Table from '../../components/Table';
import Header from '../../components/Header';
import { Box, Grid } from '@mui/material';
import VideogameAssetOutlinedIcon from '@mui/icons-material/VideogameAssetOutlined';
import RotateLeftOutlinedIcon from '@mui/icons-material/RotateLeftOutlined';
import { getPartidas } from '../../utils/api';
import FormPartida from '../../components/FormPartida';



const styles = {
  root: {
    minHeight: '80vh',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    display: 'flex',
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
    const fetchData = async () => {
      const res = await getPartidas();
      setPartidas(res);
    };
    fetchData();
  }, []);

  return (
      <Box>
        <Header />
        <Grid container spacing={1} sx={styles.root}>
          {/* Left part */}
          <Grid item xs={12} sm={6} md={5} sx={styles.left}>
            {!showForm && (
                <RButton
                    text="Crear partida"
                    action={() => setShowForm(!showForm)}
                    icon={<VideogameAssetOutlinedIcon />}
                />
            )}
            {showForm && <FormPartida />}
          </Grid>

          {/* Right part */}
          <Grid item xs={12} sm={6} md={7}>
            <Box sx={styles.right}>
              <h1 style={{borderBottom: '0.1rem solid black'}}>Unete a una partida!</h1>
            </Box>

            <Table data={partidas} />
            <Box sx={styles.right}>
              <RButton
                  text="Recargar partidas"
                  icon={<RotateLeftOutlinedIcon />}
                  action={async () => {
                    const res = await getPartidas();
                    setPartidas(res);
                  }}
              />
            </Box>
          </Grid>
        </Grid>
      </Box>
  );
};

export default MainPage;
