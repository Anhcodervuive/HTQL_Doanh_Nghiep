import { useLocation, Link, useNavigate, useParams, matchPath } from 'react-router-dom'
import { Box, Button, Typography } from '@mui/material'

import { findBreadcrumbs, routeTree } from '~/config/routeTree'
import itemTypeService from '~/service/admin/itemType.service'
import { useDeviceId } from '~/hooks/useDeviceId'
import { useSelector } from 'react-redux'
import { Routes } from '~/config'
import { useQuery } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import ItemTypeForm from '../form'
import ProgressBar from '~/components/ProgressBar'

function ItemTypeEdit() {
  const { id } = useParams()
  const location = useLocation()
  const device_id = useDeviceId()
  const user_id = useSelector(state => state.user.currentUser.USER_ID)
  const navigate = useNavigate()
  const { data, isLoading, error } = useQuery({
    queryKey: ['itemType', id],
    enabled: !!user_id && !!device_id,
    queryFn: () => itemTypeService.getById({ device_id, user_id, }, id),
    retry: false,
    refetchOnWindowFocus: false,
  })
  const breadcrumbs = findBreadcrumbs(Routes.admin.itemType.edit(), routeTree)

  const submit = async (data) => {
    itemTypeService.update({ device_id, user_id, }, id, data)
      .then(res => {
        navigate(Routes.admin.itemType.list)
        toast.success('Cập nhật loại hàng hóa thành công')
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
      <ProgressBar isLoading={isLoading} />
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
      <Typography variant="h4" sx={{ mb: 5 }}>
        Chỉnh sửa loại hàng hóa
      </Typography>
      <ItemTypeForm submit={submit} data={data?.data}/>
    </Box>
  )
}

export default ItemTypeEdit
