import { useCallback, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [roles, setRoles] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const user = useSelector((state) => state.user.currentUser)

  const haveOneOfRoles = useCallback((requireRoles = []) => {
    return roles.some(role => requireRoles.includes(role))
  }, [roles])

  useEffect(() => {
    if (user) {
      setIsAuthenticated(true)
      if (user?.ROLE?.IS_ADMIN) {
        setRoles(prev => [...prev, 'admin'])
      }
      if (user?.ROLE?.IS_MANAGER) {
        setRoles(prev => [...prev, 'manager'])
      }
      if (user?.ROLE?.IS_SERVICE_STAFF) {
        setRoles(prev => [...prev, 'serivce staff'])
      }
      if (user?.ROLE?.IS_CUSTOMER) {
        setRoles(prev => [...prev, 'customer'])
      }
    } else {
      setIsAuthenticated(false)
    }
    setIsLoading(false)
  }, [user])

  return { isAuthenticated, roles, isLoading, haveOneOfRoles }
}

export default useAuth
