import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import Container from "@mui/material/Container";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { joinMatch } from "../../utils/api";
import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import SnackBar from "../../components/SnackBar";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    overflow: "hidden",
    textOverflow : "ellipsis",
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const CustomizedTables = ({ data }) => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [severity, setSeverity] = useState("success");
  const [body, setBody] = useState("");

  const handleClose = (reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const handleRowDoubleClick = async (player_name, match_name, password) => {
    try {
      const response = await joinMatch(player_name, match_name, password);
      if (response.status === 200) {
        navigate(`/lobby/${match_name}`);
        sessionStorage.setItem("match_name", match_name);
      }
    } catch (err) {
      setOpen(true);
      setSeverity("error");
      setBody(err.response.data.detail);
    }
  };

  const user_name = sessionStorage.getItem("player_name");
  const password = "";

  return (
    <Container>
      <TableContainer component={Paper} sx={{ marginTop: "1rem" }}>
        <Table aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Nombre</StyledTableCell>
              <StyledTableCell align="left">
                Mínimo de jugadores
              </StyledTableCell>
              <StyledTableCell align="left">
                Máximo de jugadores
              </StyledTableCell>
              <StyledTableCell align="left">Jugadores</StyledTableCell>
            </TableRow>
          </TableHead>
        </Table>
      </TableContainer>
      <TableContainer
        component={Paper}
        sx={{ maxHeight: "65vh", overflowY: "auto"}}
      >
        <Table aria-label="customized table">
          <TableBody>
            {data &&
              data.map((row) => (
                <StyledTableRow
                  key={row.name}
                  onDoubleClick={() =>
                    handleRowDoubleClick(user_name, row.name, password)
                  }
                  sx={{
                    "&:hover": { backgroundColor: "#d2cbcb" },
                    cursor: "pointer",
                  }}
                >
                  <StyledTableCell
                    component="th"
                    scope="row"
                    align="left"
                    sx={{ maxWidth: "20px" }}
                  >
                    {row.name}
                  </StyledTableCell>
                  <StyledTableCell align="left">
                    {row.min_players}
                  </StyledTableCell>
                  <StyledTableCell align="left">
                    {row.max_players}
                  </StyledTableCell>
                  <StyledTableCell align="left">
                    {row.players}
                  </StyledTableCell>
                </StyledTableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <SnackBar
        open={open}
        handleClose={handleClose}
        severity={severity}
        body={body}
      />
    </Container>
  );
};

export default CustomizedTables;
