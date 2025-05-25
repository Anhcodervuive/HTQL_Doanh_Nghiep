import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import { Fragment } from 'react'

import { AdminRoutes, AuthRoutes } from './routers'
import DefaultLayout from './layouts/DefaultLayout'
import PrivateRoute from './routers/PrivateRoute'

const combinedRoutes = [...AuthRoutes]

function App() {
  return (
    <Router>
      <div className="app">
        <Routes>
          {combinedRoutes.map((route, index) => {
            const Page = route.component
            let Layout = DefaultLayout


            if (route.layout) Layout = route.layout
            else if (route.layout === null) Layout = Fragment

            return (
              <Route
                key={index}
                path={route.path}
                element={
                  <Layout>
                    <Page />
                  </Layout>
                }
              />
            )
          })}
          {AdminRoutes.map((route, index) => {
            const Page = route.component
            let Layout = DefaultLayout

            const requires = route.requires ?? {}

            if (route.layout) Layout = route.layout
            else if (route.layout === null) Layout = Fragment

            return (
              <Route
                key={index}
                path={route.path}
                element={
                  <PrivateRoute {...requires}>
                    <Layout>
                      <Page />
                    </Layout>
                  </PrivateRoute>
                }
              />
            )
          })}
        </Routes>
      </div>
    </Router>
  )
}

export default App
