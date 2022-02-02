import { FunctionComponent, useCallback, useRef, useState } from 'react'
import { Text, TextInput } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import { Button, Input } from '../components'
import { tw } from '../lib'
import { useAuth } from '../stores'

export const Landing: FunctionComponent = () => {
  const [, { addAccount }] = useAuth()

  const nameRef = useRef<TextInput>(null)
  const tokenRef = useRef<TextInput>(null)

  const [name, setName] = useState('')
  const [token, setToken] = useState('')

  const submit = useCallback(() => {
    if (!name) {
      return nameRef.current?.focus()
    }

    if (!token) {
      return tokenRef.current?.focus()
    }

    addAccount({
      name,
      token
    })
  }, [addAccount, name, token])

  return (
    <SafeAreaView style={tw`justify-end flex-1 p-6`}>
      <Text style={tw`text-base font-rom-medium`}>
        Add a Render API key from account settings
      </Text>

      <Input
        label="Name"
        onChangeText={setName}
        onSubmitEditing={() => tokenRef.current?.focus()}
        placeholder="Personal, work, etc"
        ref={nameRef}
        returnKeyType="next"
        style={tw`mt-6`}
        value={name}
      />
      <Input
        label="API key"
        onChangeText={setToken}
        onSubmitEditing={submit}
        placeholder="From Account settings > API keys"
        ref={tokenRef}
        returnKeyType="go"
        secureTextEntry
        style={tw`mt-6`}
        value={token}
      />

      <Button onPress={submit} style={tw`mt-6`} title="Add" />
    </SafeAreaView>
  )
}
