import update from 'immutability-helper'
import { QueryKey, useMutation, useQueryClient } from 'react-query'

import { api } from '../../lib'
import { EnvVar, EnvVarInput } from '../../types'

type Returns = {
  loading: boolean

  updateEnvVars: (data: EnvVarInput) => Promise<unknown>
}

export const updateEnvVars = async (
  serviceId: string,
  data: EnvVarInput,
  envVars: Array<EnvVarInput>
): Promise<Array<EnvVar>> => {
  const index = envVars.findIndex(({ key }) => key === data.key)

  let next: Array<EnvVarInput>

  if (index >= 0) {
    next = update(envVars, {
      [index]: {
        $set: data
      }
    })
  } else {
    next = update(envVars, {
      $push: [data]
    })
  }

  const response = await api<
    Array<{
      envVar: EnvVar
    }>
  >({
    data: next,
    method: 'put',
    url: `/services/${serviceId}/env-vars`
  })

  return response.map(({ envVar }) => envVar)
}

export const useUpdateEnvVars = (serviceId: string): Returns => {
  const client = useQueryClient()

  const queryKey: QueryKey = ['env-vars', serviceId]

  const { isLoading, mutateAsync } = useMutation<
    Array<EnvVar>,
    Error,
    EnvVarInput
  >(
    (variables) => {
      const envVars = client.getQueryData<Array<EnvVar>>(queryKey)

      return updateEnvVars(serviceId, variables, envVars!)
    },
    {
      onSuccess(data) {
        client.setQueryData(queryKey, () => data)
      }
    }
  )

  return {
    loading: isLoading,
    updateEnvVars: mutateAsync
  }
}
