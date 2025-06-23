import {
  Box,
  Typography,
  Paper,
  Divider,
  Avatar,
  Checkbox,
  Chip,
  Link,
  Button,
} from '@mui/material'
import ConfirmationNumberOutlined from '@mui/icons-material/ConfirmationNumberOutlined'
import MonetizationOnOutlined from '@mui/icons-material/MonetizationOnOutlined'
export default function OrderSummary() {
  return (
    <Box>
      <Paper
        elevation={0} // bỏ đổ bóng luôn nếu muốn
        sx={{
          maxWidth: 10000,
          mx: 'auto',
          borderRadius: 2,
          p: 2,
          backgroundColor: '#ffffff', // ✅ không có nền trắng
        }}
      >


        {/* Địa chỉ nhận hàng */}
        <Box sx={{ mb: 3.5, pb: 1.5, borderBottom: '1px solid #eee' }}>
          <Typography variant="subtitle2" color="error" fontWeight={600}>
            📍 Địa Chỉ Nhận Hàng
          </Typography>
          <Typography fontWeight={600}>
            Võ Thị Cẩm Thúy (+84) 789541963{' '}
            <Chip label="Mặc Định" size="small" color="primary" sx={{ ml: 1 }} />
            <Link underline="hover" sx={{ ml: 2, fontSize: 14 }}>
              Thay Đổi
            </Link>
          </Typography>
          <Typography fontSize={14}>
            Gần cầu Bà Gần, Số Nhà 225, Ấp Hòa Hiệp, Xã Hòa Tân, Huyện Châu
            Thành, Đồng Tháp
          </Typography>
        </Box>


        {/* Danh sách sản phẩm */}
        <Typography variant="subtitle1" fontWeight={600} sx={{ mb: 1 }}>
          Sản phẩm
        </Typography>

        {/* Header bảng */}
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: '4fr 1fr 1fr 1fr',
            fontWeight: 600,
            color: 'gray',
            mb: 1,
          }}
        >
          <Box> </Box>
          <Box textAlign="center">Đơn giá</Box>
          <Box textAlign="center">Số lượng</Box>
          <Box textAlign="right">Thành tiền</Box>
        </Box>

        {/* Sản phẩm chính */}
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: '4fr 1fr 1fr 1fr',
            alignItems: 'center',
            mb: 2,
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Avatar
              src="https://i.pinimg.com/736x/ea/e3/7a/eae37afa865c36a5175dff4cbeb261f0.jpg"
              variant="square"
              sx={{ width: 60, height: 60, mr: 2 }}
            />
            <Box>
              <Typography fontWeight={500} noWrap maxWidth={280}>
                Nước tẩy trang và làm sạch sâu 3-in-1 L'Oreal ...
              </Typography>
              <Typography fontSize={13} color="gray">
                Loại: Sạch sâu
              </Typography>
            </Box>
          </Box>

          <Typography textAlign="center">₫209.000</Typography>
          <Typography textAlign="center">2</Typography>
          <Typography textAlign="right">₫418.000</Typography>
        </Box>
        <Divider sx={{ my: 2 }} />

        {/* Voucher*/}
        {/* Dòng Shopee Voucher */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            py: 2,
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <ConfirmationNumberOutlined color="error" fontSize="small" />
            <Typography fontWeight={600}>Shopee Voucher</Typography>
          </Box>

          <Link underline="hover" sx={{ fontWeight: 600, color: 'primary' }}>
              Chọn Voucher
          </Link>
        </Box>
        <Divider sx={{ my: 2 }} />

        {/* Phương thức thanh toán */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            mb: 2,
          }}
        >
          <Typography variant="h6" fontWeight={600}>
            Phương thức thanh toán
          </Typography>
          <Box>
            <Typography display="inline" fontWeight={500}>
              Thanh toán khi nhận hàng
            </Typography>
            <Link underline="hover" sx={{ ml: 2, fontWeight: 500, color: 'primary' }}>
              THAY ĐỔI
            </Link>
          </Box>
        </Box>

        <Divider sx={{ mb: 2 }} />

        {/* Tổng kết chi phí */}
        <Box
          sx={{
            maxWidth: 400,
            ml: 'auto',
            display: 'flex',
            flexDirection: 'column',
            gap: 1.5,
          }}
        >
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography>Tổng tiền hàng</Typography>
            <Typography>₫418.000</Typography>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography>Tổng tiền phí vận chuyển</Typography>
            <Typography>₫41.900</Typography>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography>Tổng cộng Voucher giảm giá</Typography>
            <Typography color="primary">-₫35.000</Typography>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
            <Typography fontWeight={600}>Tổng thanh toán</Typography>
            <Typography fontWeight={700} color="primary" fontSize="1.5rem">
              ₫424.900
            </Typography>
          </Box>
        </Box>

        {/* Nút đặt hàng + điều khoản */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            mt: 3,
            flexWrap: 'wrap',
            rowGap: 1,
          }}
        >
          <Typography fontSize={13}>
            Nhấn <strong>"Đặt hàng"</strong> đồng nghĩa với việc bạn đồng ý tuân theo{' '}
            <Link href="#" underline="hover">
              Điều khoản Shopee
            </Link>
          </Typography>

          <Button
            variant="contained"
            color="primary"
            sx={{
              px: 4,
              borderRadius: 0,
              fontWeight: 600,
            }}
          >
            Đặt hàng
          </Button>
        </Box>



      </Paper>
    </Box>
  )
}