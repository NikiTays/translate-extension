import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import React from "react";
import { useMyActionsStore } from "../../myActionsStore";

const ActionsList: React.FC<{}> = () => {
  const { actions } = useMyActionsStore();

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>action</TableCell>
            <TableCell align="right">name</TableCell>
            <TableCell align="right">description</TableCell>
            <TableCell align="right">type</TableCell>
            <TableCell align="right">provider</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {actions.map(({ id, name, description, type, provider }) => (
            <TableRow
              key={id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {id}
              </TableCell>
              <TableCell align="right">{name}</TableCell>
              <TableCell align="right">{description}</TableCell>
              <TableCell align="right">{type}</TableCell>
              <TableCell align="right">{provider}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ActionsList;
