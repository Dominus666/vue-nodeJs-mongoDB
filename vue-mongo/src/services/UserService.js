import api from '@/services/api'

export default {
  addNewUser (params) {
    return api().post('users', params)
  },
  loginUser (params) {
    return api().post('users/login', params)
  }
}