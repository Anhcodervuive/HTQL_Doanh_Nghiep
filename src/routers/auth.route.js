import LoginPage from '../pages/Auth/Login'
import SignupPage from '../pages/Auth/Signup'

const AuthRoutes = [
  {
    path: '/login',
    component: LoginPage,
    layout: null,
  },
  {
    path: '/register',
    component: SignupPage,
    layout: null,
  },
]

export default AuthRoutes
