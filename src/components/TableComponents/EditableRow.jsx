import {
  FormControl,
  IconButton,
  MenuItem,
  Select,
  TableCell,
  TextField
} from '@mui/material'
import PhotoSizeSelectActualIcon from '@mui/icons-material/PhotoSizeSelectActual'
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined'
import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined'
import { useEffect, useState } from 'react'
import { BaseStorageUrl } from '../../environment'
import { categorys } from '../../constants'

const EditableRow = ({
  editFormData,
  setEditFormData,
  product,
  handleEditFormChange,
  handleEditFormSubmit,
  handleCancelClick,
  handleImageChange,
  disable,
  setDisable,
}) => {
    const getCategoryIdByTitle = (title) =>
    categorys.find(
      (category) => category.title === title
    )?.id || null

  const getCategoryTitleById = (id) =>
    categorys.find((category) => category.id === id)
      ?.title || null

  const [url, setUrl] = useState()
  const [selectedCategory, setSelectedCategory] = useState(getCategoryTitleById(editFormData.category_id))

  const showImg = (e) => {
    let imgFile = e.target.files[0]
    let url = window.URL.createObjectURL(imgFile)
    setUrl(url)
    handleImageChange(imgFile)
    console.log('imageFile', imgFile)
  }

  const onTextChange = (e) => {
    setDisable(false)
    handleEditFormChange(e)
  }

  const onImgChange = () => {
    handleImageChange()
    setDisable(false)
  }

  const handleSelectChange = (e) => {
    setDisable(false)
    setSelectedCategory(e.target.value)
    setEditFormData((prevState) => ({
      ...prevState,
      [e.target.name]: parseInt(getCategoryIdByTitle(e.target.value))
    }))
  }

  return (
    <>
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
        <FormControl sx={{ width: 180 }}>
          <Select
            name='category_id'
            value={selectedCategory}
            defaultValue={
              getCategoryTitleById(editFormData.category_id)
            }
            onChange={(e) => handleSelectChange(e)}
            sx={{ textAlign: 'left' }}
          >
            {categorys.map((category) => (
              <MenuItem
                key={category.id}
                value={category.title}
              >
                {category.title}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </TableCell>
      <TableCell align='center'>
        {product.product_image && (
          <img
            src={`${BaseStorageUrl}${product.product_image}`}
            width='80'
            height='60'
            style={{ marginTop: '20px' }}
            alt='preview'
          />
        )}
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
          disabled={disable}
          onClick={handleEditFormSubmit}
        >
          <CheckOutlinedIcon
            fontSize='large'
            color={disable ? 'disabled' : 'primary'}
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
    </>
  )
}
export default EditableRow
