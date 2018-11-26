import Vue from 'vue'
import Router from 'vue-router'
import BodyParser from 'body-parser'
import proxyMiddleware from 'http-proxy-middleware'
import Hello from '@/components/HelloWorld'
import Posts from '@/components/Posts'
import ColorSelection from '@/components/ColorSelection'

Vue.use(Router)

// Limit Rate for image uploading
app.use(proxyMiddleware('/api', { target: 'http://localhost:8081/' } )) //any call on /api on 8080 (or we port you client server uses) will be redirected to 1080
app.use(BodyParser({limit: '100MB'}))
app.use(BodyParser.json({limit: '100mb'}));
app.use(BodyParser.urlencoded({limit: '100mb', extended: true}));

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
      component: ColorResult
    },
    {
      path: '/colors',
      name: 'Colors',
      component: ColorSelection
    }
  ]
})