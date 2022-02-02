import { StackScreenProps } from '@react-navigation/stack'
import { FunctionComponent } from 'react'
import { ScrollView, Text, View } from 'react-native'

import { ArrowIcon, ExpandIcon } from '../components'
import { ArrowDirection } from '../components/common/icon/arrow'
import { ExpandDirection } from '../components/common/icon/expand'
import { tw } from '../lib'
import { MainParamList } from '../navigators'

type Props = StackScreenProps<MainParamList, 'Settings'>

export const Settings: FunctionComponent<Props> = () => {
  return (
    <ScrollView>
      <View>
        {['up', 'down', 'left', 'right'].map((direction) => (
          <View key={direction} style={tw`flex-row items-center m-3`}>
            <ExpandIcon direction={direction as ExpandDirection} />
            <Text style={tw`ml-3 text-sm font-render-regular`}>
              {direction}
            </Text>
          </View>
        ))}
      </View>

      <View style={tw`mt-6`}>
        {['up', 'down', 'left', 'right'].map((direction) => (
          <View key={direction} style={tw`flex-row items-center m-3`}>
            <ArrowIcon direction={direction as ArrowDirection} />
            <Text style={tw`ml-3 text-sm font-render-regular`}>
              {direction}
            </Text>
          </View>
        ))}
      </View>
    </ScrollView>
  )
}
