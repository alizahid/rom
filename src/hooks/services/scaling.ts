import update from 'immutability-helper'
import { QueryKey, useMutation, useQueryClient } from 'react-query'

import { api } from '../../lib'
import { Service } from '../../types'

type Returns = {
  error?: string
  loading: boolean
  success: boolean

  updateScaling: (instances: number) => Promise<unknown>
}

export const updateServiceScaling = async (
  id: string,
  instances: number
): Promise<void> => {
  try {
    await api<Service>({
      data: {
        numInstances: instances
      },
      method: 'post',
      url: `/services/${id}/scale`
    })
  } catch (error) {
    if (error.response?.status !== 500) {
      throw error
    }
  }
}

export const useUpdateServiceScaling = (serviceId: string): Returns => {
  const client = useQueryClient()

  const { error, isLoading, isSuccess, mutateAsync } = useMutation<
    void,
    Error,
    number
  >((instances) => updateServiceScaling(serviceId, instances), {
    onSuccess(data, instances) {
      {
        const queryKey: QueryKey = 'services'

        const data = client.getQueryData<Array<Service>>(queryKey)

        if (data) {
          client.setQueryData<Array<Service>>(queryKey, (data) => {
            if (!data) {
              return []
            }

            const index = data.findIndex(({ id }) => id === serviceId)

            return update(data, {
              [index]: {
                serviceDetails: {
                  numInstances: {
                    $set: instances
                  }
                }
              }
            })
          })
        }
      }

      {
        const queryKey: QueryKey = ['services', serviceId]

        const data = client.getQueryData<Service>(queryKey)

        if (data) {
          client.setQueryData<Service>(queryKey, (data) => {
            if (!data) {
              throw new Error('Service not found')
            }

            return update(data, {
              serviceDetails: {
                numInstances: {
                  $set: instances
                }
              }
            })
          })
        }
      }
    }
  })

  return {
    error: error?.message,
    loading: isLoading,
    success: isSuccess,
    updateScaling: mutateAsync
  }
}
