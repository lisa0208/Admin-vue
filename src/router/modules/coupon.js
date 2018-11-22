import Layout from '@/views/layout/Layout'

const tableRouter = {
  path: '/coupon',
  component: Layout,
  redirect: '/coupon/coupon-list',
  name: 'Coupon',
  meta: {
    title: '优惠券管理',
    icon: 'documentation'
  },
  children: [
    {
      path: 'coupon-list',
      component: () => import('@/views/order/couponList'),
      name: 'couponList',
      meta: { title: '优惠券列表' }
    },
    {
      path: 'add-coupon',
      component: () => import('@/views/order/addCoupon'),
      name: 'addCoupon',
      meta: { title: '添加优惠券' }
    }
  ]
}
export default tableRouter
