import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Guanli1 from '@/components/Guanli1'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: HelloWorld
    },
    {
      path: '/two',
      name: 'Guanli1',
      component: Guanli1
    }
    
  ]
})
