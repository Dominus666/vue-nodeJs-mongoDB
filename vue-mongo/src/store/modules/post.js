import PostsService from '@/services/PostsService'

export default {
	state: {
		posts: []
	},
	mutations: {
		FETCH_POST (state, payload) {
			payload.forEach(el => {
				state.posts.unshift(el)
			});
		},
		CREATE_POST (state, payload) {
			state.posts.unshift(payload)
		},
		DELETE_POST (state, payload) {
			const newPosts = state.posts.filter(el => el._id != payload);
			state.posts = (newPosts)
		},
    UPDATE_POST (state, payload) {
			const post = state.posts.find(el => {
				return el._id === payload.id
			})
			post.title = payload.title
			post.description = payload.description
		}
	},
	actions: {
		async fetchPost ({commit}) {
			commit('CLEAR_ERROR')
			commit('SET_LOADING', true)

			try {
				const response = await PostsService.fetchPosts()
				const allPosts = response.data.posts
				commit('FETCH_POST', allPosts)
				commit('SET_LOADING', false)
			} catch (err) {
				commit('SET_ERROR', err)
				commit('SET_LOADING', false)
				throw err
			}
			
		},
		async createPost ({commit}, payload) {
			commit('CLEAR_ERROR')
			commit('SET_LOADING', true)
			try {
				const newPost = {
					title: payload.title,
					description: payload.description,
					author: payload.author
				}
				const createPost = await PostsService.addNewPost(newPost)
				commit('CREATE_USER_POST', createPost.data)
				commit('CREATE_POST', createPost.data)
				commit('SET_LOADING', false)
			} catch (err) {
				commit('SET_ERROR', err.response.data)
				commit('SET_LOADING', false)
				throw err
			}
			
		},
		async deletePost ({commit}, payload) {
			commit('CLEAR_ERROR')
			commit('SET_LOADING', true)

			try {
				await PostsService.deletePost(payload)
				commit('DELETE_USER_POST', payload)
				commit('DELETE_POST', payload)
				commit('SET_LOADING', false)
			} catch (err) {
				commit('SET_ERROR', err)
				commit('SET_LOADING', false)
				throw err
			}
			
		},
		async updatePost ({commit}, payload) {
			commit('CLEAR_ERROR')
			commit('SET_LOADING', true)
			try {
				await PostsService.updatePost(payload)
				commit('UPDATE_USER_POST', payload)
				commit('UPDATE_POST', payload)
				commit('SET_LOADING', false)
			} catch (err) {
				commit('SET_ERROR', err)
				commit('SET_LOADING', false)
				throw err
			}
			
		}
	},
	getters: {
		posts (state) {
			return state.posts
		},
		postById (state) {
      return postsId => {
        return state.posts.find(el => el._id === postsId)
      }
    }
	}
}