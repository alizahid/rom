import { MaterialTopTabScreenProps } from '@react-navigation/material-top-tabs'
import { useFocusEffect } from '@react-navigation/native'
import { FunctionComponent } from 'react'
import { FlatList } from 'react-native'

import {
  EnvVarCard,
  EnvVarForm,
  Loading,
  Message,
  Refresher,
  Separator
} from '../../components'
import { useEnvVars } from '../../hooks'
import { tw } from '../../lib'
import { ServiceParamList } from '../../navigators'

type Props = MaterialTopTabScreenProps<ServiceParamList, 'EnvironmentVariables'>

export const ServiceEnvironmentVariables: FunctionComponent<Props> = ({
  navigation,
  route
}) => {
  const serviceId = route.params.id

  const { envVars, error, loading, reload, reloading } = useEnvVars(serviceId)

  useFocusEffect(() => {
    navigation.getParent()?.setOptions({
      headerRight: () => <EnvVarForm serviceId={serviceId} style={tw`m-3`} />
    })

    return () => {
      navigation.getParent()?.setOptions({
        headerRight: null
      })
    }
  })

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
      ListEmptyComponent={
        <Message
          big
          message="No environment variables found for this service"
        />
      }
      contentContainerStyle={tw`flex-grow`}
      data={envVars}
      keyExtractor={({ id }) => id}
      refreshControl={<Refresher onRefresh={reload} refreshing={reloading} />}
      renderItem={({ item }) => (
        <EnvVarCard item={item} serviceId={serviceId} />
      )}
    />
  )
}
