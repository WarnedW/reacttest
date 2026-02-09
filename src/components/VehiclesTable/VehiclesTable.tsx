import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import {
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
} from '@mui/material'
import { observer } from 'mobx-react-lite'

import type { VehiclesStore } from '@/store'
import type { SortField } from '@/types'
import { formatPrice } from '@/utils'

export interface VehiclesTableProps {
  store: VehiclesStore
  onSort: (field: SortField) => () => void
  onEdit: (id: number) => void
  onDelete: (id: number) => void
}

export const VehiclesTable = observer(function VehiclesTable({
  store,
  onSort,
  onEdit,
  onDelete,
}: VehiclesTableProps) {
  return (
    <TableContainer component={Paper}>
      <Table size="small" stickyHeader>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Название</TableCell>
            <TableCell>Модель</TableCell>
            <TableCell
              sortDirection={store.sortBy === 'year' ? store.sortOrder : false}
            >
              <TableSortLabel
                active={store.sortBy === 'year'}
                direction={store.sortBy === 'year' ? store.sortOrder : 'asc'}
                onClick={onSort('year')}
              >
                Год
              </TableSortLabel>
            </TableCell>
            <TableCell
              sortDirection={store.sortBy === 'price' ? store.sortOrder : false}
            >
              <TableSortLabel
                active={store.sortBy === 'price'}
                direction={store.sortBy === 'price' ? store.sortOrder : 'asc'}
                onClick={onSort('price')}
              >
                Цена
              </TableSortLabel>
            </TableCell>
            <TableCell align="right">Действия</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {store.sortedItems.map((row) => (
            <TableRow key={row.id} hover>
              <TableCell>{row.id}</TableCell>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.model}</TableCell>
              <TableCell>{row.year}</TableCell>
              <TableCell>{formatPrice(row.price)}</TableCell>
              <TableCell align="right">
                <IconButton
                  size="small"
                  onClick={() => onEdit(row.id)}
                  aria-label="редактировать"
                >
                  <EditIcon />
                </IconButton>
                <IconButton
                  size="small"
                  color="error"
                  onClick={() => onDelete(row.id)}
                  aria-label="удалить"
                >
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
})
