import { StackScreenProps } from '@react-navigation/stack'
import compact from 'lodash/compact'
import { FunctionComponent } from 'react'
import { FlatList, Text, View } from 'react-native'

import { Loading, Refresher, Separator } from '../../components'
import { useOwners, useService } from '../../hooks'
import { tw } from '../../lib'
import { ServiceParamList } from '../../navigators'

type Props = StackScreenProps<ServiceParamList, 'Info'>

export const ServiceInfo: FunctionComponent<Props> = ({ route }) => {
  const { reload, reloading, service } = useService(route.params.id)
  const { owners } = useOwners()

  if (!service) {
    return <Loading />
  }

  const owner = owners?.find(({ id }) => id === service.ownerId)

  const data = [
    {
      label: 'Id',
      mono: true,
      selectable: true,
      value: service.id
    },
    {
      label: 'Slug',
      mono: true,
      selectable: true,
      value: service.slug
    },
    {
      label: 'Name',
      selectable: true,
      value: service.name
    },
    owner
      ? {
          label: 'Owner',
          value: owner.name
        }
      : undefined,
    {
      label: 'Git repo',
      selectable: true,
      value: service.repo
    },
    {
      label: 'Git branch',
      selectable: true,
      value: service.branch
    },
    {
      label: 'Type',
      mono: true,
      selectable: true,
      value: service.type
    },
    {
      label: 'Notify on fail',
      value: service.notifyOnFail
    },
    {
      label: 'Suspended',
      value: service.suspended ? `Suspended by ${service.suspenders[0]}` : 'No'
    },
    {
      label: 'Created',
      value: service.createdAt.toLocaleString('en-US', {
        dateStyle: 'medium',
        timeStyle: 'medium'
      })
    },
    {
      label: 'Updated',
      value: service.updatedAt.toLocaleString('en-US', {
        dateStyle: 'medium',
        timeStyle: 'medium'
      })
    }
  ]

  return (
    <FlatList
      ItemSeparatorComponent={Separator}
      data={compact(data)}
      keyExtractor={({ label }) => label}
      refreshControl={<Refresher onRefresh={reload} refreshing={reloading} />}
      renderItem={({ item }) => (
        <View style={tw`p-4`}>
          <Text style={tw`text-sm font-blender-medium`}>{item.label}</Text>

          <Text
            selectable={item.selectable}
            style={tw.style(
              'text-base mt-1',
              item.mono ? 'font-blender-mono' : 'font-blender-regular'
            )}>
            {item.value}
          </Text>
        </View>
      )}
    />
  )
}
