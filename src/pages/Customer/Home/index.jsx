import React, { useMemo, useState } from 'react'
import {
  Box, Typography, Container, Card, CardActionArea,
  CardContent, CardMedia, Grid, Tabs, Tab, CircularProgress, useTheme
} from '@mui/material'
import { useQuery } from '@tanstack/react-query'
import Slider from 'react-slick'

import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

import { banner1, banner2, banner3, defaultImage } from '~/assets/images'
import itemService from '~/service/admin/item.service'
import itemTypeService from '~/service/admin/itemType.service'
import { useDeviceId } from '~/hooks/useDeviceId'
import useUserInfo from '~/hooks/useUserInfo'

/* ---------- data hooks ---------- */
const useSaleProducts = (cred) =>
  useQuery({
    queryKey: ['sale-products'],
    queryFn: () =>
      itemService.search(cred, {
        page: 1,
        size: 12,
        isActive: true,
        isProduct: true,
      }),
  })

const useCategories = (cred) =>
  useQuery({
    queryKey: ['categories'],
    queryFn: () => itemTypeService.search(cred),
  })

const useProductsByCategory = (cred, id) =>
  useQuery({
    queryKey: ['category-products', id ?? 'all'],
    enabled: !!cred,
    queryFn: () =>
      itemService.search(cred, {
        page: 1,
        size: 12,
        isProduct: true,
        isActive: true,
        ...(id ? { itemTypeId: id } : {}),
      }),
  })


/* ---------- slick settings ---------- */
const sliderSettings = {
  dots: false,
  infinite: true,
  speed: 500,
  autoplay: true,
  autoplaySpeed: 5000,
  slidesToShow: 1,
  slidesToScroll: 1,
  arrows: false,
  pauseOnHover: false,
}

const HomePage = () => {
  /* credentials */
  const device_id = useDeviceId()
  const { userId } = useUserInfo()
  const cred = useMemo(() => ({ user_id: userId ?? '', device_id }), [userId, device_id])

  const theme = useTheme()
  const CARD_W = { xs: 160, md: 210 }
  const CARD_H = { xs: 250, md: 300 }
  const IMG_H = { xs: 150, md: 180 }
  /* queries */
  const { data: saleData, isLoading: saleLoading } = useSaleProducts(cred)
  const { data: catData, isLoading: catLoading } = useCategories(cred)

const categories = useMemo(() => {
  if (!catData?.data?.itemTypes) return [];
  // loại “Nguyên liệu” (isProduct = false)
  return catData.data.itemTypes.filter((t) => t.IS_PRODUCT); // hoặc t.ITEM_TYPE_NAME !== 'Nguyên liệu'
}, [catData]);


  const [activeCat, setActiveCat] = useState('')
  const { data: catProdData, isLoading: catProdLoading } =
    useProductsByCategory(cred, activeCat)

  /* product card */
  const renderCard = (p) => (
    <Grid
      item
      sx={{
        flex: `0 0 ${CARD_W}`,
        maxWidth: CARD_W,
      }}
      key={p._id}
    >
      <Card
        sx={{
          width: CARD_W,
          height: CARD_H,
          borderRadius: 3,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* Ảnh */}
        <CardMedia
          component="img"
          image={p.AVATAR_IMAGE_URL || p.LIST_IMAGE?.[0]?.URL || defaultImage}
          alt={p.ITEM_NAME}
          sx={{
            width: '100%',
            height: IMG_H,
            objectFit: 'cover',
          }}
        />

        {/* Nội dung */}
        <CardContent
          sx={{
            flexGrow: 1,
            p: 1.5,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
        >
          {/* Tên – clamp 2 dòng */}
          <Typography
            variant="subtitle2"
            fontWeight={700}
            sx={{
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
              lineHeight: 1.25,
              height: '2.5em',
            }}
          >
            {p.ITEM_NAME}
          </Typography>

          {/* Giá */}
          <Typography variant="body2" color="text.secondary">
            {(p.PRICE?.[0]?.PRICE_AMOUNT ?? 0).toLocaleString()}₫
          </Typography>
        </CardContent>
      </Card>
    </Grid>
  )

  return (
    <Box sx={{ overflowX: 'hidden' }}>
      {/* ---------- Banner carousel ---------- */}
      <Slider {...sliderSettings}>
        {[banner1, banner2, banner3].map((src) => (
          <Box key={src} sx={{ width: '100%' /* khung slide */ }}>
            <Box
              component="img"
              src={src}
              alt="banner"
              sx={{
                width: '100%',
                height: 'auto',
                display: 'block',
                objectFit: 'contain',
                maxHeight: { xs: 300, md: 500 },
              }}
            />
          </Box>
        ))}
      </Slider>

      {/* ---------- Marquee ---------- */}
      <Box sx={{ bgcolor: theme.palette.secondary.main, py: 1 }}>
        <Typography
          component="marquee"
          sx={{ color: '#fff', fontWeight: 600, fontSize: { xs: 13, md: 16 }, whiteSpace: 'nowrap' }}
        >
          5TRENDZ – khẳng định cá tính, bắt nhịp xu hướng!
        </Typography>
      </Box>

      {/* ---------- Sale products ---------- */}
      <Container maxWidth="lg" sx={{ py: { xs: 4, md: 6 } }}>
        <Typography
          variant="h5"
          fontWeight={700}
          mb={3}
          color="primary.main"
          textAlign={{ xs: 'center', md: 'left' }}
        >
          Sản phẩm đang khuyến mãi
        </Typography>

        {saleLoading ? (
          <Box textAlign="center"><CircularProgress /></Box>
        ) : (
          <Grid container spacing={{ xs: 2, md: 3 }}>
            {saleData?.data?.items
              ?.filter((p) => p.LIST_VOUCHER_ACTIVE?.length > 0)
              ?.slice(0, 8)
              .map(renderCard)}
          </Grid>
        )}
      </Container>

      {/* ---------- Category products ---------- */}
      {/* ---------- Category products ---------- */}
      <Container maxWidth="lg" sx={{ py: { xs: 4, md: 6 } }}>
        <Typography
          variant="h5"
          fontWeight={700}
          mb={3}
          color="primary.main"
          textAlign={{ xs: 'center', md: 'left' }}
        >
          Sản phẩm theo danh mục
        </Typography>

        {catLoading ? (
          <Box textAlign="center"><CircularProgress /></Box>
        ) : (
          <Tabs
            value={activeCat}
            onChange={(_, v) => setActiveCat(v)}
            variant="scrollable"
            scrollButtons="auto"
            sx={{ mb: 3, '.MuiTab-root': { fontSize: { xs: 12, md: 14 } } }}
          >
            <Tab value="" label="Tất cả" />
            {categories.map((c) => (
              <Tab key={c._id} value={c._id} label={c.ITEM_TYPE_NAME} />
            ))}
          </Tabs>
        )}

        {catProdLoading ? (
          <Box textAlign="center"><CircularProgress /></Box>
        ) : (
          <Grid container spacing={{ xs: 2, md: 3 }}>
            {catProdData?.data?.items?.map(renderCard)}
          </Grid>
        )}
      </Container>

    </Box>
  )
}

export default HomePage
