import classNames from 'classnames/bind'

import Header from './Header'
import SideBar from './Sidebar'

const cx = classNames.bind()

function AdminLayout({ children }) {
  return (
    <div className='row no-gutters'>
      <SideBar className='c-2' />
      <div className='c-10'>
        <Header />
        <main>
          {children}
        </main>
      </div>
    </div>
  )
}

export default AdminLayout