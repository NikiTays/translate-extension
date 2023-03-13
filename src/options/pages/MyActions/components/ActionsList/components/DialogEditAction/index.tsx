import React, { FC, useCallback } from "react";
import {
  Autocomplete,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  TextField,
} from "@mui/material";
import { TUserAction } from "../../../../../../../background/types/userActions.type";
import { useMyActionsStore } from "../../../../myActionsStore";
import { Controller, useForm } from "react-hook-form";

interface IOwnProps {
  open: boolean;
  onClose: () => void;
  action: TUserAction;
}

export const DialogEditAction: FC<IOwnProps> = (props) => {
  const { removeAction } = useMyActionsStore();
  const { open, onClose, action } = props;
  const { id, name } = action;
  const { control, handleSubmit, getValues } = useForm<TUserAction>({
    defaultValues: action,
  });

  console.log(getValues());

  const onSubmit = (data) => console.log(data);

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
          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack sx={{ margin: "10px 0 0 0" }} spacing={2}>
              <Controller
                name="type"
                control={control}
                render={({ field }) => (
                  <Autocomplete
                    {...field}
                    disablePortal
                    options={[{ label: "s", value: "e" }]}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        fullWidth
                        label="Type"
                        variant="outlined"
                      />
                    )}
                  />
                )}
              />

              <Controller
                name="name"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label="Name"
                    variant="outlined"
                  />
                )}
              />

              <Controller
                name="description"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label="description"
                    variant="outlined"
                  />
                )}
              />

              <Controller
                name="provider"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label="Provider"
                    variant="outlined"
                  />
                )}
              />

              <Controller
                name="options"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label="Options"
                    variant="outlined"
                  />
                )}
              />
            </Stack>
          </form>
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
