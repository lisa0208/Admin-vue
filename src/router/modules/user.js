import Layout from '@/views/layout/Layout'

const tableRouter = {
  path: '/user',
  component: Layout,
  redirect: '/user/user-list',
  name: 'Table',
  meta: {
    title: '用户管理',
    icon: 'user'
  },
  children: [
    {
      path: 'user-list',
      component: () => import('@/views/table/complexTable'),
      name: 'userList',
      meta: { title: '用户列表' }
    }
  ]
}
export default tableRouter
