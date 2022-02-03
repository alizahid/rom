import { BottomTabBarProps } from '@react-navigation/bottom-tabs'
import { FunctionComponent } from 'react'
import { View } from 'react-native'

import { tw } from '../../lib'
import { TabButton } from './tab-button'

export const TabBar: FunctionComponent<BottomTabBarProps> = ({
  navigation,
  state
}) => (
  <View style={tw`flex-row bg-white border-t border-gray-200`}>
    {state.routes.map((route, index) => (
      <TabButton
        index={index}
        key={route.key}
        navigation={navigation}
        route={route}
        state={state}
      />
    ))}
  </View>
)
