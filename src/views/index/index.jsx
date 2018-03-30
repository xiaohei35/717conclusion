import React,{Component} from 'react'
import './index.less'
import Routes from '../../components/routes'
import {NavLink} from 'react-router-dom'
// import Toast from 'react-toast-mobile'
// import 'react-toast-mobile/lib/react-toast-mobile.css'
class Index extends Component{
    render(){
        let {routes}=this.props
        return <div className='box'>
        <div className='main'>
            <Routes routes={routes}></Routes>
        </div>
        <div className='nav'>
            <ul>
                <li>
                    <NavLink to='/index/home' activeClassName='active'>
                        <span className='iconfont icon-shouye'></span>
                        <span>首页</span>
                    </NavLink>
                </li>
                <li>
                    <NavLink to='/index/catagory'>
                        <span className='iconfont icon-fenlei'></span>
                        <span>分类</span>
                    </NavLink>
                </li>
                <li>
                    <NavLink to='/index/cart'>
                        <span className='iconfont icon-gouwuche'></span>
                        <span>购物</span>
                    </NavLink>
                </li>
                <li>
                    <NavLink to='/index/mine'>
                        <span className='iconfont icon-wode'></span>
                        <span>我的</span>
                    </NavLink>
                </li>

            </ul>
        </div>
        </div>
    }
    // componentDidMount(){
    //     //http://www.lb717.com/mall/index/getGoodsChannel?id=1&name=luck
    //     $http.get('/server/test.json',{id:1,name:'luck'})
    //     .then(res=>{console.log(res)})
    //     .catch(err=>{console.log(err)})
    //     // $http.post(url)
    //     // .then(res=>{console.log(res)})
    //     // .catch(err=>{console.log(err)})
    // }
}
export default Index