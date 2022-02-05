import { FunctionComponent } from 'react'
import { Modal as ModalView, View } from 'react-native'

import { tw } from '../../../lib'

type Props = {
  visible: boolean

  onClose: () => void
}

export const Modal: FunctionComponent<Props> = ({
  children,
  onClose,
  visible
}) => (
  <ModalView
    animationType="fade"
    onRequestClose={onClose}
    transparent
    visible={visible}>
    <View
      style={tw`items-center justify-center flex-1 p-4 bg-black bg-opacity-50`}>
      <View style={tw`w-full bg-white rounded-lg`}>{children}</View>
    </View>
  </ModalView>
)
