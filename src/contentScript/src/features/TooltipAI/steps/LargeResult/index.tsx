import React from "react";
import {
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useStore } from "../../../../store/useStore";
import CloseIcon from "@mui/icons-material/Close";
import SearchIcon from "@mui/icons-material/Search";

export const LargeResult = () => {
  const result = useStore((state) => state.result);

  return (
    <Dialog open={true} scroll="paper" maxWidth="lg">
      <DialogTitle>
        <Stack direction="row" alignItems="center">
          <Typography sx={{ flexGrow: 1 }}>CharGPT: </Typography>
          <IconButton>
            <CloseIcon />
          </IconButton>
        </Stack>
      </DialogTitle>
      <DialogContent sx={{ minHeight: "80vh", width: "100%" }}>
        <Typography variant="body1">{result}</Typography>
      </DialogContent>
      <DialogActions>
        <TextField
          size="small"
          variant="outlined"
          hiddenLabel
          sx={{ width: "100%" }}
        />
      </DialogActions>
    </Dialog>
  );
};
