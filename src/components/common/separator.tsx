import { FunctionComponent } from 'react'
import { View } from 'react-native'

import { tw } from '../../lib'

export const Separator: FunctionComponent = () => (
  <View style={tw`h-px bg-gray-100`} />
)
