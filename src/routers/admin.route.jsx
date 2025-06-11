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
import { isAuthenticate, isHaveOneOfRoles } from '~/middlewares/auth'
import { composeLoaders } from '~/utils/composeLoader'
import PurchaseInvoiceList from '~/pages/Admin/PurchaseInvoices/list'
import InvoiceDetail from '~/pages/Admin/PurchaseInvoices/detail'
import AddPurchaseInvoiceForm from '~/pages/Admin/PurchaseInvoices/create'
import VouchersList from '~/pages/Admin/Vouchers/list'
import VoucherDetail from '~/pages/Admin/Vouchers/detail'
import VoucherCreate from '~/pages/Admin/Vouchers/create'
import EditVoucher from '~/pages/Admin/Vouchers/edit'
import VoucherStatisticsPage from '~/pages/Admin/Vouchers/statistics'
import SaleInvoiceCreate from '~/pages/Admin/SaleInvoice/create'

export default [
  {
    path: '/admin',
    element: <AdminLayout />,
    loader: isAuthenticate,
    children : [
      {
        path: 'dashboard',
        element: <Dashboard />,
        loader: composeLoaders(isAuthenticate),
      },
      {
        path: 'user',
        element: <UserList />,
        loader: composeLoaders(isAuthenticate, () => isHaveOneOfRoles(['admin'])),
      },
      {
        path: 'user/create',
        element: <UserCreate />,
        loader: composeLoaders(isAuthenticate, () => isHaveOneOfRoles(['admin'])),
      },
      {
        path: 'user/:id',
        element: <UserDetailPage />,
        loader: composeLoaders(isAuthenticate, () => isHaveOneOfRoles(['admin'])),
      },
      {
        path: 'supplier',
        element: <SupplierList />,
        loader: composeLoaders(isAuthenticate),
      },
      {
        path: 'supplier/create',
        element: <SupplierCreate />,
        loader: composeLoaders(isAuthenticate),
      },
      {
        path: 'supplier/:id/edit',
        element: <SupplierEdit />,
        loader: composeLoaders(isAuthenticate),
      },
      {
        path: 'item-type',
        element: <ItemTypeList />,
        loader: composeLoaders(isAuthenticate),
      },
      {
        path: 'item-type/create',
        element: <ItemTypeCreate />,
        loader: composeLoaders(isAuthenticate),
      },
      {
        path: 'item-type/:id/edit',
        element: <ItemTypeEdit />,
        loader: composeLoaders(isAuthenticate),
      },
      {
        path: 'item-unit',
        element: <ItemUnitList />,
        loader: composeLoaders(isAuthenticate),
      },
      {
        path: 'item-unit/create',
        element: <ItemUnitCreate />,
        loader: composeLoaders(isAuthenticate),
      },
      {
        path: 'item-unit/:id/edit',
        element: <ItemUnitEdit />,
        loader: composeLoaders(isAuthenticate),
      },
      {
        path: 'item',
        element: <ItemList />,
        loader: composeLoaders(isAuthenticate),
      },
      {
        path: 'item/create',
        element: <ItemCreate />,
        loader: composeLoaders(isAuthenticate),
      },
      {
        path: 'item/:id/edit',
        element: <ItemEdit />,
        loader: composeLoaders(isAuthenticate),
      },
      {
        path: 'item/:id/detail',
        element: <ItemDetail />,
        loader: composeLoaders(isAuthenticate),
      },
      {
        path: 'invoice-unit',
        element: <UnitInvoiceList />,
        loader: composeLoaders(isAuthenticate),
      },
      {
        path: 'invoice-unit/create',
        element: <UnitInvoiceCreate />,
        loader: composeLoaders(isAuthenticate),
      },
      {
        path: 'invoice-unit/:id/edit',
        element: <UnitInvoiceEdit />,
        loader: composeLoaders(isAuthenticate),
      },
      {
        path: 'purchase-invoices',
        element: <PurchaseInvoiceList />,
        loader: composeLoaders(isAuthenticate),
      },
      {
        path: 'purchase-invoices/create',
        element: <AddPurchaseInvoiceForm />,
        loader: composeLoaders(isAuthenticate),
      },
      {
        path: 'purchase-invoices/:id',
        element: <InvoiceDetail />,
        loader: composeLoaders(isAuthenticate),
      },
      {
        path: 'vouchers',
        element: <VouchersList />,
        loader: composeLoaders(isAuthenticate),
      },
      {
        path: 'vouchers/:id',
        element: <VoucherDetail/>,
        loader: composeLoaders(isAuthenticate)
      },
      {
        path: 'vouchers/create',
        element: <VoucherCreate />,
        loader: composeLoaders(isAuthenticate),
      },
      {
        path: 'vouchers/:id/edit',
        element: <EditVoucher />,
        loader: composeLoaders(isAuthenticate),
      },
      {
        path: 'vouchers/statistics',
        element: <VoucherStatisticsPage />,
        loader: composeLoaders(isAuthenticate),
      },
      {
        path: 'sale-invoices/create',
        element: <SaleInvoiceCreate />,
        loader: isAuthenticate
      }
    ]
  },
]