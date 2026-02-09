import {
  Alert,
  Box,
  CircularProgress,
  Typography,
} from '@mui/material'
import { observer } from 'mobx-react-lite'
import { useSnackbar } from 'notistack'
import { useEffect, useRef } from 'react'

import {
  DeleteVehicleDialog,
  EditVehicleDialog,
  VehicleForm,
  VehiclesMap,
  VehiclesPageHeader,
  VehiclesTable,
} from '@/components'
import { MAP_DEFAULT_HEIGHT } from '@/constants'
import { useVehicles } from '@/hooks'

export const VehiclesPage = observer(function VehiclesPage() {
  const {
    store,
    createOpen,
    closeCreate,
    openCreate,
    editingVehicle,
    closeEdit,
    openEdit,
    deleteDialogOpen,
    closeDelete,
    openDelete,
    handleDeleteConfirm,
    handleSort,
    handleCreateSubmit,
    handleEditSave,
  } = useVehicles()

  const { enqueueSnackbar } = useSnackbar()
  const lastErrorRef = useRef<string | null>(null)

  useEffect(() => {
    store.fetchVehicles()
    return () => store.abortFetch()
  }, [store])

  useEffect(() => {
    if (store.error && store.error !== lastErrorRef.current) {
      lastErrorRef.current = store.error
      enqueueSnackbar(store.error, { variant: 'error' })
    } else if (!store.error) {
      lastErrorRef.current = null
    }
  }, [store.error, enqueueSnackbar])

  return (
    <Box sx={{ py: 3 }}>
      <VehiclesPageHeader
        onRefresh={() => store.fetchVehicles(true)}
        onCreate={openCreate}
        loading={store.loading}
      />

      {store.error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {store.error}
        </Alert>
      )}

      {store.loading && store.items.length === 0 ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
          <CircularProgress />
        </Box>
      ) : (
        <VehiclesTable
          store={store}
          onSort={handleSort}
          onEdit={openEdit}
          onDelete={openDelete}
        />
      )}

      {store.items.length > 0 && (
        <Box sx={{ mt: 3 }}>
          <Typography variant="h6" sx={{ mb: 1 }}>
            Карта
          </Typography>
          <VehiclesMap vehicles={store.sortedItems} height={MAP_DEFAULT_HEIGHT} />
        </Box>
      )}

      <VehicleForm
        open={createOpen}
        onClose={closeCreate}
        onSubmit={handleCreateSubmit}
        title="Добавить машину"
      />

      <EditVehicleDialog
        open={editingVehicle != null}
        vehicle={editingVehicle}
        onClose={closeEdit}
        onSave={handleEditSave}
      />

      <DeleteVehicleDialog
        open={deleteDialogOpen}
        onClose={closeDelete}
        onConfirm={handleDeleteConfirm}
      />
    </Box>
  )
})
