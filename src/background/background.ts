import Browser from 'webextension-polyfill'

import { actionsHandlers } from './actionsHandlers'
import {
  requestUserActions,
  requestUserInfo,
} from './api/translateExtension.api'
import { TMessages } from './types/messages.type'

const initialData = {
  actionRequests: [],
}

Browser.runtime.onInstalled.addListener(async () => {
  try {
    const userActions = await requestUserActions()
    const userInfo = await requestUserInfo()

    await Browser.storage.sync.set({
      ...userActions,
      ...userInfo,
      ...initialData,
      isInitialized: true,
      isDataSynchronized: true,
    })
  } catch (_) {
    await Browser.storage.sync.set({
      isInitialized: false,
      isDataSynchronized: false,
    })
  }
})

Browser.runtime.onMessage.addListener(async ({ type, data }) => {
  const { actions: userActions } = await Browser.storage.sync.get(['actions'])
  const clickedAction = userActions.find(({ id }) => id === 1)

  if (type === TMessages.USER_ACTION_CLICKED) {
    await Browser.storage.sync.set({
      currentResult: { result: '', isLoading: true, error: '' },
    })

    const result = await actionsHandlers[clickedAction.provider](
      clickedAction,
      data,
    )

    await Browser.storage.sync.set({
      currentResult: { result, isLoading: false, error: '' },
    })
  }

  if (type === TMessages.SELECTION_DONE) {
    await Browser.storage.sync.set({
      currentResult: {},
    })
  }
})
