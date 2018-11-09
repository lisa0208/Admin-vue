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
    }
  ]
}
export default tableRouter
