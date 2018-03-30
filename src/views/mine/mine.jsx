import React,{Component} from 'react'
import {connect} from 'react-redux'
import mapStateToProps from './state'
import './mine.less'

class Mine extends Component{
    constructor(){
        super()
        this.toSetting=this.toSetting.bind(this)
        this.toDeliveryList=this.toDeliveryList.bind(this)
    }
    render(){
        let {userInfo}=this.props;
        return <div id='mine'>
            <header>
                <span className='iconfont icon-shezhi' onClick={this.toSetting}></span>
                <span>我的717商城</span>
                <span></span>
            </header>
            <dl>
                <dt>
                    <img src={require('../../static/img/2.png')} alt=""/>
                </dt>
                <dd>
                    {userInfo.name}
                    <br/>
                    {userInfo.nickname}
                </dd>
            </dl>
            <div className="myseld">
                <div className="one">
                    <p><span className='iconfont icon-shop'></span>我的店铺</p>
                    <p><span className='iconfont icon-xiangyou'></span></p>
                </div>
                <div className="two">
                    <p>
                        <span className='iconfont icon-daifukuan'></span>
                        <span>待付款</span>
                    </p>
                    <p>
                        <span className='iconfont icon-daifahuo'></span>
                        <span>待发货</span>
                    </p>
                    <p>
                        <span className='iconfont icon-daishouhuo'></span>
                        <span>待收货</span>
                    </p>
                    <p>
                        <span className='iconfont icon-shouhou'></span>
                        <span>售后</span>
                    </p>
                    <p>
                        <span className='iconfont icon-wodedingdan'></span>
                        <span>我的订单</span>
                    </p>
                </div>
            </div>
            <ul>
                <li>
                    <p><span className='iconfont icon-loufang01'></span>我的社区</p>
                    <p><span className='iconfont icon-xiangyou'></span></p>
                </li>
                <li>
                    <p><span className='iconfont icon-zhanghuyue'></span>账户余额</p>
                    <p><span className='iconfont icon-xiangyou'></span></p>
                </li>
                <li>
                    <p onClick={this.toDeliveryList}><span className='iconfont icon-dizhiguanli'></span>地址管理</p>
                    <p><span className='iconfont icon-xiangyou'></span></p>
                </li>
            </ul>
        </div>
    }
    toSetting(){
        this.props.history.push('/setting')
    }
    toDeliveryList(){
        this.props.history.push('/deliverylist')
    }
}
export default connect(mapStateToProps)(Mine)