import * as React from 'react'
import { useTheme } from '@mui/material/styles'
import OutlinedInput from '@mui/material/OutlinedInput'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import { categorys } from '../../constants'

const ITEM_HEIGHT = 48
const ITEM_PADDING_TOP = 8
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250
    }
  }
}

function getStyles(category, cateTitle, theme) {
  return {
    fontWeight:
      cateTitle.indexOf(category) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium
  }
}

export default function TableCategory() {
  const theme = useTheme()
  const [cateTitle, setCateTitle] = React.useState([])

  const handleChange = (event) => {
    const {
      target: { value }
    } = event
    setCateTitle(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value
    )
  }

  return (
    <div>
      <FormControl sx={{ m: 1, width: 300, mt: 3 }}>
        <Select
          displayEmpty
          value={cateTitle}
          onChange={handleChange}
          input={<OutlinedInput />}
          renderValue={(selected) => {
            if (selected.length === 0) {
              return <em>Category</em>
            }

            return selected.join(', ')
          }}
          MenuProps={MenuProps}
          inputProps={{ 'aria-label': 'Without label' }}
        >
          <MenuItem disabled value=''>
            <em>Category</em>
          </MenuItem>
          {categorys.map(category => (
            <MenuItem
              key={category.id}
              value={category.title}
            >
              {category.title}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  )
}
