import Grid from "@mui/material/Grid";
import Button from "../../components/Button";
import { crearUsuario } from "../../utils/api.js";
import React from "react";
import {Formik, Form} from "formik";
import Box from "@mui/material/Box";

const styles = {
    root: {
        minHeight: "100vh",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor:"violet",
    },
    box: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        background: "#000000",
        maxWidth: "300px",
        width: "100%",
    },
    title: {
        paddingBottom: "2px",
        marginBottom: "26px",
        borderBottom: "2px solid white",
    },

    button: {
        padding: "10px",
    },
    label: {
        paddingRight: "15px",
        textAlign: "left",
        flexBasis: "100px",

    },
    row: {
        paddingBottom: "10px",
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
                            />
                        </Form>
                    </Formik>
                </Grid>
                <Grid item style={styles.button}>
                    <Button
                        text="Ok"
                        action={() => console.log("Usuario creado")}
                    ></Button>
                </Grid>
            </Box>
        </Grid>
    );
};

export default ElegirNombre;
