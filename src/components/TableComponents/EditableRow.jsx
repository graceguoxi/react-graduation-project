import { IconButton, TableCell, TableRow, TextField } from "@mui/material"
import PhotoSizeSelectActualIcon from '@mui/icons-material/PhotoSizeSelectActual'
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined'
import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined'
import { useState } from "react"
import { BaseStorageUrl } from "../../environment"

const EditableRow = ({
  editFormData,
  product,
  handleEditFormChange,
  handleEditFormSubmit,
  handleCancelClick,
  handleImageChange
}) => {
  const [url, setUrl] = useState()
  const showImg = (e) => {
    let imgFile = e.target.files[0]
    let url = window.URL.createObjectURL(imgFile)
    setUrl(url)
    handleImageChange(imgFile)
    console.log('imageFile', imgFile)
  }

  const onTextChange = (e) => {
    handleEditFormChange(e)
  }

  const onImgChange = () => {
    handleImageChange()

  }

  return (
    <TableRow>
      <TableCell align='center'>
        <TextField
          type='text'
          required={true}
          name='title'
          defaultValue={editFormData.title}
          onChange={onTextChange}
        ></TextField>
      </TableCell>
      <TableCell align='center'>
        <TextField
          type='text'
          required={true}
          name='description'
          defaultValue={editFormData.description}
          onChange={onTextChange}
        ></TextField>
      </TableCell>
      <TableCell align='center'>
        <TextField
          type='number'
          required={true}
          name='price'
          defaultValue={editFormData.price}
          onChange={onTextChange}
        ></TextField>
      </TableCell>
      <TableCell align='center'>
        <img
          src={
            url
              ? url
              : `${BaseStorageUrl}${product.product_image}`
          }
          width='80'
          height='60'
          style={{ marginTop: '20px' }}
        />
        <IconButton
          color='primary'
          aria-label='upload picture'
          component='label'
          onClick={onImgChange}
        >
          <input
            hidden
            accept='image/*'
            type='file'
            name='product_image'
            onChange={showImg}
          />
          <PhotoSizeSelectActualIcon
            fontSize='large'
            style={{ paddingBottom: '20px' }}
          />
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