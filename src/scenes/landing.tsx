import { FunctionComponent, useCallback, useRef, useState } from 'react'
import { TextInput } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import { Button, Input } from '../components'
import { tw } from '../lib'
import { useAuth } from '../stores'

export const Landing: FunctionComponent = () => {
  const [{ authenticating }, { signIn }] = useAuth()

  const tokenRef = useRef<TextInput>(null)

  const [token, setToken] = useState('')

  const submit = useCallback(() => {
    if (authenticating) {
      return
    }

    if (!token) {
      return tokenRef.current?.focus()
    }

    signIn(token)
  }, [authenticating, signIn, token])

  return (
    <SafeAreaView style={tw`justify-end flex-1 p-6`}>
      <Input
        label="Render API key from account settings"
        onChangeText={setToken}
        onSubmitEditing={submit}
        placeholder="API key"
        ref={tokenRef}
        returnKeyType="go"
        secureTextEntry
        value={token}
      />

      <Button
        loading={authenticating}
        onPress={submit}
        style={tw`mt-6`}
        title="Sign in"
      />
    </SafeAreaView>
  )
}
