import { FunctionComponent } from 'react'
import { Text, View } from 'react-native'

import { tw } from '../../lib'
import { Modal } from '../modal'
import { ModalButton, ModalButtonType } from '../modal/button'

type Props = {
  loading?: boolean
  message: string
  noType?: ModalButtonType
  title: string
  visible: boolean
  yesType?: ModalButtonType

  onClose: () => void
  onNo?: () => unknown | Promise<unknown>
  onYes?: () => unknown | Promise<unknown>
}

export const ConfirmDialog: FunctionComponent<Props> = ({
  loading,
  message,
  noType = 'neutral',
  onClose,
  onNo,
  onYes,
  title,
  visible,
  yesType = 'bad'
}) => (
  <Modal
    footer={
      <View style={tw`flex-row`}>
        <ModalButton
          label="No"
          onPress={async () => {
            await onNo?.()

            onClose()
          }}
          type={noType}
        />

        <ModalButton
          label="Yes"
          loading={loading}
          onPress={async () => {
            await onYes?.()

            onClose()
          }}
          type={yesType}
        />
      </View>
    }
    header={
      <View style={tw`p-4`}>
        <Text style={tw`text-base text-center font-blender-bold`}>{title}</Text>
      </View>
    }
    onClose={onClose}
    visible={visible}>
    <View style={tw`p-4`}>
      <Text style={tw`text-base text-center font-blender-regular`}>
        {message}
      </Text>
    </View>
  </Modal>
)
