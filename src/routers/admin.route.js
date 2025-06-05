import AdminLayout from '../layouts/AdminLayout/index'
import Dashboard from '~/pages/Admin/Dashboard'
import SupplierList from '~/pages/Admin/Supplier/list'
import SupplierCreate from '~/pages/Admin/Supplier/create'
import UserCreate from '~/pages/Admin/User/Create'
import UserList from '~/pages/Admin/User/list'
import SupplierEdit from '~/pages/Admin/Supplier/edit'
import ItemTypeList from '~/pages/Admin/ItemType/list'
import ItemTypeCreate from '~/pages/Admin/ItemType/create'
import ItemTypeEdit from '~/pages/Admin/ItemType/edit'
import ItemUnitList from '~/pages/Admin/ItemUnit/list'
import ItemUnitCreate from '~/pages/Admin/ItemUnit/create'
import ItemUnitEdit from '~/pages/Admin/ItemUnit/edit'
import ItemCreate from '~/pages/Admin/Item/create'
import UnitInvoiceList from '~/pages/Admin/UnitInvoice/list'
import UnitInvoiceCreate from '~/pages/Admin/UnitInvoice/create'
import UnitInvoiceEdit from '~/pages/Admin/UnitInvoice/edit'
import ItemList from '~/pages/Admin/Item/list'
import ItemEdit from '~/pages/Admin/Item/edit'
import ItemDetail from '~/pages/Admin/Item/detail'
import UserDetailPage from '~/pages/Admin/User/detail'


export default [
  {
    path: '/admin',
    element: <AdminLayout />,
    children : [
      {
        path: 'dashboard',
        element: <Dashboard />,
      },
      {
        path: 'user',
        element: <UserList />,
      },
      {
        path: 'user/create',
        element: <UserCreate />,
      },
      {
        path: 'user/:id',
        element: <UserDetailPage />
      },
      {
        path: 'supplier',
        element: <SupplierList />,
      },
      {
        path: 'supplier/create',
        element: <SupplierCreate />,
      },
      {
        path: 'supplier/:id/edit',
        element: <SupplierEdit />,
      },
      {
        path: 'item-type',
        element: <ItemTypeList />,
      },
      {
        path: 'item-type/create',
        element: <ItemTypeCreate />,
      },
      {
        path: 'item-type/:id/edit',
        element: <ItemTypeEdit />,
      },
      {
        path: 'item-unit',
        element: <ItemUnitList />,
      },
      {
        path: 'item-unit/create',
        element: <ItemUnitCreate />,
      },
      {
        path: 'item-unit/:id/edit',
        element: <ItemUnitEdit />,
      },
      {
        path: 'item',
        element: <ItemList />,
      },
      {
        path: 'item/create',
        element: <ItemCreate />,
      },
      {
        path: 'item/:id/edit',
        element: <ItemEdit />,
      },
      {
        path: 'item/:id/detail',
        element: <ItemDetail />,
      },
      {
        path: 'invoice-unit',
        element: <UnitInvoiceList />,
      },
      {
        path: 'invoice-unit/create',
        element: <UnitInvoiceCreate />,
      },
      {
        path: 'invoice-unit/:id/edit',
        element: <UnitInvoiceEdit />,
      },
    ]
  },
]