import Layout from '@/views/layout/Layout'

const tableRouter = {
  path: '/car',
  component: Layout,
  redirect: '/car/car-audit',
  name: 'Car',
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
