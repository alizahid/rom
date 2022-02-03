import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import { StackScreenProps } from '@react-navigation/stack'
import { FunctionComponent } from 'react'
import { useSafeAreaFrame } from 'react-native-safe-area-context'

import { TopTabBar } from '../components/navigation/top-tab-bar'
import { useService } from '../hooks'
import { ServiceInfo, Soon } from '../scenes'
import { ServicesParamList } from './services'

type Params = {
  id: string
}

export type ServiceParamList = {
  Info: Params
  Scaling: Params
  EnvironmentVariables: Params
  Headers: Params
  Routes: Params
  Danger: Params
}

const { Navigator, Screen } = createMaterialTopTabNavigator<ServiceParamList>()

type Props = StackScreenProps<ServicesParamList, 'Details'>

export const ServiceNavigator: FunctionComponent<Props> = ({ route }) => {
  const { width } = useSafeAreaFrame()

  const id = route.params.id

  const { service } = useService(id)

  const params = {
    id
  }

  const hasScaling =
    service?.type &&
    ['web_service', 'private_service', 'background_worker'].includes(
      service?.type
    )

  const hasHeaders = service?.type && ['static_site'].includes(service?.type)

  const hasRoutes = service?.type && ['static_site'].includes(service?.type)

  return (
    <Navigator
      initialLayout={{
        width
      }}
      screenOptions={{
        lazy: true
      }}
      tabBar={(props) => <TopTabBar {...props} />}>
      <Screen component={ServiceInfo} initialParams={params} name="Info" />

      {hasScaling && (
        <Screen component={Soon} initialParams={params} name="Scaling" />
      )}

      <Screen
        component={Soon}
        initialParams={params}
        name="EnvironmentVariables"
        options={{
          title: 'Environment variables'
        }}
      />

      {hasHeaders && (
        <Screen component={Soon} initialParams={params} name="Headers" />
      )}

      {hasRoutes && (
        <Screen component={Soon} initialParams={params} name="Routes" />
      )}

      <Screen component={Soon} initialParams={params} name="Danger" />
    </Navigator>
  )
}
