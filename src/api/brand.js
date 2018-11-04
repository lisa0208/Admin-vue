import request from '@/utils/request'

export function fetchBrandList(data) {
  return request({
    url: '/carBrand/searchAll',
    method: 'post',
    data
  })
}
