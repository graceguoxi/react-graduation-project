import { IconButton, TableCell, TableRow } from '@mui/material'
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

  const [img, setImg] = useState('')
  const [addUrl, setAddUrl] = useState()
  const addImg = (e) => {
    let imgFile = e.target.files[0]
    let url = window.URL.createObjectURL(imgFile)
    setAddUrl(url)
    setImg(imgFile)
    console.log('img',imgFile)
  }
    

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
        <IconButton
          color='primary'
          aria-label='upload picture'
          component='label'
        >
          {addUrl ? (
            <img src={addUrl} width='80' height='60' alt='' />
          ) : (
            ''
          )}
          <input
            hidden
            name='product_image'
            type='file'
            accept='image/*'
            onChange={addImg}
          />
          <PhotoSizeSelectActualIcon fontSize='large' />
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

