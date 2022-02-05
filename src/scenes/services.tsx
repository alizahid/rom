import { StackScreenProps } from '@react-navigation/stack'
import { FunctionComponent } from 'react'
import { FlatList, Pressable } from 'react-native'

import {
  Loading,
  Message,
  Refresher,
  Separator,
  ServiceCard
} from '../components'
import { useOwners, useServices } from '../hooks'
import { tw } from '../lib'
import { ServicesParamList } from '../navigators'

type Props = StackScreenProps<ServicesParamList, 'List'>

export const Services: FunctionComponent<Props> = ({ navigation }) => {
  const { error, loading, reload, reloading, services } = useServices()
  const { owners } = useOwners()

  if (loading) {
    return <Loading />
  }

  if (error) {
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

  return (
    <FlatList
      ItemSeparatorComponent={Separator}
      data={services}
      refreshControl={<Refresher onRefresh={reload} refreshing={reloading} />}
      renderItem={({ item }) => (
        <Pressable
          onPress={() =>
            navigation.navigate('Details', {
              id: item.id
            })
          }
          style={tw`p-4`}>
          <ServiceCard item={item} owners={owners} />
        </Pressable>
      )}
    />
  )
}
