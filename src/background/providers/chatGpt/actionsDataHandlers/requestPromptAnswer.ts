import { TUserActionDataHandler } from '../../../types/userActions.type'

export const requestPromptAction: TUserActionDataHandler = (
  text,
  { promptTemplate },
) => {
  if (typeof promptTemplate !== 'string') {
    throw Error('Prompt parametr are empty')
  }

  return promptTemplate.replace('{{input}}', text)
}
