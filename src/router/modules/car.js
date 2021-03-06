import Layout from '@/views/layout/Layout'

const tableRouter = {
  path: '/car',
  component: Layout,
  redirect: '/car/car-audit',
  name: 'Car',
  meta: {
    title: '车辆管理',
    icon: 'table'
  },
  children: [
    {
      path: 'car-audit',
      component: () => import('@/views/car/carAudit'),
      name: 'carAudit',
      meta: { title: '车辆入驻审核' }
    },
    {
      path: 'car-list',
      component: () => import('@/views/car/carList'),
      name: 'carList',
      meta: { title: '全部车辆列表' }
    },
    {
      path: 'car-brand',
      component: () => import('@/views/car/brandList'),
      name: 'carBrand',
      meta: { title: '车辆品牌管理' }
    },
    {
      path: 'car-model',
      component: () => import('@/views/car/modelList'),
      name: 'carModel',
      meta: { title: '车辆型号管理' }
    },
    {
      path: 'car-color',
      component: () => import('@/views/car/colorList'),
      name: 'carColor',
      meta: { title: '车辆颜色管理' }
    },
    {
      path: 'car-add/:id',
      component: () => import('@/views/car/addCar'),
      name: 'addCar',
      meta: { title: '添加车辆' }
    }
  ]
}
export default tableRouter
