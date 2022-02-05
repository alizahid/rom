import { FunctionComponent, useState } from 'react'
import { Pressable, Text, View } from 'react-native'

import { tw } from '../../lib'
import { EnvVar } from '../../types'
import { Icon } from '../common/icon/icon'
import { EnvVarForm } from './form'

type Props = {
  item: EnvVar
  serviceId: string
}

export const EnvVarCard: FunctionComponent<Props> = ({ item, serviceId }) => {
  const [visible, setVisible] = useState(false)

  return (
    <View style={tw`flex-row items-stretch`}>
      <View style={tw`flex-1 p-4`}>
        <Text selectable style={tw`text-sm text-gray-600 font-blender-mono`}>
          {item.key}
        </Text>

        <Text
          selectable
          style={tw`mt-1 text-base text-black font-blender-mono`}>
          {visible ? item.value : '●●●●●●'}
        </Text>
      </View>

      <View style={tw`flex-row`}>
        <EnvVarForm
          item={item}
          serviceId={serviceId}
          style={tw`justify-center px-4`}
        />

        <Pressable
          onPress={() => setVisible(!visible)}
          style={tw`justify-center px-4`}>
          <Icon
            color={tw.color('gray-400')}
            name={visible ? 'visible' : 'invisible'}
            size={16}
          />
        </Pressable>
      </View>
    </View>
  )
}
