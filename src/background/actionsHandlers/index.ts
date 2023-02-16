// import { TProviders } from '../types/providers.type'
// import { chatGptHandler } from './chatGptHandler'
// import { chatGptAsyncHandler } from './chatGptAsyncHandler'

// export const actionsHandlers: Record<
//   string,
//   (action: string, data: string) => Promise<string>
// > = {
//   [TProviders.CHAT_GPT]: chatGptHandler,
// }

import { fetchSyncChatGpt } from '../api/chatGpt.api'
// import { TUserActionTypes } from '../types/userActions.type'

// export const chatGptHandler = async (
//   { type, options }: any,
//   { input }: any,
// ): Promise<string> => {
//   let question = ''

//   if (type === TUserActionTypes.INPUT) {
//     question = input
//   }

//   if (type === TUserActionTypes.REQUEST_ANSWER) {
//     const prompt = options?.prompt

//     question = prompt.replace('{{input}}', input)
//   }

//   if (type === TUserActionTypes.TRANSLATE) {
//     const { translateTo } = options

//     question = `translate "${input}" to ${translateTo} language`
//   }

//   const { choices } = await fetchSyncChatGpt(question)

//   const result = choices[0]?.text

//   return result
// }

// export const chatGptAsyncHandler = async (
//   { type, options }: any,
//   { input }: any,
// ): Promise<string> => {
//   return Promise.resolve('dsadsad')
// }
