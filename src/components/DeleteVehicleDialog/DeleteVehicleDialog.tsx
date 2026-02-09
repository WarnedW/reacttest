import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@mui/material'

export interface DeleteVehicleDialogProps {
  open: boolean
  onClose: () => void
  onConfirm: () => void
}

export function DeleteVehicleDialog({
  open,
  onClose,
  onConfirm,
}: DeleteVehicleDialogProps) {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Удалить машину?</DialogTitle>
      <DialogContent>
        Вы уверены, что хотите удалить эту запись?
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Отмена</Button>
        <Button onClick={onConfirm} color="error" variant="contained">
          Удалить
        </Button>
      </DialogActions>
    </Dialog>
  )
}
