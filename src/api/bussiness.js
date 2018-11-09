import request from '@/utils/request'

export function fetchTakeCashList(data) {
  return request({
    url: '/takeCash/getByPage',
    method: 'post',
    data
  })
}

export function fetchBankList(data) {
  return request({
    url: '/bankCard/getAllType',
    method: 'post',
    data
  })
}

export function updateTakeCash(data) {
  return request({
    url: '/takeCash/update',
    method: 'post',
    data
  })
}

