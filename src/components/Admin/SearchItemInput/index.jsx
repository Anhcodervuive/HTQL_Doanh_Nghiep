import { Box, CircularProgress, IconButton, InputAdornment, Paper, Popper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from '@mui/material'
import { useQuery } from '@tanstack/react-query'
import { useRef, useState } from 'react'
import useDebounce from '~/hooks/useDebounce'
import { useDeviceId } from '~/hooks/useDeviceId'
import useUserInfo from '~/hooks/useUserInfo'
import SearchIcon from '@mui/icons-material/Search'
import CloseIcon from '@mui/icons-material/Close'
import ClickAwayListener from '@mui/material/ClickAwayListener'

import itemService from '~/service/admin/item.service'
import itemTypeService from '~/service/admin/itemType.service'
import { formatCurrency } from '~/utils/formatter'
import SearchResultNotFound from '~/components/Error/SearchResultNotFond'


function SearchItemInput({ onItemClick }) {
  const [searchValue, setSearchValue] = useState('')
  const searchValueDebounce = useDebounce(searchValue, 1000)
  const searchAreaRef = useRef(null)
  const [isResultPropperOpen, setIsResultPropperOpen] = useState(false)
  const { userId: user_id } = useUserInfo()
  const device_id = useDeviceId()
  const { data: dataMaterialItemType } = useQuery({
    enabled: !!user_id && !!device_id,
    queryKey: ['materialItemType'],
    queryFn: () => itemTypeService.findOneByName({
      user_id,
      device_id
    }, 'Nguyên liệu'),
    retry: false,
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 5
  })

  const { data: searchedItem, isLoading: isLoadingSearchedItem, isError: isErrorSearch, } = useQuery({
    enabled: !!user_id && !!device_id && !!dataMaterialItemType && !!searchValueDebounce,
    queryKey: ['searchedItem', searchValueDebounce],
    queryFn: () => itemService.search({
      user_id,
      device_id,
    }, {
      itemTypeId: dataMaterialItemType?.data?._id,
      search: searchValueDebounce,
      size: 5
    }),
    retry: false,
    refetchOnWindowFocus: false,
  })

  const handleSearchInput = (e) => {
    setSearchValue(e.target.value)
  }

  const handleClear = () => {
    setSearchValue('')
    setIsResultPropperOpen(false)
  }

  const handleClickAway = () => {
    setIsResultPropperOpen(false)
  }

  return (
    <ClickAwayListener onClickAway={handleClickAway} >
      <Box>
        <Box ref={searchAreaRef}>
          <TextField
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position='start'>
                    <SearchIcon />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position='end'>
                    <Box width={30} sx={{ display: 'flex', alignItems: 'center' }}>
                      {searchValue && (
                        isLoadingSearchedItem
                          ? <CircularProgress />
                          : <IconButton onClick={handleClear}>
                            <CloseIcon />
                          </IconButton>
                      )}
                    </Box>
                  </InputAdornment>
                )
              }
            }}
            value={searchValue}
            onChange={handleSearchInput}
            onFocus={() => setIsResultPropperOpen(true)}
            fullWidth
            placeholder='Nhập tên hoặc mã hàng'
            // sx={{
            //   '& .MuiOutlinedInput-root': {
            //     '&.Mui-focused': { backgroundColor: 'white' },
            //     '& fieldset': { borderColor: 'rgba(0 0 0)' },
            //     '&:hover fieldset': { borderColor: 'rgba(0 0 0)' },
            //     '&.Mui-focused fieldset': { borderColor: 'rgba(0 0 0)', borderWidth: '1px' },
            //   }
            // }}
          />
        </Box>
        <Popper open={isResultPropperOpen && !!searchedItem?.data} anchorEl={searchAreaRef.current} placement="bottom-start">
          {isErrorSearch
            ? <Typography variant='body1'>Đã có lỗi xảy ra khi tìm kiếm, vui lòng thử lại sau</Typography>
            : (
              searchedItem?.data?.total > 0
                ? <TableContainer component={Paper} sx={{ mt: 1 }}>
                  <Table >
                    <TableHead>
                      <TableRow>
                        <TableCell>Mã</TableCell>
                        <TableCell>Name</TableCell>
                        <TableCell>Giá</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {searchedItem?.data?.items?.map((item) => (
                        <TableRow
                          key={item._id}
                          onClick={() => onItemClick(item)}
                          sx={{
                            cursor: 'pointer', // Biến thành con trỏ khi hover
                            '&:hover': { backgroundColor: '#b3b3b3cc' }, // Đổi màu khi hover
                          }}
                        >
                          <TableCell>{item.ITEM_CODE}</TableCell>
                          <TableCell>{item.ITEM_NAME}</TableCell>
                          <TableCell>{`${formatCurrency(item.PRICE[item.PRICE.length - 1]?.PRICE_AMOUNT)} ${item.PRICE[item.PRICE.length - 1]?.UNIT_ABB}`}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
                : <Box sx={{ backgroundColor: 'white', mt: 1, minWidth: '300px' }}>
                  <SearchResultNotFound message='Không tìm thấy kết quả' />
                </Box>
            )
          }
        </Popper>
      </Box>
    </ClickAwayListener>
  )
}

export default SearchItemInput