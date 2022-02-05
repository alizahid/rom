import { QueryKey, useQuery } from 'react-query'

import { api } from '../../lib'
import { EnvVar } from '../../types'

type Returns = {
  envVars?: Array<EnvVar>
  error?: string
  loading: boolean
  reloading: boolean

  reload: () => void
}

export const fetchEnvVars = async (
  serviceId: string
): Promise<Array<EnvVar>> => {
  const data = await api<
    Array<{
      envVar: EnvVar
    }>
  >({
    url: `/services/${serviceId}/env-vars`
  })

  return data.map(({ envVar }) => envVar)
}

export const useEnvVars = (serviceId: string): Returns => {
  const queryKey: QueryKey = ['env-vars', serviceId]

  const { data, error, isLoading, isRefetching, refetch } = useQuery<
    Array<EnvVar>,
    Error
  >(queryKey, () => fetchEnvVars(serviceId))

  return {
    envVars: data,
    error: error?.message,
    loading: isLoading,
    reload: refetch,
    reloading: isRefetching
  }
}
