import * as React from 'react'
import { createTheme } from '@mui/material/styles'
import DashboardIcon from '@mui/icons-material/Dashboard'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import BarChartIcon from '@mui/icons-material/BarChart'
import DescriptionIcon from '@mui/icons-material/Description'
import LayersIcon from '@mui/icons-material/Layers'
import { AppProvider } from '@toolpad/core/AppProvider'
import { DashboardLayout } from '@toolpad/core/DashboardLayout'
import PeopleIcon from '@mui/icons-material/People'
import { useLocation, useNavigate } from 'react-router-dom'
import { Box } from '@mui/material'
import HandshakeIcon from '@mui/icons-material/Handshake'
import CategoryIcon from '@mui/icons-material/Category'

import UserMenu from './UserMenu'
import { Routes } from '~/config'
import { logo } from '~/assets/images'

const NAVIGATION = [
  {
    kind: 'header',
    title: 'Main',
  },
  {
    segment: Routes.admin.dashboard.slice(1),
    title: 'Dashboard',
    icon: <DashboardIcon />,
  },
  {
    segment: 'orders',
    title: 'Orders',
    icon: <ShoppingCartIcon />,
  },
  {
    kind: 'divider',
  },
  {
    kind: 'header',
    title: 'Analytics',
  },
  {
    segment: 'reports',
    title: 'Reports',
    icon: <BarChartIcon />,
    children: [
      {
        segment: 'sales',
        title: 'Sales',
        icon: <DescriptionIcon />,
      },
      {
        segment: 'traffic',
        title: 'Traffic',
        icon: <DescriptionIcon />,
      },
    ],
  },
  {
    segment: 'integrations',
    title: 'Integrations',
    icon: <LayersIcon />,
  },
  {
    kind: 'divider',
  },
  {
    kind: 'header',
    title: 'Authentication',
  },
  {
    segment: Routes.admin.user.list.slice(1),
    title: 'user',
    icon: <PeopleIcon />,
  },
  {
    kind: 'divider'
  },
  {
    kind: 'header',
    title: 'Hàng hóa',
  },
  {
    segment: Routes.admin.itemType.list.slice(1),
    title: 'Loại hàng hóa',
    icon: <CategoryIcon />
  },
  {
    kind: 'divider',
  },
  {
    kind: 'header',
    title: 'Other',
  },
  {
    segment: Routes.admin.supplier.list.slice(1),
    title: 'Supplier',
    icon: <HandshakeIcon />
  }
]

const demoTheme = createTheme({
  colorSchemes: { light: true, dark: false },
  cssVariables: {
    colorSchemeSelector: 'class',
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 600,
      lg: 1200,
      xl: 1536,
    },
  },
})

function useAdminRouter() {
  const location = useLocation()
  const navigate = useNavigate()

  const router = React.useMemo(() => ({
    pathname: location.pathname,
    searchParams: new URLSearchParams(location.search),
    navigate: (to) => {
      const path = to
      navigate(path)
    },
  }), [location, navigate])

  return router
}

export default function DashboardLayoutBasic(props) {
  const router = useAdminRouter()
  const { window } = props

  // Remove this const when copying and pasting into your project.
  const demoWindow = window ? window() : undefined

  return (
    <AppProvider
      branding={{ logo: <img src={logo} />, title: '' }}
      navigation={NAVIGATION}
      router={router}
      theme={demoTheme}
      window={demoWindow}
    >
      <DashboardLayout
        slots={{
          toolbarAccount: () => (
            <UserMenu />
          ),
        }}
      >
        <Box sx={{ mx: 1, px: 3, pt: 3 }}>
          {props.children}
        </Box>
      </DashboardLayout>
    </AppProvider>
  )
}
