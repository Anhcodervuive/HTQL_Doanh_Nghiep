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
    component: Dashboard,
    requires: {
      requireAuth: true,
    },
  },
  {
    path: Routes.admin.user.create,
    layout: AdminLayout,
    component: UserCreate,
    requires: {
      requireAuth: true,
      requiredRoles: ['manager'],
    },
  },
  {
    path: Routes.admin.user.list,
    layout: AdminLayout,
    component: UserList,
    requires: {
      requireAuth: true,
    },
  },
  {
    path: Routes.admin.supplier.list,
    layout: AdminLayout,
    component: SupplierList,
    requires: {
      requireAuth: true,
    },
  },
  {
    path: Routes.admin.supplier.create,
    layout: AdminLayout,
    component: SupplierCreate,
    requires: {
      requireAuth: true,
    },
  }
]