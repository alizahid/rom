import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { FunctionComponent } from 'react'

import { TabBar, TabHeader } from '../components'
import { Settings, Soon } from '../scenes'
import { ServicesNavigator } from './services'

export type MainParamList = {
  Services: undefined
  Databases: undefined
  Settings: undefined
}

const { Navigator, Screen } = createBottomTabNavigator<MainParamList>()

export const MainNavigator: FunctionComponent = () => (
  <Navigator
    screenOptions={{
      header: TabHeader
    }}
    tabBar={TabBar}>
    <Screen
      component={ServicesNavigator}
      name="Services"
      options={{
        headerShown: false
      }}
    />
    <Screen component={Soon} name="Databases" />
    <Screen component={Settings} name="Settings" />
  </Navigator>
)
