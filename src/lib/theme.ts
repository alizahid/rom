import { Theme } from '@react-navigation/native'

import { tw } from './tailwind'

export const theme: Theme = {
  colors: {
    background: tw.color('white')!,
    border: tw.color('gray-200')!,
    card: tw.color('white')!,
    notification: tw.color('primary-600')!,
    primary: tw.color('primary-600')!,
    text: tw.color('black')!
  },
  dark: false
}
