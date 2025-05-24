import { useLocation, Link, useNavigate, useParams, matchPath } from 'react-router-dom'
import { Box, Button, Typography } from '@mui/material'

import { findBreadcrumbs, routeTree } from '~/config/routeTree'
import SupplierForm from '../form'
import supplierService from '~/service/admin/supplier.service'
import { useDeviceId } from '~/hooks/useDeviceId'
import { useSelector } from 'react-redux'
import { Routes } from '~/config'
import { useQuery } from '@tanstack/react-query'
import { toast } from 'react-toastify'

function SupplierEdit() {
  const { id } = useParams()
  const location = useLocation()
  const device_id = useDeviceId()
  const user_id = useSelector(state => state.user.currentUser.USER_ID)
  const navigate = useNavigate()
  const { data, isLoading, error } = useQuery({
    queryKey: ['supplier', id],
    enabled: !!user_id && !!device_id,
    queryFn: () => supplierService.getById({ device_id, user_id, }, id),
    retry: false,
    refetchOnWindowFocus: false,
  })
  const breadcrumbs = findBreadcrumbs(Routes.admin.supplier.edit(), routeTree)

  const submit = async (data) => {
    supplierService.update({ device_id, user_id, }, id, data)
      .then(res => {
        navigate(Routes.admin.supplier.list)
        toast.success('Cập nhật nhà cung ứng thành công')
        console.log(res)
      })
      .catch(err => {
        console.log(err)
        toast.error(err.response.data.message)
      })
  }

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error: {error.message}</div>


  return (
    <Box sx={{ minHeight: '700px', p: 3 }}>
      <Box sx={{}}>
        {breadcrumbs.map((item, index) => (
          <Button
            key={index}
            variant="text"
            color={matchPath(item.path, location.pathname) === item.path ? 'primary' : 'secondary'}
            disabled={matchPath(item.path, location.pathname)}
            component={Link}
            to={item.path}
          >
            {item.name}
            {!matchPath(item.path, location.pathname) && ' > '}
          </Button>
        ))}
      </Box>
      <Typography variant="h4" sx={{ mb: 3 }}>
        Update new supplier
      </Typography>
      <SupplierForm submit={submit} data={data?.data}/>
    </Box>
  )
}

export default SupplierEdit
