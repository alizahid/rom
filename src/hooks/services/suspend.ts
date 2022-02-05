import update from 'immutability-helper'
import { QueryKey, useMutation, useQueryClient } from 'react-query'

import { api } from '../../lib'
import { Service } from '../../types'

type Returns = {
  error?: string
  loading: boolean
  success: boolean

  suspendService: () => Promise<unknown>
}

export const suspendService = async (id: string): Promise<void> => {
  await api({
    method: 'post',
    url: `/services/${id}/suspend`
  })
}

export const useSuspendService = (serviceId: string): Returns => {
  const client = useQueryClient()

  const { error, isLoading, isSuccess, mutateAsync } = useMutation<void, Error>(
    () => suspendService(serviceId),
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
                    $set: true
                  },
                  suspenders: {
                    $set: ['User']
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
                  $set: true
                },
                suspenders: {
                  $set: ['User']
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
    success: isSuccess,
    suspendService: mutateAsync
  }
}
