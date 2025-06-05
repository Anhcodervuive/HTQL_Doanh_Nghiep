import { Box, CircularProgress, Typography } from '@mui/material'
import { Navigate } from 'react-router-dom'
import { Routes } from '~/config'
import useAuth from '~/hooks/useAuth'

function PrivateRoute({ children, requireAuth, requiredRoles = [] }) {
  const { isAuthenticated, isLoading: isLoadingAuth, haveOneOfRoles, roles } = useAuth()

  console.log('isLoading: ', isLoadingAuth, 'roles: ', roles, 'isAuthenticated: ', isAuthenticated)

  if (isLoadingAuth) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', gap: 2, alignItems: 'center', width: '100%', minHeight: '700px', p: 3 }}>
        <CircularProgress />
        <Typography variant='body1' sx={{ color: 'grey' }}>Đang tải dữ liệu...</Typography>
      </Box>)
  }

  if (requireAuth && !isAuthenticated) {
    return <Navigate to={Routes.auth.login} replace />
  }

  if (requiredRoles.length > 0 && !haveOneOfRoles(requiredRoles)) {
    console.log('Người dùng không đủ quyền hạn')
    return <Navigate to={Routes.error.forbidden403} replace />
  }

  return children
}

export default PrivateRoute