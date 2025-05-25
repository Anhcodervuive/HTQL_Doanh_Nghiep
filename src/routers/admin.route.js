import { Routes } from '~/config'
import AdminLayout from '~/layouts/AdminLayout'
import Dashboard from '~/pages/Admin/Dashboard'
import SupplierList from '~/pages/Admin/Supplier/list'
import SupplierCreate from '~/pages/Admin/Supplier/create'
import UserCreate from '~/pages/Admin/User/Create'
import UserList from '~/pages/Admin/User/list'
import SupplierEdit from '~/pages/Admin/Supplier/edit'
import ItemTypeList from '~/pages/Admin/ItemType/list'
import ItemTypeCreate from '~/pages/Admin/ItemType/create'
import ItemTypeEdit from '~/pages/Admin/ItemType/edit'

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
      // requiredRoles: ['manager'],
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
  },
  {
    path: Routes.admin.supplier.edit(),
    layout: AdminLayout,
    component: SupplierEdit,
    requires: {
      requireAuth: true,
    },
  },
  {
    path: Routes.admin.itemType.list,
    layout: AdminLayout,
    component: ItemTypeList,
    requires: {
      requireAuth: true,
    },
  },
  {
    path: Routes.admin.itemType.create,
    layout: AdminLayout,
    component: ItemTypeCreate,
    requires: {
      requireAuth: true,
    },
  },
  {
    path: Routes.admin.itemType.edit(),
    layout: AdminLayout,
    component: ItemTypeEdit,
    requires: {
      requireAuth: true,
    },
  }
]