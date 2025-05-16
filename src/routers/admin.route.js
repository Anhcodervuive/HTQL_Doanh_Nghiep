import { Routes } from '~/config'
import AdminLayout from '~/layouts/AdminLayout'
import Dashboard from '~/pages/Admin/Dashboard'
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
  }
]