// import classNames from 'classnames/bind'

import Header from './Header'
import SideBar from './SideBar'


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