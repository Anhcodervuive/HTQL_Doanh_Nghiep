import { useCallback, useEffect, useLayoutEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useDeviceId } from './useDeviceId'
import { verifyUser } from '~/redux/thunks/user.thunk'
import { unwrapResult } from '@reduxjs/toolkit'
import { useLocation } from 'react-router-dom'
import useUserInfo from './useUserInfo'

function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const location = useLocation()
  const { userId: user_id } = useUserInfo()
  const dispatch = useDispatch()
  const [roles, setRoles] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const user = useSelector((state) => state.user.currentUser)
  const device_Id = useDeviceId()

  const haveOneOfRoles = useCallback((requireRoles = []) => {
    return roles.some(role => requireRoles.includes(role))
  }, [roles])

  useLayoutEffect(() => {
    async function verifyUserAsync() {
      try {
        setIsLoading(true)
        const actionResult = await dispatch(
          verifyUser({ credentials: { user_id, device_Id } })
        )
        const originalPayload = unwrapResult(actionResult)
        if (originalPayload) {
          console.log(originalPayload)
        }
      } catch (error) {
        console.error('Error during verifyUser dispatch:', error)
        setIsLoading(false)
      } finally {
        setIsLoading(false)
      }
    }
    if (device_Id && user_id && isAuthenticated) {
      console.log('flag 1')
      verifyUserAsync()
    }
  }, [user_id, device_Id, dispatch, location, isAuthenticated])

  useEffect(() => {
    if (user) {
      setIsAuthenticated(true)
    } else {
      setIsAuthenticated(false)
    }
    console.log('flag 2')
    const newRoles = []
    setRoles(() => [])
    if (user?.ROLE?.IS_ADMIN) {
      newRoles.push('admin')
    }
    if (user?.ROLE?.IS_MANAGER) {
      newRoles.push('manager')
    }
    if (user?.ROLE?.IS_SERVICE_STAFF) {
      newRoles.push('service staff')
    }
    if (user?.ROLE?.IS_CUSTOMER) {
      newRoles.push('customer')
    }
    setRoles(newRoles)
    setIsLoading(false)

    return () => setRoles([])
  }, [user])

  return { isAuthenticated, roles, isLoading, haveOneOfRoles }
}

export default useAuth
