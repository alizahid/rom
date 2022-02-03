import { StackScreenProps } from '@react-navigation/stack'
import { FunctionComponent } from 'react'
import { ScrollView, Text, View } from 'react-native'

import {
  ArrowDirection,
  ArrowIcon,
  ArrowType
} from '../components/common/icon/arrow'
import { tw } from '../lib'
import { MainParamList } from '../navigators'

type Props = StackScreenProps<MainParamList, 'Settings'>

export const Settings: FunctionComponent<Props> = () => (
  <ScrollView>
    {['arrow', 'expand'].map((type) => (
      <View key={type} style={tw`flex-row`}>
        {['up', 'down', 'left', 'right'].map((direction) => (
          <View
            key={direction}
            style={tw`flex-row items-center p-2 m-2 bg-gray-100 rounded-lg`}>
            <ArrowIcon
              direction={direction as ArrowDirection}
              size={20}
              type={type as ArrowType}
            />

            <Text style={tw`ml-2 text-sm font-blender-regular`}>
              {direction}
            </Text>
          </View>
        ))}
      </View>
    ))}
  </ScrollView>
)
