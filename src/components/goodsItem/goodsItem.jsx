import React,{Component} from 'react'
import $http from '../../utils/http'
import Lazyload from 'react-lazyload'//懒加载
import {getCookie} from '../../utils/utils'
// import {ToastContainer,toast} from 'react-toastify'

import {T} from 'react-toast-mobile'
import Toast from 'react-toast-mobile'
import 'react-toast-mobile/lib/react-toast-mobile.css'

import {connect} from 'react-redux'
import {ADD_CART} from '../../store/reducers'

class Placeholder extends Component{
    render(){
        return <img src={require('../../static/img/1.png')}></img>
    }
}
class GoodsItem extends Component{
    constructor(){
        super()
        this.addCart=this.addCart.bind(this)
    }
    render(){
        let {data}=this.props
        return <dl className='goods-item' onClick={()=>{this.toDetail(data.goods_id)}}>
            <dt>
                {/*placrholder所在的父元素上面 一定要有overflow:auto;属性  debounce={100} 让图片延迟时间 再显示请求来的图片 一开始用默认的图片 这个属性是加在palceholder里面的 不加也可以 */}
                <Lazyload overflow once height={'100%'} placeholder={<Placeholder></Placeholder>}>
                <img src={"http://www.lb717.com"+data.obj_data} alt=""/>
                </Lazyload>
            </dt>
            <dd>
                <p className='goods_detail'>{data.goods_name}</p>
                <p>
                    <span className='goods_price'>￥{data.discount_price}</span>
                    <span className='iconfont icon-gouwuche' onClick={this.addCart}></span>
                </p>
                <Toast/>
            </dd>
        </dl>
    }
    addCart(e){
        //阻止事件冒泡
        e.stopPropagation()
        let {data}=this.props
        //添加购物车 判断是否登录(token)|| 登录有无超时
        if(getCookie('token')){
            $http.post('/user/Cart/addCart',{
                //发送该商品id、信息、token
                goods_id:data.goods_id,
                goods_info:data, 
                token:getCookie('token')
            })
            .then((res)=>{
                if(res==1){
                    T.notify('购物车添加成功')
                    this.props.dispatch({
                        type:ADD_CART,
                        data:{
                            ...data,
                            count:1,
                            selected:0
                        }
                    })
                }else{
                    T.notify(res.info,{
                        position:toast.POSITION.TOP_CENTER,
                        hideProgressBar:true,
                        autoClose:2000,
                        className:"test"
                    })
                    let {history,location} = this.props
                    history.push('/login',{
                        from:location.pathname
                    })
                }
               
            })
        }else{
            let {history,location}=this.props
            history.push('/login',{
                from:location.pathname
            })
        }
        //console.log(document.cookie)这个是可以在控制台看到token数据
    }
    toDetail(goods_id){
        this.props.history.push('/detail?goods_id='+goods_id,{
            goods_id:goods_id
        })
    }
}

export default connect(null)(GoodsItem)