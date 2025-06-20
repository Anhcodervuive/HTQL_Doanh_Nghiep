import DetailItem from '~/pages/Customer/DetailItem'
import CustomerLayout from '~/layouts/CustomerLayout'
import HomePage from '~/pages/Customer/Home'
import ListItem from '~/pages/Customer/ListItem'
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
        path: 'list-Item',
        element: <ListItem />
      }
    ]
  },
]