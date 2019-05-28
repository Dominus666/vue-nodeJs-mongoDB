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
			commit('setLoading', false)
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
			commit('setLoading', true)
		},
		async loginUser({commit}, payload) {
			commit('setLoading', true)
			const loginUser = await UserService.loginUser(payload)
			const user = {
				_id: loginUser.data.user._id,
				email: loginUser.data.user.email
			}
			commit('LOGIN_USER', user)
			commit('USER_POSTS', loginUser.data.userPosts)
			commit('setLoading', false)
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