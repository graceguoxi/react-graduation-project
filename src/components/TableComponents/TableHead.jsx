import {
  Box,
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel
} from '@mui/material'
import PropTypes from 'prop-types'
import { visuallyHidden } from '@mui/utils'

const headCells = [
  {
    id: 'title',
    numeric: false,
    disablePadding: true,
    label: 'Title'
  },
  {
    id: 'description',
    numeric: true,
    disablePadding: false,
    label: 'Description'
  },
  {
    id: 'price',
    numeric: true,
    disablePadding: false,
    label: 'Price'
  },
  {
    id: 'category',
    numeric: true,
    disablePadding: false,
    label: 'Category'
  },
  {
    id: 'image',
    numeric: true,
    disablePadding: false,
    label: 'Image'
  },
  {
    id: 'actions',
    numeric: true,
    disablePadding: false,
    label: 'Actions'
  }
]

function EnhancedTableHead(props) {
  const { order, orderBy, onRequestSort} = props
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property)
  }

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell, index) => (
          <TableCell
            key={headCell.id}
            align='center'
            padding={
              headCell.disablePadding ? 'none' : 'normal'
            }
            sortDirection={
              orderBy === headCell.id ? order : false
            }
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={
                orderBy === headCell.id ? order : 'asc'
              }
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component='span' sx={visuallyHidden}>
                  {order === 'desc'
                    ? 'sorted descending'
                    : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  )
}

EnhancedTableHead.propTypes = {
  onRequestSort: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired
}
export default EnhancedTableHead