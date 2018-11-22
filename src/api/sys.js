import request from '@/utils/request'

export function getBannerList(data) {
  return request({
    url: '/banner/list',
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