import { Routes } from '~/config'
import AdminLayout from '~/layouts/AdminLayout'
import Dashboard from '~/pages/Admin/Dashboard'

export default [
  {
    path: Routes.admin.dashboard,
    layout: AdminLayout,
    component: Dashboard
  }
]