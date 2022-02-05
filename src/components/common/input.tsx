import { forwardRef, useState } from 'react'
import {
  StyleProp,
  Text,
  TextInput,
  TextInputProps,
  TextStyle,
  View
} from 'react-native'

import { tw } from '../../lib'

type Props = {
  styleInput?: StyleProp<TextStyle>
  label: string
} & Pick<
  TextInputProps,
  | 'autoCapitalize'
  | 'autoCompleteType'
  | 'autoCorrect'
  | 'editable'
  | 'keyboardType'
  | 'multiline'
  | 'onChangeText'
  | 'onSubmitEditing'
  | 'placeholder'
  | 'returnKeyType'
  | 'secureTextEntry'
  | 'style'
  | 'value'
>

export const Input = forwardRef<TextInput, Props>(
  ({ label, style, styleInput, ...props }, ref) => {
    const [focused, setFocused] = useState(false)

    return (
      <View style={style}>
        <Text style={tw`text-sm text-gray-600 font-blender-medium`}>
          {label}
        </Text>

        <TextInput
          {...props}
          onBlur={() => setFocused(false)}
          onFocus={() => setFocused(true)}
          placeholderTextColor={tw.color('gray-400')}
          ref={ref}
          style={[
            tw.style(
              'w-full px-4 mt-2 text-base leading-tight rounded-lg font-blender-regular items-start justify-start',
              props.multiline ? 'h-48 py-4' : 'h-12',
              focused ? 'bg-gray-200' : 'bg-gray-100',
              props.editable === false && 'bg-gray-300 text-gray-600'
            ),
            styleInput
          ]}
          textAlignVertical="top"
        />
      </View>
    )
  }
)

Input.displayName = 'Input'
