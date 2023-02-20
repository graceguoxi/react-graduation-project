import { IconButton } from "@mui/material"
import UploadIcon from '@mui/icons-material/Upload'
import * as XLSX from 'xlsx'
import { useState } from "react"

const ImportExcel = (
  {products,
  setProducts}
) => {

  const handleImportExcel = (e) => {
    const importFile = e.target.files[0]

    const fileReader = new FileReader()

    fileReader.readAsArrayBuffer(importFile)
    fileReader.onload = (e) => {
      const bufferArray = e.target.result
      const workbook = XLSX.read(bufferArray,{type:'buffer'})

      const workSheetName = workbook.SheetNames[0]
      const workSheet = workbook.Sheets[workSheetName]

      const data = XLSX.utils.sheet_to_json(workSheet,{header:1})

      // data.splice(0,1)
      // console.log('fileData',data)
     
      const SliceRows = data.slice(1).map((r) =>
        r.reduce((acc, x, i) => {
          acc[data[0][i]] = x
          return acc
        }, {})
      )
      console.log('SliceRows', SliceRows)
      setProducts(
        [
        ...SliceRows,
        ...products
      ]
      )
    } 
  }
  
  return (
    <IconButton
      component='label'
      color='primary'
      sx={{
        display: 'flex',
        ml: 2
      }}
    >
      <input
        hidden
        type='file'
        onChange={(e) => {
           handleImportExcel(e)
        }}
      />
      <UploadIcon /> 
    </IconButton>
  )
}
export default ImportExcel