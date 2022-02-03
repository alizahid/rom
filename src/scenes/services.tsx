import { StackScreenProps } from '@react-navigation/stack'
import { FunctionComponent } from 'react'
import { FlatList, Pressable } from 'react-native'

import { Loading, Refresher, Separator, ServiceCard } from '../components'
import { useOwners, useServices } from '../hooks'
import { tw } from '../lib'
import { ServicesParamList } from '../navigators'

type Props = StackScreenProps<ServicesParamList, 'List'>

export const Services: FunctionComponent<Props> = ({ navigation }) => {
  const { loading, reload, reloading, services } = useServices()
  const { owners } = useOwners()

  if (loading) {
    return <Loading />
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
