import { QueryKey, useQuery } from 'react-query'

import { api } from '../../lib'
import { Service } from '../../types'

type Returns = {
  error?: string
  loading: boolean
  reloading: boolean
  service?: Service

  reload: () => void
}

export const fetchService = async (id: string): Promise<Service> => {
  const data = await api<Service>({
    url: `/services/${id}`
  })

  return data
}

export const useService = (id: string): Returns => {
  const queryKey: QueryKey = ['services', id]

  const { data, error, isLoading, isRefetching, refetch } = useQuery<
    Service,
    Error
  >(queryKey, () => fetchService(id))

  return {
    error: error?.message,
    loading: isLoading,
    reload: refetch,
    reloading: isRefetching,
    service: data
  }
}
