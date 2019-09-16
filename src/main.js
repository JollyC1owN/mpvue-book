// 引入Vue
import Vue from 'vue'
// 引入App
import App from './app.vue'
// 设置提示信息
Vue.config.productionTip = false
// 声明整个程序的类型
App.mpType = 'app'
// 实例化Vue对象
const app = new Vue(App)
// 挂载生效
app.$mount()
