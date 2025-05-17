import { Routes } from '~/config'
import AdminLayout from '~/layouts/AdminLayout'
import Dashboard from '~/pages/Admin/Dashboard'
import SupplierList from '~/pages/Admin/Supplier/list'
import SupplierCreate from '~/pages/Admin/Supplier/create'
import UserCreate from '~/pages/Admin/User/Create'
import UserList from '~/pages/Admin/User/list'

export default [
  {
    path: Routes.admin.dashboard,
    layout: AdminLayout,
    component: Dashboard
  },
  {
    path: Routes.admin.user.create,
    layout: AdminLayout,
    component: UserCreate
  },
  {
    path: Routes.admin.user.list,
    layout: AdminLayout,
    component: UserList,
  },
  {
    path: Routes.admin.supplier.list,
    layout: AdminLayout,
    component: SupplierList
  },
  {
    path: Routes.admin.supplier.create,
    layout: AdminLayout,
    component: SupplierCreate
  }
]