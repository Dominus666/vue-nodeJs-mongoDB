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
			const response = await PostsService.fetchPosts()
			const allPosts = response.data.posts
			commit('FETCH_POST', allPosts)
		},
		async createPost ({commit}, payload) {
			const newPost = {
				title: payload.title,
				description: payload.description,
				author: payload.author
			}
			const createPost = await PostsService.addNewPost(newPost)
			commit('CREATE_USER_POST', createPost.data)
			commit('CREATE_POST', createPost.data)
		},
		async deletePost ({commit}, payload) {
			await PostsService.deletePost(payload)
			commit('DELETE_USER_POST', payload)
      commit('DELETE_POST', payload)
		},
		async updatePost ({commit}, payload) {
			await PostsService.updatePost(payload)
			commit('UPDATE_USER_POST', payload)
			commit('UPDATE_POST', payload)
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