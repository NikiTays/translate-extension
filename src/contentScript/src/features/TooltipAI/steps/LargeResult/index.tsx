import React, { useState } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useStore } from "../../../../store/useStore";
import CloseIcon from "@mui/icons-material/Close";

export const LargeResult = () => {
  const result = useStore((state) => state.result);
  const [isOpen, setIsOpen] = useState(true);

  return (
    <Dialog
      onClose={() => setIsOpen(false)}
      open={isOpen}
      scroll="paper"
      maxWidth="lg"
    >
      <DialogTitle>
        <Stack direction="row" alignItems="center">
          <Typography sx={{ flexGrow: 1 }}>CharGPT: </Typography>
          <IconButton onClick={() => setIsOpen(false)}>
            <CloseIcon />
          </IconButton>
        </Stack>
      </DialogTitle>
      <DialogContent sx={{ minHeight: "80vh" }}>
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
