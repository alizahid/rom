import { FunctionComponent, useCallback, useRef, useState } from 'react'
import {
  Pressable,
  StyleProp,
  Text,
  TextInput,
  View,
  ViewStyle
} from 'react-native'

import { useUpdateEnvVars } from '../../hooks/env/update'
import { tw } from '../../lib'
import { EnvVar, EnvVarInput } from '../../types'
import { Input } from '../common/input'
import { Switch } from '../common/switch'
import { Icon } from '../icon/icon'
import { Modal } from '../modal'
import { ModalButton } from '../modal/button'

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

  const keyRef = useRef<TextInput>(null)
  const valueRef = useRef<TextInput>(null)

  const [key, setKey] = useState(item?.key ?? '')
  const [value, setValue] = useState(item?.value ?? '')
  const [generateValue, setGenerateValue] = useState(false)

  const submit = useCallback(async () => {
    if (loading) {
      return
    }

    if (!key) {
      return keyRef.current?.focus()
    }

    if (!generateValue && !value) {
      return valueRef.current?.focus()
    }

    const data: EnvVarInput = generateValue
      ? {
          generateValue,
          key
        }
      : {
          key,
          value
        }

    await updateEnvVars(data)

    setVisible(false)
  }, [generateValue, key, loading, updateEnvVars, value])

  return (
    <>
      <Pressable onPress={() => setVisible(true)} style={style}>
        <Icon
          color={tw.color(item ? 'gray-400' : 'black')}
          name={item ? 'edit' : 'add'}
          size={item ? 16 : 20}
        />
      </Pressable>

      <Modal
        footer={
          <View style={tw`flex-row`}>
            <ModalButton label="Cancel" onPress={() => setVisible(false)} />

            <ModalButton
              label={item ? 'Save' : 'Add'}
              loading={loading}
              onPress={submit}
              type="good"
            />
          </View>
        }
        header={
          <View style={tw`p-4`}>
            <Text style={tw`text-base text-center font-blender-bold`}>
              {item ? `Edit ${item.key}` : 'Add env var'}
            </Text>
          </View>
        }
        onClose={() => setVisible(false)}
        visible={visible}>
        <View style={tw`p-4`}>
          <Input
            autoCapitalize="none"
            autoCompleteType="off"
            autoCorrect={false}
            editable={!item}
            label="Key"
            onChangeText={setKey}
            onSubmitEditing={() => valueRef.current?.focus()}
            placeholder="SECRET_TOKEN"
            ref={keyRef}
            returnKeyType="next"
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
              ref={valueRef}
              style={tw`mt-4`}
              styleInput={tw`h-48 font-blender-mono`}
              value={value}
            />
          )}
        </View>
      </Modal>
    </>
  )
}
