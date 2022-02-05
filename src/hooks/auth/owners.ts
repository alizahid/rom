import { useQuery } from 'react-query'

import { api } from '../../lib'
import { Owner } from '../../types'

type Returns = {
  error?: string
  loading: boolean
  owners?: Array<Owner>
  reloading: boolean

  reload: () => void
}

export const fetchOwners = async (): Promise<Array<Owner>> => {
  const data = await api<
    Array<{
      owner: Owner
    }>
  >({
    url: '/owners'
  })

  return data.map(({ owner }) => owner)
}

export const useOwners = (): Returns => {
  const { data, error, isLoading, isRefetching, refetch } = useQuery<
    Array<Owner>,
    Error
  >('owners', fetchOwners)

  return {
    error: error?.message,
    loading: isLoading,
    owners: data,
    reload: refetch,
    reloading: isRefetching
  }
}
