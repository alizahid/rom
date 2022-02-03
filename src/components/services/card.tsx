import { FunctionComponent } from 'react'
import { Text, View } from 'react-native'

import { tw } from '../../lib'
import { Owner, Service } from '../../types'

type Props = {
  item: Service
  owners?: Array<Owner>
}

export const ServiceCard: FunctionComponent<Props> = ({ item, owners }) => {
  const owner = owners?.find(({ id }) => id === item.ownerId)

  return (
    <View style={tw`flex-row`}>
      <View style={tw`flex-1`}>
        {owner && (
          <Text style={tw`text-xs text-gray-600 font-blender-medium`}>
            {owner.name}
          </Text>
        )}

        <Text style={tw`mt-2 text-base text-black font-blender-medium`}>
          {item.name}
        </Text>

        <View style={tw`flex-row mt-2`}>
          <View style={tw`p-1 bg-gray-100 rounded`}>
            <Text
              style={tw`text-xs leading-tight text-gray-600 font-blender-mono`}>
              {item.type}
            </Text>
          </View>

          {item.type !== 'static_site' && (
            <View style={tw`p-1 ml-2 bg-gray-100 rounded`}>
              <Text
                style={tw`text-xs leading-tight text-gray-600 font-blender-mono`}>
                {item.serviceDetails.env}
              </Text>
            </View>
          )}
        </View>

        <Text style={tw`mt-2 text-xs text-gray-400 font-blender-regular`}>
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
}
