import { makeAutoObservable, runInAction } from 'mobx'

import { fetchVehicles as fetchVehiclesApi } from '@/api'
import type {
  SortField,
  SortOrder,
  Vehicle,
  VehicleCreatePayload,
  VehicleUpdatePayload,
} from '@/types'
import { getVehiclesFromCache, setVehiclesCache } from '@/utils'

export interface VehiclesStore {
  items: Vehicle[]
  loading: boolean
  error: string | null
  sortBy: SortField | null
  sortOrder: SortOrder
  sortedItems: Vehicle[]
  setSort(field: SortField): void
  fetchVehicles(forceRefresh?: boolean): Promise<void>
  abortFetch(): void
  addVehicle(payload: VehicleCreatePayload): Vehicle
  updateVehicle(id: number, updates: VehicleUpdatePayload): void
  removeVehicle(id: number): void
}

let abortController: AbortController | null = null

function isAbortError(e: unknown): boolean {
  if (!(e instanceof Error)) return false
  return (
    e.name === 'AbortError' ||
    e.name === 'CanceledError' ||
    (e as { code?: string }).code === 'ERR_CANCELED'
  )
}

function getAbortSignal(): AbortSignal {
  if (abortController) abortController.abort()
  abortController = new AbortController()
  return abortController.signal
}

function clearAbortController(): void {
  abortController = null
}

function persistCache(items: Vehicle[]): void {
  setVehiclesCache(items)
}

function getNextId(items: Vehicle[]): number {
  const max = items.length === 0 ? 0 : Math.max(...items.map((v) => v.id))
  return max + 1
}

function buildVehicleFromPayload(id: number, payload: VehicleCreatePayload): Vehicle {
  const now = new Date().getFullYear()
  return {
    id,
    name: payload.name ?? '',
    model: payload.model ?? '',
    year: Number(payload.year) || now,
    color: payload.color ?? '',
    price: Number(payload.price) || 0,
    latitude: payload.latitude ?? 0,
    longitude: payload.longitude ?? 0,
  }
}

export function createVehiclesStore(): VehiclesStore {
  return makeAutoObservable({
    items: [] as Vehicle[],
    loading: false as boolean,
    error: null as string | null,
    sortBy: null as SortField | null,
    sortOrder: 'asc' as SortOrder,

    get sortedItems(): Vehicle[] {
      const { sortBy, sortOrder, items } = this
      if (!sortBy) return [...items]
      const dir = sortOrder === 'asc' ? 1 : -1
      return [...items].sort((a, b) => {
        const aVal = a[sortBy] as number
        const bVal = b[sortBy] as number
        return (aVal - bVal) * dir
      })
    },

    setSort(field: SortField): void {
      const sameField = this.sortBy === field
      this.sortBy = field
      this.sortOrder = sameField && this.sortOrder === 'asc' ? 'desc' : 'asc'
    },

    async fetchVehicles(forceRefresh = false): Promise<void> {
      const cached = !forceRefresh ? getVehiclesFromCache() : null
      if (cached != null) {
        runInAction(() => {
          this.items = cached
          this.error = null
        })
        return
      }

      const signal = getAbortSignal()
      this.loading = true
      this.error = null

      try {
        const data = await fetchVehiclesApi(signal)
        persistCache(data)
        runInAction(() => {
          this.items = data
          this.loading = false
          clearAbortController()
        })
      } catch (e) {
        if (isAbortError(e)) {
          clearAbortController()
          return
        }
        runInAction(() => {
          this.error = e instanceof Error ? e.message : String(e)
          this.loading = false
          clearAbortController()
        })
      }
    },

    abortFetch(): void {
      if (abortController) {
        abortController.abort()
        clearAbortController()
      }
    },

    addVehicle(payload: VehicleCreatePayload): Vehicle {
      const newItem = buildVehicleFromPayload(getNextId(this.items), payload)
      this.items.push(newItem)
      persistCache(this.items)
      return newItem
    },

    updateVehicle(id: number, updates: VehicleUpdatePayload): void {
      const item = this.items.find((v) => v.id === id)
      if (!item) return
      if (updates.name !== undefined) item.name = updates.name
      if (updates.price !== undefined) item.price = Number(updates.price)
      persistCache(this.items)
    },

    removeVehicle(id: number): void {
      this.items = this.items.filter((v) => v.id !== id)
      persistCache(this.items)
    },
  })
}

export const vehiclesStore = createVehiclesStore()
