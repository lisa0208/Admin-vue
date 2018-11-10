import request from '@/utils/request'

export function fetchUserList(data) {
  return request({
    url: '/user/userManageSearch',
    method: 'post',
    data
  })
}

export function updateUser(data) {
  return request({
    url: '/user/update',
    method: 'post',
    data
  })
}

export function loginAdmin(data) {
  return request({
    url: '/web/login',
    method: 'post',
    data
  })
}