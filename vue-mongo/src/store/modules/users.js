import UserService from '@/services/UserService'

export default {
	state: {
		user: null,
		userPosts: []
	},
	mutations: {
		REGISTRATION_USER(state, payload) {

		},
		LOGIN_USER(state, payload) {
			state.user = payload
		},
		USER_POSTS(state, payload) {
			payload.forEach(el => {
				state.userPosts.unshift(el)
			});
		}
	},
	actions: {
		async registrationUser({commit}, payload) {
			const newUser = {
				email: payload.email,
				password: payload.password,
			}
			await UserService.addNewUser(newUser)
			commit('REGISTRATION_USER', newUser);	
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
			commit('setLoading', true)
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