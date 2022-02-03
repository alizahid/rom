import { StackScreenProps } from '@react-navigation/stack'
import * as Linking from 'expo-linking'
import { FunctionComponent } from 'react'
import { Text, View } from 'react-native'

import { Avatar, Icon, Spinner } from '../components'
import { Menu } from '../components/common/menu'
import { useProfile } from '../hooks'
import { tw } from '../lib'
import { MainParamList } from '../navigators'
import { useAuth } from '../stores'

type Props = StackScreenProps<MainParamList, 'Settings'>

export const Settings: FunctionComponent<Props> = () => {
  const [, { signOut }] = useAuth()

  const { profile } = useProfile()

  return (
    <Menu
      header={
        <View style={tw`flex-row items-center p-4 border-b border-gray-100`}>
          {profile ? (
            <>
              <Avatar email={profile.email} />

              <View style={tw`flex-1 ml-3`}>
                <Text style={tw`text-base text-black font-blender-medium`}>
                  {profile.name}
                </Text>

                <Text style={tw`text-sm text-gray-600 font-blender-regular`}>
                  {profile.email}
                </Text>
              </View>
            </>
          ) : (
            <Spinner />
          )}
        </View>
      }
      items={[
        {
          icon: <Icon name="about" />,
          label: 'About',
          onPress: () => Linking.openURL('https://blender.onrender.com')
        },
        {
          icon: <Icon name="exit" />,
          label: 'Sign out',
          onPress: () => signOut()
        }
      ]}
    />
  )
}
