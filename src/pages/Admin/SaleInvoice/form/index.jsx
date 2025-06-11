import { Avatar, Box, Button, Card, CardContent, CardHeader, Chip, FormControl, Grid, IconButton, InputAdornment, InputLabel, MenuItem, Paper, Select, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from '@mui/material'
import { Controller, useForm } from 'react-hook-form'
import { TbReceiptTax } from 'react-icons/tb'
import EditNoteIcon from '@mui/icons-material/EditNote'
import AttachMoneyIcon from '@mui/icons-material/AttachMoney'
import { useQuery } from '@tanstack/react-query'
import { useDeviceId } from '~/hooks/useDeviceId'
import useUserInfo from '~/hooks/useUserInfo'
import unitInvoiceService from '~/service/admin/unitInvoice.service'
import { PURCHASE_METHODS } from '~/utils/contant'
import SearchItemInput from '~/components/Admin/SearchItemInput'
import SearchUserInput from '~/components/Admin/SearchUserInput'
import { useMemo, useState } from 'react'
import DeleteIcon from '@mui/icons-material/Delete'
import { formatCurrency, formatUrl } from '~/utils/formatter'

function SaleInvoiceForm({ submit, data }) {
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm()
  const deviceId = useDeviceId()
  const { userId: user_id } = useUserInfo()
  const extraFee = watch('extraFee')
  const tax = watch('tax')
  const extraFeeUnit = watch('extraFeeUnit')
  const [selectedUser, setSelectedUser] = useState()
  const [items, setItems] = useState([])
  const { data: dataUnitInvoice, isLoading: isLoadingUnitInvoice, isError: isErrorUnitInvoice } = useQuery({
    queryKey: ['unitInvoiceList'],
    enabled: !!deviceId,
    queryFn: () => unitInvoiceService.search({
      user_id,
      device_id: deviceId
    }),
    retry: false,
    refetchOnWindowFocus: false, // Khi chuyển màn hình sẽ k bị refetch dữ liệu
    // staleTime: 1000 * 60 * 3
  })

  const totalItemPrice = useMemo(() => items.reduce((acc, cur) => {
    const totalPriceOfItem = cur.QUANTITY * cur.PRICE.at(-1).PRICE_AMOUNT
    return acc + totalPriceOfItem
  }, 0), [items])

  const priceAfterExtraFee = useMemo(() => Number.parseInt(totalItemPrice) + Number.parseInt(totalItemPrice) * Number.parseInt(tax) / 100 + Number.parseInt(extraFee),
    [extraFee, tax, totalItemPrice]
  )

  const handleUserChose = (user) => {
    console.log(user)
    setSelectedUser(user)
  }

  const onSubmit = async (data) => {
    console.log('data sale invoice: ', data)
  }

  const handleAddItem = (itemToAdd) => {
    const isItemInserted = items.find(i => i.ITEM_CODE === itemToAdd.ITEM_CODE)
    let newItems
    if (isItemInserted) {
      isItemInserted.QUANTITY += 1
      newItems = [...items]
    } else {
      newItems = [...items, { ...itemToAdd, QUANTITY: 1 }]
      newItems = newItems.map(item => {
        const availableVouchers = getAvailableVouchers(item)
        if (availableVouchers.length > 0) {
          const highestVoucher = getHighestVoucher(availableVouchers, item.PRICE.at(-1).PRICE_AMOUNT)
          return { ...item, voucher: highestVoucher }
        }
        return item
      })
    }
    setItems(newItems)
  }

  const handleQuantityChange = (e, itemCode) => {
    const targetItem = items.find(item => item.ITEM_CODE === itemCode)
    targetItem.QUANTITY = e.target.value
    let newItems = [...items]
    setItems(newItems)
    // changeBomMaterials(newItemMaterials)
  }

  const handleRemove = (itemCode) => {
    const filteredItemMaterials = items.filter(item => item.ITEM_CODE !== itemCode)
    setItems(filteredItemMaterials)
  }

  const getAvailableVouchers = (item) => {
    return item?.LIST_VOUCHER_ACTIVE?.filter(voucher => {
      const startDate = new Date(voucher.START_DATE)
      const endDate = new Date(voucher.END_DATE)
      const now = new Date()

      return voucher.IS_ACTIVE && now > startDate && now < endDate
    }) || []
  }

  const getHighestVoucher = (vouchers, itemPrice) => {
    const voucherValues = vouchers.map(voucher => {
      if (voucher.TYPE === 'PERCENTAGE') {
        const discount = itemPrice * voucher.VALUE / 100
        return voucher.MAX_DISCOUNT ? Math.min(discount, voucher.MAX_DISCOUNT) : discount
      } else if (voucher.TYPE === 'FIXED_AMOUNT') {
        return voucher.VALUE
      }
      return 0
    })

    return vouchers[voucherValues.indexOf(Math.max(...voucherValues))]
  }

  const getPriceDecreasedByVoucher = (item) => {
    if (!item.voucher) return 0
    if (item.voucher.TYPE === 'PERCENTAGE') {
      const discount = item.PRICE.at(-1).PRICE_AMOUNT * item.voucher.VALUE / 100
      return item.voucher.MAX_DISCOUNT ? Math.min(discount, item.voucher.MAX_DISCOUNT) : discount
    } else {
      return item.voucher.VALUE
    }
  }

  const handleChangeVoucher = (e, itemCode) => {
    const targetItem = items.find(item => item.ITEM_CODE === itemCode)
    if (e.target.value === '') {
      targetItem.voucher = null
    } else {
      const selectedVoucher = getAvailableVouchers(targetItem).find(voucher => voucher._id === e.target.value)
      if (selectedVoucher) {
        targetItem.voucher = selectedVoucher
      }
    }
    let newItems = [...items]
    setItems(newItems)
  }

  console.log(items)

  return (
    <form noValidate onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={2}>
        <Box sx={{ bgcolor: 'white', p: 3, borderRadius: '5px', boxShadow: (theme) => theme.shadows[1], }}>
          <Grid container spacing={4}>
            <Grid size={6}>
              <Stack spacing={2}>
                <Controller
                  name="tax"
                  control={control}
                  defaultValue={data?.tax ?? 0}
                  rules={{
                    min: { value: 0, message: 'Thuế phải >= 0' },
                    max: { value: 100, message: 'Thuế phải <= 100' }
                  }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      size='small'
                      label="Phần trăm thuế"
                      name='tax'
                      fullWidth
                      type='number'
                      slotProps={{
                        input: {
                          startAdornment: (
                            <InputAdornment position='start'><TbReceiptTax /></InputAdornment>
                          ),
                          endAdornment: (
                            <InputAdornment position='end'>%</InputAdornment>
                          )
                        },
                        htmlInput: { min: 0, max: 100 }
                      }}
                      error={!!errors.tax}
                      helperText={errors.tax?.message}
                    />
                  )}
                />
                <Controller
                  name="extraFee"
                  control={control}
                  defaultValue={data?.extraFee ?? 0}
                  rules={{
                    min: { value: 0, message: 'Giá trị nhập vào >= 0' }
                  }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      size='small'
                      label="Phí phát sinh"
                      name='extraFee'
                      fullWidth
                      type='number'
                      slotProps={{
                        input: {
                          startAdornment: (
                            <InputAdornment position='start'><AttachMoneyIcon fontSize='small' /></InputAdornment>
                          )
                        },
                        htmlInput: { min: 0 }
                      }}
                      error={!!errors.extraFee}
                      helperText={errors.extraFee?.message}
                    />
                  )}
                />
                {!isLoadingUnitInvoice && !isErrorUnitInvoice && !!dataUnitInvoice && <FormControl>
                  <InputLabel id="extraFeeUnit">Đơn vị tiền tệ phí phát sinh</InputLabel>
                  <Controller
                    defaultValue=''
                    name="extraFeeUnit"
                    control={control}
                    rules={{ required: 'Vui lòng chọn đơn vị tiền tệ', }}
                    render={({ field }) => (
                      <Select
                        {...field}
                        sx={{ height: '100%' }}
                        id="extraFeeUnit"
                        label="Đơn vị tiền tệ"
                        labelId="extraFeeUnit"
                        name='extraFeeUnit'
                        error={!!errors.extraFeeUnit}
                      >
                        <MenuItem value=''>--</MenuItem>
                        {dataUnitInvoice?.data?.map((unitInvoice) => (
                          <MenuItem key={unitInvoice._id} value={unitInvoice._id}>
                            {unitInvoice.UNIT_NAME}
                          </MenuItem>
                        ))}
                      </Select>
                    )}
                  />
                </FormControl>
                }
                <FormControl>
                  <InputLabel id="purchaseMethod">Hình thức mua hàng</InputLabel>
                  <Controller
                    defaultValue=''
                    name="purchaseMethod"
                    control={control}
                    rules={{ required: 'Vui lòng chọn hình thức mua hàng', }}
                    render={({ field }) => (
                      <Select
                        {...field}
                        sx={{ height: '100%' }}
                        id="purchaseMethod"
                        label="Đơn vị tiền tệ"
                        labelId="purchaseMethod"
                        name='purchaseMethod'
                        error={!!errors.purchaseMethod}
                      >
                        <MenuItem value=''>--</MenuItem>
                        {PURCHASE_METHODS.map(item => (
                          <MenuItem value={item.value} disabled={item?.disable}>{item.label}</MenuItem>
                        ))}
                      </Select>
                    )}
                  />
                </FormControl>
              </Stack>
            </Grid>
            <Grid size={6}>
              <Stack spacing={2}>
                <Controller
                  name="note"
                  control={control}
                  defaultValue={data?.note}
                  rules={{}}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      size='small'
                      label="Ghi chú"
                      name='note'
                      fullWidth
                      type='text'
                      multiline
                      minRows={3}
                      slotProps={{
                        input: {
                          startAdornment: (
                            <InputAdornment position='start'><EditNoteIcon /></InputAdornment>
                          )
                        },
                      }}
                      error={!!errors.note}
                      helperText={errors.note?.message}
                    />
                  )}
                />
                <SearchUserInput onItemClick={handleUserChose} />
                {!!selectedUser && (
                  <Chip
                    sx={{ width: 'fit-content' }}
                    avatar={<Avatar alt={selectedUser.LIST_NAME?.at(-1).FIRST_NAME} src={selectedUser.AVATAR_IMG_URL} />}
                    label={selectedUser.LIST_NAME?.at(-1).FULL_NAME}
                    variant="outlined"
                    onDelete={() => setSelectedUser(null)}
                  />
                )}
              </Stack>
            </Grid>
          </Grid>
        </Box>
        <Card sx={{ bgcolor: 'white', borderRadius: '5px', boxShadow: (theme) => theme.shadows[1], }}>
          <CardHeader
            title={
              <Stack flexDirection='row' justifyContent='space-between' alignItems='center'>
                <Typography variant="body1" fontWeight={600}>Hàng hóa: </Typography>
                <SearchItemInput properPosition='bottom-end' searchOption='product' onItemClick={handleAddItem} />
              </Stack>
            }
            sx={{
              bgcolor: 'rgb(249, 250, 253)',
            }}
          ></CardHeader>
          <CardContent>
            <TableContainer component={Paper} sx={{ mt: 1 }}>
              <Table >
                <TableHead>
                  <TableRow>
                    <TableCell>Sản phẩm</TableCell>
                    <TableCell>Giá</TableCell>
                    <TableCell>Số lượng</TableCell>
                    <TableCell>Vourcher</TableCell>
                    <TableCell></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {items?.map((item) => (
                    <TableRow key={item._id}>
                      <TableCell>
                        <Stack flexDirection='row' gap={2} alignItems='center'>
                          <Box
                            sx={{
                              width: '70px',
                              height: '70px',
                              borderRadius: '5px',
                              marginRight: '10px',
                              backgroundRepeat: 'no-repeat',
                              backgroundSize: 'cover',
                              backgroundPosition: 'center',
                              backgroundImage: item.AVATAR_IMAGE_URL ? `url('${item.AVATAR_IMAGE_URL}` : `url(${formatUrl('https://placehold.co/100', { text: item.ITEM_NAME_EN })})`,
                            }}
                          />
                          <Stack gap={1}>
                            <Typography variant='body1' px={1}>{item.ITEM_NAME}</Typography>
                            <Typography variant='caption' px={1}>{item.ITEM_CODE}</Typography>
                            <Chip label={item.ITEM_TYPE_NAME} sx={{ width: 'fit-content' }} />
                          </Stack>
                        </Stack>
                      </TableCell>
                      <TableCell>
                        <Stack>
                          <Typography variant='body1'>
                            {`${formatCurrency(item.PRICE.at(-1).PRICE_AMOUNT)} ${item.PRICE.at(-1).UNIT_ABB}`}
                          </Typography>
                          {item.voucher && (
                            <Typography variant='caption' color='text.secondary'>
                              {`- ${formatCurrency(getPriceDecreasedByVoucher(item))} ${item.PRICE.at(-1).UNIT_ABB}`}
                            </Typography>
                          )}
                        </Stack>
                      </TableCell>
                      <TableCell>
                        <TextField
                          size='small'
                          type='number'
                          name='bomMaterials'
                          sx={{ maxWidth: '100px' }}
                          slotProps={{
                            htmlInput: { min: 1 },
                            input: {
                              endAdornment: (
                                <InputAdornment position='end'>{item.UNIT_NAME}</InputAdornment>
                              )
                            }
                          }}
                          value={item.QUANTITY}
                          onChange={(e) => handleQuantityChange(e, item.ITEM_CODE)}
                        />
                      </TableCell>
                      <TableCell>
                        <Select
                          label="Vourcher"
                          value={item?.voucher?._id || ''}
                          onChange={(e) => handleChangeVoucher(e, item.ITEM_CODE)}
                          sx={{ width: '250px', fontSize: '0.8rem', color: 'grey' }}
                        >
                          <MenuItem value='' sx={{ textAlign: 'center', fontSize: '0.8rem', color: 'grey' }}>--</MenuItem>
                          {getAvailableVouchers(item).map(voucher =>
                            <MenuItem key={voucher._id} value={voucher._id} sx={{ textAlign: 'center', fontSize: '0.8rem', color: 'grey' }}>
                              {`Giảm ${voucher.VALUE} ${voucher.TYPE === 'FIXED_AMOUNT' ? items.at(0).PRICE.at(0).UNIT_ABB : '%'}
                                ${voucher.TYPE === 'PERCENTAGE' && voucher.MAX_DISCOUNT ? `(Tối đa ${formatCurrency(voucher.MAX_DISCOUNT)} ${items.at(0).PRICE.at(0).UNIT_ABB})` : ''}`}
                            </MenuItem>
                          )}
                        </Select>
                      </TableCell>
                      <TableCell>
                        <IconButton aria-label="delete" size="large" onClick={() => handleRemove(item.ITEM_CODE)}>
                          <DeleteIcon color='error'/>
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                  {items.length > 0 && (
                    <>
                      <TableRow>
                        <TableCell>
                          <Typography variant='h6' sx={{ textAlign: 'center' }}>
                            Tổng tiền hàng:
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant='h6'>
                            {`${formatCurrency(totalItemPrice)} ${items.at(0).PRICE.at(0).UNIT_ABB}`}
                          </Typography>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell sx={{ textAlign: 'center', }}>
                          <Typography variant='caption'>
                            Thuế:
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant='caption'>
                            {`+ ${formatCurrency(totalItemPrice * tax/100)} ${items.at(0).PRICE.at(0).UNIT_ABB} (${tax} %)`}
                          </Typography>
                        </TableCell>
                      </TableRow>
                      {!!dataUnitInvoice && !!extraFeeUnit && (
                        <TableRow>
                          <TableCell sx={{ textAlign: 'center' }}>
                            <Typography variant='caption'>
                              Phí phát sinh:
                            </Typography>
                          </TableCell>
                          <TableCell>
                            <Typography variant='caption'>
                              {`+ ${formatCurrency(extraFee)} ${dataUnitInvoice?.data?.find(i => i._id === extraFeeUnit)?.UNIT_NAME}`}
                            </Typography>
                          </TableCell>
                        </TableRow>
                      )}
                      <TableRow>
                        <TableCell sx={{ textAlign: 'center' }}>
                          <Typography variant='caption'>
                            Giảm cho sản phẩm:
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant='caption'>
                            {`- ${formatCurrency(items.reduce((acc, cur) => acc + getPriceDecreasedByVoucher(cur), 0))} ${items.at(0).PRICE.at(-1).UNIT_ABB}`}
                          </Typography>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>
                          <Typography variant='h6' sx={{ textAlign: 'center' }}>
                            Tổng số tiền:
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant='h6'>
                            {`${formatCurrency(priceAfterExtraFee)} ${items.at(0).PRICE.at(0).UNIT_ABB}`}
                          </Typography>
                        </TableCell>
                      </TableRow>
                    </>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
            <Stack flexDirection='row' gap={2} justifyContent='center' mt={4}>
              <Button variant="contained" color="success">
                Lưu
              </Button>
              <Button variant="contained">Lưu và In</Button>
            </Stack>
          </CardContent>
        </Card>
      </Stack>
    </form>
  )
}

export default SaleInvoiceForm