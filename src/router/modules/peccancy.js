import Layout from '@/views/layout/Layout'

const tableRouter = {
  path: '/peccancy',
  component: Layout,
  redirect: '/peccancy/peccancy-list',
  name: 'User',
  meta: {
    title: '违章管理',
    icon: 'bug'
  },
  children: [
    {
      path: 'peccancy-list',
      component: () => import('@/views/order/peccancyList'),
      name: 'peccancyList',
      meta: { title: '违章列表' }
    }
  ]
}
export default tableRouter
