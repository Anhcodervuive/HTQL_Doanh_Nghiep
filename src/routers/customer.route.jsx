import DetailItem from '~/pages/Customer/DetailItem'
import CustomerLayout from '~/layouts/CustomerLayout'
import HomePage from '~/pages/Customer/Home'
<<<<<<< HEAD
import ListItem from '~/pages/Customer/ListItem'
=======
import ProfileCustomer from '~/pages/Customer/Profile'
>>>>>>> 18a3bdb2b83b0422b51d7e94bd7d5126e320bf49
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
<<<<<<< HEAD
        path: 'list-Item',
        element: <ListItem />
=======
        path: 'profileCustomer',
        element: <ProfileCustomer />
>>>>>>> 18a3bdb2b83b0422b51d7e94bd7d5126e320bf49
      }
    ]
  },
]