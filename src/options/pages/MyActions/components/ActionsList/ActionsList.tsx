import React, { useCallback, useEffect, useState } from 'react'
import { useMyActionsStore } from '../../myActionsStore'
import { Reorder } from 'framer-motion'
import { Button, Card, CardContent, Stack, Typography } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import EditIcon from '@mui/icons-material/Edit'
import RemoveIcon from '@mui/icons-material/Remove'
import { sendMessage } from '../../../../../utils/sendMessage'
import { TSyncMessages } from '../../../../../background/types/messages.type'

const ActionsList: React.FC<{}> = () => {
  const { actions, removeAction } = useMyActionsStore()
  const [copyActions, setCopyActions] = useState([...actions])

  useEffect(() => {
    setCopyActions(actions)
  }, [actions])

  const onSaveClick = useCallback(
    (orderedActions) => async () => {
      const actionIds = orderedActions.map(({ id }) => id)

      await sendMessage(TSyncMessages.SORT_USER_ACTIONS, { actionIds })
    },
    [],
  )

  const onRemoveClick = useCallback(
    (actionId: number) => async () => {
      await removeAction({ actionId })
    },
    [],
  )

  return (
    <>
      <Reorder.Group
        as="div"
        axis="y"
        values={copyActions}
        onReorder={setCopyActions}
      >
        {copyActions.map((action) => {
          const { id, name, description, type, provider, options } = action

          return (
            <Reorder.Item as="div" key={id} value={action}>
              <Card
                sx={{
                  width: '100%',
                  padding: '4px',
                  marginBottom: '8px',
                  cursor: 'grab',
                }}
              >
                <CardContent
                  sx={{ padding: '4px', paddingBottom: '4px !important' }}
                >
                  <Stack direction="row" spacing={1}>
                    <MenuIcon />
                    <Typography sx={{ flexGrow: 1 }} color="text.secondary">
                      {name}
                    </Typography>
                    <RemoveIcon onClick={onRemoveClick(id)} />
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
          )
        })}
      </Reorder.Group>
      <Button
        sx={{ width: '100%', height: '56px' }}
        variant="contained"
        onClick={onSaveClick(copyActions)}
      >
        Save
      </Button>
    </>
  )
}

export default ActionsList
