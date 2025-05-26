import LoginPage from '../pages/Auth/Login'
import SignupPage from '../pages/Auth/Signup'
import ForgetPasswordPage from '../pages/Auth/ForgetPassword'
import ResetPasswordPage from '../pages/Auth/ResetPassword'
import ChangePasswordPage from '~/pages/Auth/ChangePassword'
import ProfilePage from '~/pages/Auth/Profile'
import AdminLayout from '~/layouts/AdminLayout'
import UpdateProfilePage from '~/pages/Auth/UpdateProfile'

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
    layout: AdminLayout,
  },
  {
    path: '/profile',
    component: ProfilePage,
    layout: AdminLayout,
  },
  {
    path: '/updateProfile',
    component: UpdateProfilePage,
    layout: AdminLayout,
  },
]

export default AuthRoutes
