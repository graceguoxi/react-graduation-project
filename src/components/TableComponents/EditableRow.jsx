import { IconButton, TableCell, TableRow, TextField } from "@mui/material"
import PhotoSizeSelectActualIcon from '@mui/icons-material/PhotoSizeSelectActual'
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined'
import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined'
import { useState } from "react"

const EditableRow = ({
  product,
  handleEditFormChange,
  handleEditFormSubmit,
  handleCancelClick
}) => {
  const [image, setImage] = useState('')
  const [url, setUrl] = useState()
  const showImg = (e) => {
    let imgFile = e.target.files[0]
    let url = window.URL.createObjectURL(imgFile)
    setUrl(url)
    setImage(imgFile)
    console.log('imageFile', imgFile)
  }

  return (
    <TableRow>
      <TableCell align='center'>
        <TextField
          type='text'
          required={true}
          name='title'
          defaultValue={product.title}
          onChange={handleEditFormChange}
        ></TextField>
      </TableCell>
      <TableCell align='center'>
        <TextField
          type='text'
          required={true}
          name='description'
          defaultValue={product.description}
          onChange={handleEditFormChange}
        ></TextField>
      </TableCell>
      <TableCell align='center'>
        <TextField
          type='number'
          required={true}
          name='price'
          defaultValue={product.price}
          onChange={handleEditFormChange}
        ></TextField>
      </TableCell>
      <TableCell align='center'>
        <IconButton
          color='primary'
          aria-label='upload picture'
          component='label'
        >
          <img
            src={url ? url : ''}
            width='80'
            height='60'
          />
          <input
            hidden
            accept='image/*'
            type='file'
            name='product_image'
            onChange={showImg}
          />
          <PhotoSizeSelectActualIcon fontSize='large' />
        </IconButton>
      </TableCell>
      <TableCell align='center'>
        <IconButton
          type='submit'
          onClick={handleEditFormSubmit}
        >
          <CheckOutlinedIcon
            fontSize='large'
            color='primary'
          />
        </IconButton>
        <IconButton
          type='button'
          onClick={handleCancelClick}
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
export default EditableRow