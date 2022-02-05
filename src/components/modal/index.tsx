import { FunctionComponent, ReactElement } from 'react'
import {
  KeyboardAvoidingView,
  Modal as ModalView,
  ScrollView,
  View
} from 'react-native'

import { tw } from '../../lib'

type Props = {
  footer?: ReactElement
  header?: ReactElement
  visible: boolean

  onClose: () => void
}

export const Modal: FunctionComponent<Props> = ({
  children,
  footer,
  header,
  onClose,
  visible
}) => (
  <ModalView
    animationType="fade"
    onRequestClose={onClose}
    transparent
    visible={visible}>
    <KeyboardAvoidingView behavior="padding" enabled style={tw`flex-1`}>
      <View
        style={tw`items-center justify-center flex-1 p-4 bg-black bg-opacity-50`}>
        <View style={tw`w-full bg-white rounded-lg`}>
          {header}

          <ScrollView
            style={tw.style(
              'border-gray-100',
              header && 'border-t',
              footer && 'border-b'
            )}>
            {children}
          </ScrollView>

          {footer}
        </View>
      </View>
    </KeyboardAvoidingView>
  </ModalView>
)
