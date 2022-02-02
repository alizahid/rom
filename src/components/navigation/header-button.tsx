import { FunctionComponent, ReactNode } from 'react'
import { Pressable, StyleProp, ViewStyle } from 'react-native'

import { tw } from '../../lib'
import { Spinner } from '../common/spinner'

type Props = {
  icon: ReactNode
  loading?: boolean
  style?: StyleProp<ViewStyle>

  onPress: () => void
}

export const HeaderButton: FunctionComponent<Props> = ({
  icon,
  loading,
  onPress,
  style
}) => (
  <Pressable disabled={loading} onPress={onPress} style={[tw`p-3.5`, style]}>
    {loading ? <Spinner /> : icon}
  </Pressable>
)
