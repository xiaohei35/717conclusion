import React,{Component} from 'react'
//一级
import Index from '../views/index/index'
import Detail from '../views/detail/detail'
import Login from '../views/login/login'
import Register from '../views/register/register'
import Setting from '../views/setting/setting'
//二级
import Home from '../views/home/home'
import Catagory from '../views/catagory/catagory'
import Cart from '../views/cart/cart'
import Mine from '../views/mine/mine'
import Search from '../views/search/search'
import Result from '../views/result/result'
import Consignee from '../views/consignee/consignee'
import DeliveryList from '../views/deliveryList/deliveryList'
let route={
    routes:[
        {
            path:'/index',
            component:Index,
            children:[
                {
                    path:'/index/home',
                    component:Home
                },{
                    path:'/index/catagory',
                    component:Catagory
                },{
                    path:'/index/cart',
                    component:Cart,
                    //authorization 登录权限  为true表示需要登录
                    authorization:true
                },{
                    path:'/index/mine',
                    component:Mine,
                    authorization:true
                },{
                    path:'/index/search',
                    component:Search
                },{
                    path:'/index/result',
                    component:Result
                }
            ]
        },{
            path:'/detail',
            component:Detail
        },{
            path:'/login',
            component:Login
        },{
            path:'/register',
            component:Register
        },{
            path:'/setting',
            component:Setting
        },{
            path:'/consignee',
            component:Consignee
        },{
            path:'/deliveryList',
            component:DeliveryList
        }
    ]
    
}
export default route