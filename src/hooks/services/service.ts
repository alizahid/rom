import { QueryKey, useQuery } from 'react-query'

import { api } from '../../lib'
import { Service } from '../../types'

type Returns = {
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

  const { data, isLoading, isRefetching, refetch } = useQuery<Service, Error>(
    queryKey,
    () => fetchService(id)
  )

  return {
    loading: isLoading,
    reload: refetch,
    reloading: isRefetching,
    service: data
  }
}
