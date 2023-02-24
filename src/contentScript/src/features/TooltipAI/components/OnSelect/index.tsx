import { useSelection } from '../../../../hooks/useSelection'
import Zoom from '@mui/material/Zoom'
import React, { FC, useEffect } from 'react'
import { CustomTooltip } from './components/CustomTooltip'
import { TViewState, useStore } from '../../../../store/useStore'
import { useAIProviderContext } from '../../AIProvider/AIProvider.context'

interface IOwnProps {
  children: JSX.Element | string
}

export const OnSelect: FC<IOwnProps> = (props) => {
  const { children } = props
  const { selection } = useSelection()
  const { viewState, clearState } = useAIProviderContext()

  const isOpen = viewState === TViewState.LARGE_RESULT ? 0 : 1

  useEffect(() => {
    return () => {
      clearState()
    }
  }, [selection, selection?.text])

  if (selection?.text.length > 1 && selection.text) {
    return (
      <CustomTooltip
        title={children}
        TransitionComponent={Zoom}
        open
        arrow
        sx={{ opacity: isOpen }}
      >
        <div
          style={{
            width: 0,
            height: selection.position.height,
            top: selection.position.top + window.scrollY,
            left:
              selection.position.left +
              selection.position.width / 2 +
              window.scrollX,
            position: 'absolute',
          }}
        />
      </CustomTooltip>
    )
  }

  return null
}
