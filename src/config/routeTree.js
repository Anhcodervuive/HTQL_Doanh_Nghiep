export const routeTree = [
  {
    path: '/admin/dashboard', name: 'Admin', children: [
      {
        path: '/admin/user', name: 'User', children: [
          { path: '/admin/user/create', name: 'Create' },
          { path: '/admin/user', name: 'List' }
        ]
      },
      {
        path: '/admin/supplier', name: 'Supplier', children: [
          { path: '/admin/supplier', name: 'List' },
          { path: '/admin/supplier/create', name: 'Create' }
        ]
      }
    ]
  }
]

export function findBreadcrumbs(path, tree) {
  const result = []
  function traverse(node, currentPath) {
    if (node.path === path) {
      result.push(...currentPath)
      result.push(node)
      return true
    }
    if (node.children) {
      for (const child of node.children) {
        if (traverse(child, [...currentPath, node])) return true
      }
    }
    return false
  }
  tree.forEach(node => traverse(node, []))
  return result
}