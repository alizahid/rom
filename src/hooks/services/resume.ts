import update from 'immutability-helper'
import { QueryKey, useMutation, useQueryClient } from 'react-query'

import { api } from '../../lib'
import { Service } from '../../types'

type Returns = {
  error?: string
  loading: boolean
  success: boolean

  resumeService: () => Promise<unknown>
}

export const resumeService = async (serviceId: string): Promise<void> => {
  try {
    await api({
      method: 'post',
      url: `/services/${serviceId}/resume`
    })
  } catch (error) {
    if (error.response?.status !== 500) {
      throw error
    }
  }
}

export const useResumeService = (serviceId: string): Returns => {
  const client = useQueryClient()

  const { error, isLoading, isSuccess, mutateAsync } = useMutation<void, Error>(
    () => resumeService(serviceId),
    {
      onSuccess() {
        {
          const queryKey: QueryKey = 'services'

          const exists = client.getQueryData<Array<Service>>(queryKey)

          if (exists) {
            client.setQueryData<Array<Service>>(queryKey, (data) => {
              if (!data) {
                return exists
              }

              const index = data.findIndex(({ id }) => id === serviceId)

              return update(data, {
                [index]: {
                  suspended: {
                    $set: false
                  },
                  suspenders: {
                    $set: []
                  }
                }
              })
            })
          }
        }

        {
          const queryKey: QueryKey = ['services', serviceId]

          const exists = client.getQueryData<Service>(queryKey)

          if (exists) {
            client.setQueryData<Service>(queryKey, (data) => {
              if (!data) {
                return exists
              }

              return update(data, {
                suspended: {
                  $set: false
                },
                suspenders: {
                  $set: []
                }
              })
            })
          }
        }
      }
    }
  )

  return {
    error: error?.message,
    loading: isLoading,
    resumeService: mutateAsync,
    success: isSuccess
  }
}
