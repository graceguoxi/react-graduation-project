import { IconButton, TableCell, TableRow } from '@mui/material'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import PhotoSizeSelectActualIcon from '@mui/icons-material/PhotoSizeSelectActual'
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';
import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined'

const AddRow = () => {
  

  return (
    <TableRow>
      <TableCell align='center'>
        <TextField
          id='outlined-basic'
          name='title'
          placeholder='Enter a title'
        />
      </TableCell>
      <TableCell align='center'>
        <TextField
          id='outlined-basic'
          name='description'
          placeholder='Enter a description'
        />
      </TableCell>
      <TableCell align='center'>
        <TextField
          id='outlined-basic'
          name='price'
          placeholder='Enter a price'
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
        <IconButton>
          <CheckOutlinedIcon
            fontSize='large'
            color='primary'
          />
        </IconButton>
        <IconButton>
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

