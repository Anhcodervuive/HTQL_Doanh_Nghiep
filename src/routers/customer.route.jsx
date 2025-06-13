import DetailItem from '~/pages/Customer/DetailItem'
export default [
  {
    path: '/customer',
    element: null,
    children : [
      { path: 'detail-Item',
        element: <DetailItem />,
        //loader: composeLoaders(isAuthenticate),
      },
    ]
  },
]