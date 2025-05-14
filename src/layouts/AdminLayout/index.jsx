import Header from './Header'
import SideBar from './Sidebar'

function AdminLayout({ children }) {
  return (
    <div>
      <Header />
      <SideBar />
      <main>
        {children}
      </main>
    </div>
  )
}

export default AdminLayout