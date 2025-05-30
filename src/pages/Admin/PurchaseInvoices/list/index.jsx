
import { styled } from '@mui/material/styles'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell, { tableCellClasses } from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import Button from '@mui/material/Button'
import { Link, useLocation } from 'react-router-dom'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { CircularProgress, MenuItem, Select, TextField, TableFooter, FormControl, InputLabel, Pagination } from '@mui/material'
import { useState } from 'react'

import { findBreadcrumbs, routeTree } from '~/config/routeTree'
import { Routes } from '~/config'
import ProgressBar from '~/components/ProgressBar'
import SearchResultNotFound from '~/components/Error/SearchResultNotFond'
import AddIcon from '@mui/icons-material/Add'
import SearchIcon from '@mui/icons-material/Search'
import InputAdornment from '@mui/material/InputAdornment'

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
    fontWeight: 'bold',
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}))

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}))

const showdRecordOption = [2, 5, 10, 25]

const mockInvoices = [
  {
    _id: '1',
    INVOICE_CODE: 'INV001',
    CREATED_DATE: '2025-05-26',
    CUSTOMER_NAME: 'Nguyễn Văn A',
    TOTAL_AMOUNT: 1200000,
    STATUS: 'Đang xử lý'
  },
  {
    _id: '2',
    INVOICE_CODE: 'INV002',
    CREATED_DATE: '2025-05-27',
    CUSTOMER_NAME: 'Trần Thị B',
    TOTAL_AMOUNT: 1500000,
    STATUS: 'Đã giao'
  },
  {
    _id: '3',
    INVOICE_CODE: 'INV003',
    CREATED_DATE: '2025-05-28',
    CUSTOMER_NAME: 'Lê Văn C',
    TOTAL_AMOUNT: 980000,
    STATUS: 'Đã hủy'
  }
]

export default function InvoiceList() {
  const location = useLocation()

  const [searchValue, setSearchValue] = useState('')
  const [fromDate, setFromDate] = useState('')
  const [thruDate, setThruDate] = useState('')
  const [showedRecord, setShowedRecord] = useState(5)
  const [page, setPage] = useState(1)

  const isLoading = false
  const data = {
    data: {
      invoices: mockInvoices,
      page: 1,
      total: mockInvoices.length
    }
  }

  const breadcrumbs = findBreadcrumbs(location.pathname, routeTree)

  const handleUpdateStatus = (id) => {
    alert(`Cập nhật trạng thái cho hóa đơn ID: ${id}`)
  }

  return (
    <Box>
      <ProgressBar isLoading={isLoading} />

      {/* <Box sx={{ mb: 2 }}>
        {breadcrumbs.map((item, index) => (
          <Button
            key={index}
            variant='text'
            color={location.pathname === item.path ? 'primary' : 'secondary'}
            disabled={location.pathname === item.path}
            component={Link}
            to={item.path}
          >
            {item.name}
            {location.pathname !== item.path && ' > '}
          </Button>
        ))}
      </Box> */}

    
      <Box>
        <Typography variant="h4">Danh sách hóa đơn</Typography>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center',paddingBlock:2, mb: 2 }}>  
          <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
              <TextField
                label="Từ ngày"
                type="date"
                size="small"
                value={fromDate}
                onChange={(e) => setFromDate(e.target.value)}
                InputLabelProps={{ shrink: true }}
              />
              <TextField
                label="Đến ngày"
                type="date"
                size="small"
                value={thruDate}
                onChange={(e) => setThruDate(e.target.value)}
                InputLabelProps={{ shrink: true }}
              />
          </Box>
          <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
            <TextField
              label="Tìm kiếm theo mã hoặc tên KH"
              size='small'
              sx={{ width: '25ch' }}
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                )
              }}
            />
            <Button
              LinkComponent={Link}
              to={Routes.admin.invoice?.create || '#'}
              variant='contained'
              color='success'
              startIcon={<AddIcon />}
            >
              Thêm mới
            </Button>
          </Box>
        </Box>
      </Box>


      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="invoice table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Mã hóa đơn</StyledTableCell>
              <StyledTableCell>Ngày tạo</StyledTableCell>
              <StyledTableCell>Tên khách hàng</StyledTableCell>
              <StyledTableCell>Tổng tiền</StyledTableCell>
              <StyledTableCell>Trạng thái</StyledTableCell>
              <StyledTableCell align="center">Hành động</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {isLoading
              ? <TableRow><TableCell colSpan={6} align='center'><CircularProgress size={20} /></TableCell></TableRow>
              : (data?.data?.invoices?.length === 0
                ? <TableRow>
                    <TableCell colSpan={6}><SearchResultNotFound message='Không tìm thấy hóa đơn' /></TableCell>
                  </TableRow>
                : data?.data?.invoices?.map((invoice) => (
                  <StyledTableRow key={invoice._id}>
                    <StyledTableCell>{invoice.INVOICE_CODE}</StyledTableCell>
                    <StyledTableCell>{invoice.CREATED_DATE}</StyledTableCell>
                    <StyledTableCell>{invoice.CUSTOMER_NAME}</StyledTableCell>
                    <StyledTableCell>{invoice.TOTAL_AMOUNT?.toLocaleString()} đ</StyledTableCell>
                    <StyledTableCell>{invoice.STATUS}</StyledTableCell>
                    <StyledTableCell align="center">
                      <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1 }}>
                        <Button variant="contained" size="small" color="info">Chi tiết</Button>
                        </Box>
                    </StyledTableCell>
                  </StyledTableRow>
                )))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={6}>
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', width: '100%' }}>
                  <Box sx={{ m: 1, display: 'flex', alignItems: 'center', gap: 2 }}>
                    <InputLabel id="showedRecord-select-standard-label">Số dòng:</InputLabel>
                    <FormControl variant="standard" >
                      <Select
                        labelId="showedRecord-select-standard-label"
                        id="showedRecord-select-standard"
                        value={showedRecord}
                        onChange={(event) => {
                          setShowedRecord(event.target.value)
                        }}
                        label="Số dòng"
                      >
                        {showdRecordOption.map((value, index) => (
                          <MenuItem key={index} value={value}>{value}</MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Box>
                  <Pagination
                    defaultPage={1}
                    count={1}
                    color="primary"
                    sx={{ my: 1 }}
                    onChange={(event, value) => {
                      setPage(value)
                    }}
                  />
                </Box>
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </Box>
  )
}
