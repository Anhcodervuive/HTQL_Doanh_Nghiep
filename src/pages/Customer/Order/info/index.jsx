import { useState } from 'react'
import {
  Box,
  Tabs,
  Tab,
  TextField,
  InputAdornment,
  Typography,
  Button,
  Link,
  Avatar,
  Divider,
} from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined'

export default function OrdersInfo() {
  const tabs = ['Nháp', 'Đã xác nhận', 'Đã thanh toán', 'Đã huỷ']
  const [tab, setTab] = useState(0)
  const handleChange = (_, v) => setTab(v)

  const ordersByStatus = {
    'Nháp': [
      {
        id: 1,
        products: [
          {
            img: 'https://i.imgur.com/ZHAF4OJ.jpeg',
            name: 'Bút Kẻ Mắt Siêu Mảnh',
            qty: 2,
            priceOld: 55000,
            priceNew: 45000,
          },
        ],
        total: 90000,
      },
    ],
    'Đã xác nhận': [
      {
        id: 2,
        products: [
          {
            img: 'https://i.imgur.com/xS8Hnku.jpeg',
            name: 'Son Tint Bóng Merzy Dew Tint 4g',
            qty: 1,
            priceOld: 249000,
            priceNew: 160000,
          },
          {
            img: 'https://i.imgur.com/dWmrcvq.jpeg',
            name: 'Sửa Rửa Mặt Hada Labo 80g',
            qty: 2,
            priceOld: 99000,
            priceNew: 89000,
          },
        ],
        total: 338000,
      },
    ],
    'Đã thanh toán': [
      {
        id: 3,
        products: [
          {
            img: 'https://i.imgur.com/9YjNqFr.jpeg',
            name: 'Kem Chống Nắng Anessa SPF50+ PA++++ 60ml',
            qty: 1,
            priceOld: 399000,
            priceNew: 320000,
          },
        ],
        total: 320000,
      },
    ],
    'Đã huỷ': [
      {
        id: 4,
        products: [
          {
            img: 'https://i.imgur.com/Tb7qPBe.jpeg',
            name: 'Mặt Nạ Ngủ Laneige 20g',
            qty: 1,
            priceOld: 120000,
            priceNew: 0,
          },
        ],
        total: 0,
      },
    ],
  }

  const currentOrders = ordersByStatus[tabs[tab]]

  return (
    <Box sx={{ backgroundColor: '#FFFFFF', p: { xs: 1, md: 3 } }}>
      {/* Tabs */}
      <Tabs
        value={tab}
        onChange={handleChange}
        variant="fullWidth"
        textColor="error"
        indicatorColor="error"
        sx={{ backgroundColor: '#fff' }}
      >
        {tabs.map((lbl) => (
          <Tab key={lbl} label={lbl} />
        ))}
      </Tabs>

      {/* Search */}
      <TextField
        placeholder="Bạn có thể tìm kiếm theo tên Shop, ID đơn hàng hoặc Tên Sản phẩm"
        fullWidth
        size="small"
        sx={{ mt: 2, backgroundColor: '#eee' }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />

      {/* Danh sách đơn */}
      {currentOrders.map(({ id, products, total }) => (
        <Box
          key={id}
          sx={{ mt: 2, backgroundColor: '#fff', borderRadius: 1, p: 2 }}
        >
          {/* Header trạng thái (demo gọn) */}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              mb: 1,
              gap: 1,
              justifyContent: 'flex-end',
            }}
          >
            <CheckCircleOutlinedIcon color="success" fontSize="small" />
            <Typography color="success.main" fontWeight={500}>
              {tabs[tab]}
            </Typography>
          </Box>
          <Divider />

          {/* Sản phẩm */}
          {products.map((p, i) => (
            <Box
              key={i}
              sx={{
                display: 'grid',
                gridTemplateColumns: '4fr 1fr 1fr',
                alignItems: 'center',
                columnGap: 2,
                py: 2,
                borderBottom:
                                    i === products.length - 1 ? 'none' : '1px solid #eee',
              }}
            >
              {/* Cột 1: Sản phẩm + qty */}
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Avatar
                  src={p.img}
                  variant="square"
                  sx={{ width: 70, height: 70 }}
                />
                <Box>
                  <Typography
                    fontWeight={600}
                    lineHeight={1.3}
                    sx={{ wordBreak: 'break-word' }}
                  >
                    {p.name}
                  </Typography>
                  <Typography fontSize={13} color="text.secondary">
                                        x{p.qty}
                  </Typography>
                </Box>
              </Box>

              {/* Cột 2: Đơn giá */}
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'flex-end',
                  alignItems: 'baseline',
                  gap: 1,
                }}
              >
                {p.priceOld > 0 && (
                  <Typography
                    fontSize={13}
                    color="text.disabled"
                    sx={{ textDecoration: 'line-through' }}
                  >
                                        ₫{p.priceOld.toLocaleString()}
                  </Typography>
                )}
                <Typography color="primary" fontWeight={700}>
                                    ₫{p.priceNew.toLocaleString()}
                </Typography>
              </Box>

              {/* Cột 3: Thành tiền */}
                  <Typography textAlign="right" color="primary" fontWeight={700}>
                                ₫{(p.priceNew * p.qty).toLocaleString()}
              </Typography>
            </Box>
          ))}

          {/* Footer */}
          <Box
            sx={{
              backgroundColor: '#fff7f7',
              mt: 2,
              p: 2,
              display: 'flex',
              justifyContent: 'flex-end',
            }}
          >
            <Box textAlign="right">
              <Typography>
                                Thành tiền:&nbsp;
                <Typography component="span" color="primary" fontWeight={700}>
                                    ₫{total.toLocaleString()}
                </Typography>
              </Typography>

              {tabs[tab] === 'CONFIRMED' && (
                <Box sx={{ mt: 2 }}>
                  <Button
                    variant="outlined"
                    sx={{ textTransform: 'none' }}
                  >
                                        Yêu Cầu Trả Hàng/Hoàn Tiền
                  </Button>
                </Box>
              )}
            </Box>
          </Box>
        </Box>
      ))}
    </Box>
  )
}
