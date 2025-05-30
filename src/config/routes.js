
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
    },
    itemUnit: {
      list : '/admin/item-unit',
      create: '/admin/item-unit/create',
      edit: (id = '') => `/admin/item-unit/${id || ':id'}/edit`,
    },
    purchaseInvoices: {
      list : 'admin/purchase-invoices',
    }
  },
  auth: {
    login: '/login',
    register: '/register',
    forgetPassword: '/forgetPassword',
    resetPassword: '/resetPassword',
    changePassword: '/changePassword'
  },
  user: {
    profile: '/profile',
    userDetailPath: '/admin/user/:id',
    userDetail: (id) => `/admin/user/${id}`
  },
  error: {
    notFound404: '*',
    forbidden403: '/forbidden'
  }
}