import { MaterialTopTabScreenProps } from '@react-navigation/material-top-tabs'
import { FunctionComponent } from 'react'
import { Text } from 'react-native'

import { Loading, Message } from '../../components'
import { useService } from '../../hooks'
import { tw } from '../../lib'
import { ServiceParamList } from '../../navigators'

type Props = MaterialTopTabScreenProps<ServiceParamList, 'Scaling'>

export const ServiceScaling: FunctionComponent<Props> = ({ route }) => {
  const { error, loading, service } = useService(route.params.id)

  if (loading) {
    return <Loading />
  }

  if (error || !service) {
    return <Message big message={error} type="error" />
  }

  return (
    <Text style={tw`m-4 text-base font-blender-regular`}>
      {service.serviceDetails.numInstances} instances
    </Text>
  )
}
