// import classNames from 'classnames/bind'

import Header from './Header'
import SideBar from './SideBar'


function AdminLayout({ children }) {
  return (
    <div className='row no-gutters'>
      <SideBar className='c-2' />
      <div className='c-10'>
        <Header />
        <main style={{
          backgroundColor: 'rgba(182, 193, 203, 0.13)',
          padding: '40px',
        }}>
          {children}
        </main>
      </div>
    </div>
  )
}

export default AdminLayout