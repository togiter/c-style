import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: () => import('@/components/HelloWorld')
    },
    {
      path: '/postContent',
      name: 'postContent',
      component: () => import('@/components/contents/postContent')
    },
    {
      path: '/contentsList',
      name: 'contentsList',
      component: () => import('@/components/contents/contentsList'),
      meta:{title:"列表页"}
    },
    {
      path: '/contentDetails',
      name: 'contentDetails',
      component: () => import('@/components/contents/contentDetails'),
      meta:{title:"详情页"}
    },
    {
      path: '/account',
      name: 'account',
      component: () => import('@/components/accounts/account')
    },
  ]
})
