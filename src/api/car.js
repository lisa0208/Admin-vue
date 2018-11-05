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

export function updateCarStatus(data) {
  return request({
    url: '/car/updateCar',
    method: 'post',
    data
  })
}

export function fetchColorList(data) {
  return request({
    url: '/carColor/searchAll',
    method: 'post',
    data
  })
}

export function fetchModelList(data) {
  return request({
    url: '/carModel/searchAll',
    method: 'post',
    data
  })
}

export function fetchBrandList(data) {
  return request({
    url: '/carBrand/searchAll',
    method: 'post',
    data
  })
}

export function addCar(data) {
  return request({
    url: '/car/add',
    method: 'post',
    data
  })
}
