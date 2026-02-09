import { useCallback, useState } from 'react'

import { vehiclesStore } from '@/store'
import type { SortField } from '@/types'
import type { VehicleCreatePayload, VehicleUpdatePayload } from '@/types'

export function useVehicles() {
  const store = vehiclesStore
  const [createOpen, setCreateOpen] = useState(false)
  const [editId, setEditId] = useState<number | null>(null)
  const [deleteId, setDeleteId] = useState<number | null>(null)

  const openCreate = useCallback(() => setCreateOpen(true), [])
  const closeCreate = useCallback(() => setCreateOpen(false), [])

  const openEdit = useCallback((id: number) => setEditId(id), [])
  const closeEdit = useCallback(() => setEditId(null), [])
  const editingVehicle = editId != null ? store.items.find((v) => v.id === editId) : undefined

  const openDelete = useCallback((id: number) => setDeleteId(id), [])
  const closeDelete = useCallback(() => setDeleteId(null), [])
  const deleteDialogOpen = deleteId != null

  const handleSort = useCallback(
    (field: SortField) => () => store.setSort(field),
    [store]
  )

  const handleCreateSubmit = useCallback(
    (data: VehicleCreatePayload) => {
      store.addVehicle(data)
      setCreateOpen(false)
    },
    [store]
  )

  const handleEditSave = useCallback(
    (id: number, data: VehicleUpdatePayload) => {
      store.updateVehicle(id, data)
      setEditId(null)
    },
    [store]
  )

  const handleDeleteConfirm = useCallback(() => {
    if (deleteId != null) {
      store.removeVehicle(deleteId)
      setDeleteId(null)
    }
  }, [store, deleteId])

  return {
    store,
    createOpen,
    closeCreate,
    openCreate,
    editId,
    editingVehicle,
    openEdit,
    closeEdit,
    deleteDialogOpen,
    deleteId,
    openDelete,
    closeDelete,
    handleDeleteConfirm,
    handleSort,
    handleCreateSubmit,
    handleEditSave,
  }
}
