import RButton from '../../components/Button';
import Table from '../../components/Table';
import { Box, Grid } from '@mui/material';
import VideogameAssetOutlinedIcon from '@mui/icons-material/VideogameAssetOutlined';
import RotateLeftOutlinedIcon from '@mui/icons-material/RotateLeftOutlined';


const styles = {
  root: {
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },

  left: {
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },

  right: { // Esto es para 
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    margin: '0 auto',
    padding: '10px',
  },
}



const MainPage = () => {
  return (
    <Grid
      container
      spacing={2}
      sx={styles.root}
    >

      {/* Left part */}
      <Grid 
        item 
        xs={4} 
        sx={styles.left}
      >
        <RButton
          text="Crear partida"
          action={() => console.log("Crear partida")}
          icon={<VideogameAssetOutlinedIcon />}
        />
      </Grid>

      {/* Right part */}
      <Grid item xs={8}>
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
        <Table />
      </Grid>
    </Grid>
  );
}

export default MainPage;
