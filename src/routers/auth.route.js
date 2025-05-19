import LoginPage from '../pages/Auth/Login'
import SignupPage from '../pages/Auth/Signup'
import ForgetPasswordPage from '../pages/Auth/ForgetPassword'
import ResetPasswordPage from '../pages/Auth/ResetPassword'

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
  {
    path: '/forgetPassword',
    component: ForgetPasswordPage,
    layout: null,
  },
  {
    path: '/resetPassword',
    component: ResetPasswordPage,
    layout: null,
  },
]

export default AuthRoutes
