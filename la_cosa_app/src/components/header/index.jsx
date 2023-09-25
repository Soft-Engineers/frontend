import React from "react";
import Button from "@mui/material/Button";

const headerStyles = {
    backgroundColor: "black",
};


const Header = () => {
    return (
        <div style={headerStyles}>
            <a
                href="https://famaf.aulavirtual.unc.edu.ar/pluginfile.php/27371/mod_resource/content/1/Reglas%20del%20Juego_%20La%20Cosa.pdf"
                target="_blank" // Opens the link in a new tab/window
            >
            <Button
                variant="contained"
                color="primary"
                size="small"
                sx={{
                    fontSize: "12px",
                    background: "black",
                }}
            >
                Reglas
            </Button>
        </a>
        </div>
    );
};

export default Header;