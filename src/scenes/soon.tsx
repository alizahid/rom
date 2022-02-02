import { FunctionComponent } from 'react'
import { Text, View } from 'react-native'

import { tw } from '../lib'

export const Soon: FunctionComponent = () => (
  <View style={tw`items-center justify-center flex-1 p-8`}>
    <Text style={tw`text-sm text-center text-black font-render-medium`}>
      This feature is not available through the API yet.
    </Text>
  </View>
)
