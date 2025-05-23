import LoginPage from '../pages/Auth/Login'
import SignupPage from '../pages/Auth/Signup'
import ForgetPasswordPage from '../pages/Auth/ForgetPassword'
import ResetPasswordPage from '../pages/Auth/ResetPassword'
import ChangePasswordPage from '~/pages/Auth/ChangePassword'

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
  {
    path: '/changePassword',
    component: ChangePasswordPage,
    layout: null,
  }
]

export default AuthRoutes
