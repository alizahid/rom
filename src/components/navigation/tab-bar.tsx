import {
  BottomTabBarProps,
  BottomTabNavigationEventMap
} from '@react-navigation/bottom-tabs'
import {
  NavigationHelpers,
  ParamListBase,
  TabNavigationState
} from '@react-navigation/core'
import { FunctionComponent } from 'react'
import { Pressable, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import { tw } from '../../lib'
import { NavIcon, NavIconName } from './nav-icon'

export const TabBar: FunctionComponent<BottomTabBarProps> = ({
  navigation,
  state
}) => (
  <View style={tw`flex-row bg-white border-t border-gray-200`}>
    {state.routes.map((route, index) => (
      <NavButton
        index={index}
        key={route.key}
        navigation={navigation}
        route={route}
        state={state}
      />
    ))}
  </View>
)

type NavButtonProps = {
  index: number
  navigation: NavigationHelpers<ParamListBase, BottomTabNavigationEventMap>
  route: {
    key: string
    name: string
  }
  state: TabNavigationState<ParamListBase>
}

const NavButton: FunctionComponent<NavButtonProps> = ({
  index,
  navigation,
  route,
  state
}) => {
  const { bottom } = useSafeAreaInsets()

  const focused = state.index === index

  const icons: Record<string, NavIconName> = {
    Databases: 'databases',
    Services: 'server',
    Settings: 'settings'
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
      <NavIcon
        focused={focused}
        name={icons[route.name]}
        style={tw`mb-[${bottom}px]`}
      />
    </Pressable>
  )
}
