import { TUserActionDataHandler } from '../../../types/userActions.type'

export const requestPromptAction: TUserActionDataHandler = (
  text,
  { promptTemplate },
) => {
  if (typeof promptTemplate.optionValue !== 'string') {
    throw Error('Prompt parametr are empty')
  }

  return promptTemplate.optionValue.replace('{{input}}', text)
}
