import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  TextField,
} from '@mui/material'

import { useEditVehicle } from '@/hooks'
import type { Vehicle, VehicleUpdatePayload } from '@/types'

export interface EditVehicleDialogProps {
  open: boolean
  vehicle: Vehicle | undefined
  onClose: () => void
  onSave: (id: number, data: VehicleUpdatePayload) => void
}

export function EditVehicleDialog({ open, vehicle, onClose, onSave }: EditVehicleDialogProps) {
  const { name, setName, price, setPrice, handleSave } = useEditVehicle(vehicle, onSave)

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Редактировать (name, price)</DialogTitle>
      <DialogContent>
        <Stack spacing={2} sx={{ pt: 1 }}>
          <TextField label="Название" value={name} onChange={(e) => setName(e.target.value)} fullWidth />
          <TextField
            label="Цена"
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            fullWidth
            inputProps={{ min: 0 }}
          />
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Отмена</Button>
        <Button variant="contained" onClick={handleSave}>
          Сохранить
        </Button>
      </DialogActions>
    </Dialog>
  )
}
