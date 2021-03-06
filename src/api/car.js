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

export function updateCar(data) {
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

export function addBrand(data) {
  return request({
    url: '/carBrand/add',
    method: 'post',
    data
  })
}

export function addColor(data) {
  return request({
    url: '/carColor/add',
    method: 'post',
    data
  })
}

export function addModel(data) {
  return request({
    url: '/carModel/add',
    method: 'post',
    data
  })
}

export function searchCarById(data) {
  return request({
    url: '/car/searchCarById',
    method: 'post',
    data
  })
}

export function fetchModelByBrand(data) {
  return request({
    url: '/carModel/searchByBrand',
    method: 'post',
    data
  })
}

export function deleteCarBrand(data) {
  return request({
    url: '/carBrand/delete',
    method: 'post',
    data
  })
}

export function deleteCarColor(data) {
  return request({
    url: '/carColor/delete',
    method: 'post',
    data
  })
}

export function deleteCarModel(data) {
  return request({
    url: '/carModel/delete',
    method: 'post',
    data
  })
}

export function getCarById(data) {
  return request({
    url: '/car/searchCarById',
    method: 'post',
    data
  })
}