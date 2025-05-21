import classNames from 'classnames/bind'
import { FaUserAlt } from 'react-icons/fa'
import { IoIosLogOut } from 'react-icons/io'

import styles from './Header.module.css'
import Tippy from '@tippyjs/react/headless'
import { Link, useNavigate } from 'react-router-dom'
import { useDeviceId } from '~/hooks/useDeviceId'
import { useDispatch, useSelector } from 'react-redux'
import { Button } from '@mui/material'
import { logout } from '~/redux/thunks/user.thunk'
const cx = classNames.bind(styles)

const testAvt = ''

function Header() {
  const deviceId = useDeviceId()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const user = useSelector(state => state.user.currentUser)

  const handleLogout = () => {
    console.log(user)

    dispatch(logout({ credentials: {
      deviceId,
      userId: user.USER_ID
    },
    navigate
    }))
  }

  return (
    <header className={cx('wrapper')}>
      <Tippy
        interactive
        // visible
        placement='bottom'
        trigger='click'
        appendTo={document.body}
        render={(attrs) => (
          <div className={cx('more-user-info')} tabIndex='-1' {...attrs}>
            <div className={cx('more-user-infor-item')}>
              <FaUserAlt />
              <Link>Thông tin cá nhân</Link>
            </div>
            <div className={cx('more-user-infor-item')}>
              <IoIosLogOut />
              <Button onClick={handleLogout}>Đăng xuất</Button>
            </div>
          </div>
        )}
      >
        <div className={cx('user-warpper')}>
          <img src={testAvt} alt='avt' className={cx('user-avt')} />
          <div className={cx('user-infor')}>
            <h3 className={cx('user-name')}>Nguyễn Văn A</h3>
            <p className={cx('user-role')}>Admin</p>
          </div>
        </div>
      </Tippy>
    </header>
  )
}

export default Header