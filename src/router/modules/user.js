import Layout from '@/views/layout/Layout'

const tableRouter = {
  path: '/user',
  component: Layout,
  redirect: '/car/car-list',
  name: 'User',
  meta: {
    title: '用户管理',
    icon: 'user'
  },
  children: [
    {
      path: 'user-list',
      component: () => import('@/views/user/userList'),
      name: 'userList',
      meta: { title: '用户列表' }
    }
  ]
}
export default tableRouter
