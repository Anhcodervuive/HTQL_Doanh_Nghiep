import DetailItem from '~/pages/Customer/DetailItem'
import CustomerLayout from '~/layouts/CustomerLayout'
import HomePage from '~/pages/Customer/Home'
import ListItem from '~/pages/Customer/ListItem'
import ProfileCustomer from '~/pages/Customer/Profile'
import EditProfile from '~/pages/Customer/Profile/edit'
export default [
  {
    path: '/customer',
    element: <CustomerLayout />,
    children: [
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
        path: 'list-Item',
        element: <ListItem />
      },
      {
        path: 'profileCustomer',
        element: <ProfileCustomer />
      },
      {
        path: 'editProfile',
        element: <EditProfile />
      }
    ]
  },
]