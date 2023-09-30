import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import TheThingIcon from '../../../public/assets/TheThingIcon.webp'
import RButton from '../../components/Button'

const Header = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ background: 'black' }}>
        <Toolbar variant="dense">
          <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
            {/* TODO: La imagen tiene que ser responsive */}
            <img src={TheThingIcon} alt="The Thing Icon" width="40" height="50"/>
          </IconButton>
          <Typography variant="h6" color="inherit" component="div">
            La Cosa
          </Typography>
          <Box sx={{ marginLeft: 'auto' }}>
            <RButton text="Reglas" action={() => window.open("https://famaf.aulavirtual.unc.edu.ar/pluginfile.php/27371/mod_resource/content/1/Reglas%20del%20Juego_%20La%20Cosa.pdf", "_blank")} />
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default Header;