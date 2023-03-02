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
import CloseIcon from "@mui/icons-material/Close";
import { useAIProviderContext } from "../../AIProvider/AIProvider.context";

export const LargeResult = () => {
  const { result } = useAIProviderContext();
  const [isOpen, setIsOpen] = useState(true);

  return (
    <Dialog
      onClose={() => setIsOpen(false)}
      open={isOpen}
      scroll="paper"
      maxWidth="md"
      PaperProps={{
        style: {
          backdropFilter: "saturate(280%) blur(20px)",
          background: "rgba(29,29,31,0.72)",
          border: "1px solid rgba(57,57,57,0.9)",
        },
      }}
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
