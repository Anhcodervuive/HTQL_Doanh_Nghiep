import { CircularProgress } from '@mui/material'
import { Navigate } from 'react-router-dom'
import { Routes } from '~/config'
import useAuth from '~/hooks/useAuth'

function PrivateRoute({ children, requireAuth, requiredRoles = [] }) {
  const { isAuthenticated, isLoading, haveOneOfRoles } = useAuth()

  if (isLoading) {
    return <CircularProgress color="inherit" />
  }

  if (requireAuth && !isAuthenticated) {
    return <Navigate to={Routes.auth.login} replace />
  }

  if (requiredRoles.length > 0 && haveOneOfRoles(requiredRoles)) {
    console.log('Người dùng không đủ quyền hạn')
    return <Navigate to={Routes.error.forbidden403} replace />
  }

  return children
}

export default PrivateRoute