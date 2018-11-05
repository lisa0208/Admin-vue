import request from '@/utils/request'

export function fetchOrderList(data) {
  return request({
    url: '/order/orderManageSearch',
    method: 'post',
    data
  })
}
