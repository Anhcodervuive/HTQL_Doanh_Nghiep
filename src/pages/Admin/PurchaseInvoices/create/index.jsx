import React, { useState } from 'react'
import {
  Box,
  Button,
  TextField,
  Typography,
  MenuItem,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton
} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import { useMutation } from '@tanstack/react-query'
import { useLocation, Link, useNavigate } from 'react-router-dom'
import { findBreadcrumbs, routeTree } from '~/config/routeTree'
import SearchItemInput from '~/components/Admin/SearchItemInput'
import SearchSupplierInput from '~/components/Admin/SearchSupplierInput'
import { useDeviceId } from '~/hooks/useDeviceId'
import useUserInfo from '~/hooks/useUserInfo'
import invoicesService from '~/service/admin/invoices.service'
import { toast } from 'react-toastify'

const STATUS_OPTIONS = [
  { label: 'DRAFT', value: 'DRAFT' },
  { label: 'PENDING_APPROVAL', value: 'PENDING_APPROVAL' },
  { label: 'CONFIRMED', value: 'CONFIRMED' },
  { label: 'REJECTED', value: 'REJECTED' },
  { label: 'PAYMENTED', value: 'PAYMENTED' }
]

const PAYMENT_OPTIONS = [
  { label: 'Tiền mặt', value: 'Tiền mặt' },
  { label: 'Chuyển khoản', value: 'Chuyển khoản' }
]

export default function AddPurchaseInvoiceForm() {
  const location = useLocation()
  const navigate = useNavigate()
  const [selectedItems, setSelectedItems] = useState([])
  const [statusName, setStatusName] = useState('CONFIRMED')
  const [paymented, setPaymented] = useState('Chuyển khoản')
  const [tax, setTax] = useState(10)
  const device_id = useDeviceId()
  const { userId: user_id } = useUserInfo()

  const breadcrumbs = findBreadcrumbs(location.pathname, routeTree)

  const mutation = useMutation({
    mutationFn: (data) => invoicesService.create( { user_id, device_id } ,data),
    onSuccess: (res) => {
      console.log('Tạo hóa đơn thành công:', res)
      toast.success('Tạo hóa đơn thành công!')
      navigate(`/admin/purchase-invoices/${res.data.INVOICE_CODE}`)
    },
    onError: (err) => {
      console.error('Lỗi:', err)
      toast.error('Đã xảy ra lỗi khi tạo hóa đơn!')
    }
  })

  const handleItemClick = (item) => {
    setSelectedItems((prev) => [
      ...prev,
      {
        ITEM_CODE: item.ITEM_CODE,
        ITEM_NAME: item.ITEM_NAME,
        SUPPLIER_ID: '', // chưa có, người dùng sẽ chọn
        QUANTITY: 1
      }
    ])
  }

  const handleSupplierSelect = (itemIndex, supplierId) => {
    setSelectedItems((prev) =>
      prev.map((item, index) =>
        index === itemIndex ? { ...item, SUPPLIER_ID: supplierId } : item
      )
    )
  }

  const handleQuantityChange = (itemIndex, quantity) => {
    setSelectedItems((prev) =>
      prev.map((item, index) =>
        index === itemIndex ? { ...item, QUANTITY: quantity } : item
      )
    )
  }
  const handleDeleteItem = (itemIndex) => {
    setSelectedItems((prev) => prev.filter((_, index) => index !== itemIndex))
  }

  const handleSubmit = () => {
    const data = {
      statusName,
      tax,
      paymented,
      items: selectedItems
    }

    // Validate: tất cả SUPPLIER_ID đã chọn
    const missingSuppliers = selectedItems.some(item => !item.SUPPLIER_ID)
    if (missingSuppliers) {
      toast.error('Vui lòng chọn đầy đủ nhà cung cấp cho từng sản phẩm.')
      return
    }

    mutation.mutate(data)
  }
  console.log('selectedItems:', selectedItems)


  return (
    <Paper sx={{ p: 3, maxWidth: 1000, mx: 'auto' }}>
      <Box sx={{ mb: 2 }}>
        {breadcrumbs.map((item, index) => (
          <Button
            key={index}
            variant="text"
            color={location.pathname === item.path ? 'primary' : 'secondary'}
            disabled={location.pathname === item.path}
            component={Link}
            to={item.path}
          >
            {item.name}
            {location.pathname !== item.path && ' > '}
          </Button>
        ))}
      </Box>
      <Typography variant="h5" gutterBottom>
        Tạo mới hóa đơn mua hàng
      </Typography>

      {/* Search sản phẩm */}
      <Box mb={2} sx={{ position: 'relative', zIndex: 2000 }}>
        <Box
          sx={{
            position: 'relative',
            backgroundColor: 'white',
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
            borderRadius: 1,
            zIndex: 2000,
            p: 1 // thêm padding nhẹ nếu cần
          }}
        >
          <SearchItemInput onItemClick={handleItemClick} />
        </Box>
      </Box>


      {/* Chọn trạng thái và phương thức thanh toán */}
      <Box mb={2} sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
        <TextField
          select
          label="Trạng thái"
          value={statusName}
          onChange={(e) => setStatusName(e.target.value)}
          sx={{ minWidth: 200 }}
        >
          {STATUS_OPTIONS.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          select
          label="Thanh toán"
          value={paymented}
          onChange={(e) => setPaymented(e.target.value)}
          sx={{ minWidth: 200 }}
        >
          {PAYMENT_OPTIONS.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          type="number"
          label="Thuế (%)"
          value={tax}
          onChange={(e) => setTax(Number(e.target.value))}
          sx={{ minWidth: 120 }}
        />
      </Box>

      {/* Bảng sản phẩm đã chọn */}
      <TableContainer component={Paper} sx={{ mb: 2 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Mã sản phẩm</TableCell>
              <TableCell>Tên sản phẩm</TableCell>
              <TableCell>Nhà cung cấp</TableCell>
              <TableCell>Số lượng</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {selectedItems.map((item, index) => (
              <TableRow key={index}>
                <TableCell>{item.ITEM_CODE}</TableCell>
                <TableCell>{item.ITEM_NAME}</TableCell>
                <TableCell
                  sx={{
                    position: 'relative',
                    backgroundColor: '#fff',
                    zIndex: 0
                  }}
                >
                  <SearchSupplierInput
                    index={index}
                    selectedSupplier={item.SUPPLIER_ID}
                    onSelect={(supplierId) => handleSupplierSelect(index, supplierId)}
                  />
                </TableCell>

                <TableCell>
                  <TextField
                    type="number"
                    size="small"
                    value={item.QUANTITY}
                    onChange={(e) =>
                      handleQuantityChange(index, Number(e.target.value))
                    }
                  />
                </TableCell>
                <TableCell>
                  <IconButton color='error' onClick={() => handleDeleteItem(index)}>
                    <CloseIcon/>
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Submit */}
      <Button
        variant="contained"
        color="primary"
        onClick={handleSubmit}
        disabled={mutation.isLoading}
      >
        {mutation.isLoading ? 'Đang lưu...' : 'Lưu hóa đơn'}
      </Button>
    </Paper>
  )
}
