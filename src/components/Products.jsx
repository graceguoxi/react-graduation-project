import PropTypes from 'prop-types'
import Box from '@mui/material/Box'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TablePagination from '@mui/material/TablePagination'
import TableRow from '@mui/material/TableRow'
import TableSortLabel from '@mui/material/TableSortLabel'
import Paper from '@mui/material/Paper'
import IconButton from '@mui/material/IconButton'
import AddCircleIcon from '@mui/icons-material/AddCircle'
import UploadIcon from '@mui/icons-material/Upload'
import DownloadIcon from '@mui/icons-material/Download'
import ModeIcon from '@mui/icons-material/Mode'
import DeleteIcon from '@mui/icons-material/Delete'
import { visuallyHidden } from '@mui/utils'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { Button } from '@mui/material'
import AddRow from './TableComponents/AddRow'
import EditableRow from './TableComponents/EditableRow'

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1
  }
  if (b[orderBy] > a[orderBy]) {
    return 1
  }
  return 0
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy)
}

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
  const { order, orderBy, onRequestSort } = props
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property)
  }

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
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

export default function EnhancedTable({keyWord}) {
  const [products, setProducts] = useState([])
  const [searchProducts, setSearchProducts] = useState([])
  const [order, setOrder] = useState('asc')
  const [orderBy, setOrderBy] = useState('calories')
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(5)
  const [origData, setOrigData] = useState([])
  const [onAddRow, setOnAddRow] = useState(false)
  const [editProductId, setEditProductId] = useState(null)
  const [editFormData, setEditFormData] = useState({
    id: '',
    title: '',
    description: '',
    price: ''
  })
  

   const avatarStyle = {
     backgroundColor: '#2149e4',
     color: 'white',
     margin: '0 10px'
   }

  useEffect(() => {
    axios
      .get('http://localhost:8000/api/products')
      .then((res) => {
        const data = res.data
        setOrigData(data)
        setProducts(data)
        // console.log('data', data)
      })
      .catch((err) => console.log(err))
  }, [])

  useEffect(() => {
    setProducts(
      origData.filter((product) => {
        if(keyWord === '') {
          return product
        }
      })
    )
  }, [keyWord])

  useEffect(() => {
    setSearchProducts(origData.filter((product) => {
      if(product.title.toLowerCase().includes(keyWord) || product.description.toLowerCase().includes(keyWord))
      return product
    }))
    setPage(0)
  },[keyWord])
// console.log('search',searchProducts)

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc'
    setOrder(isAsc ? 'desc' : 'asc')
    setOrderBy(property)
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0
      ? Math.max(
          0,
          (1 + page) * rowsPerPage - products.length
        )
      : 0
  
  const addTableRow = () => setOnAddRow(!onAddRow)

  const handleEditFormChange=(e) => {
    e.preventDefault()

    const fieldValue = e.target.value
    setEditFormData((prevState) => ({...prevState, [e.target.name]: fieldValue}))
  }

  const handleEditClick = (e, product) => {
    e.preventDefault()
    setEditProductId(product.id)

    const formValues = {
      id: product.id,
      title: product.title,
      description: product.description,
      price: product.price
    }

    setEditFormData(formValues)

  }

  const handleEditFormSubmit = (e) => {
    e.preventDefault()

    const editedProduct = {
      id: editFormData.id,
      title: editFormData.title,
      description: editFormData.description,
      price: editFormData.price
    }

    const newProducts = [...products]
    const index = products.findIndex((product) => product.id === editFormData.id)

    newProducts[index] = editedProduct

    setProducts(newProducts)
    setEditProductId(null)
  }

  return (
    <>
      <Box
        sx={{
          width: '88%',
          padding: '40px 100px 0 100px'
        }}
      >
        <Button>
          <AddCircleIcon
            fontSize='large'
            onClick={addTableRow}
          />
        </Button>
        <Button>
          <UploadIcon />
        </Button>
        <Button>
          <DownloadIcon />
        </Button>

        <Paper></Paper>

        <Paper sx={{ width: '100%', mb: 2 }}>
          <TableContainer>
            <Table
              sx={{ minWidth: 750 }}
              aria-labelledby='tableTitle'
            >
              <EnhancedTableHead
                order={order}
                orderBy={orderBy}
                onRequestSort={handleRequestSort}
                rowCount={products.length}
              />
              <TableBody>
                {onAddRow && (
                  <AddRow setOnAddRow={setOnAddRow} products={products} setProducts={setProducts} />
                )}

                {(searchProducts.length > 0
                  ? searchProducts
                  : products
                )
                  .sort(getComparator(order, orderBy))
                  .slice(
                    page * rowsPerPage,
                    page * rowsPerPage + rowsPerPage
                  )
                  .map((product, index) => {
                    return (
                      <>
                        {editProductId == product.id ? (
                          <EditableRow
                            key={'edit' + index}
                            product={product}
                            editFormData={editFormData}
                            handleEditFormChange={
                              handleEditFormChange
                            }
                            handleEditFormSubmit={
                              handleEditFormSubmit
                            }
                          />
                        ) : (
                          <TableRow key={product.id}>
                            <TableCell
                              align='center'
                              component='th'
                              scope='row'
                              padding='none'
                            >
                              {product.title}
                            </TableCell>
                            <TableCell align='center'>
                              {product.description}
                            </TableCell>
                            <TableCell align='center'>
                              {product.price}
                            </TableCell>
                            <TableCell align='center'>
                              {product.image}
                            </TableCell>
                            <TableCell align='center'>
                              {product.actions}
                              <IconButton
                                style={avatarStyle}
                                onClick={(e) =>
                                  handleEditClick(
                                    e,
                                    product
                                  )
                                }
                              >
                                <ModeIcon />
                              </IconButton>
                              <IconButton
                                style={avatarStyle}
                              >
                                <DeleteIcon />
                              </IconButton>
                            </TableCell>
                          </TableRow>
                        )}
                      </>
                    )
                  })}

                {emptyRows > 0 && (
                  <TableRow
                    style={{ height: 53 * emptyRows }}
                  >
                    <TableCell colSpan={6} />
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>

          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component='div'
            count={
              (searchProducts.length > 0
                ? searchProducts
                : products
              ).length
            }
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />

          {(searchProducts.length > 0
            ? searchProducts
            : products
          ).length === 0 && (
            <div>
              <h2>No Matching result</h2>
            </div>
          )}
        </Paper>
      </Box>
    </>
  )
}
