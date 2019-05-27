import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/components/Home'
import CreatePost from '@/components/post/createPost'
import ReadPost from '@/components/post/readPost'
import UserPost from '@/components/post/userPost'
import Registration from '@/components/authentication/registration'
import Login from '@/components/authentication/login'

Vue.use(VueRouter)

export default new VueRouter ({
	routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/create-post',
      name: 'createPost',
      component: CreatePost
    },
    {
      path: '/post/:id',
      name: 'readPost',
      component: ReadPost,
      props: true
    },
    {
      path: '/user-post',
      name: 'userPostt',
      component: UserPost
    },
    {
      path: '/registration',
      name: 'registration',
      component: Registration
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    }
	],
	mode: 'history'
})