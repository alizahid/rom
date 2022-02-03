import { FunctionComponent } from 'react'
import { View } from 'react-native'

import { tw } from '../../lib'
import { Spinner } from './spinner'

export const Loading: FunctionComponent = () => (
  <View style={tw`items-center justify-center flex-1`}>
    <Spinner size="large" />
  </View>
)
