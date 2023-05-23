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
import ModeIcon from '@mui/icons-material/Mode'
import DeleteIcon from '@mui/icons-material/Delete'
import { visuallyHidden } from '@mui/utils'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { Button } from '@mui/material'
import AddRow from './TableComponents/AddRow'
import EditableRow from './TableComponents/EditableRow'
import Notification from './TableComponents/Notification'
import ExportExcel from './TableComponents/ExportExcel'
import ImportExcel from './TableComponents/ImportExcel'
import { apiDelete, apiGet, apiPost } from './services'
import { BaseStorageUrl } from '../environment'
import EnhancedTableHead from './TableComponents/TableHead'

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
    apiGet('products')
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

  const handleImageChange = (file) => {
    setImage(file)
  }

  const handleEditClick = (e, product) => {
    e.preventDefault()
    setEditProductId(product.id)

    const formValues = {
      id: product.id,
      title: product.title,
      description: product.description,
      price: product.price,
      product_image: product.image
    }

    setEditFormData(formValues)
  }

  const handleEditFormChange = (e) => {
    e.preventDefault()

    const fieldValue = e.target.value
    setEditFormData((prevState) => ({
      ...prevState,
      [e.target.name]: fieldValue
    }))
    console.log('editData', editFormData)

    // const fieldName = e.target.name
    // const fieldValue = e.target.value
    // const newEditData = { ...editFormData }
    // newEditData[fieldName] = fieldValue

    // setEditFormData(newEditData)
    // console.log('editForm', newEditData)
    // console.log('editFormValue',fieldValue)
  }

  const handleEditFormSubmit = (e) => {
    // e.preventDefault()

    // const editedProduct = {
    //   id: editFormData.id,
    //   title: editFormData.title,
    //   description: editFormData.description,
    //   price: editFormData.price
    // }

    // const newProducts = [...products]
    // const index = products.findIndex((product) => product.id === editFormData.id)

    // newProducts[index] = editedProduct

    // setProducts(newProducts)
    // setEditProductId(null)

    let formData = new FormData()
    // editFormData.title && formData.append(
    //   'title',
    //   editFormData.title
    // )

    if (editFormData.title) {
      // formData.append('username', 'Chris')
      // console.log('username', formData.get('username'))
      formData.append('title', editFormData.title)
      console.log('form title', formData.get('title'))
    }
    // console.log('title', editFormData.title)
    editFormData.description &&
      formData.append(
        'description',
        editFormData.description
      )
    editFormData.price &&
      formData.append('price', editFormData.price)
    image && formData.append('product_image', image)
    formData.append('_method', 'PUT')
    console.log('edit', editFormData)
    for (let pair of formData.entries()) {
      console.log(pair[0] + ', ' + pair[1])
    }

    // const userToken = localStorage.getItem(
    //   'react-project-token'
    // )
    // let config = {
    //   headers: {
    //     Authorization: 'Bearer ' + userToken
    //   }
    // }

    // axios
    //   .post(
    //     'http://localhost:8000/api/product/' +
    //       editFormData.id,
    //     formData,
    //     config
    //   )
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
      })
      .catch((err) => console.log(err))
  }

  const handleCancelClick = () => {
    setEditProductId(null)
  }

  const handleDeleteClick = (productId) => {
    // const userToken = localStorage.getItem(
    //   'react-project-token'
    // )
    // let config = {
    //   headers: {
    //     Authorization: 'Bearer ' + userToken
    //   }
    // }

    // axios
    //   .delete(
    //     `http://localhost:8000/api/products/${productId}`,
    //     config
    //   )
    apiDelete(`products/${productId}`)
      .then((res) => {
        // console.log('deleRes', res.data)
        const newProducts = [...products]

        const index = products.findIndex(
          (product) => product.id === productId
        )
        console.log('index', index)
        newProducts.splice(index, 1)
        setProducts(newProducts)
        console.log('newPro', newProducts)
        handleClose()
      })
      .catch((err) => console.log(err))
    // const newProducts = [...products]

    // const index = products.findIndex(
    //   (product) => product.id === productId
    // )
    // console.log('index', index)
    // newProducts.splice(index, 1)
    // setProducts(newProducts)
    // console.log('newPro', newProducts)
    // handleClose()
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
          width: '88%',
          padding: '40px 100px 0 100px'
        }}
      >
        <Box sx={{ display: 'flex'}}>
          <Button>
            <AddCircleIcon
              fontSize='large'
              onClick={addTableRow}
            />
          </Button>
          <ImportExcel
            products={products}
            setProducts={setProducts}
          />
          <ExportExcel Products={products} />
        </Box>
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
                            handleCancelClick={
                              handleCancelClick
                            }
                            image={image}
                            handleImageChange={
                              handleImageChange
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
                              {product.product_image && (
                                <img
                                  src={`${BaseStorageUrl}${product.product_image}`}
                                  width='80'
                                  height='60'
                                />
                              )}
                            </TableCell>
                            <TableCell align='center'>
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
                                onClick={() => {
                                  handleClickOpen(
                                    product.id
                                  )
                                }}
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

          <Notification
            open={open}
            handleClose={handleClose}
            handleDeleteClick={handleDeleteClick}
            productId={productId}
          />
        </Paper>
      </Box>
    </>
  )
}
