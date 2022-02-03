import { MaterialTopTabBarProps } from '@react-navigation/material-top-tabs'
import { FunctionComponent, useEffect, useRef } from 'react'
import { FlatList, Pressable, Text, View } from 'react-native'

import { tw } from '../../lib'

export const TopTabBar: FunctionComponent<MaterialTopTabBarProps> = ({
  descriptors,
  navigation,
  state
}) => {
  const list = useRef<FlatList>(null)

  useEffect(() => {
    list.current?.scrollToIndex({
      index: state.index
    })
  }, [state.index])

  return (
    <View style={tw`border-b border-gray-200`}>
      <FlatList
        data={state.routes}
        horizontal
        ref={list}
        renderItem={({ index, item }) => {
          const focused = state.index === index

          const { options } = descriptors[item.key]

          const title = options.title ?? item.name

          return (
            <Pressable
              onPress={() => {
                const event = navigation.emit({
                  canPreventDefault: true,
                  target: item.key,
                  type: 'tabPress'
                })

                if (focused || event.defaultPrevented) {
                  return
                }

                navigation.navigate({
                  name: item.name,
                  params: {}
                })
              }}
              style={tw`p-2`}>
              <View
                style={tw.style('p-2 rounded-lg', focused && 'bg-primary-600')}>
                <Text
                  style={tw.style(
                    'text-sm font-blender-medium leading-tight',
                    focused ? 'text-white' : 'text-black'
                  )}>
                  {title}
                </Text>
              </View>
            </Pressable>
          )
        }}
      />
    </View>
  )
}
