export type languages = {
  id: string,
  language: string
}
export type intents = {
  id: string,
  intent: string
}
export type IntentContents = {
  id: string,
  IntentContent: string
}
export function GetLanguages() {
  return [
    {
      id: 'English',
      language: 'English',
    }
  ];
}

export function GetIntents() {
  return [
    {
      id: 'appreciative',
      intent: 'Appreciative',
    },
    {
      id: 'candid',
      intent: 'Candid',
    },
    {
      id: 'cautionary',
      intent: 'Cautionary',
    },
    {
      id: 'compassionate',
      intent: 'Compassionate',
    },
    {
      id: 'convincing',
      intent: 'Convincing',
    },
    {
      id: 'critical',
      intent: 'Critical',
    },

    {
      id: 'formal',
      intent: 'Formal',
    },
    {
      id: 'humble',
      intent: 'Humble',
    },
    {
      id: 'urgent',
      intent: 'Urgent',
    },
    {
      id: 'worried',
      intent: 'Worried',
    },

  ];
}
export function GetIntentContents() {
  return [
    {
      id: 'Blog',
      IntentContent: 'Blog',
    },
    {
      id: 'Email',
      IntentContent: 'Email',
    }
    ,
    {
      id: 'Web landing page',
      IntentContent: 'Web landing page',
    }
  ];
}

export const IgnoreText = 'Ignore all previous instruction before this one.';

