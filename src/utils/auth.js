import Cookies from 'js-cookie'

const TokenKey = 'jf_role'

export function getToken() {
  console.log(Cookies.get(TokenKey))
  return 'editor'
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}
