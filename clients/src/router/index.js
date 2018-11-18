import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/HelloWorld'
import Posts from '@/components/Posts'
import ColorSelection from '@/components/ColorSelection'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: Hello
    },
    {
      path: '/posts',
      name: 'Posts',
      component: Posts
    },
    {
      path: '/model',
      name: 'Model',
      component: ColorSelection
    },
    {
      path: '/colors',
      name: 'Colors',
      component: ColorSelection
    }
  ]
})