import { FunctionComponent } from 'react'
import { Pressable, Text } from 'react-native'

import { tw } from '../../../lib'
import { Spinner } from '../spinner'

export type ModalButtonProps = {
  label: string
  loading?: boolean
  type?: 'good' | 'bad' | 'neutral'

  onPress: () => unknown
}

export const ModalButton: FunctionComponent<ModalButtonProps> = ({
  label,
  loading,
  onPress,
  type = 'neutral'
}) => (
  <Pressable
    disabled={loading}
    onPress={onPress}
    style={tw`flex-row items-center justify-center flex-1 p-4`}>
    <Text
      style={tw.style(
        'font-blender-bold text-sm',
        type === 'good'
          ? 'text-emerald-600'
          : type === 'bad'
          ? 'text-rose-600'
          : 'text-gray-600'
      )}>
      {label}
    </Text>

    {loading && <Spinner style={tw`ml-3`} />}
  </Pressable>
)
