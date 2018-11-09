import request from '@/utils/request'

export function fetchOrderList(data) {
  return request({
    url: '/order/orderManageSearch',
    method: 'post',
    data
  })
}

export function updateOrder(data) {
  return request({
    url: '/order/updateStatus',
    method: 'post',
    data
  })
}