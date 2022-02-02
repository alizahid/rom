import 'react-native-gesture-handler'

import { NavigationContainer } from '@react-navigation/native'
import AppLoading from 'expo-app-loading'
import { useFonts } from 'expo-font'
import { StatusBar } from 'expo-status-bar'
import { FunctionComponent, useEffect } from 'react'
import { KeyboardAvoidingView } from 'react-native'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { QueryClientProvider } from 'react-query'

import { client, FONTS, tw } from './src/lib'
import { MainNavigator } from './src/navigators'
import { Landing } from './src/scenes'
import { useAuth } from './src/stores'

const Rom: FunctionComponent = () => {
  const [loaded] = useFonts(FONTS)

  const [{ account, loading }, { init }] = useAuth()

  useEffect(() => {
    init()
  }, [init])

  if (!loaded || loading) {
    return <AppLoading />
  }

  return (
    <QueryClientProvider client={client}>
      <StatusBar style="auto" />

      <SafeAreaProvider>
        <KeyboardAvoidingView behavior="padding" style={tw`flex-1`}>
          <NavigationContainer>
            {account ? <MainNavigator /> : <Landing />}
          </NavigationContainer>
        </KeyboardAvoidingView>
      </SafeAreaProvider>
    </QueryClientProvider>
  )
}

export default Rom
