export default {
  admin : {
    dashboard: '/admin/dashboard',
    user: {
      list: '/admin/user',
      create: '/admin/user/create',
      edit: (id = '') => `/admin/user/${id || ':id'}/edit`,
    },
    supplier: {
      list: '/admin/supplier',
      create: '/admin/supplier/create',
      edit: (id = '') => `/admin/supplier/${id || ':id'}/edit`,
    },
    itemType: {
      list : '/admin/item-type',
      create: '/admin/item-type/create',
      edit: (id = '') => `/admin/item-type/${id || ':id'}/edit`,
    }
  },
  auth: {
    login: '/login',
    register: '/register',
    forgetPassword: '/forgetPassword',
    resetPassword: '/resetPassword',
    changePassword: '/changePassword'
  },
  error: {
    notFound404: '*',
    forbidden403: '/forbidden'
  }
}