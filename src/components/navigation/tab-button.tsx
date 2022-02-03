import { BottomTabNavigationEventMap } from '@react-navigation/bottom-tabs'
import {
  NavigationHelpers,
  ParamListBase,
  TabNavigationState
} from '@react-navigation/core'
import { FunctionComponent } from 'react'
import { Pressable } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import { tw } from '../../lib'
import { TabIcon, TabIconName } from './tab-icon'

type NavButtonProps = {
  index: number
  navigation: NavigationHelpers<ParamListBase, BottomTabNavigationEventMap>
  route: {
    key: string
    name: string
  }
  state: TabNavigationState<ParamListBase>
}

export const TabButton: FunctionComponent<NavButtonProps> = ({
  index,
  navigation,
  route,
  state
}) => {
  const { bottom } = useSafeAreaInsets()

  const focused = state.index === index

  const icons: Record<string, TabIconName> = {
    Databases: 'databases',
    Services: 'server',
    Settings: 'settings',
    Teams: 'teams'
  }

  return (
    <Pressable
      onPress={() => {
        const event = navigation.emit({
          canPreventDefault: true,
          target: route.key,
          type: 'tabPress'
        })

        if (focused || event.defaultPrevented) {
          return
        }

        navigation.navigate({
          name: route.name,
          params: {}
        })
      }}
      style={tw`items-center flex-1 p-4`}>
      <TabIcon
        focused={focused}
        name={icons[route.name]}
        style={tw`mb-[${bottom}px]`}
      />
    </Pressable>
  )
}
