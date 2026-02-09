import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  TextField,
} from '@mui/material'

import { useVehicleForm } from '@/hooks'
import type { VehicleCreatePayload } from '@/types'

export interface VehicleFormProps {
  open: boolean
  onClose: () => void
  onSubmit: (data: VehicleCreatePayload) => void
  title?: string
}

export function VehicleForm({ open, onClose, onSubmit, title = 'Машина' }: VehicleFormProps) {
  const { form, errors, handleChange, handleSubmit, canSubmit } = useVehicleForm(open, onSubmit)

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <Stack spacing={2} sx={{ pt: 1 }}>
          <TextField
            label="Название"
            value={form.name}
            onChange={handleChange('name')}
            fullWidth
            required
            error={!!errors.name}
            helperText={errors.name}
          />
          <TextField
            label="Модель"
            value={form.model}
            onChange={handleChange('model')}
            fullWidth
            required
            error={!!errors.model}
            helperText={errors.model}
          />
          <TextField
            label="Год"
            type="number"
            value={form.year}
            onChange={handleChange('year')}
            fullWidth
            inputProps={{ min: 1900, max: 2100 }}
            error={!!errors.year}
            helperText={errors.year}
          />
          <TextField
            label="Цвет"
            value={form.color}
            onChange={handleChange('color')}
            fullWidth
            error={!!errors.color}
            helperText={errors.color}
          />
          <TextField
            label="Цена"
            type="number"
            value={form.price}
            onChange={handleChange('price')}
            fullWidth
            inputProps={{ min: 0 }}
            error={!!errors.price}
            helperText={errors.price}
          />
          <TextField
            label="Широта"
            type="number"
            value={form.latitude}
            onChange={handleChange('latitude')}
            fullWidth
            placeholder="например 55.75"
            inputProps={{ min: -90, max: 90, step: 0.000001 }}
            error={!!errors.latitude}
            helperText={errors.latitude}
          />
          <TextField
            label="Долгота"
            type="number"
            value={form.longitude}
            onChange={handleChange('longitude')}
            fullWidth
            placeholder="например 37.62"
            inputProps={{ min: -180, max: 180, step: 0.000001 }}
            error={!!errors.longitude}
            helperText={errors.longitude}
          />
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Отмена</Button>
        <Button variant="contained" onClick={handleSubmit} disabled={!canSubmit}>
          Сохранить
        </Button>
      </DialogActions>
    </Dialog>
  )
}
