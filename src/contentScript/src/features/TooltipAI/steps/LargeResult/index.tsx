import React, { useState } from "react";
import {
  Box,
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
      maxWidth="md"
    >
      <DialogTitle>
        <Stack direction="row" alignItems="center">
          <span style={{ flexGrow: 1 }}>CharGPT: </span>
          <IconButton onClick={() => setIsOpen(false)}>
            <CloseIcon />
          </IconButton>
        </Stack>
      </DialogTitle>
      <DialogContent sx={{ paddingBottom: 0 }}>
        <Box
          sx={{
            width: "1000px",
            maxWidth: "100%",
            height: "75vh",
            overflowY: "scroll",
          }}
        >
          <Typography variant="body1">{result}</Typography>
        </Box>
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
