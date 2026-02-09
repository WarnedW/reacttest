import AddIcon from '@mui/icons-material/Add'
import RefreshIcon from '@mui/icons-material/Refresh'
import { Box, Button, Stack, Typography } from '@mui/material'

export interface VehiclesPageHeaderProps {
  onRefresh: () => void
  onCreate: () => void
  loading?: boolean
}

export function VehiclesPageHeader({
  onRefresh,
  onCreate,
  loading = false,
}: VehiclesPageHeaderProps) {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        mb: 2,
      }}
    >
      <Typography variant="h5" component="h1">
        Машины
      </Typography>
      <Stack direction="row" spacing={1}>
        <Button
          variant="outlined"
          startIcon={<RefreshIcon />}
          onClick={onRefresh}
          disabled={loading}
        >
          Обновить
        </Button>
        <Button variant="contained" startIcon={<AddIcon />} onClick={onCreate}>
          Добавить
        </Button>
      </Stack>
    </Box>
  )
}
