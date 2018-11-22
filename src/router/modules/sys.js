import Layout from '@/views/layout/Layout'

const tableRouter = {
  path: '/sys',
  component: Layout,
  redirect: '/sys/banner-config',
  name: 'Sys',
  meta: {
    title: '系统管理',
    icon: 'email'
  },
  children: [
    {
      path: 'banner-config',
      component: () => import('@/views/sys/bannerList'),
      name: 'bannerConfig',
      meta: { title: 'Banner配置' }
    },
    {
      path: 'add-banner',
      component: () => import('@/views/sys/addBanner'),
      name: 'addBanner',
      meta: { title: '添加 Banner' }
    },
    {
      path: 'add-msg',
      component: () => import('@/views/sys/addMsg'),
      name: 'addMsg',
      meta: { title: '发布消息' }
    },
    {
      path: 'mod-pwd',
      component: () => import('@/views/sys/modPwd'),
      name: 'carList',
      meta: { title: '密码修改' }
    }
  ]
}
export default tableRouter
