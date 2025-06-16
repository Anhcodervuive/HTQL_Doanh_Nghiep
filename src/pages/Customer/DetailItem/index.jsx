import {
  Box,
  Typography,
  Button,
  Chip,
  TextField,
  IconButton,
} from '@mui/material'
import { ArrowBackIos, ArrowForwardIos } from '@mui/icons-material'
import { Add, Remove, ShoppingCart } from '@mui/icons-material'
import { useRef, useState } from 'react'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import themeCustomer from './theme'



export default function DetailItem() {
  const [qty, setQty] = useState(1)
  const dec = () => setQty((n) => Math.max(1, n - 1))
  const inc = () => setQty((n) => n + 1)

  const [selectedImage, setSelectedImage] = useState(
    'https://i.pinimg.com/736x/8f/b2/75/8fb275f487f40b7c66fc94507da77637.jpg'
  )
  const thumbnails = [
    'https://i.pinimg.com/736x/8f/b2/75/8fb275f487f40b7c66fc94507da77637.jpg',
    '/images/sample2.jpg',
    '/images/sample3.jpg',
    '/images/sample4.jpg',
    '/images/sample5.jpg',
    '/images/sample6.jpg',
    '/images/sample7.jpg',
    '/images/sample8.jpg',
  ]
  const scrollRef = useRef(null)
  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = direction === 'left' ? -100 : 100
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' })
    }
  }


  const relatedRef = useRef(null)

  const scrollRelated = (dir) => {
    if (relatedRef.current) {
      relatedRef.current.scrollBy({
        left: dir === 'left' ? -300 : 300,
        behavior: 'smooth',
      })
    }
  }


  const related = [
    { id: 1, name: 'Miếng dán mụn FOCALLURE…', img: 'https://i.pinimg.com/736x/8f/b2/75/8fb275f487f40b7c66fc94507da77637.jpg', price: 35200, originalPrice: 44000, },
    { id: 2, name: 'Son môi FOCALLURE lì…', img: 'https://i.pinimg.com/736x/60/45/c4/6045c4daa2bbbace7db886bfb11eccd4.jpg', price: 119900, originalPrice: 44000, },
    { id: 3, name: 'Bút kẻ mắt FOCALLURE…', img: 'https://i.pinimg.com/736x/60/45/c4/6045c4daa2bbbace7db886bfb11eccd4.jpg', price: 48400, originalPrice: 44000, },
    { id: 4, name: 'Bảng phấn mắt 9.6g…', img: 'https://i.pinimg.com/736x/60/45/c4/6045c4daa2bbbace7db886bfb11eccd4.jpg', price: 218900, originalPrice: 44000, },
    { id: 5, name: 'Bảng phấn mắt 9.6g…', img: 'https://i.pinimg.com/736x/60/45/c4/6045c4daa2bbbace7db886bfb11eccd4.jpg', price: 218900, originalPrice: 44000, },
    { id: 6, name: 'Bảng phấn mắt 9.6g…', img: 'https://i.pinimg.com/736x/60/45/c4/6045c4daa2bbbace7db886bfb11eccd4.jpg', price: 218900, originalPrice: 44000, },
    { id: 7, name: 'Bảng phấn mắt 9.6g…', img: 'https://i.pinimg.com/736x/60/45/c4/6045c4daa2bbbace7db886bfb11eccd4.jpg', price: 218900, originalPrice: 44000, },
    { id: 8, name: 'Bảng phấn mắt 9.6g…', img: 'https://i.pinimg.com/736x/60/45/c4/6045c4daa2bbbace7db886bfb11eccd4.jpg', price: 218900, originalPrice: 44000, },
    { id: 9, name: 'Bảng phấn mắt 9.6g…', img: 'https://i.pinimg.com/736x/60/45/c4/6045c4daa2bbbace7db886bfb11eccd4.jpg', price: 218900, originalPrice: 44000, },
    { id: 10, name: 'Bảng phấn mắt 9.6g…', img: 'https://i.pinimg.com/736x/60/45/c4/6045c4daa2bbbace7db886bfb11eccd4.jpg', price: 218900, originalPrice: 44000, },
  ]
  const placeholder =
    'https://i.pinimg.com/736x/60/45/c4/6045c4daa2bbbace7db886bfb11eccd4.jpg'

  return (
    <>
      <Box
        sx={{
          p: 4,
          maxWidth: '1200px',
          mx: 'auto',
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          gap: 4,
        }}
      >
        <Box sx={{ width: 400, mr: { md: 4 } }}>
          <Box sx={{ width: 400, mx: 'auto' }}>
            <Box
              sx={{
                width: '100%',
                height: 400,
                borderRadius: 2,
                overflow: 'hidden',
                mb: 0,
              }}
            >
              <img
                src={selectedImage}
                alt="main"
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
              />
            </Box>

            <Box sx={{ position: 'relative', width: '100%', overflow: 'hidden' }}>
              <IconButton
                onClick={() => scroll('left')}
                sx={{
                  position: 'absolute',
                  left: 0,
                  top: '50%',
                  transform: 'translateY(-50%)',
                  zIndex: 2,
                  width: 32,
                  height: 32,
                  backgroundColor: 'rgba(255,255,255,0.9)',
                  border: '1px solid #ddd',
                }}
              >
                <ArrowBackIos fontSize="small" />
              </IconButton>

              <Box
                ref={scrollRef}
                sx={{
                  overflowX: 'auto',
                  display: 'flex',
                  gap: 1,
                  py: 0.5,
                  scrollBehavior: 'smooth',
                  width: '100%',
                  boxSizing: 'border-box',
                  '&::-webkit-scrollbar': { display: 'none' },
                  scrollbarWidth: 'none',
                  msOverflowStyle: 'none',
                }}
              >
                {thumbnails.map((url, i) => (
                  <Box
                    key={i}
                    onMouseEnter={() => setSelectedImage(url)}
                    sx={{
                      width: 60,
                      height: 60,
                      border: selectedImage === url ? '2px solid red' : '1px solid #ccc',
                      borderRadius: 1,
                      flexShrink: 0,
                      overflow: 'hidden',
                      cursor: 'pointer',
                    }}
                  >
                    <img
                      src={url}
                      alt={`thumb-${i}`}
                      style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                    />
                  </Box>
                ))}
              </Box>

              <IconButton
                onClick={() => scroll('right')}
                sx={{
                  position: 'absolute',
                  right: 0,
                  top: '50%',
                  transform: 'translateY(-50%)',
                  zIndex: 2,
                  width: 32,
                  height: 32,
                  backgroundColor: 'rgba(255,255,255,0.9)',
                  border: '1px solid #ddd',
                }}
              >
                <ArrowForwardIos fontSize="small" />
              </IconButton>
            </Box>
          </Box>
        </Box>


        <Box sx={{ flex: 1 }}>
          <Typography variant="h6" fontWeight={700} color="black">
            Sữa Tắm Lifebuoy 800gr Detox Và Sạch Sâu Khỏi Bụi Mịn Pm2.5 Detox
            100% Từ Thiên Nhiên Diệt Khuẩn
          </Typography>

          {/* GIÁ + HSD NẰM NGANG */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, my: 1 }}>
            <Typography variant="h5" color="error" fontWeight={700}>
              ₫166.380
            </Typography>

            <Typography
              variant="h6"
              sx={{ textDecoration: 'line-through', color: 'text.secondary' }}
            >
              ₫214.500
            </Typography>

            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              HSD&nbsp;30/06/2025
            </Typography>
          </Box>


          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, my: 2 }}>
            <Typography
              sx={{
                minWidth: 120,
                color: 'text.secondary',
                // fontWeight: 800,
                whiteSpace: 'nowrap',
              }}
            >
              Voucher Của Shop
            </Typography>

            <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
              {['Giảm 5%', 'Giảm 8%', 'Giảm 5%', 'Giảm 5%'].map((label, i) => (
                <Chip
                  key={i}
                  label={label}
                  size="small"
                  sx={{
                    position: 'relative',
                    px: 2,
                    fontWeight: 700,
                    color: 'error.main',
                    backgroundColor: 'rgba(244,67,54,0.08)',
                    border: 'none',
                    borderRadius: 0,

                  }}
                />
              ))}
            </Box>
          </Box>


          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
            <Typography
              sx={{
                minWidth: 80,
                color: 'text.secondary',
                //fontWeight: 600,
                whiteSpace: 'nowrap',
              }}
            >
              Phân loại
            </Typography>

            <Chip label="Matcha" clickable variant="outlined" />
          </Box>

          <Typography
            variant="body2"
            sx={{ color: 'text.secondary', mb: 3 }}
          >
            Sữa tắm Lifebuoy hương Matcha giúp làm sạch sâu, loại bỏ bụi mịn
            PM2.5 và vi khuẩn lên đến&nbsp;99,9%. Công thức dịu nhẹ, bổ sung chiết xuất
            thiên nhiên giúp nuôi dưỡng làn da khỏe mạnh và thơm mát suốt ngày dài.
          </Typography>


          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
            <Typography sx={{ minWidth: 80, color: 'text.secondary', }}>Số Lượng</Typography>

            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                border: '1px solid #e0e0e0',
                borderRadius: 1,
                height: 32,
              }}
            >
              <IconButton onClick={dec} disabled={qty === 1} size="small">
                <Remove fontSize="small" />
              </IconButton>

              <Typography
                sx={{
                  width: 40,
                  textAlign: 'center',
                  fontWeight: 700,
                  color: 'error.main',
                  userSelect: 'none',
                }}
              >
                {qty}
              </Typography>

              <IconButton onClick={inc} size="small">
                <Add fontSize="small" />
              </IconButton>
            </Box>
          </Box>

          <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
            <Button
              variant="outlined"
              size="large"
              startIcon={<ShoppingCart />}
              sx={{
                borderColor: 'error.main',
                color: 'error.main',
                px: 3,
                fontWeight: 600,
                textTransform: 'none',
                '&:hover': {
                  borderColor: 'error.dark',
                  backgroundColor: 'rgba(244,67,54,0.08)',
                },
              }}
            >
              Thêm Vào Giỏ Hàng
            </Button>

            <Button
              variant="contained"
              color="error"
              size="large"
              sx={{
                px: 5,
                fontWeight: 600,
                textTransform: 'none',
              }}
            >
              Mua Ngay
            </Button>
          </Box>

        </Box>
      </Box>
      { /*các sản phẩm liên  quan*/}
      <Box
        sx={{
          p: 4,
          maxWidth: '1200px',
          mx: 'auto',
        }}
      >
        <Typography variant="h6" fontWeight={700} mb={2}>
          SẢN PHẨM LIÊN QUAN
        </Typography>

        <Slider
          dots={false}
          infinite={false}
          speed={500}
          slidesToShow={4}
          slidesToScroll={2}
          responsive={[
            {
              breakpoint: 960,
              settings: {
                slidesToShow: 2,
              },
            },
            {
              breakpoint: 600,
              settings: {
                slidesToShow: 1,
              },
            },
          ]}
        >
          {related.map((p) => (
            <Box
              key={p.id}
              sx={{
                px: 1,
              }}
            >
              <Box
                sx={{
                  width: '100%',
                  height: 260,
                  border: '1px solid #eee',
                  borderRadius: 1,
                  display: 'flex',
                  flexDirection: 'column',
                  overflow: 'hidden',
                }}
              >
                <Box
                  sx={{
                    width: '100%',
                    height: 200,
                    borderBottom: '1px solid #ddd',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: '#fff',
                  }}
                >
                  <img
                    src={p.img || placeholder}
                    alt={p.name}
                    style={{
                      maxWidth: '100%',
                      maxHeight: '100%',
                      objectFit: 'contain',
                    }}
                  />
                </Box>
                <Box sx={{ p: 1 }}>
                  <Typography
                    variant="body2"
                    sx={{
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                    }}
                  >
                    {p.name}
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 0.5 }}>
                    <Typography variant="subtitle2" color="error.main" fontWeight={700}>
                      ₫{(p.price ?? 0).toLocaleString()}
                    </Typography>
                    {p.originalPrice && (
                      <Typography
                        variant="body2"
                        sx={{
                          color: 'text.secondary',
                          textDecoration: 'line-through',
                        }}
                      >
                        ₫{p.originalPrice.toLocaleString()}
                      </Typography>
                    )}
                  </Box>
                </Box>
              </Box>
            </Box>
          ))}
        </Slider>
      </Box>


    </>
  )
}
