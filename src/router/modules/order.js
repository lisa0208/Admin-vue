import Layout from '@/views/layout/Layout'

const tableRouter = {
  path: '/order-list',
  component: Layout,
  redirect: '/user/user-audit',
  name: 'Order',
  meta: {
    title: '订单管理',
    icon: 'user'
  },
  children: [
    {
      path: 'order-list',
      component: () => import('@/views/table/complexTable'),
      name: 'carAudit',
      meta: { title: '订单列表' }
    }
  ]
}
export default tableRouter
