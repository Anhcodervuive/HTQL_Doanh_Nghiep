import DetailItem from '~/pages/Customer/DetailItem'
import CustomerLayout from '~/layouts/CustomerLayout'
import HomePage from '~/pages/Customer/Home'
import Cart from '~/pages/Customer/Cart'
export default [
  {
    path: '/customer',
    element: <CustomerLayout />,
    children : [
      { path: 'detail-Item',
        element: <DetailItem />,
        //loader: composeLoaders(isAuthenticate),
      },
      {
        path: 'home',
        element: <HomePage />
      },
      {
        path: 'cart',
        element: <Cart />
      }
    ]
  },
]