import { BottomTabHeaderProps } from '@react-navigation/bottom-tabs'
import { FunctionComponent } from 'react'
import { Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import { tw } from '../../lib'

export const TabHeader: FunctionComponent<BottomTabHeaderProps> = ({
  options,
  route
}) => (
  <SafeAreaView edges={['top']} style={tw`bg-white border-b border-gray-200`}>
    <View style={tw`p-3`}>
      <Text style={tw`text-base text-center text-black font-render-medium`}>
        {options.title ?? route.name}
      </Text>

      {options.headerRight && (
        <View style={tw`absolute bottom-0 right-0 z-10 flex-row`}>
          {options.headerRight({})}
        </View>
      )}
    </View>
  </SafeAreaView>
)
