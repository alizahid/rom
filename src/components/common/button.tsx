import { FunctionComponent } from 'react'
import {
  ButtonProps,
  Pressable,
  StyleProp,
  Text,
  TextStyle,
  ViewStyle
} from 'react-native'

import { tw } from '../../lib'

type Props = {
  style?: StyleProp<ViewStyle>
} & Pick<ButtonProps, 'disabled' | 'title' | 'onPress'>

export const Button: FunctionComponent<Props> = ({
  disabled,
  onPress,
  style,
  title
}) => (
  <Pressable
    disabled={disabled}
    onPress={onPress}
    style={({ pressed }) => [
      tw.style(
        'items-center justify-center h-12 rounded-lg bg-primary-600',
        pressed && 'bg-opacity-80'
      ),
      style
    ]}>
    <Text style={tw`text-base text-white font-rom-semibold`}>{title}</Text>
  </Pressable>
)
