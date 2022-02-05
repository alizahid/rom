import update from 'immutability-helper'
import { QueryKey, useMutation, useQueryClient } from 'react-query'

import { api } from '../../lib'
import { Service } from '../../types'

type Returns = {
  error?: string
  loading: boolean
  success: boolean

  deleteService: () => Promise<unknown>
}

export const deleteService = async (id: string): Promise<void> => {
  await api({
    method: 'delete',
    url: `/services/${id}`
  })
}

export const useDeleteService = (serviceId: string): Returns => {
  const client = useQueryClient()

  const { error, isLoading, isSuccess, mutateAsync } = useMutation<void, Error>(
    () => deleteService(serviceId),
    {
      onSuccess() {
        const queryKey: QueryKey = 'services'

        const exists = client.getQueryData<Array<Service>>(queryKey)

        if (exists) {
          client.setQueryData<Array<Service>>(queryKey, (data) => {
            if (!data) {
              return exists
            }

            const index = data.findIndex(({ id }) => id === serviceId)

            return update(data, {
              $splice: [[index, 1]]
            })
          })
        }
      }
    }
  )

  return {
    deleteService: mutateAsync,
    error: error?.message,
    loading: isLoading,
    success: isSuccess
  }
}
