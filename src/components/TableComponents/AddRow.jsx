import { IconButton, TableCell, TableRow } from '@mui/material'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import PhotoSizeSelectActualIcon from '@mui/icons-material/PhotoSizeSelectActual'
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined'
import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined'
import { useState } from 'react'
import { nanoid } from 'nanoid'

const AddRow = ({ products, setProducts, setOnAddRow }) => {
  const [addFormData, setAddFormData] = useState({
    title: '',
    description: '',
    price: ''
  })

  const handleAddFormChange = (e) => {
    e.preventDefault()

    const fieldName = e.target.name
    const fieldValue = e.target.value
    const newFormData = { ...addFormData }
    newFormData[fieldName] = fieldValue

    setAddFormData(newFormData)
    console.log('fieldname', fieldName)
    console.log('newFormData', newFormData)
  }

  const handleAddFormSubmit = (e) => {
    e.preventDefault()

    const newProduct = {
      id: nanoid(),
      title: addFormData.title,
      description: addFormData.description,
      price: addFormData.price
    }

    const newProducts = [newProduct, ...products]
    console.log('newProducts', newProducts)
    setProducts(newProducts)
    setOnAddRow()
  }

  return (
    <TableRow>
      <TableCell align='center'>
        <TextField
          name='title'
          required={true}
          placeholder='Enter a title'
          onChange={handleAddFormChange}
        />
      </TableCell>
      <TableCell align='center'>
        <TextField
          name='description'
          placeholder='Enter a description'
          onChange={handleAddFormChange}
        />
      </TableCell>
      <TableCell align='center'>
        <TextField
          name='price'
          required={true}
          placeholder='Enter a price'
          onChange={handleAddFormChange}
        />
      </TableCell>
      <TableCell align='center'>
        <IconButton>
          <PhotoSizeSelectActualIcon
            fontSize='large'
            color='primary'
          />
        </IconButton>
      </TableCell>
      <TableCell align='center'>
        <IconButton
          type='submit'
          onClick={handleAddFormSubmit}
        >
          <CheckOutlinedIcon
            fontSize='large'
            color='primary'
          />
        </IconButton>
        <IconButton
          type='button'
          onClick={() => setOnAddRow()}
        >
          <ClearOutlinedIcon
            fontSize='large'
            color='primary'
          />
        </IconButton>
      </TableCell>
    </TableRow>
  )
}
export default AddRow

