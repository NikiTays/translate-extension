import React, { useState } from "react";
import { useMyActionsStore } from "../../myActionsStore";
import { Reorder } from "framer-motion";
import { Card, CardContent, Stack, Typography } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import EditIcon from "@mui/icons-material/Edit";

const ActionsList: React.FC<{}> = () => {
  const { actions } = useMyActionsStore();
  const [copyActions, setCopyActions] = useState([...actions]);
  return (
    <Reorder.Group
      as="div"
      axis="y"
      values={copyActions}
      onReorder={setCopyActions}
    >
      {copyActions.map((action) => {
        const { id, name, description, type, provider, options } = action;

        return (
          <Reorder.Item as="div" key={id} value={action}>
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
                <Stack direction="row" spacing={1}>
                  <MenuIcon />
                  <Typography sx={{ flexGrow: 1 }} color="text.secondary">
                    {name}
                  </Typography>
                  <EditIcon />
                </Stack>
              </CardContent>
            </Card>

            {/*action: {id}*/}
            {/*<div>name: {name}</div>*/}
            {/*<div>description: {description}</div>*/}
            {/*<div>type: {type}</div>*/}
            {/*<div>provider: {provider}</div>*/}
            {/*<div style={{ margin: "20px" }}>*/}
            {/*  Options:{" "}*/}
            {/*  {Object.values(options).map((value) => (*/}
            {/*    <div style={{ margin: "10px" }}>*/}
            {/*      <div>value: {value.optionValue}</div>*/}
            {/*      <div>name: {value.optionName}</div>*/}
            {/*    </div>*/}
            {/*  ))}*/}
            {/*</div>*/}
          </Reorder.Item>
        );
      })}
    </Reorder.Group>
  );
};

export default ActionsList;
// {
//   ['ProviderName']: {
//     ['TypeNmae']: [
//       {fieldName: 'Translate from', fieldId: 'translateFrom', isRequired: true, }
//       {fieldName: 'Translate to', fieldId: 'translateTo', isRequired: true, }
//     ]
//   }
//   ['ProviderName2']: {
//     ['TypeNmae']: [
//       {fieldName: 'Translate from', fieldId: 'translateFrom', isRequired: true, }
//       {fieldName: 'Translate to', fieldId: 'translateTo', isRequired: true, }
//     ]
//   }
// }
