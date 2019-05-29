import UserService from '@/services/UserService'

export default {
	state: {
		user: null,
		userPosts: []
	},
	mutations: {
		REGISTRATION_USER(state, payload) {
			state.user = payload
		},
		LOGIN_USER(state, payload) {
			state.user = payload
		},
		USER_LOG_OUT(state, payload) {
			state.userPosts = []
			state.user = payload
		},
		USER_POSTS(state, payload) {
			payload.forEach(el => {
				state.userPosts.unshift(el)
			});
		},
		CREATE_USER_POST (state, payload) {
			state.userPosts.unshift(payload)
		},
		DELETE_USER_POST (state, payload){
			const newPosts = state.userPosts.filter(el => el._id != payload);
			state.userPosts = (newPosts)
		},
		UPDATE_USER_POST (state, payload) {
			const userPost = state.userPosts.find(el => {
				return el._id === payload.id
			})
			userPost.title = payload.title
			userPost.description = payload.description
		}
	},
	actions: {
		async registrationUser({commit}, payload){
			commit('CLEAR_ERROR')
			commit('SET_LOADING', false)
			try {
				const newUser = {
					email: payload.email,
					password: payload.password,
				}
				const createUser = await UserService.addNewUser(newUser)
				const createdUser = {
					_id: createUser.data._id,
					email: createUser.data.email
				}
				commit('REGISTRATION_USER', createdUser);
				commit('SET_LOADING', true)
			} catch (err) {
				commit('SET_LOADING', false)
				commit('SET_ERROR', err.response.data)
				throw err
			}
			
		},
		async loginUser({commit}, payload) {
			commit('CLEAR_ERROR')
			commit('SET_LOADING', true)
			try {
				const loginUser = await UserService.loginUser(payload)
				const user = {
					_id: loginUser.data.user._id,
					email: loginUser.data.user.email
				}
				commit('LOGIN_USER', user)
				commit('USER_POSTS', loginUser.data.userPosts)
				commit('SET_LOADING', false)
				} catch (err) {
					commit('SET_LOADING', false)
					commit('SET_ERROR', err.response.data)
					throw err
				}
		},
		logOut({commit}, payload) {
			commit('USER_LOG_OUT', payload)
		}
	},
	getters: {
		user(state) {
			return state.user
		},
		userPosts(state) {
			return state.userPosts
		}
	}
}