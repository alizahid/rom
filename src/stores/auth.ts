import { Action, createHook, createStore } from 'react-sweet-state'

import { storage } from '../lib'
import { Account } from '../types/auth'

type State = {
  account?: Account
  accounts: Array<Account>
  loading: boolean
}

const initialState: State = {
  accounts: [],
  loading: true
}

type Actions = typeof actions

const actions = {
  addAccount:
    (account: Account): Action<State> =>
    async ({ setState }) => {
      setState({
        account
      })

      await storage.put<Account>('account', account)

      const accounts = await storage.get<Array<Account>>('accounts')

      if (accounts) {
        await storage.put('accounts', [...accounts, account])
      } else {
        await storage.put('accounts', [account])
      }
    },
  init:
    (): Action<State> =>
    async ({ setState }) => {
      const accounts = await storage.get<Array<Account>>('accounts')
      const account = await storage.get<Account>('account')

      if (accounts) {
        setState({
          accounts
        })
      }

      if (account) {
        setState({
          account
        })
      }

      setState({
        loading: false
      })
    }
}

const store = createStore<State, Actions>({
  actions,
  initialState
})

export const useAuth = createHook(store)
