import { Action, createHook, createStore } from 'react-sweet-state'

import { fetchOwners } from '../hooks'
import { client, storage } from '../lib'

type State = {
  authenticated: boolean
  authenticating: boolean
  loading: boolean
  owner?: string
}

const initialState: State = {
  authenticated: false,
  authenticating: false,
  loading: true
}

type Actions = typeof actions

const actions = {
  init:
    (): Action<State> =>
    async ({ setState }) => {
      const token = await storage.get<string>('token')
      const owner = await storage.get<string>('owner')

      setState({
        authenticated: !!token,
        loading: false,
        owner
      })
    },
  setOwner:
    (owner: string): Action<State> =>
    async ({ setState }) => {
      setState({
        owner
      })

      await storage.put('owner', owner)
    },
  signIn:
    (token: string): Action<State> =>
    async ({ setState }) => {
      setState({
        authenticating: true
      })

      await storage.put('token', token)

      const owners = await fetchOwners()

      const owner = owners[0].id

      await storage.put('user', owner)
      await storage.put('owner', owner)

      setState({
        authenticated: true,
        authenticating: false,
        owner
      })
    },
  signOut:
    (): Action<State> =>
    async ({ setState }) => {
      setState({
        authenticated: false
      })

      await storage.remove('owner')
      await storage.remove('user')
      await storage.remove('token')

      client.clear()
    }
}

const store = createStore<State, Actions>({
  actions,
  initialState
})

export const useAuth = createHook(store)
