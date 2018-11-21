import Vue from 'vue'
import Router from 'vue-router'
import Layout from '@/views/layout/Layout'
import carRouter from './modules/car'
import userRouter from './modules/user'
import orderRouter from './modules/order'
import bussinessRouter from './modules/bussiness'
import peccancyRouter from './modules/peccancy'

Vue.use(Router)

// 无需判断权限的页面
export const constantRouterMap = [

  {
    path: '/',
    component: Layout,
    redirect: 'dashboard',
  },

  {
    path: '',
    component: Layout,
    redirect: 'dashboard',
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/dashboard/index'),
        name: 'Dashboard',
        meta: { title: ' 数据统计', icon: 'dashboard', noCache: true }
      }
    ]
  },

  {
    path: '/404',
    component: () => import('@/views/errorPage/404'),
    hidden: true
  },

  {
    path: '/userLogin',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/userLogout',
    component: () => import('@/views/logout/index'),
    hidden: true
  },

  // {
  //   path: '/icon',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'index',
  //       component: () => import('@/views/svg-icons/index'),
  //       name: 'Icons',
  //       meta: { title: 'icons', icon: 'icon', noCache: true }
  //     }
  //   ]
  // }

]

export default new Router({
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

// 需要权限控制的页面
export const asyncRouterMap = [

  carRouter,
  userRouter,
  orderRouter,
  bussinessRouter,
  peccancyRouter,
  { path: '*', redirect: '/404', hidden: true }
]
