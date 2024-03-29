import Box from '@mui/material/Box'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TablePagination from '@mui/material/TablePagination'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import IconButton from '@mui/material/IconButton'
import AddCircleIcon from '@mui/icons-material/AddCircle'
import ModeIcon from '@mui/icons-material/Mode'
import DeleteIcon from '@mui/icons-material/Delete'
import { forwardRef, useEffect, useState } from 'react'
import { Button } from '@mui/material'
import AddRow from './TableComponents/AddRow'
import EditableRow from './TableComponents/EditableRow'
import Notification from './TableComponents/Notification'
import ExportExcel from './TableComponents/ExportExcel'
import ImportExcel from './TableComponents/ImportExcel'
import { apiDelete, apiGet, apiPost } from '../services'
import { BaseStorageUrl } from '../environment'
import EnhancedTableHead from './TableComponents/TableHead'
import { Snackbar, Alert } from '@mui/material'
import Tooltip from '@mui/material/Tooltip'
import TableCategory from './TableComponents/TableCategory'
import { categorys } from '../constants'

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

export default function EnhancedTable({ keyWord }) {
   const [editFormData, setEditFormData] = useState({
     category_id: null,
     id: '',
     title: '',
     description: '',
     price: ''
   })
  const [valueChange, setValueChange] = useState(false)
  const [disable, setDisable] = useState(true)
  const [products, setProducts] = useState([])
  const [searchProducts, setSearchProducts] = useState([])
  const [order, setOrder] = useState('asc')
  const [orderBy, setOrderBy] = useState('calories')
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(5)
  const [origData, setOrigData] = useState([])
  const [onAddRow, setOnAddRow] = useState(false)
  const [editProductId, setEditProductId] = useState(null)
  const [productId, setProductId] = useState()
  const [image, setImage] = useState('')
  const [open, setOpen] = useState(false)
  const [opens, setOpens] = useState(false)
  const [snackContent, setSnackContent] = useState('')
  const [severity, setSeverity] = useState('success')

  const avatarStyle = {
    backgroundColor: '#2149e4',
    color: 'white',
    margin: '0 10px'
  }

  const SnackbarAlert = forwardRef(
    function SnackbarAlert(props, ref) {
      return <Alert elevation={6} ref={ref} {...props} />
    }
  )

  const getCategoryTitleById = (id) =>
    categorys.find((category) => category.id === id)
      ?.title || null

  const handleSuccess = (content) => {
    setSnackContent(content)
    setOpens(true)
    setSeverity('success')
  }

  const handleFail = (content) => {
    setSnackContent(content)
    setOpens(true)
    setSeverity('error')
  }

  const handleClosebar = (e, reason) => {
    if (reason === 'clickaway') {
      return
    }
    setOpens(false)
  }

  useEffect(() => {
    apiGet('products')
      .then((res) => {
        const data = res.data
        data.map(
          (prod) => (prod.price = parseInt(prod.price))
        )
        setOrigData(data)
        setProducts(data)
        handleSuccess("Log in successfully!")
      })
      .catch((err) => {handleFail(err.message)})
  }, [])

  useEffect(() => {
    setProducts(
      origData.filter((product) => {
        if (keyWord === '') {
          return product
        }
      })
    )
  }, [keyWord])

  useEffect(() => {
    setSearchProducts(
      origData.filter((product) => {
        if (
          product.title.toLowerCase().includes(keyWord) ||
          product.description
            .toLowerCase()
            .includes(keyWord)
        )
          return product
      })
    )
    setPage(0)
  }, [keyWord])

  useEffect(() => {
    products.map(product => {
      if (
        product.category_id == editFormData.category_id &&
        product.id == editFormData.id &&
        product.title == editFormData.title &&
        product.description == editFormData.description &&
        product.price == editFormData.price
      ) {
        setDisable(true)
      }
    })
  }, [editFormData])

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

  const handleImageChange = (file) => {
    setImage(file)
  }

  const handleEditClick = (e, product) => {
    e.preventDefault()
    setEditProductId(product.id)

    const formValues = {
      category_id: product.category_id,
      id: product.id,
      title: product.title,
      description: product.description,
      price: product.price,
      product_image: product.image
    }

    setEditFormData(formValues)
  }

  const handleEditFormChange = (e, products) => {
    e.preventDefault()

    setEditFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }))
  }

  useEffect(() => console.log(editFormData), [editFormData])

  const handleEditFormSubmit = (e) => {
    let formData = new FormData()

    if (editFormData.title) {
      formData.append('title', editFormData.title)
      console.log('form title', formData.get('title'))
    }
    
    editFormData.description &&
      formData.append(
        'description',
        editFormData.description
      )
    editFormData.price &&
      formData.append('price', editFormData.price)
    
    editFormData.category_id &&
      formData.append(
        'category_id',
        editFormData.category_id
      )

    image && formData.append('product_image', image)
    formData.append('_method', 'PUT')
    console.log('edit', editFormData)
    for (let pair of formData.entries()) {
      console.log(pair[0] + ', ' + pair[1])
    }

    apiPost(`product/${editFormData.id}`, formData)
      .then((res) => {
        const newProducts = [...products]
        console.log('newProducts', res.data)
        const index = products.findIndex(
          (product) => product.id === editFormData.id
        )

        newProducts[index] = res.data
        setProducts(newProducts)
        console.log('newPro', newProducts)
        setEditProductId(null)
        handleSuccess('Edit form successfully!')
      })
      .catch((err) => {
        handleFail(err.message)
      })
    setDisable(true)
  }

  const handleCancelClick = () => {
    setEditProductId(null)
    setDisable(true)
  }

  const handleDeleteClick = (productId) => {
    apiDelete(`product/${productId}`)
      .then((res) => {
        const newProducts = [...products]

        const index = products.findIndex(
          (product) => product.id === productId
        )
        console.log('index', index)
        newProducts.splice(index, 1)
        setProducts(newProducts)
        console.log('newPro', newProducts)
        handleClose()
        handleSuccess('Delete successfully!')
      })
      .catch((err) => {
        handleFail(err.message)
      })
  }

  const handleClickOpen = (id) => {
    setOpen(true)
    setProductId(id)
  }

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <>
      <Box
        sx={{
          width: 'auto',
          padding: '40px 100px 0 100px'
        }}
      >
        <Box sx={{ display: 'flex' }}>
          <Tooltip title='Add' placement='top'>
            <Button>
              <AddCircleIcon
                fontSize='large'
                onClick={addTableRow}
              />
            </Button>
          </Tooltip>
          <Tooltip title='Import Excel' placement='top'>
            <Button>
              <ImportExcel
                products={products}
                setProducts={setProducts}
              />
            </Button>
          </Tooltip>
          <Tooltip title='Export Excel' placement='top'>
            <Button>
              <ExportExcel Products={products} />
            </Button>
          </Tooltip>
          <TableCategory />
        </Box>
        <Paper sx={{ width: 'auto', mb: 2 }}>
          <TableContainer>
            <Table
              sx={{ minWidth: 'auto' }}
              aria-labelledby='tableTitle'
            >
              <EnhancedTableHead
                order={order}
                orderBy={orderBy}
                rowCount={products.length}
                onRequestSort={handleRequestSort}
                setEditProductId={setEditProductId}
              />
              <TableBody>
                {onAddRow && (
                  <AddRow
                    setOnAddRow={setOnAddRow}
                    products={products}
                    setProducts={setProducts}
                    image={image}
                    setImage={setImage}
                    handleImageChange={(e) =>
                      handleImageChange(e)
                    }
                    handleSuccess={handleSuccess}
                    handleFail={handleFail}
                  />
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
                      <TableRow key={product.id}>
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
                            handleCancelClick={
                              handleCancelClick
                            }
                            image={image}
                            handleImageChange={
                              handleImageChange
                            }
                            disable={disable}
                            setDisable={setDisable}
                            setEditFormData={
                              setEditFormData
                            }
                          />
                        ) : (
                          <>
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
                              {getCategoryTitleById(
                                parseInt(product.category_id)
                              )}
                            </TableCell>
                            <TableCell align='center'>
                              {product.product_image && (
                                <img
                                  src={`${BaseStorageUrl}${product.product_image}`}
                                  width='80'
                                  height='60'
                                  alt='product-img'
                                />
                              )}
                            </TableCell>
                            <TableCell align='center'>
                              <Tooltip
                                title='Edit'
                                placement='left'
                              >
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
                              </Tooltip>
                              <Tooltip
                                title='Delete'
                                placement='right'
                              >
                                <IconButton
                                  style={avatarStyle}
                                  onClick={() => {
                                    handleClickOpen(
                                      product.id
                                    )
                                  }}
                                >
                                  <DeleteIcon />
                                </IconButton>
                              </Tooltip>
                            </TableCell>
                          </>
                        )}
                      </TableRow>
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

          <Notification
            open={open}
            handleClose={handleClose}
            handleDeleteClick={handleDeleteClick}
            productId={productId}
          />

          <Snackbar
            open={opens}
            autoHideDuration={3000}
            onClose={handleClosebar}
          >
            <SnackbarAlert
              onClose={handleClosebar}
              severity={severity}
            >
              {snackContent}
            </SnackbarAlert>
          </Snackbar>
        </Paper>
      </Box>
    </>
  )
}
