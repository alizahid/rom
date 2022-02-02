import { FunctionComponent } from 'react'
import { Text, View } from 'react-native'

import { tw } from '../../lib'
import { Service } from '../../types'

type Props = {
  item: Service
}

export const ServiceCard: FunctionComponent<Props> = ({ item }) => (
  <View style={tw`flex-row`}>
    <View style={tw`flex-1`}>
      <Text style={tw`text-base text-black font-render-medium`}>
        {item.name}
      </Text>

      <View style={tw`flex-row my-2`}>
        <Text style={tw`text-sm text-gray-600 font-render-regular`}>
          {item.type}
        </Text>

        {item.type !== 'static_site' && (
          <Text style={tw`ml-2 text-sm text-gray-600 font-render-regular`}>
            {item.serviceDetails.env}
          </Text>
        )}
      </View>

      <Text style={tw`text-xs text-gray-400 font-render-regular`}>
        Updated on{' '}
        {item.updatedAt.toLocaleString('en-US', {
          dateStyle: 'medium',
          timeStyle: 'medium'
        })}
      </Text>
    </View>

    <View
      style={tw.style(
        'w-3 h-3 rounded-full ml-4',
        item.suspended ? 'bg-rose-400' : 'bg-emerald-400'
      )}
    />
  </View>
)
