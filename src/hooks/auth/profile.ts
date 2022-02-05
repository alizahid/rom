import { useQuery } from 'react-query'

import { api, storage } from '../../lib'
import { Owner } from '../../types'

type Returns = {
  error?: string
  loading: boolean
  profile?: Owner
  reloading: boolean

  reload: () => void
}

export const fetchProfile = async (): Promise<Owner> => {
  const user = await storage.get<string>('user')

  const data = await api<Owner>({
    url: `/owners/${user}`
  })

  return data
}

export const useProfile = (): Returns => {
  const { data, error, isLoading, isRefetching, refetch } = useQuery<
    Owner,
    Error
  >('profile', fetchProfile)

  return {
    error: error?.message,
    loading: isLoading,
    profile: data,
    reload: refetch,
    reloading: isRefetching
  }
}
