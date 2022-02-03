import { StackScreenProps } from '@react-navigation/stack'
import { FunctionComponent } from 'react'
import { FlatList, Text, View } from 'react-native'

import { Avatar, Loading, Refresher, Separator } from '../components'
import { useOwners } from '../hooks'
import { tw } from '../lib'
import { MainParamList } from '../navigators'

type Props = StackScreenProps<MainParamList, 'Teams'>

export const Teams: FunctionComponent<Props> = () => {
  const { loading, owners, reload, reloading } = useOwners()

  if (loading) {
    return <Loading />
  }

  return (
    <FlatList
      ItemSeparatorComponent={Separator}
      data={owners}
      refreshControl={<Refresher onRefresh={reload} refreshing={reloading} />}
      renderItem={({ item }) => (
        <View style={tw`flex-row items-center p-4`}>
          <Avatar email={item.email} />

          <View style={tw`flex-1 ml-3`}>
            <Text style={tw`text-base text-black font-blender-medium`}>
              {item.name}
            </Text>

            <Text style={tw`text-sm text-gray-600 font-blender-regular`}>
              {item.email}
            </Text>
          </View>
        </View>
      )}
    />
  )
}
