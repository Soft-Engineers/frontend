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
    minHeight: "80vh",
    minWidth: "90vw",
    flexDirection: "column",
  },
  header: {
    marginBottom: "20px",
  },
  Container: {
    display: "flex",
    flexDirection: "row",
  },
  buttonContainer: {
    display: "flex",
    width: "100%",
    flexDirection: "column",
    justifyContent: "space-evenly",
    alignItems: "center",
    marginTop: "1rem",
  },
  table: {
    marginTop: "1rem",
    width: "100%",
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
    <Container>
      <Grid container spacing={3} sx={styles.root}>
        <Grid item xs={12}>
          <Header sx={styles.header} />
        </Grid>

        <Grid item xs={12} sx={styles.Container}>
          <Box sx={styles.buttonContainer}>
            <h2> ¡Crea o uníte a una partida para empezar a jugar!</h2>

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
          <Box sx={styles.table}>
            <Table data={partidas} />
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default MainPage;
