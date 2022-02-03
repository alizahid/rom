import { createStackNavigator } from '@react-navigation/stack'
import { FunctionComponent } from 'react'
import { useSafeAreaFrame } from 'react-native-safe-area-context'

import { StackHeader } from '../components'
import { Services } from '../scenes'
import { ServiceNavigator } from './service'

export type ServicesParamList = {
  List: undefined
  Details: {
    id: string
  }
}

const { Navigator, Screen } = createStackNavigator<ServicesParamList>()

export const ServicesNavigator: FunctionComponent = () => {
  const { width } = useSafeAreaFrame()

  return (
    <Navigator
      screenOptions={{
        gestureResponseDistance: width,
        header: StackHeader
      }}>
      <Screen
        component={Services}
        name="List"
        options={{
          title: 'Services'
        }}
      />
      <Screen
        component={ServiceNavigator}
        name="Details"
        options={{
          title: 'Service'
        }}
      />
    </Navigator>
  )
}
