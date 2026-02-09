import { makeAutoObservable, runInAction } from 'mobx'

import { fetchVehicles as fetchVehiclesApi } from '@/api'
import type {
  SortField,
  SortOrder,
  Vehicle,
  VehicleCreatePayload,
  VehicleUpdatePayload,
} from '@/types'
import {
  getVehiclesFromCache,
  setVehiclesCache,
} from '@/utils'

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

export function createVehiclesStore(): VehiclesStore {
  return makeAutoObservable({
    items: [] as Vehicle[],
    loading: false as boolean,
    error: null as string | null,
    sortBy: null as SortField | null,
    sortOrder: 'asc' as SortOrder,

    get sortedItems(): Vehicle[] {
      if (!this.sortBy) return [...this.items]
      const sorted = [...this.items].sort((a, b) => {
        const aVal = a[this.sortBy!]
        const bVal = b[this.sortBy!]
        if (typeof aVal === 'number' && typeof bVal === 'number') {
          return this.sortOrder === 'asc' ? aVal - bVal : bVal - aVal
        }
        return String(aVal).localeCompare(String(bVal), undefined, { numeric: true })
      })
      return sorted
    },

    setSort(field: SortField): void {
      if (this.sortBy === field) {
        this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc'
      } else {
        this.sortBy = field
        this.sortOrder = 'asc'
      }
    },

    async fetchVehicles(forceRefresh = false): Promise<void> {
      if (!forceRefresh) {
        const cached = getVehiclesFromCache()
        if (cached != null) {
        runInAction(() => {
          this.items = cached
          this.error = null
        })
          return
        }
      }
      if (abortController) abortController.abort()
      abortController = new AbortController()
      this.loading = true
      this.error = null
      const signal = abortController.signal
      try {
        const data = await fetchVehiclesApi(signal)
        setVehiclesCache(data)
        runInAction(() => {
          this.items = data
          this.loading = false
          abortController = null
        })
      } catch (e) {
        const isAborted =
          e instanceof Error &&
          (e.name === 'AbortError' ||
            e.name === 'CanceledError' ||
            (e as { code?: string }).code === 'ERR_CANCELED')
        if (isAborted) {
          abortController = null
          return
        }
        runInAction(() => {
          this.error = e instanceof Error ? e.message : String(e)
          this.loading = false
          abortController = null
        })
      }
    },

    abortFetch(): void {
      if (abortController) {
        abortController.abort()
        abortController = null
      }
    },

    addVehicle(payload: VehicleCreatePayload): Vehicle {
      const id = Math.max(0, ...this.items.map((v) => v.id)) + 1
      const newItem: Vehicle = {
        id,
        name: payload.name ?? '',
        model: payload.model ?? '',
        year: Number(payload.year) || new Date().getFullYear(),
        color: payload.color ?? '',
        price: Number(payload.price) || 0,
        latitude: payload.latitude ?? 0,
        longitude: payload.longitude ?? 0,
      }
      this.items.push(newItem)
      setVehiclesCache(this.items)
      return newItem
    },

    updateVehicle(id: number, updates: VehicleUpdatePayload): void {
      const item = this.items.find((v) => v.id === id)
      if (!item) return
      if (updates.name !== undefined) item.name = updates.name
      if (updates.price !== undefined) item.price = Number(updates.price)
      setVehiclesCache(this.items)
    },

    removeVehicle(id: number): void {
      this.items = this.items.filter((v) => v.id !== id)
      setVehiclesCache(this.items)
    },
  })
}

export const vehiclesStore = createVehiclesStore()
