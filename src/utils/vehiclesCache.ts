import { VEHICLES_CACHE_KEY } from '@/constants'
import type { Vehicle } from '@/types'

export interface VehiclesCacheEntry {
  data: Vehicle[]
}

function parseCache(raw: string | null): VehiclesCacheEntry | null {
  if (!raw) return null
  try {
    const parsed = JSON.parse(raw) as unknown
    if (
      parsed &&
      typeof parsed === 'object' &&
      'data' in parsed &&
      Array.isArray((parsed as VehiclesCacheEntry).data)
    ) {
      return parsed as VehiclesCacheEntry
    }
  } catch {
    // ignore
  }
  return null
}

export function getVehiclesFromCache(): Vehicle[] | null {
  const entry = parseCache(localStorage.getItem(VEHICLES_CACHE_KEY))
  return entry ? entry.data : null
}

export function setVehiclesCache(vehicles: Vehicle[]): void {
  const entry: VehiclesCacheEntry = { data: vehicles }
  localStorage.setItem(VEHICLES_CACHE_KEY, JSON.stringify(entry))
}
