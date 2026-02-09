export const API_BASE_URL = 'https://task.tspb.su/test-task'

/** Пути API (относительно API_BASE_URL) */
export const API_PATHS = {
  vehicles: '/vehicles',
} as const

export const VEHICLES_CACHE_KEY = 'vehicles_cache'
