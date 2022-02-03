import { StackScreenProps } from '@react-navigation/stack'
import { FunctionComponent } from 'react'
import { ScrollView, Text } from 'react-native'

import { useService } from '../hooks'
import { tw } from '../lib'
import { ServicesParamList } from '../navigators'

type Props = StackScreenProps<ServicesParamList, 'Service'>

export const Service: FunctionComponent<Props> = ({ route }) => {
  const { service } = useService(route.params.id)

  return (
    <ScrollView contentContainerStyle={tw`p-4`}>
      <Text style={tw`text-xs font-render-mono`}>
        {JSON.stringify(service, null, 2)}
      </Text>
    </ScrollView>
  )
}
