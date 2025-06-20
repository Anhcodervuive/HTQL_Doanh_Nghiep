import {
  Box, Typography, InputBase, IconButton, Grid, Paper, FormControl,
  InputLabel, Select, MenuItem, Card, CardContent, CardMedia
} from '@mui/material'
import { useTheme } from '@mui/material/styles'
import SearchIcon from '@mui/icons-material/Search'
import { useState } from 'react'
import Pagination from '@mui/material/Pagination'
import Stack from '@mui/material/Stack'
import OutlinedInput from '@mui/material/OutlinedInput'



const products = [
  { id: 1, name: 'Son Môi Lụa Thiên Nhiên', price: 198000, discount: 20000, img: 'https://i.pinimg.com/736x/06/28/90/062890acd9f66e4ff58269553b6da2c9.jpg' },
  { id: 2, name: 'Son Kem Siêu Lì Merzy', price: 139000, discount: 0, img: 'https://i.pinimg.com/736x/06/28/90/062890acd9f66e4ff58269553b6da2c9.jpg' },
  { id: 3, name: 'Inga Glassy Water Tint', price: 250000, discount: 50000, img: 'https://i.pinimg.com/736x/45/05/2b/45052b4028c7a2d5e745d546392404c9.jpg' },
  { id: 4, name: 'Inga Special Limited', price: 320000, discount: 30000, img: 'https://i.pinimg.com/736x/45/05/2b/45052b4028c7a2d5e745d546392404c9.jpg' },
  { id: 5, name: 'Inga Special Limited', price: 320000, discount: 30000, img: 'https://i.pinimg.com/736x/45/05/2b/45052b4028c7a2d5e745d546392404c9.jpg' },
  { id: 6, name: 'Inga Special Limited', price: 320000, discount: 30000, img: 'https://i.pinimg.com/736x/45/05/2b/45052b4028c7a2d5e745d546392404c9.jpg' },
  { id: 7, name: 'Inga Special Limited', price: 320000, discount: 30000, img: 'https://i.pinimg.com/736x/78/04/e6/7804e6de007b61a8d9ec0b67cb109593.jpg' },
  { id: 8, name: 'Inga Special Limited', price: 320000, discount: 30000, img: 'https://i.pinimg.com/736x/78/04/e6/7804e6de007b61a8d9ec0b67cb109593.jpg' },
  { id: 9, name: 'Inga Special Limited', price: 320000, discount: 30000, img: 'https://i.pinimg.com/736x/78/04/e6/7804e6de007b61a8d9ec0b67cb109593.jpg' },
  { id: 10, name: 'Inga Special Limited', price: 320000, discount: 30000, img: 'https://i.pinimg.com/736x/78/04/e6/7804e6de007b61a8d9ec0b67cb109593.jpg' },
  { id: 11, name: 'Inga Special Limited', price: 320000, discount: 30000, img: 'https://i.pinimg.com/736x/78/04/e6/7804e6de007b61a8d9ec0b67cb109593.jpg' },
  { id: 12, name: 'Inga Special Limited', price: 320000, discount: 30000, img: 'https://i.pinimg.com/736x/78/04/e6/7804e6de007b61a8d9ec0b67cb109593.jpg' },

]

export default function ListItemPage() {
  const theme = useTheme()
  const [keyword, setKeyword] = useState('')
  const [priceMin, setPriceMin] = useState('')
  const [priceMax, setPriceMax] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  

  const filtered = products.filter(p => {
    const nameMatch = p.name.toLowerCase().includes(keyword.toLowerCase())
    const minMatch = priceMin === '' || p.price >= Number(priceMin)
    const maxMatch = priceMax === '' || p.price <= Number(priceMax)
    return nameMatch && minMatch && maxMatch
  })

  const itemsPerPage = 10 

  const paginated = filtered.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  return (
    <Box sx={{ bgcolor: 'background.default', minHeight: '100vh' }}>
      {/* Thanh tìm kiếm */}
      <Box sx={{ maxWidth: 1196, mx: 'auto' }}>
        <Paper
          component="form"
          sx={{
            px: 2,
            py: 0.5,
            display: 'flex',
            alignItems: 'center',
            width: '100%',
            border: '1px solid #ccc',
            borderRadius: 2,
          }}
        >
          <InputBase
            placeholder="Tìm sản phẩm..."
            value={keyword}
            onChange={e => setKeyword(e.target.value)}
            sx={{ ml: 1, flex: 1 }}
          />
          <IconButton type="submit" sx={{ p: 1 }}>
            <SearchIcon color="primary" />
          </IconButton>
        </Paper>
      </Box>

      {/* Bộ lọc */}
      <Box sx={{ px: 4, mt: 2, mb: 4, display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
        <Typography variant="body1" sx={{ minWidth: 140, fontWeight: 500 }}>Sắp xếp theo loại</Typography>
        <FormControl size="small" sx={{ minWidth: 160 }}>
          <InputLabel>Loại sản phẩm</InputLabel>
          <Select label="Loại sản phẩm" defaultValue="">
            <MenuItem value="">Tất cả</MenuItem>
            <MenuItem value="lipstick">Son thỏi</MenuItem>
            <MenuItem value="liquid">Son kem</MenuItem>
            <MenuItem value="tint">Son tint</MenuItem>
          </Select>
        </FormControl>
        <FormControl size="small" sx={{ width: 120 }}>
          <InputLabel>Giá từ</InputLabel>
          <OutlinedInput
            label="Giá từ"
            type="number"
            value={priceMin}
            onChange={(e) => setPriceMin(e.target.value)}
          />
        </FormControl>

        <Typography sx={{ mx: 1 }}>-</Typography>

        <FormControl size="small" sx={{ width: 120 }}>
          <InputLabel>Giá đến</InputLabel>
          <OutlinedInput
            label="Giá đến"
            type="number"
            value={priceMax}
            onChange={(e) => setPriceMax(e.target.value)}
          />
        </FormControl>


      </Box>

      {/* Danh sách sản phẩm */}
      <Box sx={{ px: 4, mt: 3 }}>
       
        <Grid container columnSpacing={3} rowSpacing={4} sx={{ maxWidth: 1196, mx: 'auto' }}>
          {paginated.map((p) => {
            const finalPrice = p.price - p.discount
            return (
              <Grid item xs="auto" key={p.id} sx={{ px: 1 }}>
                <Card
                  sx={{
                    width: 180,
                    height: 300,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    border: '2px solid',
                    borderColor: theme.palette.primary.main,
                    borderRadius: 2,
                    position: 'relative',
                    overflow: 'hidden',
                    boxShadow: 3,
                    bgcolor: theme.palette.background.default,
                  }}
                >
                  {/* Nhãn giảm giá chéo góc */}
                  {p.discount > 0 && (
                    <Box
                      sx={{
                        position: 'absolute',
                        top: 10,
                        right: -40,
                        bgcolor: 'primary.main',
                        color: 'white',
                        transform: 'rotate(45deg)',
                        fontSize: 12,
                        fontWeight: 'bold',
                        width: 120,
                        textAlign: 'center',
                        zIndex: 1,
                      }}
                    >
                      -{p.discount.toLocaleString()}₫
                    </Box>
                  )}

                  <CardMedia
                    component="img"
                    image={p.img}
                    alt={p.name}
                    sx={{
                      height: 180,
                      objectFit: 'cover',
                    }}
                  />

                  <CardContent
                    sx={{
                      flex: 1,
                      px: 2,
                      pt: 1.5,
                      pb: 2,
                      bgcolor: 'background.default',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'flex-start',
                      alignItems: 'flex-start',
                    }}
                  >
                    <Typography
                      variant="subtitle2"
                      fontWeight={600}
                      color="primary"
                      sx={{
                        lineHeight: 1.4,
                        mb: 0.5,
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                        height: '2.8em',
                      }}
                    >
                      {p.name}
                    </Typography>
                    <Box sx={{ mt: 1, height: 40, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
                      {p.discount > 0 ? (
                        <>
                          <Typography
                            variant="body2"
                            sx={{ textDecoration: 'line-through', color: '#666' , fontSize: 13 }}
                          >
                            {p.price.toLocaleString()}₫
                          </Typography>
                          <Typography
                            variant="body2"
                            sx={{ fontWeight: 700, color: 'success.main', fontSize: 14 }}
                          >
                            {(p.price - p.discount).toLocaleString()}₫
                          </Typography>
                        </>
                      ) : (
                        <Typography
                          variant="body2"
                          sx={{
                            fontWeight: 700,
                            color: 'success.main',
                            fontSize: 14,
                          }}
                        >
                          {p.price.toLocaleString()}₫
                        </Typography>
                      )}
                    </Box>

                  </CardContent>

                </Card>


              </Grid>
            )
          })}
        </Grid>
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <Pagination
            count={Math.ceil(filtered.length / itemsPerPage)} 
            page={currentPage}
            onChange={(e, value) => {
              setCurrentPage(value)
              window.scrollTo({ top: 0, behavior: 'smooth' })
            }}
            
            shape="rounded"
            color="primary"
          />
        </Box>

      </Box>
    </Box>
  )
}
