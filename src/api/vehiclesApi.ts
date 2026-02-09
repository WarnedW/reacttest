import { API_PATHS } from '@/constants'
import type { Vehicle } from '@/types'

import { getData } from './restApi'

export async function fetchVehicles(
  signal?: AbortSignal
): Promise<Vehicle[]> {
  const data = await getData<Vehicle[]>(API_PATHS.vehicles, { signal })
  return Array.isArray(data) ? data : []
}
