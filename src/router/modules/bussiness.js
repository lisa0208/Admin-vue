import Layout from '@/views/layout/Layout'

const tableRouter = {
  path: '/bussiness', // 财务管理
  component: Layout,
  redirect: '/bussiness/takecash-list',
  name: 'Bussiness',
  meta: {
    title: '财务管理',
    icon: 'money'
  },
  children: [
    {
      path: 'takecash-list',
      component: () => import('@/views/bussiness/takeCashList'),
      name: 'takecashList',
      meta: { title: '提现待审核列表' }
    },
    {
      path: 'bussiness-order',
      component: () => import('@/views/bussiness/orderList'),
      name: 'bussiness-order',
      meta: { title: '订单报表' }
    },
    {
      path: 'bussiness-input',
      component: () => import('@/views/bussiness/inputList'),
      name: 'bussiness-input',
      meta: { title: '充值报表' }
    },
    {
      path: 'bussiness-output',
      component: () => import('@/views/bussiness/outputList'),
      name: 'bussiness-output',
      meta: { title: '提现报表' }
    }
  ]
}
export default tableRouter
