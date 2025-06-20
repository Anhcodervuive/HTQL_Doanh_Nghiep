import DetailItem from '~/pages/Customer/DetailItem'
import CustomerLayout from '~/layouts/CustomerLayout'
import HomePage from '~/pages/Customer/Home'
import ProfileCustomer from '~/pages/Customer/Profile'
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
        path: 'profileCustomer',
        element: <ProfileCustomer />
      }
    ]
  },
]