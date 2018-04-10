import React,{Component} from 'react'
import {Route,Switch,Redirect} from 'react-router-dom'
import {getCookie} from '../utils/utils'

//判断是否获取到token字段 是否登录
function isLogin(){
    //!! 强转布尔值 
    return !!getCookie('token')
}
class Routes extends Component{
    render(){
        const {routes}=this.props
        return <Switch>
            {routes.map((item,ind)=>{
                //路由嵌套用render
                //{...route} 把路由信息传给下级组件(相关API)
                return <Route key={ind} path={item.path} render={(location)=>{
                    //如果有登录权限 并且 未登录的话
                    return item.authorization && !isLogin()?
                        <Redirect to={{pathname:'/login',state:{from:item.path}}}></Redirect>:
                        <item.component {...location} routes={item.children}></item.component>   
                }}></Route>
            })}
        </Switch>  
    }
}
export default Routes