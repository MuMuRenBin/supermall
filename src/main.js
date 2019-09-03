import Vue from 'vue'
import App from './App.vue'
import router from '@/router'
import store from '@/store'
import toast from 'components/common/toast'

import FastClick from 'fastclick'
import VueLazyLoad from 'vue-lazyload'

import { Sidebar, SidebarItem,Field,Button,Cell, CellGroup } from 'vant';
import 'vant/lib/index.css';
Vue.use(Sidebar);
Vue.use(SidebarItem)
Vue.use(Field);
Vue.use(Button);
Vue.use(Cell).use(CellGroup);



Vue.config.productionTip = false
//添加事件总线
Vue.prototype.$bus = new Vue()
//安装toast插件
Vue.use(toast)
//解决移动端300毫秒延迟
FastClick.attach(document.body)
//使用懒加载插件
Vue.use(VueLazyLoad,{
  // loading:require('')
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
