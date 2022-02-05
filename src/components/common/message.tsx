import { FunctionComponent } from 'react'
import { StyleProp, Text, View, ViewStyle } from 'react-native'

import { tw } from '../../lib'
import { Button } from '../common/button'
import { MessageIcon } from '../icon/message'

export type MessageType = 'message' | 'error' | 'success' | 'warning'

export type MessageAction = {
  label: string
  loading?: boolean

  onPress: () => unknown
}

type Props = {
  action?: MessageAction
  big?: boolean
  message?: string
  style?: StyleProp<ViewStyle>
  type?: MessageType
}

export const Message: FunctionComponent<Props> = ({
  action,
  big = false,
  message = 'Something went wrong',
  style,
  type = 'message'
}) => (
  <View
    style={[
      tw.style(
        big
          ? 'flex-1 p-4 items-center justify-center'
          : 'flex-row p-3 rounded-lg items-center',
        !big &&
          (type === 'error'
            ? 'bg-rose-100'
            : type === 'success'
            ? 'bg-emerald-100'
            : type === 'warning'
            ? 'bg-amber-100'
            : 'bg-sky-100')
      ),
      style
    ]}>
    <MessageIcon
      color={tw.color(
        type === 'error'
          ? 'rose-600'
          : type === 'success'
          ? 'emerald-600'
          : type === 'warning'
          ? 'amber-600'
          : 'sky-600'
      )}
      name={type}
      size={big ? 64 : 24}
    />

    <Text
      style={tw.style(
        'text-base text-black font-blender-medium',
        big ? 'mt-2 text-center' : 'flex-1 ml-2'
      )}>
      {message}
    </Text>

    {big && action && (
      <Button
        loading={action.loading}
        onPress={action.onPress}
        style={tw`mt-2`}
        title={action.label}
      />
    )}
  </View>
)
