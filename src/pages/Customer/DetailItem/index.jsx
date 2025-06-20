import {
  Box,
  Typography,
  Button,
  Chip,
  IconButton,
  CardMedia,
  Stack,
  Tooltip
} from '@mui/material'
import { Add, Remove, ShoppingCart, ArrowBackIos, ArrowForwardIos } from '@mui/icons-material'
import { useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { useState, useRef } from 'react'
import itemService from '~/service/admin/item.service'
import { defaultImage } from '~/assets/images'
import { useDeviceId } from '~/hooks/useDeviceId'
import useUserInfo from '~/hooks/useUserInfo'
import { useNavigate } from 'react-router-dom'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import { useEffect } from 'react'
import { useTheme } from '@mui/material'
import DOMPurify from 'dompurify'


export default function DetailItem() {
  const theme = useTheme()
  const { id } = useParams()
  const [qty, setQty] = useState(1)
  const dec = () => setQty((n) => Math.max(1, n - 1))
  const inc = () => setQty((n) => n + 1)
  const device_id = useDeviceId()
  const { userId: user_id } = useUserInfo()
  const navigate = useNavigate()
  const cleanHTML = (html) => DOMPurify.sanitize(html, { USE_PROFILES: { html: true } })
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
  }, [id])
  const { data, isLoading } = useQuery({
    queryKey: ['item-detail', id],
    queryFn: () => itemService.search({
      user_id,
      device_id,
    }, {
      itemId: id
    }),
    enabled: !!id,
  })
  console.log('data: ', data)

  const item = data?.data?.items?.[0] || {}
  const thumbnails = item.LIST_IMAGE?.map(i => i.URL) || []
  const avatar = item.AVATAR_IMAGE_URL || defaultImage
  const price = item.PRICE?.[0]?.PRICE_AMOUNT || 0
  console.log('avatar: ', avatar)

  const vouchers = item.LIST_VOUCHER_ACTIVE || []
  const bestDiscount = vouchers.reduce((max, v) => {
    let d = v.TYPE === 'FIXED_AMOUNT'
      ? (v.MAX_DISCOUNT ? Math.min(v.VALUE, v.MAX_DISCOUNT) : v.VALUE)
      : (v.MAX_DISCOUNT ? Math.min((price * v.VALUE / 100), v.MAX_DISCOUNT) : price * v.VALUE / 100)
    return Math.max(max, d)
  }, 0)

  const finalPrice = Math.max(price - bestDiscount, 0)

  const [selectedImage, setSelectedImage] = useState(defaultImage)
  useEffect(() => {
    setSelectedImage(avatar)
  }, [id, avatar])
  const scrollRef = useRef(null)
  const scroll = (dir) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: dir === 'left' ? -100 : 100, behavior: 'smooth' })
    }
  }
  const { data: relatedData, isFetching: relatedLoading, } = useQuery({
    queryKey: ['related-products', item?.ITEM_TYPE, item?._id],
    enabled: !!item?._id && !!item?.ITEM_TYPE,
    queryFn: () =>
      itemService.search({}, {
        page: 1,
        size: 8,
        isProduct: true,
        isActive: true,
        itemTypeId: item.ITEM_TYPE,
      }),
    staleTime: 0,
  })
  const relatedItems = relatedData?.data?.items?.filter(p => p._id !== item._id) || []
  const IMG_H = { xs: 280, md: 400 }
  const THUMB = 60

  return (
    <>
      <Box
        sx={{
          px: { xs: 2, md: 4 },
          py: 4,
          maxWidth: 1200,
          mx: 'auto',
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          gap: { xs: 3, md: 4 },
          bgcolor: theme.palette.background.paper,
          borderRadius: 2,
          boxShadow: 2,
        }}
      >
        {/* === Hình ảnh === */}
        <Box sx={{ width: 400 }}>
          <Box sx={{ width: '100%', height: 400, borderRadius: 2, overflow: 'hidden', mb: 1 }}>
            <CardMedia
              component="img"
              image={selectedImage}
              alt={item.ITEM_NAME}
              sx={{
                width: '100%',
                height: IMG_H,
                objectFit: 'cover',
                borderRadius: 2,
              }}
            />
          </Box>

          <Box sx={{ position: 'relative', width: '100%', overflow: 'hidden' }}>
            <IconButton onClick={() => scroll('left')} sx={navBtnStyle}><ArrowBackIos fontSize="small" /></IconButton>

            <Box
              ref={scrollRef}
              sx={{
                overflowX: 'auto',
                display: 'flex',
                gap: 1,
                '&::-webkit-scrollbar': { display: 'none' },
                scrollbarWidth: 'none',
              }}
            >
              {[avatar, ...thumbnails].map((url, i) => (
                <Box
                  key={i}
                  onClick={() => setSelectedImage(url)}
                  sx={{
                    width: THUMB, height: THUMB,
                    border: selectedImage === url
                      ? `2px solid ${theme.palette.primary.main}`
                      : `1px solid ${theme.palette.divider}`,
                    borderRadius: 1,
                    flexShrink: 0,
                    overflow: 'hidden',
                    cursor: 'pointer',
                  }}
                >
                  <img src={url} alt={`thumb-${i}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </Box>
              ))}
            </Box>

            <IconButton onClick={() => scroll('right')} sx={{ ...navBtnStyle, right: 0, left: 'auto' }}>
              <ArrowForwardIos fontSize="small" />
            </IconButton>
          </Box>
        </Box>
        <Box sx={{ flex: 1 }}>
          <Typography variant="h6" fontWeight={700} mb={1}>{item.ITEM_NAME}</Typography>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
            <Typography variant="h5" fontWeight={700} color="error.main">
              ₫{finalPrice.toLocaleString()}
            </Typography>
            {bestDiscount > 0 && (
              <Typography variant="body1" sx={{ textDecoration: 'line-through', color: 'text.secondary' }}>
                ₫{price.toLocaleString()}
              </Typography>
            )}
          </Box>

          {/* Voucher */}
          {vouchers.length > 0 && (
            <Stack
              direction="row"
              spacing={2}
              alignItems="center"
              flexWrap="wrap"
              my={2} >
              <Typography variant="body2" color="text.secondary" mb={1} sx={{ whiteSpace: 'nowrap' }}>Voucher Của Shop</Typography>
              <Stack direction="row" spacing={1} flexWrap="wrap">
                {vouchers.map((v) => {
                  const isPct = v.TYPE === 'PERCENTAGE'
                  const label = isPct
                    ? `Giảm ${v.VALUE}%`
                    : `Giảm ${v.VALUE.toLocaleString()}₫`

                  const tip = isPct
                    ? `Giảm tối đa ${v.MAX_DISCOUNT?.toLocaleString() ?? 0}₫`
                    : `Giảm trực tiếp ${v.VALUE.toLocaleString()}₫`

                  return (
                    <Tooltip key={v._id} title={tip} arrow>
                      <Chip
                        label={label}
                        clickable
                        size="small"
                        sx={{
                          bgcolor: 'secondary.main',
                          color: 'secondary.contrastText',
                          fontWeight: 700,
                          borderRadius: 20,
                          lineHeight: 1,
                          cursor: 'pointer',
                        }}
                      />
                    </Tooltip>
                  )
                })}
              </Stack>
            </Stack>
          )}

          {/* Mô tả */}
          {item.DESCRIPTION && (
            <Box
              sx={{ color: 'text.secondary', mb: 3, lineHeight: 1.6 }}
              dangerouslySetInnerHTML={{ __html: cleanHTML(item.DESCRIPTION) }}
            />
          )}

          {/* Số lượng */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
            <Typography sx={{ minWidth: 80, color: 'text.secondary' }}>Số Lượng</Typography>
            <Box sx={{
              display: 'flex', alignItems: 'center',
              border: `1px solid ${theme.palette.divider}`,
              borderRadius: 20,
              height: 36,
            }}>
              <IconButton onClick={dec} disabled={qty === 1} size="small"><Remove fontSize="small" /></IconButton>
              <Typography sx={{ width: 40, textAlign: 'center', fontWeight: 700, color: 'error.main' }}>{qty}</Typography>
              <IconButton onClick={inc} size="small"><Add fontSize="small" /></IconButton>
            </Box>
          </Box>

          {/* Nút hành động */}
          <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
            <Button
              variant="outlined"
              size="large"
              startIcon={<ShoppingCart />}
              color="primary"
              sx={{ px: 3 }}
            >
              Thêm Vào Giỏ Hàng
            </Button>

            <Button variant="contained" size="large" color="primary" sx={{ px: 5 }}>
              Mua Ngay
            </Button>
          </Box>
        </Box>

      </Box>
      { /*các sản phẩm liên  quan*/}
      <Box sx={{ py: 5, bgcolor: theme.palette.background.default }}>
        <Box sx={{ maxWidth: 1200, mx: 'auto', px: { xs: 2, md: 0 } }}>
          <Typography variant="h6" fontWeight={700} mb={2}>
            SẢN PHẨM LIÊN QUAN
          </Typography>

          <Slider
            key={item._id}
            dots={false}
            infinite={false}
            speed={500}
            slidesToShow={4}
            slidesToScroll={2}
            responsive={[
              { breakpoint: 960, settings: { slidesToShow: 2 } },
              { breakpoint: 600, settings: { slidesToShow: 1 } },
            ]}
          >
            {relatedItems.map(p => {
              const base = p.PRICE?.[0]?.PRICE_AMOUNT ?? 0

              const bestDisc = (p.LIST_VOUCHER_ACTIVE ?? []).reduce((max, v) => {
                let d = 0
                if (v.TYPE === 'FIXED_AMOUNT') {
                  d = v.MAX_DISCOUNT ? Math.min(v.VALUE, v.MAX_DISCOUNT) : v.VALUE
                } else if (v.TYPE === 'PERCENTAGE') {
                  const raw = base * v.VALUE / 100
                  d = v.MAX_DISCOUNT ? Math.min(raw, v.MAX_DISCOUNT) : raw
                }
                return Math.max(max, d)
              }, 0)

              const final = Math.max(base - bestDisc, 0)

              return (
                <Box key={p._id} sx={{ px: 1, height: 240, display: 'flex' }}>
                  <Box
                    onClick={() => navigate(`/customer/detail-Item/${p._id}`)}
                    sx={{
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      border: 1,
                      borderColor: 'divider',
                      borderRadius: 2,
                      bgcolor: 'background.paper',
                      overflow: 'hidden',
                      cursor: 'pointer',
                      flexGrow: 1,
                    }}
                  >
                    {/* ẢNH */}
                    <Box
                      sx={{
                        height: 160,
                        flexShrink: 0,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <img
                        src={p.AVATAR_IMAGE_URL || p.LIST_IMAGE?.[0]?.URL || defaultImage}
                        alt={p.ITEM_NAME}
                        style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }}
                      />
                    </Box>

                    {/* NỘI DUNG */}
                    <Box sx={{ p: 1, display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                      <Typography variant="body2" noWrap>{p.ITEM_NAME}</Typography>

                      <Box sx={{ mt: 'auto' }}>   {/* đẩy giá xuống đáy, card luôn cùng chiều cao */}
                        {bestDisc > 0 ? (
                          <>
                            <Typography variant="body2" sx={{ textDecoration: 'line-through', color: 'text.secondary' }}>
                              ₫{base.toLocaleString()}
                            </Typography>
                            <Typography variant="subtitle2" fontWeight={700} color="error.main">
                              ₫{final.toLocaleString()}
                            </Typography>
                          </>
                        ) : (
                          <Typography variant="subtitle2" fontWeight={700} color="error.main">
                            ₫{base.toLocaleString()}
                          </Typography>
                        )}
                      </Box>
                    </Box>
                  </Box>
                </Box>
              )
            })}

          </Slider>
        </Box>
      </Box>


    </>
  )
}
const navBtnStyle = {
  position: 'absolute',
  left: 0,
  top: '50%',
  transform: 'translateY(-50%)',
  zIndex: 2,
  width: 32,
  height: 32,
  backgroundColor: 'rgba(255,255,255,0.9)',
  border: '1px solid #ddd',
}
