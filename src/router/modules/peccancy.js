import Layout from '@/views/layout/Layout'

const tableRouter = {
  path: '/peccancy',
  component: Layout,
  redirect: '/peccancy/peccancy-list',
  name: 'Table',
  meta: {
    title: '违章管理',
    icon: 'eye'
  },
  children: [
    {
      path: 'peccancy-list',
      component: () => import('@/views/table/complexTable'),
      name: 'peccancyList',
      meta: { title: '违章列表' }
    }
  ]
}
export default tableRouter
