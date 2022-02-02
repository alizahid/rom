import { useQuery } from 'react-query'

import { api } from '../../lib'
import { Service } from '../../types'

type Returns = {
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
  const { data, isLoading, isRefetching, refetch } = useQuery<
    Array<Service>,
    Error
  >('services', fetchServices)

  return {
    loading: isLoading,
    reload: refetch,
    reloading: isRefetching,
    services: data
  }
}
