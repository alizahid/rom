import { useQuery } from 'react-query'

import { api } from '../../lib'
import { Service } from '../../types'

type Returns = {
  error?: string
  loading: boolean
  reloading: boolean
  services?: Array<Service>

  reload: () => void
}

export const fetchServices = async (): Promise<Array<Service>> => {
  const data = await api<
    Array<{
      service: Service
    }>
  >({
    url: '/services'
  })

  return data.map(({ service }) => service)
}

export const useServices = (): Returns => {
  const { data, error, isLoading, isRefetching, refetch } = useQuery<
    Array<Service>,
    Error
  >('services', fetchServices)

  return {
    error: error?.message,
    loading: isLoading,
    reload: refetch,
    reloading: isRefetching,
    services: data
  }
}
