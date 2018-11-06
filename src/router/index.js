import Vue from 'vue'
import Router from 'vue-router'
import TradeView from '../components/TradeView'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'TradeView',
      component: TradeView
    }
  ]
})
