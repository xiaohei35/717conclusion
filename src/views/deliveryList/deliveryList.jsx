import React,{Component} from 'react'
import {connect} from 'react-redux'
import './deliveryList.less'
import Header from '../../components/header/header'
import Button from '../../components/button/button'
import $http from '../../utils/http'
import {getCookie} from '../../utils/utils'
import mapDispatchToProps from './dispatch'
import mapStateToProps from './state'

class DeliveryList extends Component{
    constructor(){
        super()
        this.tomine=this.tomine.bind(this)
        this.toConsignee=this.toConsignee.bind(this)
    }
    render(){
        let {history,deliveryList} = this.props
        console.log(deliveryList)
        return <div id='deliveryList'>
            <Header history={history}>收货地址</Header>
            <section>
                {
                    deliveryList.length==0?
                    <p style={{'fontSize':'.28rem','padding':'.3rem'}}>目前没有邮寄地址...</p>:
                    <ul>
                       {
                           deliveryList.map((item,index)=>{
                                return <li key={index}>
                                        <p>{item.name+'   '+item.phone}</p>
                                        <p>{item.province+item.city+item.region}</p>
                                        <p>{item.address}</p>
                                        <p>
                                            <span><em className='actived iconfont'></em></span>
                                            <span>
                                                <span onClick={()=>{this.toEdit(index)}}>
                                                    <em className='iconfont icon-shouye'></em>编辑
                                                </span>
                                                <span onClick={()=>{this.toCancel(index)}}>
                                                    <em className='iconfont icon-shezhi'></em>删除
                                                </span>
                                            </span>
                                        </p>
                                    </li>
                           })
                       }
                    </ul>
                }
            </section>
            <Button onClick={this.toConsignee}><span className='iconfont icon-jiahao'></span>&nbsp;新增收货地址</Button>
        </div>
    }
    tomine(){
        this.props.history.push('/index/mine')
    }
    toConsignee(){
        this.props.history.push('/consignee')
    }
    componentDidMount(){
        //获取数据 更新列表
        this.props.fetdata()
    }
    toEdit(index){
        this.props.toEditDelivery(index)
    }
    toCancel(index){

    }
}

export default connect(mapStateToProps,mapDispatchToProps)(DeliveryList)