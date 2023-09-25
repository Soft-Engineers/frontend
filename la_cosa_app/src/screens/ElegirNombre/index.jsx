import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import { crearUsuario } from "../../utils/api.js";
import React from "react";
import { Formik, Form } from "formik";
import Box from "@mui/material/Box";
import Header from "../../components/Header";

const styles = {
    root: {
        minHeight: "100vh",
        //background: "linear-gradient(0deg, #000000, #004400)",
    },
    header: {
        background: "black",
    },
    content: {
        flex: "1",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    box: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        background: "rgba(0, 0, 0, 0.5)",
        maxWidth: "280px",
        width: "100%",
        borderRadius: "10%",
    },
    title: {
        paddingBottom: "0.5px",
        marginBottom: "16px",
        borderBottom: "2px solid white",
    },
    label: {
        paddingRight: "15px",
        textAlign: "left",
        flexBasis: "100px",
        fontSize: "14px",
    },
    row: {
        background: "#001012",
        marginBottom: "20px",
        paddingRight: "15px",
        paddingLeft: "15px",
        borderRadius: "50px",
    },
};

const ElegirNombre = () => {
    return (
        <Grid container xs={12} sm={6} md={4} lg={3} direction="column" style={styles.root}>
            <Grid item style={styles.header}>
                <Header />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3} style={styles.content}>
                <Box style={styles.box}>
                    <Grid item xs={12} sm={6} md={4} lg={3} style={styles.form}>
                        <h3 style={styles.title}>Elige un nombre de usuario</h3>
                        <Formik
                            initialValues={{
                                name: "",
                            }}
                            onSubmit={async (values) => {
                                console.log(values);
                                try {
                                    const response = await crearUsuario(values);
                                    if (response.status === 200) {
                                        alert("Usuario creado exitosamente");
                                    }
                                } catch (err) {
                                    console.log(err);
                                }
                            }}
                        >
                            <Form style={styles.row}>
                                <label style={styles.label}> Nombre: </label>
                                <input
                                    id="nombreJugador"
                                    name="nombreJugador"
                                    style={{
                                        borderRadius: "50px",
                                    }}
                                />
                            </Form>
                        </Formik>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4} lg={3} style={styles.button}>
                        <Button
                            variant="contained"
                            size="small"
                            onClick={() => console.log("Usuario creado")}
                            sx={{
                                fontSize: "12px",
                                height: "70%",
                                background: "#001012",
                            }}
                        >
                            Ok
                        </Button>
                    </Grid>
                </Box>
            </Grid>
        </Grid>
    );
};

export default ElegirNombre;
