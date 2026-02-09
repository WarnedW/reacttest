export interface Vehicle {
  id: number
  name: string
  model: string
  year: number
  color: string
  price: number
  latitude?: number
  longitude?: number
}

export interface VehicleCreatePayload {
  name: string
  model: string
  year: number
  color: string
  price: number
  latitude?: number
  longitude?: number
}

export interface VehicleUpdatePayload {
  name?: string
  price?: number
}

export type SortField = 'year' | 'price'
export type SortOrder = 'asc' | 'desc'
