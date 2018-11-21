import Layout from '@/views/layout/Layout'

const tableRouter = {
  path: '/peccancy',
  component: Layout,
  redirect: '/peccancy/peccancy-list',
  name: 'User',
  meta: {
    title: '违章管理',
    icon: 'user'
  },
  children: [
    {
      path: 'peccancy-list',
      component: () => import('@/views/order/couponList'),
      name: 'userList',
      meta: { title: '违章列表' }
    }
  ]
}
export default tableRouter
