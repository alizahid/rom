import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { FunctionComponent } from 'react'
import { View } from 'react-native'

export type MainParamList = {
  Services: undefined
  Settings: undefined
}

const { Navigator, Screen } = createBottomTabNavigator<MainParamList>()

export const MainNavigator: FunctionComponent = () => (
  <Navigator>
    <Screen component={View} name="Services" />
    <Screen component={View} name="Settings" />
  </Navigator>
)
