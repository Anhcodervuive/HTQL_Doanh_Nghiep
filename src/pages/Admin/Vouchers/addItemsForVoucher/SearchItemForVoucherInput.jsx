import React, { useRef, useState } from 'react'
import {
  Box,
  CircularProgress,
  IconButton,
  InputAdornment,
  Paper,
  Popper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
  Avatar
} from '@mui/material';
import { useQuery } from '@tanstack/react-query'
import { useDeviceId } from '~/hooks/useDeviceId'
import useUserInfo from '~/hooks/useUserInfo'
import useDebounce from '~/hooks/useDebounce'
import SearchIcon from '@mui/icons-material/Search'
import CloseIcon from '@mui/icons-material/Close'
import ClickAwayListener from '@mui/material/ClickAwayListener'
import itemService from '~/service/admin/item.service'
import { formatCurrency } from '~/utils/formatter'
import SearchResultNotFound from '~/components/Error/SearchResultNotFond'

export default function SearchItemForVoucherInput({ onItemClick }) {
  const [searchValue, setSearchValue] = useState('')
  const searchValueDebounce = useDebounce(searchValue, 800)
  const searchAreaRef = useRef(null)
  const [isResultPopperOpen, setIsResultPopperOpen] = useState(false)
  const { userId: user_id } = useUserInfo()
  const device_id = useDeviceId()

  const { data: searchedItems, isLoading, isError } = useQuery({
    enabled: !!user_id && !!device_id && !!searchValueDebounce,
    queryKey: ['searchProductItem', searchValueDebounce],
    queryFn: () =>
      itemService.search(
        { user_id, device_id },
        {
          search: searchValueDebounce,
          size: 5
        }
      ),
    retry: false,
    refetchOnWindowFocus: false
  })

  const handleSearchInput = (e) => {
    setSearchValue(e.target.value)
  }

  const handleClear = () => {
    setSearchValue('')
    setIsResultPopperOpen(false)
  }

  const handleClickAway = () => {
    setIsResultPopperOpen(false)
  }

  return (
    <ClickAwayListener onClickAway={handleClickAway}>
      <Box>
        <Box ref={searchAreaRef}>
          <TextField
            value={searchValue}
            onChange={handleSearchInput}
            onFocus={() => setIsResultPopperOpen(true)}
            fullWidth
            placeholder="Nhập tên hoặc mã sản phẩm"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  {searchValue && (
                    <Box width={30} sx={{ display: 'flex', alignItems: 'center' }}>
                      {isLoading ? (
                        <CircularProgress size={20} />
                      ) : (
                        <IconButton onClick={handleClear}>
                          <CloseIcon />
                        </IconButton>
                      )}
                    </Box>
                  )}
                </InputAdornment>
              )
            }}
          />
        </Box>
        <Popper
          open={isResultPopperOpen && !!searchedItems?.data}
          anchorEl={searchAreaRef.current}
          placement="bottom-start"
          sx={{ zIndex: 1200 }}
        >
          {isError ? (
            <Typography variant="body1" sx={{ backgroundColor: 'white', p: 2 }}>
              Đã xảy ra lỗi khi tìm kiếm. Vui lòng thử lại sau.
            </Typography>
          ) : searchedItems?.data?.total > 0 ? (
            <TableContainer component={Paper} sx={{ mt: 1, maxHeight: 300 }}>
              <Table stickyHeader>
                <TableHead>
                  <TableRow>
                    <TableCell>Ảnh</TableCell>
                    <TableCell>Mã SP</TableCell>
                    <TableCell>Tên SP</TableCell>
                    <TableCell>Giá</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {searchedItems.data.items.map((item) => (
                    <TableRow
                      key={item._id}
                      onClick={() => {
                        onItemClick(item);
                        setIsResultPopperOpen(false);
                      }}
                      sx={{
                        cursor: 'pointer',
                        '&:hover': { backgroundColor: '#f0f0f0' }
                      }}
                    >
                      <TableCell>
                        <Avatar
                          src={item.AVATAR_IMAGE_URL}
                          alt={item.ITEM_NAME}
                          variant="square"
                          sx={{ width: 50, height: 50 }}
                        />
                      </TableCell>
                      <TableCell>{item.ITEM_CODE}</TableCell>
                      <TableCell>{item.ITEM_NAME}</TableCell>
                      <TableCell>
                        {item.PRICE && item.PRICE.length > 0
                          ? formatCurrency(item.PRICE[item.PRICE.length - 1].PRICE_AMOUNT)
                          : '0'}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          ) : (
            <Box sx={{ backgroundColor: 'white', mt: 1, minWidth: '300px', p: 2 }}>
              <SearchResultNotFound message="Không tìm thấy kết quả" />
            </Box>
          )}
        </Popper>
      </Box>
    </ClickAwayListener>
  );
}
