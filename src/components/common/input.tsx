import { forwardRef, FunctionComponent } from 'react'
import { Text, TextInput, TextInputProps, View } from 'react-native'

import { tw } from '../../lib'

type Props = {
  label: string
} & Pick<
  TextInputProps,
  | 'keyboardType'
  | 'onChangeText'
  | 'onSubmitEditing'
  | 'placeholder'
  | 'returnKeyType'
  | 'secureTextEntry'
  | 'style'
  | 'value'
>

export const Input = forwardRef<TextInput, Props>(
  ({ label, style, ...props }, ref) => (
    <View style={style}>
      <Text style={tw`text-sm text-gray-600 font-render-medium`}>{label}</Text>

      <TextInput
        {...props}
        placeholderTextColor={tw.color('gray-600')}
        ref={ref}
        style={tw`w-full h-12 px-4 mt-2 text-base leading-tight bg-gray-100 rounded-lg font-render-regular`}
      />
    </View>
  )
)

Input.displayName = 'Input'
