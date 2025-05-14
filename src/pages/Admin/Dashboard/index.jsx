import classNames from 'classnames/bind'

import styles from './Dashboard.module.css'

const cx = classNames.bind(styles)

function Dashboard() {
  return (
    <div className={cx('wrapper')}>
      <h3>Dashboard</h3>
    </div>
  )
}

export default Dashboard