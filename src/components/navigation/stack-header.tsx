import { StackHeaderProps } from '@react-navigation/stack'
import { FunctionComponent } from 'react'
import { Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import { tw } from '../../lib'
import { ArrowIcon } from '../icon/arrow'
import { HeaderButton } from './header-button'

export const StackHeader: FunctionComponent<StackHeaderProps> = ({
  back,
  navigation,
  options,
  route
}) => (
  <SafeAreaView edges={['top']} style={tw`bg-white border-b border-gray-200`}>
    <View style={tw`p-3`}>
      <Text style={tw`text-base text-center text-black font-blender-medium`}>
        {options.title ?? route.name}
      </Text>

      {(back || options.headerLeft) && (
        <View style={tw`absolute bottom-0 left-0 z-10 flex-row`}>
          {back && (
            <HeaderButton
              icon={<ArrowIcon direction="left" size={20} />}
              onPress={navigation.goBack}
            />
          )}

          {options.headerLeft?.({
            canGoBack: navigation.canGoBack()
          })}
        </View>
      )}

      {options.headerRight && (
        <View style={tw`absolute bottom-0 right-0 z-10 flex-row`}>
          {options.headerRight({})}
        </View>
      )}
    </View>
  </SafeAreaView>
)
