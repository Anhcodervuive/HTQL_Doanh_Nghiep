
import classNames from 'classnames/bind'
import { MdDashboard } from 'react-icons/md'
import { FaUserAlt } from 'react-icons/fa'
import { Link } from 'react-router-dom'

import styles from './Sidebar.module.css'

const cx = classNames.bind(styles)

function SideBar(props) {
  return (
    <section {...props} className={cx('wrapper', props.className)}>
      <div className={cx('logo')}>Logo</div>
      <ul className={cx('sidebar-list')}>
        <li><Link to='' className={cx('sidebar-list-item', 'sidebar-list-item-active')}><MdDashboard /> Dashboard</Link></li>
        <li><Link to='' className={cx('sidebar-list-item')}><FaUserAlt />User</Link></li>
        <li><Link to='' className={cx('sidebar-list-item')}>Link</Link></li>
        <li><Link to='' className={cx('sidebar-list-item')}>Link</Link></li>
        <li><Link to='' className={cx('sidebar-list-item')}>Link</Link></li>
      </ul>
    </section>
  )
}

export default SideBar
