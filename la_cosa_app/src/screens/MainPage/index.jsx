import React, { useState, useEffect } from "react";
import RButton from "../../components/Button";
import Table from "../../components/Table";
import Header from "../../components/Header";
import Container from "@mui/material/Container";
import { Box, Grid } from "@mui/material";
import VideogameAssetOutlinedIcon from "@mui/icons-material/VideogameAssetOutlined";
import RotateLeftOutlinedIcon from "@mui/icons-material/RotateLeftOutlined";
import { getPartidas } from "../../utils/api";
import FormPartida from "../../components/FormPartida";

const styles = {
  root: {
    minHeight: "90vh",
  },
  header: {
    height: "10vh",
  },
  Container: {
    display: "flex",
    flexDirection: "row",
    height: "80vh",
  },
  buttonContainer: {
    display: "flex",
    width: "100%",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
    marginTop: "2rem",
    marginLeft: "-5rem",
  },
  buttons: {
    display: "flex",
    width: "100%",
    flexDirection: "column",
    marginTop: '20vh',
    gap: "20px",
    alignItems: "center",
  },
  table: {
    display: "flex",
    marginTop: "1rem",
    minWidth: "60%",
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
    <div>
      <Header sx={styles.header} />
      <Container >
        <Grid container spacing={5} sx={styles.root}>

          <Grid item xs={12} sx={styles.Container}>
            <Box sx={styles.buttonContainer}>
              <h2> ¡Crea o uníte a una partida </h2>
              <h2>   para empezar a jugar!</h2>
              <Box sx={styles.buttons}>
                {showForm ? (
                  <FormPartida />
                ) : (
                  <RButton
                    text="Crear partida"
                    action={() => setShowForm(!showForm)}
                    icon={<VideogameAssetOutlinedIcon />}
                    sx={styles.button}
                  />
                )}
                <RButton
                  text="Recargar partidas"
                  icon={<RotateLeftOutlinedIcon />}
                  action={async () => {
                    const res = await getPartidas();
                    setPartidas(res);
                  }}
                  sx={styles.button}
                />
              </Box>
            </Box>
            <Box sx={styles.table}>
              <Table data={partidas} />
            </Box>
          </Grid>
        </Grid>
      </Container>
    </div >
  );
};

export default MainPage;
