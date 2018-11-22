import request from '@/utils/request'

export function fetchOrderList(data) {
  return request({
    url: '/order/orderManageSearch',
    method: 'post',
    data
  })
}

export function updateOrderStatus(data) {
  return request({
    url: '/order/updateStatus',
    method: 'post',
    data
  })
}

export function updateOrder(data) {
  return request({
    url: '/order/update',
    method: 'post',
    data
  })
}

export function getEndorsementList(data) {
  return request({
    url: '/endorsement/cmsGetList',
    method: 'post',
    data
  })
}

export function getCouponList(data) {
  return request({
    url: '/coupon/cmsSearch',
    method: 'post',
    data
  })
}