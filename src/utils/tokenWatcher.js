// components/TokenWatcher.js
import { useEffect } from 'react'
import Cookies from 'js-cookie'
import { jwtDecode } from 'jwt-decode'
import { useDispatch, useSelector } from 'react-redux'

import { logout } from '~/redux/thunks/user.thunk'

function isTokenExpired(token) {
  try {
    const { exp } = jwtDecode(token)
    const now = Date.now() / 1000
    return exp < now
  } catch {
    return true // Nếu token lỗi hoặc decode fail → xem như hết hạn
  }
}

const TokenWatcher = ({ interval = 60000 }) => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.user.currentUser)

  useEffect(() => {
    const checkToken = () => {
      const token = Cookies.get('refreshToken') ?? Cookies.get('accessToken')
      if (!token || isTokenExpired(token) && user) {
        dispatch(logout())
      }
    }

    // Kiểm tra lần đầu khi component mount
    checkToken()

    // Thiết lập interval
    const intervalId = setInterval(checkToken, interval)

    // Dọn dẹp khi component bị hủy
    return () => clearInterval(intervalId)
  }, [dispatch, interval, user])

  return null // Không hiển thị gì, chỉ chạy logic ngầm
}

export default TokenWatcher
