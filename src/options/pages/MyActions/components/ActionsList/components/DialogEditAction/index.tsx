import React, { FC, useCallback } from "react";
import {
  Box,
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  TextField,
} from "@mui/material";
import { TUserAction } from "../../../../../../../background/types/userActions.type";
import { useMyActionsStore } from "../../../../myActionsStore";

interface IOwnProps {
  open: boolean;
  onClose: () => void;
  action: TUserAction;
}

export const DialogEditAction: FC<IOwnProps> = (props) => {
  const { removeAction } = useMyActionsStore();
  const { open, onClose, action } = props;
  const { id, name, description, type, provider, options } = action;

  const handleClose = () => {
    onClose();
  };

  const onRemoveClick = useCallback(
    (actionId: number) => async () => {
      await removeAction({ actionId });
      onClose();
    },
    []
  );

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>Action: {name}</DialogTitle>
      <DialogContent>
        <Box sx={{ width: "444px", minWidth: "444px" }}>
          <Stack sx={{ margin: "10px 0" }} spacing={2}>
            <TextField fullWidth label="Name" variant="outlined" value={name} />
            <TextField
              fullWidth
              multiline
              label="Descriptin"
              variant="outlined"
              value={description}
            />
            <TextField fullWidth label="Type" variant="outlined" value={type} />
            <TextField
              fullWidth
              label="Provider"
              variant="outlined"
              value={provider}
            />
          </Stack>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button color="error" variant="outlined" onClick={onRemoveClick(id)}>
          Delete
        </Button>
        <Button variant="contained">Save</Button>
      </DialogActions>
    </Dialog>
  );
};
