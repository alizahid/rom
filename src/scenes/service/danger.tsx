import { MaterialTopTabScreenProps } from '@react-navigation/material-top-tabs'
import { FunctionComponent } from 'react'

import { Loading, Message, ServiceDangerCard } from '../../components'
import { useService } from '../../hooks'
import { ServiceParamList } from '../../navigators'

type Props = MaterialTopTabScreenProps<ServiceParamList, 'Danger'>

export const ServiceDanger: FunctionComponent<Props> = ({ route }) => {
  const { error, loading, service } = useService(route.params.id)

  if (loading) {
    return <Loading />
  }

  if (error || !service) {
    return <Message big message={error} type="error" />
  }

  return <ServiceDangerCard service={service} />
}
