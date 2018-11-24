import request from '@/utils/request'

export function getBannerList(data) {
  return request({
    url: '/banner/list',
    method: 'post',
    data
  })
}

export function updateBanner(data) {
  return request({
    url: '/banner/update',
    method: 'post',
    data
  })
}

export function deleteBanner(data) {
  return request({
    url: '/banner/delete',
    method: 'post',
    data
  })
}

export function addBanner(data) {
  return request({
    url: '/banner/add',
    method: 'post',
    data
  })
}

export function addMsg(data) {
  return request({
    url: '/message/add',
    method: 'post',
    data
  })
}

export function updatePassw(data) {
  return request({
    url: '/admin/updatePassw',
    method: 'post',
    data
  })
}

export function sendCode(data) {
  return request({
    url: '/verifycode/send',
    method: 'post',
    data
  })
}