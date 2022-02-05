import { FunctionComponent } from 'react'
import {
  ButtonProps,
  Pressable,
  StyleProp,
  Text,
  ViewStyle
} from 'react-native'

import { tw } from '../../lib'
import { Spinner } from './spinner'

type Props = {
  loading?: boolean
  style?: StyleProp<ViewStyle>
} & Pick<ButtonProps, 'disabled' | 'title' | 'onPress'>

export const Button: FunctionComponent<Props> = ({
  disabled,
  loading,
  onPress,
  style,
  title
}) => (
  <Pressable
    disabled={disabled}
    onPress={onPress}
    style={({ pressed }) => [
      tw.style(
        'items-center justify-center h-12 px-4 rounded-lg bg-primary-600 flex-row',
        pressed && 'bg-opacity-80'
      ),
      style
    ]}>
    <Text style={tw`text-base text-white font-blender-bold`}>{title}</Text>

    {loading && <Spinner light style={tw`ml-3`} />}
  </Pressable>
)
