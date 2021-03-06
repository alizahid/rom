import axios, { AxiosRequestConfig } from 'axios'
import { parseISO } from 'date-fns'

import { API_URL } from './config'
import { storage } from './storage'

export const api = async <T>({
  data,
  method,
  params,
  url
}: AxiosRequestConfig): Promise<T> => {
  const token = await storage.get<string>('token')

  const { data: response } = await axios.request<T>({
    baseURL: API_URL,
    data,
    headers: {
      authorization: `Bearer ${token}`
    },
    method,
    params: {
      limit: 100,
      ...params
    },
    transformResponse: [
      (data) => {
        if (!data) {
          return data
        }

        return JSON.parse(data, (key, value) => {
          if (key.endsWith('At')) {
            return parseISO(value)
          }

          if (key === 'suspended') {
            return value === 'suspended'
          }

          if (['autoDeploy', 'pullRequestPreviewsEnabled'].includes(key)) {
            return value === 'yes'
          }

          return value
        })
      }
    ],
    url
  })

  return response
}
