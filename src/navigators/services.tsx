import { createStackNavigator } from '@react-navigation/stack'
import { FunctionComponent } from 'react'
import { useSafeAreaFrame } from 'react-native-safe-area-context'

import { StackHeader } from '../components'
import { Service, Services } from '../scenes'

export type ServicesParamList = {
  List: undefined
  Service: {
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
      <Screen component={Service} name="Service" />
    </Navigator>
  )
}
