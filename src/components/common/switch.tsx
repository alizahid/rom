import { FunctionComponent } from 'react'
import {
  StyleProp,
  Switch as SwitchView,
  Text,
  TextStyle,
  View,
  ViewStyle
} from 'react-native'

import { tw } from '../../lib'

type Props = {
  label: string
  style?: StyleProp<ViewStyle>
  styleLabel?: StyleProp<TextStyle>
  value: boolean

  onChange: (value: boolean) => void
}

export const Switch: FunctionComponent<Props> = ({
  label,
  onChange,
  style,
  styleLabel,
  value
}) => (
  <View style={[tw`flex-row items-center`, style]}>
    <Text style={[tw`flex-1 text-base font-blender-regular`, styleLabel]}>
      {label}
    </Text>

    <SwitchView
      onValueChange={onChange}
      style={tw`ml-3`}
      trackColor={{
        true: tw.color('primary-600')
      }}
      value={value}
    />
  </View>
)
