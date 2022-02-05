import { MaterialTopTabScreenProps } from '@react-navigation/material-top-tabs'
import compact from 'lodash/compact'
import { FunctionComponent } from 'react'
import { FlatList, Text, View } from 'react-native'

import { Loading, Message, Refresher, Separator } from '../../components'
import { useOwners, useService } from '../../hooks'
import { tw } from '../../lib'
import { ServiceParamList } from '../../navigators'

type Props = MaterialTopTabScreenProps<ServiceParamList, 'Info'>

export const ServiceInfo: FunctionComponent<Props> = ({ route }) => {
  const { error, loading, reload, reloading, service } = useService(
    route.params.id
  )

  const { owners } = useOwners()

  if (loading) {
    return <Loading />
  }

  if (error || !service) {
    return (
      <Message
        action={{
          label: 'Reload',
          loading: reloading,
          onPress: reload
        }}
        big
        message={error}
        type="error"
      />
    )
  }

  const owner = owners?.find(({ id }) => id === service.ownerId)

  const data = compact([
    {
      label: 'Id',
      mono: true,
      value: service.id
    },
    {
      label: 'Slug',
      mono: true,
      value: service.slug
    },
    {
      label: 'Name',
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
      mono: true,
      value: service.repo
    },
    {
      label: 'Git branch',
      mono: true,
      value: service.branch
    },
    {
      label: 'Type',
      mono: true,
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
  ])

  return (
    <FlatList
      ItemSeparatorComponent={Separator}
      data={data}
      keyExtractor={({ label }) => label}
      refreshControl={<Refresher onRefresh={reload} refreshing={reloading} />}
      renderItem={({ item }) => (
        <View style={tw`p-4`}>
          <Text style={tw`text-sm text-gray-600 font-blender-medium`}>
            {item.label}
          </Text>

          <Text
            selectable
            style={tw.style(
              'text-base mt-1 text-black',
              item.mono ? 'font-blender-mono' : 'font-blender-regular'
            )}>
            {item.value}
          </Text>
        </View>
      )}
    />
  )
}
