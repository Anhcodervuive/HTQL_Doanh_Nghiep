import { Box, Button, Typography } from '@mui/material'
import { Link, useNavigate } from 'react-router-dom'
import ProgressBar from '~/components/ProgressBar'
import { findBreadcrumbs, routeTree } from '~/config/routeTree'
import SaleInvoiceForm from '../form'

function SaleInvoiceCreate() {
  const navigate = useNavigate()
  const breadcrumbs = findBreadcrumbs(location.pathname, routeTree)
  return (
    <Box
      sx={{ minHeight: '1000px', pt: 2 }}
    >
      <ProgressBar />
      <Box sx={{ mb: 3 }}>
        {breadcrumbs.map((item, index) => (
          <Button
            key={index}
            variant="text"
            color={location.pathname === item.path ? 'primary' : 'secondary'}
            disabled={location.pathname === item.path}
            component={Link}
            to={item.path}
          >
            {item.name}
            {location.pathname !== item.path && ' > '}
          </Button>
        ))}
      </Box>
      <Typography variant='h4' mb={4}>Hóa đơn bán hàng</Typography>
      <SaleInvoiceForm />
    </Box>
  )
}

export default SaleInvoiceCreate