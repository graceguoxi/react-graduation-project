import { IconButton } from "@mui/material"
import DownloadIcon from '@mui/icons-material/Download'
import * as XLSX from 'xlsx'

const ExportExcel = ({Products}) => {
  const handleOnExport = products => {
    const workbook = XLSX.utils.book_new()
    const workSheet = XLSX.utils.json_to_sheet(products)

    XLSX.utils.book_append_sheet(workbook, workSheet, "Products")

    XLSX.writeFile(workbook, "MyExcel.xlsx")
  }

  return (
      <IconButton
        sx={{ px: 1.5, display: 'flex' }}
        color='primary'
        onClick={() => handleOnExport(Products)}
      >
        <DownloadIcon />
      </IconButton>
  )
}
export default ExportExcel