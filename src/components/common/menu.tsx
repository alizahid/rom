import { FunctionComponent, ReactElement } from 'react'
import {
  FlatList,
  Pressable,
  StyleProp,
  Text,
  TextStyle,
  ViewStyle
} from 'react-native'

import { tw } from '../../lib'
import { Separator } from './separator'

export type MenuItem = {
  icon?: ReactElement
  label: string
  labelStyle?: StyleProp<TextStyle>

  onPress: () => void
}

type Props = {
  header?: ReactElement
  items: Array<MenuItem>
  style?: StyleProp<ViewStyle>
}

export const Menu: FunctionComponent<Props> = ({ header, items, style }) => (
  <FlatList
    ItemSeparatorComponent={Separator}
    ListHeaderComponent={header}
    data={items}
    keyExtractor={({ label }) => label}
    renderItem={({ item }) => (
      <Pressable onPress={item.onPress} style={tw`flex-row p-3`}>
        {item.icon}

        <Text
          style={[
            tw.style('text-base font-blender-regular', !!item.icon && 'ml-2'),
            item.labelStyle
          ]}>
          {item.label}
        </Text>
      </Pressable>
    )}
    style={style}
  />
)
