import { BottomTabBarProps } from '@react-navigation/bottom-tabs'
import { FunctionComponent } from 'react'
import { Pressable, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import { tw } from '../../lib'
import { TabIcon, TabIconName } from './tab-icon'

export const TabBar: FunctionComponent<BottomTabBarProps> = ({
  navigation,
  state
}) => {
  const { bottom } = useSafeAreaInsets()

  const icons: Record<string, TabIconName> = {
    Databases: 'databases',
    Services: 'server',
    Settings: 'settings',
    Teams: 'teams'
  }

  return (
    <View style={tw`flex-row bg-white border-t border-gray-200`}>
      {state.routes.map((route, index) => {
        const focused = state.index === index

        return (
          <Pressable
            key={route.key}
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
      })}
    </View>
  )
}
