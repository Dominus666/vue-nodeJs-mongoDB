import api from '@/services/api'

export default {
  fetchPosts () {
    return api().get('posts')
  },
  addNewPost (params) {
    return api().post('posts', params)
  },
  updatePost (params) {
    return api().put(`posts/${params.id}`, params)
  },
  deletePost (id) {
    return api().delete(`posts/${id}`)
  }
}