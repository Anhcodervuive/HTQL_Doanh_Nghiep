import classNames from 'classnames/bind'
import { FaUserAlt } from 'react-icons/fa'
import { IoIosLogOut } from 'react-icons/io'

import styles from './Header.module.css'
import Tippy from '@tippyjs/react/headless'
import { Link } from 'react-router-dom'
const cx = classNames.bind(styles)

const testAvt = 'https://scontent.fvca1-4.fna.fbcdn.net/v/t39.30808-1/495579477_1435183757651498_2825046683832461707_n.jpg?stp=dst-jpg_s200x200_tt6&_nc_cat=101&ccb=1-7&_nc_sid=e99d92&_nc_ohc=YU_P8l67ZH4Q7kNvwFSuIlU&_nc_oc=AdkgUyrI1-mIpl2e6XuN5h0FhVZgldfeMoniEN58orntK3qUDqteN54YaheM8V5KrA8&_nc_zt=24&_nc_ht=scontent.fvca1-4.fna&_nc_gid=oPRwNZwyTNngDx5TMyqR2g&oh=00_AfLCaEmV2KbvkVucXT1iBWHNZa_fevd7b7h7K3FPDVrxdQ&oe=682A121B'

function Header() {
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
              <Link>Đăng xuất</Link>
            </div>
          </div>
        )}
      >
        <div className={cx('user-warpper')}>
          <img src={testAvt} alt='avt' className={cx('user-avt')}/>
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