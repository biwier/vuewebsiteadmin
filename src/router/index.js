import Vue from 'vue'
import Router from 'vue-router'
import Login from '../components/Login.vue'
import Website from  '../components/Layout/WebSite.vue'
import Menu from  '../views/MenuManager/index.vue'
import ProductEdit from '../views/product/ProductEdit.vue'
import ProductList from '../views/product/ProductList.vue'
import ShowProduct from '../views/product/ShowProduct.vue'
import FunctionClass from '../views/product/FunctionList.vue'
import NewsList from '../views/news/list.vue'
import NewsShow from '../views/news/Show.vue'
import NewsEdit from '../views/news/Edit.vue'
import SortList from '../views/news/sort/list.vue'
import Company from '../views/company/index.vue'
import Bastic from '../views/bastic/index.vue'
import User from '../views/bastic/user.vue'
import Message from '../views/message/index.vue'
import ProductSort from '../views/product/ProductSort.vue'
import PatentInfo from '../views/PatentInfo/index.vue'
import Home from '../views/home/home.vue'
import APP from '../views/APP/app.vue'
import BannerInfo from '../views/bastic/menuBanner.vue'
import NavInfo from '../views/bastic/navInfo.vue'
import Shop from '../views/shop/index'
import Keyword from '../views/keyword/index'

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      component:Login
    },
    {
      path:'/login',
      component:Login
    },
    {
      path:'/home',
      component:Website,
      children:[
        {
          path:'/index',
          component:Home
        },
        {
          path:'/menu',
          component:Menu
        },
        {
          path:'/product/add',
          component:ProductEdit
        },
        {
          path:'/product/list',
          component:ProductList
        },
        {
          path:'/product/edit/:id(\\d+)',
          component:ShowProduct
        },
        {
          path:'/function/list',
          component:FunctionClass
        },
        {
          path:'/news/add',
          component:NewsEdit
        },
        {
          path:'/news/list',
          component:NewsList
        },
        {
          path:'/news/edit/:id(\\d+)',
          component:NewsShow
        },
        {
          path:'/news/sort',
          component:SortList
        },
        {
          path:'/company',
          component:Company
        },
        {
          path:'/setting',
          component:Bastic
        },
        {
          path:'/user/list',
          component:User
        },
        {
          path:'/message/list',
          component:Message
        },
        {
          path:'/productClassSort',
          component:ProductSort
        },
        {
          path:'/patentInfo',
          component:PatentInfo
        },
        {
          path:'/app',
          component:APP
        },
        {
          path:'/banner',
          component:BannerInfo
        } ,
        {
          path:'/navInfo',
          component:NavInfo
        },
        {
          path:'/shop',
          component: Shop
        },
        {
          path:"/keyword",
          component:Keyword
        }
      ]
    },
  ]
})
