import Layout from '@/views/layout/Layout'

const tableRouter = {
  path: '/order',
  component: Layout,
  redirect: '/order/order-list',
  name: 'Order',
  meta: {
    title: '订单管理',
    icon: 'shopping'
  },
  children: [
    {
      path: 'order-list',
      component: () => import('@/views/order/orderList'),
      name: 'orderList',
      meta: { title: '订单列表' }
    }
  ]
}
export default tableRouter
