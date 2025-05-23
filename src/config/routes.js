export default {
  admin : {
    dashboard: '/admin/dashboard',
    user: {
      list: '/admin/user',
      create: '/admin/user/create',
      edit: (id = '') => `/admin/user/${id}/edit`,
    },
    supplier: {
      list: '/admin/supplier',
      create: '/admin/supplier/create',
      edit: (id = '') => `/admin/supplier/${id}/edit`,
    }
  },
  auth: {
    login: '/login',
    register: '/register',
    forgetPassword: '/forgetPassword',
    resetPassword: '/resetPassword',
    changePassword: '/changePassword'
  }
}