import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import { crearUsuario } from "../../utils/api.js";
import React from "react";
import { Formik, Form, Field } from "formik";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Header from "../../components/Header";

const styles = {
    root: {
        minHeight: "100vh",
        background: "radial-gradient(circle, #000000, #004400)",
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

const crearUsuariomock = async (values) => {
    return { status: 200 }; // Simulate a successful response
};

const ElegirNombre = () => {
    const navigate = useNavigate();
    const handleSubmit = async (values) => {
        console.log(values);
        try {
            const response = await crearUsuariomock(values);
            if (response.status === 200) {
                console.log("Usuario creado exitosamente");
                navigate("/mainpage");
            }
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <Grid container  direction="column" style={styles.root}>
            <Grid item style={styles.header}>
                <Header />
            </Grid>
            <Grid item style={styles.content}>
                <Box style={styles.box}>
                        <h3 style={styles.title}>Elige un nombre de usuario</h3>
                        <Formik
                            initialValues={{
                                nombreJugador: "",
                            }}
                            onSubmit={handleSubmit}
                        >
                        {() => (
                            <Form>
                                <Grid container direction="column" alignItems="center">
                                <Grid item style={styles.row}>
                                    <label style={styles.label}> Nombre: </label>
                                    <Field
                                        type="text"
                                        name="nombreJugador"
                                        style={{
                                            borderRadius: "50px",
                                        }}
                                        validate={(value) => {
                                            if (!value) {
                                                return "El nombre es obligatorio"; // Validation error message
                                            }
                                            return undefined; // No error
                                        }}
                                    />
                                </Grid>
                                <Grid item>
                                    <Button
                                            variant="contained"
                                            size="small"
                                            type="submit"
                                            sx={{
                                                fontSize: "12px",
                                                height: "70%",
                                                background: "#001012",
                                            }}
                                        >
                                            Ok
                                    </Button>
                                </Grid>
                                </Grid>
                            </Form>
                            )}
                        </Formik>
                </Box>
            </Grid>
        </Grid>
    );
};

export default ElegirNombre;
