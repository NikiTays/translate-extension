import Browser from 'webextension-polyfill'

import { actionsHandlers } from './actionsHandlers'
import {
  requestUserActions,
  requestUserInfo,
} from './api/translateExtension.api'
import { TMessages } from './types/messages.type'

const initialData = {}

Browser.runtime.onInstalled.addListener(async () => {
  try {
    const userActions = await requestUserActions()
    const userInfo = await requestUserInfo()

    await Browser.storage.sync.set({
      ...userActions,
      ...userInfo,
      ...initialData,
    })
  } catch (_) {}
})

Browser.runtime.onMessage.addListener(async ({ type, data }) => {
  if (type === TMessages.USER_ACTION_CLICKED) {
    const {
      actions: userActions,
      actionRequests,
    } = await Browser.storage.sync.get(['actions', 'actionRequests'])
    const clickedAction = userActions.find(({ id }) => id === data.actionId)

    const result = await actionsHandlers[clickedAction.provider](
      clickedAction,
      data,
    )

    actionRequests.push({
      result,
      isPending: false,
      isDone: true,
      error: '',
      createdOnUserAt: data.createdOnUserAt,
    })

    await Browser.storage.sync.set({
      actionRequests,
    })

    return {
      result,
      isPending: false,
      isDone: true,
      error: '',
      createdOnUserAt: data.createdOnUserAt,
    }
  }

  if (type === TMessages.SELECTION_DONE) {
    await Browser.storage.sync.set({
      currentResult: {},
    })
  }
})
