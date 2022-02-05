import { FunctionComponent, useState } from 'react'
import { Pressable, StyleProp, Text, View, ViewStyle } from 'react-native'

import { useUpdateEnvVars } from '../../hooks/env/update'
import { tw } from '../../lib'
import { EnvVar } from '../../types'
import { Icon } from '../common/icon/icon'
import { Input } from '../common/input'
import { Modal } from '../common/modal'
import { ModalButton } from '../common/modal/button'
import { Switch } from '../common/switch'

type Props = {
  item?: EnvVar
  serviceId: string
  style?: StyleProp<ViewStyle>
}

export const EnvVarForm: FunctionComponent<Props> = ({
  item,
  serviceId,
  style
}) => {
  const { loading, updateEnvVars } = useUpdateEnvVars(serviceId)

  const [visible, setVisible] = useState(false)

  const [key, setKey] = useState(item?.key ?? '')
  const [value, setValue] = useState(item?.value ?? '')
  const [generateValue, setGenerateValue] = useState(false)

  return (
    <>
      <Pressable onPress={() => setVisible(true)} style={style}>
        <Icon
          color={tw.color(item ? 'gray-400' : 'black')}
          name={item ? 'edit' : 'add'}
          size={item ? 16 : 20}
        />
      </Pressable>

      <Modal onClose={() => setVisible(false)} visible={visible}>
        <View style={tw`p-4`}>
          <Text style={tw`text-base text-center font-blender-bold`}>
            {item ? `Edit ${item.key}` : 'Add env var'}
          </Text>
        </View>

        <View style={tw`p-4 border-t border-b border-gray-100`}>
          <Input
            autoCapitalize="none"
            autoCompleteType="off"
            autoCorrect={false}
            editable={!item}
            label="Key"
            onChangeText={setKey}
            placeholder="SECRET_TOKEN"
            styleInput={tw`font-blender-mono`}
            value={key}
          />

          <Switch
            label="Generate value?"
            onChange={setGenerateValue}
            style={tw`mt-4`}
            styleLabel={tw`text-sm text-gray-600 font-blender-medium`}
            value={generateValue}
          />

          {!generateValue && (
            <Input
              autoCapitalize="none"
              autoCompleteType="off"
              autoCorrect={false}
              label="Value"
              multiline
              onChangeText={setValue}
              placeholder="U2I*X*k@H@*16"
              style={tw`mt-4`}
              styleInput={tw`font-blender-mono`}
              value={value}
            />
          )}
        </View>

        <View style={tw`flex-row`}>
          <ModalButton label="Cancel" onPress={() => setVisible(false)} />

          <ModalButton
            label={item ? 'Save' : 'Add'}
            loading={loading}
            onPress={async () => {
              await updateEnvVars(
                generateValue
                  ? {
                      generateValue,
                      key
                    }
                  : {
                      key,
                      value
                    }
              )

              setVisible(false)
            }}
            type="good"
          />
        </View>
      </Modal>
    </>
  )
}
