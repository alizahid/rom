import Slider from '@react-native-community/slider'
import { FunctionComponent, useState } from 'react'
import { Text, View } from 'react-native'
import { useSafeAreaFrame } from 'react-native-safe-area-context'

import { useUpdateServiceScaling } from '../../hooks'
import { tw } from '../../lib'
import { Service, WebService } from '../../types'
import { Message } from '..'
import { Button } from '../common/button'

type Props = {
  service: Service
}

export const ServiceScalingCard: FunctionComponent<Props> = ({ service }) => {
  const { width } = useSafeAreaFrame()

  const { error, loading, success, updateScaling } = useUpdateServiceScaling(
    service.id
  )

  const [instances, setInstances] = useState(
    (service as WebService).serviceDetails.numInstances
  )

  return (
    <View style={tw`p-4`}>
      {error && <Message message={error} style={tw`mb-4`} type="error" />}

      {success && (
        <Message message="Instances updated!" style={tw`mb-4`} type="success" />
      )}

      <View style={tw`flex-row items-center justify-between`}>
        <Text style={tw`text-sm text-gray-600 font-blender-medium`}>
          Current
        </Text>
        <Text style={tw`text-base text-black font-blender-mono`}>
          {(service as WebService).serviceDetails.numInstances}
        </Text>
      </View>

      <View style={tw`flex-row items-center justify-between mt-4`}>
        <Text style={tw`text-sm text-gray-600 font-blender-medium`}>
          Minimum
        </Text>
        <Text style={tw`text-base text-black font-blender-mono`}>1</Text>
      </View>

      <View style={tw`flex-row items-center justify-between mt-4`}>
        <Text style={tw`text-sm text-gray-600 font-blender-medium`}>
          Maximum
        </Text>
        <Text style={tw`text-base text-black font-blender-mono`}>50</Text>
      </View>

      <Slider
        maximumTrackTintColor={tw.color('gray-200')}
        maximumValue={50}
        minimumTrackTintColor={tw.color('primary-600')}
        minimumValue={1}
        onValueChange={setInstances}
        step={1}
        style={tw`mt-4 w-[${width - 32}px]`}
        tapToSeek
        value={instances}
      />

      <View style={tw`flex-row items-center justify-between mt-4`}>
        <Text style={tw`text-sm text-gray-600 font-blender-medium`}>Next</Text>
        <Text style={tw`text-base text-black font-blender-mono`}>
          {instances}
        </Text>
      </View>

      <Button
        loading={loading}
        onPress={() => updateScaling(instances)}
        style={tw`mt-4`}
        title="Save"
      />
    </View>
  )
}
