import Grid from "@mui/material/Grid";
import Button from '@mui/material/Button';
import { crearUsuario } from "../../utils/api.js";
import React from "react";
import {Formik, Form} from "formik";
import Box from "@mui/material/Box";

const styles = {
    root: {
        minHeight: "100vh",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(0deg, #000000, #004400)",
        zIndex: -1,
    },
    box: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        background: "rgba(0, 0, 0, 0.5)",
        maxWidth: "280px",
        width: "100%",
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
        background:"#001012",
        marginBottom: "20px",
        paddingRight: "15px",
        paddingLeft: "15px",
        borderRadius: "50px",

    },

};

const ElegirNombre = () => {
    return (
        <Grid container style={styles.root}>
            <Box style={styles.box}>
                <Grid item style={styles.form}>

                    <h3 style={styles.title}>
                        Elige un nombre de usuario
                    </h3>

                    <Formik
                        initialValues={{
                            name: "",
                        }}
                        onSubmit={async (values) => {
                            console.log(values);
                            try {
                                const response = await crearUsuario(values);
                                if (response.status === 200) {
                                    alert('Usuario creado exitosamente');
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
                <Grid item style={styles.button}>
                    <Button
                        variant="contained"
                        size="small"
                        onClick= {console.log("Usuario creado")}
                        sx={{
                            fontSize: "12px", // Adjust the font size as needed
                            height: "70%",
                            background:"#001012",
                        }}
                    >
                        Ok
                    </Button>
                </Grid>
            </Box>
        </Grid>
    );
};

export default ElegirNombre;
