import {
  Box, Typography, IconButton, Button, Select,
  MenuItem, Checkbox
} from '@mui/material'
import { useTheme } from '@mui/material/styles'
import { Add, Remove, DeleteOutline } from '@mui/icons-material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined'
import { useState, useMemo } from 'react'



/* ---------- CartRow NHÚNG TRONG FILE NÀY ---------- */
function CartRow({ product = {}, checked, onToggle }) {
  const theme = useTheme()

  const {
    name = 'Sản phẩm chưa đặt tên',
    img = 'https://via.placeholder.com/70x70?text=No+Image',
    price = 0,
    originalPrice = 0,
    variant: initialVariant = '',
    variantOptions = [],
  } = product

  const [qty, setQty] = useState(1)
  const dec = () => setQty((n) => Math.max(1, n - 1))
  const inc = () => setQty((n) => n + 1)
  const [variant, setVariant] = useState(initialVariant)

  const options = useMemo(() => {
    if (variantOptions.length) return variantOptions
    return ['Mặc định']
  }, [variantOptions])

  
  return (
    <>
      <Box sx={{ border: '1px solid #eee', mb: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', px: 2, py: 1.5, columnGap: 2 }}>
          <Checkbox sx={{ p: 0.5 }} checked={checked} onChange={onToggle} />

          <Box
            component="img"
            src={img}
            alt={name}
            sx={{ width: 120, height: 120, objectFit: 'cover', borderRadius: 1 }}
          />
          <Box sx={{ flex: 1, minWidth: 0 }}>
            <Typography noWrap maxWidth={360} sx={{ fontSize: 16, fontWeight: 600, pl: 3 }}>
              {name}
            </Typography>
            {product.flashSaleEnd && (
              <Typography
                sx={{
                  color: 'primary.main',
                  fontSize: 13,
                  fontWeight: 700,
                  pl: 3,
                }}
              >
                Flash Sale kết thúc lúc <b>{product.flashSaleEnd}</b>
              </Typography>
            )}
          </Box>

          <Box sx={{ minWidth: 120, textAlign: 'right' }}>
            <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center', gap: 1 }}>
              {originalPrice > 0 && (
                <Typography variant="body2" sx={{ textDecoration: 'line-through', color: 'text.disabled' }}>
                  ₫{originalPrice.toLocaleString()}
                </Typography>
              )}
              <Typography variant="subtitle2" fontWeight={700} color="primary">
                ₫{price.toLocaleString()}
              </Typography>
            </Box>
          </Box>



          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              border: `1px solid ${theme.palette.divider}`,
              mx: 2,
              height: 32,
            }}
          >
            <IconButton onClick={dec} size="small"><Remove fontSize="small" /></IconButton>
            <Typography sx={{ width: 30, textAlign: 'center', fontWeight: 700 }}>{qty}</Typography>
            <IconButton onClick={inc} size="small"><Add fontSize="small" /></IconButton>
          </Box>

          <Typography variant="subtitle2" fontWeight={700} color="primary" sx={{ minWidth: 100 }}>
            ₫{(price * qty).toLocaleString()}
          </Typography>

          <Box sx={{ textAlign: 'right', minWidth: 110 }}>
            <Button startIcon={<DeleteOutline />} variant="text" color="primary" sx={{ p: 0, minWidth: 'auto', fontSize: 13 }}>
              Xóa
            </Button>
          </Box>
        </Box>

      </Box>


    </>

  )
}

/* ---------- Component chính để render danh sách ---------- */
export default function Cart() {
  const products = [
    {
      id: '1',
      name: 'Sản phẩm demo 1',
      img: 'https://i.pinimg.com/736x/3a/76/44/3a7644fbc654aefae9403d4075bf7217.jpg',
      price: 190000,
      originalPrice: 290000,
      variant: 'Hồng',
      flashSaleEnd: '09:00:00',
    },
    {
      id: '2',
      name: 'Sản phẩm demo 2',
      img: 'https://i.pinimg.com/736x/3a/76/44/3a7644fbc654aefae9403d4075bf7217.jpg',
      price: 250000,
      originalPrice: 300000,
      variant: 'Xanh',
    },
    {
      id: '3',
      name: 'Sản phẩm demo 3',
      img: 'https://i.pinimg.com/736x/3a/76/44/3a7644fbc654aefae9403d4075bf7217.jpg',
      price: 120000,
      originalPrice: 0,
      variant: 'Vàng',
    },
    {
      id: '4',
      name: 'Sản phẩm demo 4',
      img: 'https://i.pinimg.com/736x/3a/76/44/3a7644fbc654aefae9403d4075bf7217.jpg',
      price: 130000,
      originalPrice: 0,
      variant: 'Vàng',
    },
    {
      id: '5',
      name: 'Sản phẩm demo 5 ',
      img: 'https://i.pinimg.com/736x/3a/76/44/3a7644fbc654aefae9403d4075bf7217.jpg',
      price: 130000,
      originalPrice: 0,
      variant: 'Vàng',
    },
    {
      id: '6',
      name: 'Sản phẩm demo 6 ',
      img: 'https://i.pinimg.com/736x/3a/76/44/3a7644fbc654aefae9403d4075bf7217.jpg',
      price: 130000,
      originalPrice: 0,
      variant: 'Vàng',
    },
  ]
  const [selectedItems, setSelectedItems] = useState([]);

  const isAllSelected = selectedItems.length === products.length;

  const toggleSelectAll = () => {
    if (isAllSelected) {
      setSelectedItems([]);
    } else {
      setSelectedItems(products.map((p) => p.id));
    }
  };


  return (
    <>
      
      {/* Phần danh sách cuộn */}
      <Box
        sx={{
          p: 2,
          backgroundColor: '#fff',
        }}
      >
        {products.map((item) => (
          <CartRow key={item.id}
            product={item}
            checked={selectedItems.includes(item.id)}
            onToggle={() => {
              if (selectedItems.includes(item.id)) {
                setSelectedItems(selectedItems.filter((id) => id !== item.id));
              } else {
                setSelectedItems([...selectedItems, item.id]);
              }
            }} />
        ))}

        {/* Phí vận chuyển */}
        <Box sx={{ border: '1px solid #eee', backgroundColor: '#fff', mt: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', px: 2, py: 1.5, columnGap: 2 }}>
            <LocalShippingOutlinedIcon fontSize="small" />
            <Typography variant="body2" sx={{ fontSize: 13, fontWeight: 500, color: 'text.primary' }}>
              Giảm <Box component="span" sx={{ fontWeight: 700, color: 'primary.main' }}>đ700.000</Box> phí vận chuyển đơn tối thiểu ₫0&nbsp;
              <Box component="span" sx={{ color: 'primary.main', fontWeight: 600, cursor: 'pointer' }}>
                Tìm hiểu thêm
              </Box>
            </Typography>

          </Box>
        </Box>

        {/* Thanh mua hàng - sticky phía trên footer */}
        <Box
          sx={{
            position: 'sticky',
            bottom: 0,
            zIndex: 1,
            backgroundColor: '#fff',
            borderTop: '1px solid #eee',
            px: 2,
            py: 2,
            mt: 2,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
          }}
        >
          {/* Trái: lựa chọn */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
            <Checkbox
              size="small"
              checked={isAllSelected}
              onChange={toggleSelectAll}
            />
            <Typography variant="body2" sx={{ color: 'primary.main', fontWeight: 700 }}>
              Chọn Tất Cả ({products.length})
            </Typography>
            <Typography variant="body2" sx={{ cursor: 'pointer' }}>Xóa</Typography>
          </Box>


          {/* Phải: tổng tiền + nút */}
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 2 }}>
            {/* Trái: Text ngang hàng */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Typography variant="body2">
                Tổng cộng (4 sản phẩm):
              </Typography>
              <Typography sx={{ fontSize: 22, fontWeight: 700, color: 'primary.main' }}>
                ₫551.000
              </Typography>
              <Typography variant="body2" sx={{ color: 'primary.main', fontWeight: 600 }}>
                (Tiết kiệm ₫305k)
              </Typography>
            </Box>

            {/* Phải: Nút */}
            <Button variant="contained" sx={{ backgroundColor: 'primary', px: 4, py: 1.5 }}>
              Mua Hàng
            </Button>
          </Box>

        </Box>
      </Box>

    </>
  )
}
