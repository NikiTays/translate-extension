import { TProviders } from '../types/providers.type'

export const TProvidersActionTypes = {
  [TProviders.CHAT_GPT]: {
    TRANSLATE: {
      name: {
        type: 'input',
        isRequired: true,
      },
      description: {
        type: 'input',
        isRequired: false,
      },
      model: {
        type: 'select',
        selectFrom: ['gpt-3.5-turbo', 'default-chatgpt'],
        isRequired: true,
      },
      translateTo: {
        type: 'select',
        selectFrom: ['ru', 'en', 'ua'],
        isRequired: true,
      },
    },
    REQUEST_PROMPT_ANSWER: {
      name: {
        type: 'input',
        isRequired: true,
      },
      description: {
        type: 'input',
        isRequired: false,
      },
      model: {
        type: 'select',
        selectFrom: ['gpt-3.5-turbo', 'default-chatgpt'],
        isRequired: true,
      },
      promptTemplate: {
        type: 'input',
        selectFrom: ['ru', 'en', 'ua'],
        isRequired: true,
      },
    },
  },
  [TProviders.GOOGLE_TRANSLATE]: {
    TRANSLATE: {
      name: {
        type: 'input',
        isRequired: true,
      },
      description: {
        type: 'input',
        isRequired: false,
      },
      translateFrom: {
        type: 'select',
        selectFrom: ['ru', 'en', 'ua'],
        isRequired: true,
      },
      translateTo: {
        type: 'select',
        selectFrom: ['ru', 'en', 'ua'],
        isRequired: true,
      },
    },
  },
}
