import { useQuery } from 'react-query'

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
  const { data, isLoading, isRefetching, refetch } = useQuery<Service, Error>(
    `services-${id}`,
    () => fetchService(id)
  )

  return {
    loading: isLoading,
    reload: refetch,
    reloading: isRefetching,
    service: data
  }
}
