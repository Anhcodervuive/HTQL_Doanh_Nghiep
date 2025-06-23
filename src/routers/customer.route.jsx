import DetailItem from '~/pages/Customer/DetailItem'
import CustomerLayout from '~/layouts/CustomerLayout'
import HomePage from '~/pages/Customer/Home'
import ListItemPage from '~/pages/Customer/ListItem'
import Cart from '~/pages/Customer/Cart'
import Order from '~/pages/Customer/Order'
export default [
  {
    path: '/customer',
    element: <CustomerLayout />,
    children : [
      {
        // path: 'detail-Item',
        path: 'detail-Item/:id',
        element: <DetailItem />,
        //loader: composeLoaders(isAuthenticate),item/:id/detail
      },
      {
        path: 'home',
        element: <HomePage />
      },
      {
        path: 'cart',
        element: <Cart />
      },
      {
        path: 'list-Item',
        element: <ListItemPage />
      },
      {
        path: 'order',
        element: <Order />
      }
    ]
  },
]