import type { AxiosRequestConfig } from 'axios'

import { apiClient } from './client'

export interface GetDataOptions {
  signal?: AbortSignal
  params?: Record<string, string | number | boolean>
  headers?: Record<string, string>
}

function buildConfig(options?: GetDataOptions): AxiosRequestConfig {
  if (!options) return {}
  const config: AxiosRequestConfig = {}
  if (options.signal !== undefined) config.signal = options.signal
  if (options.params !== undefined) config.params = options.params
  if (options.headers !== undefined) config.headers = options.headers
  return config
}

/**
 * GET-запрос через общий клиент. Путь относительный к baseURL.
 */
export async function getData<T>(
  path: string,
  options?: GetDataOptions
): Promise<T> {
  const config = buildConfig(options)
  const { data } = await apiClient.get<T>(path, config)
  return data
}
