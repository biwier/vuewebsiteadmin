// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import ElementUI from 'element-ui'
import Axios from 'axios'
import 'element-ui/lib/theme-chalk/index.css'
import router from './router'
Vue.config.productionTip = false;

Axios.interceptors.response.use(function (response) {
  return response
},function (error) {
  router.replace({path:'/login',query:{redirect:router.currentRoute.fullPath}});
  if (error.response.status === 302){
    localStorage.clear();
    router.replace({path:'/login',query:{redirect:router.currentRoute.fullPath}});
  } else if(error.response.status === 403){
    ElementUI.Notification.error({
      title:'无权访问',
      message:'您无权访问该资源!'
    });
    return error;
  }else {
    ElementUI.Notification.error({
      title:'请求错误',
      message:'Network Error'
    });
    return error;
  }
});
router.beforeEach((to, from, next) => {
  window.document.title = to.meta.title ? to.meta.title + '-' + '网站后台' :'恭逸科技有限公司后台管理系统';

  // if (!sessionStorage.getItem(Config.tokenKey) && to.path != '/login') {
  //   next({path: '/login'});

  // } else {
  next();
  // }
});
router.afterEach(transition => {

});


// http request 请求拦截器，有token值则配置上token值
Vue.use(ElementUI);
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
});
// Axios.interceptors.request.use(
//   config => {
//     if (token){
//       config.headers.Authorization = token;
//     }
//     return config;
//   },
//   error => {
//     return Promise.reject(error)
//   }
// );
//
// Axios.interceptors.response.use({
//
// })



