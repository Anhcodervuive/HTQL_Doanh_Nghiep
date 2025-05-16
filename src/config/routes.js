export default {
  admin : {
    dashboard: '/admin/dashboard',
    user: {
      list: '/admin/user',
      create: '/admin/user/create',
      edit: (id = '') => `/admin/user/${id}/edit`,
    }
  },
  auth: {
    login: '/login',
    register: '/register',
  }
}