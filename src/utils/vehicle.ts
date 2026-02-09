import type { Vehicle } from '@/types'

export type VehicleWithCoords = Vehicle & { latitude: number; longitude: number }

export function hasValidCoords(v: Vehicle): v is VehicleWithCoords {
  return typeof v.latitude === 'number' && typeof v.longitude === 'number'
}

export function getVehiclesWithCoords(vehicles: Vehicle[]): VehicleWithCoords[] {
  return vehicles.filter(hasValidCoords)
}
