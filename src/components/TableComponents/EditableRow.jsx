import { IconButton, TableCell, TableRow, TextField } from "@mui/material"
import PhotoSizeSelectActualIcon from '@mui/icons-material/PhotoSizeSelectActual'
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined'
import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined'
import { useState } from "react"

const EditableRow = ({
  editFormData,
  handleEditFormChange,
  handleEditFormSubmit
}) => {
  const [image, setImage] = useState('')
  const [url, setUrl] = useState()
  const showImg = (e) => {
    const imgFile = e.target.file[0]
    const url = window.URL.createObjectURL(imgFile)
    setUrl(url)
    setImage(imgFile)
  }

  return (
    <TableRow>
      <TableCell align='center'>
        <TextField
          type='text'
          required={true}
          name='title'
          defaultValue={editFormData.title}
          onChange={handleEditFormChange}
        ></TextField>
      </TableCell>
      <TableCell align='center'>
        <TextField
          type='text'
          required={true}
          name='description'
          defaultValue={editFormData.title}
          onChange={handleEditFormChange}
        ></TextField>
      </TableCell>
      <TableCell align='center'>
        <TextField
          type='number'
          required={true}
          name='price'
          defaultValue={editFormData.title}
          onChange={handleEditFormChange}
        ></TextField>
      </TableCell>
      <TableCell align='center'>
        <IconButton
          color='primary'
          aria-label='upload picture'
          component='label'
        >
          {/* <img src={url? url : ''} width='80' height='60' /> */}
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
        <IconButton type='button'>
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