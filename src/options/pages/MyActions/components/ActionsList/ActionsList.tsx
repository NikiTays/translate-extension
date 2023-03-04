import React, { useCallback, useEffect, useState } from "react";
import { useMyActionsStore } from "../../myActionsStore";
import { Reorder } from "framer-motion";
import {
  Card,
  CardContent,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import EditIcon from "@mui/icons-material/Edit";
import { sendMessage } from "../../../../../utils/sendMessage";
import { TSyncMessages } from "../../../../../background/types/messages.type";
import { DialogEditAction } from "./components/DialogEditAction";
import { TUserAction } from "../../../../../background/types/userActions.type";

const ActionsList: React.FC<{}> = () => {
  const { actions, removeAction } = useMyActionsStore();
  const [copyActions, setCopyActions] = useState([...actions]);
  const [open, setOpen] = React.useState(false);
  const [currentAction, setCurrentAction] = useState<TUserAction | undefined>(
    undefined
  );

  const handleOpen = (action: TUserAction) => {
    setCurrentAction(action);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    setCopyActions(actions);
  }, [actions]);

  const onSaveClick = useCallback(
    (orderedActions) => async () => {
      const actionIds = orderedActions.map(({ id }) => id);
      await sendMessage(TSyncMessages.SORT_USER_ACTIONS, { actionIds });
    },
    []
  );

  return (
    <>
      <Typography variant="h5" sx={{ marginBottom: "16px" }}>
        My Actions
      </Typography>
      {currentAction && (
        <DialogEditAction
          action={currentAction}
          onClose={handleClose}
          open={open}
        />
      )}
      <Reorder.Group
        as="div"
        axis="y"
        values={copyActions}
        onReorder={setCopyActions}
      >
        {copyActions.map((action) => {
          const { id, name } = action;

          return (
            <Reorder.Item
              as="div"
              key={id}
              value={action}
              onDragEnd={onSaveClick(copyActions)}
            >
              <Card
                sx={{
                  width: "100%",
                  padding: "4px",
                  marginBottom: "8px",
                  cursor: "grab",
                }}
              >
                <CardContent
                  sx={{ padding: "4px", paddingBottom: "4px !important" }}
                >
                  <Stack direction="row" spacing={1} alignItems="center">
                    <MenuIcon />
                    <Typography sx={{ flexGrow: 1 }} color="text.secondary">
                      {name}
                    </Typography>
                    <IconButton onClick={() => handleOpen(action)}>
                      <EditIcon fontSize="small" />
                    </IconButton>
                  </Stack>
                </CardContent>
              </Card>
            </Reorder.Item>
          );
        })}
      </Reorder.Group>
    </>
  );
};

export default ActionsList;
