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

export function getDaySummary(data) {
  return request({
    url: '/report/daySummary',
    method: 'post',
    data
  })
}

export function getBussinessOrder(data) {
  return request({
    url: '/report/selectOrderReport',
    method: 'post',
    data
  })
}

export function getBussinessInput(data) {
  return request({
    url: '/report/selectRechargeReport',
    method: 'post',
    data
  })
}

export function getBussinessOupt(data) {
  return request({
    url: '/report/selectTakeCashReport',
    method: 'post',
    data
  })
}
