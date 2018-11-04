import request from '@/utils/request'

export function fetchCarAudit(data) {
  return request({
    url: '/car/checkJoin',
    method: 'post',
    data
  })
}

export function fetchCarList(data) {
  return request({
    url: '/car/carList',
    method: 'post',
    data
  })
}
