const rolePermissions = {
  admin: {
    user: ['create', 'update', 'delete', 'read'],
    unitInvoice: ['create', 'update', 'delete', 'read'],
    unitItem: ['create', 'update', 'delete', 'read'],
    supplier: ['create', 'update', 'delete', 'read'],
    voucher: ['create', 'update', 'delete', 'read'],
    itemType: ['create', 'update', 'delete', 'read'],
    item: ['read', 'update', 'delete', 'read'],
    saleInvoice: ['create', 'update', 'delete', 'read'],
    purchaseInvoice: ['create', 'update', 'delete', 'read'],
    order: ['create', 'update', 'delete', 'read'],
  },
  manager: {
    user: ['create', 'update', 'delete', 'read'],
    unitInvoice: ['create', 'update', 'delete', 'read'],
    unitItem: ['create', 'update', 'delete', 'read'],
    supplier: ['create', 'update', 'delete', 'read'],
    voucher: ['create', 'update', 'delete', 'read'],
    itemType: ['create', 'update', 'delete', 'read'],
    item: ['read', 'update', 'delete', 'read'],
    saleInvoice: ['create', 'update', 'delete', 'read'],
    purchaseInvoice: ['create', 'update', 'delete', 'read'],
    order: ['create', 'update', 'delete', 'read'],
  },
  service_staff: {
    user: [],
    unitInvoice: ['read'],
    unitItem: ['read'],
    supplier: ['read'],
    voucher: ['read'],
    itemType: ['read'],
    item: ['read'],
    saleInvoice: ['create', 'update', 'read'],
    purchaseInvoice: ['create', 'update', 'read'],
    order: ['create', 'update', 'read'],
  }
}

export const hasAnyPermission = (roles, resource, action) => {
  return roles.some(role =>
    rolePermissions[role]?.[resource]?.includes(action)
  )
}
