import React,{Component} from 'react'
import {connect} from 'react-redux'
import './deliveryList.less'
import Header from '../../components/header/header'
import Button from '../../components/button/button'

class DeliveryList extends Component{
    constructor(){
        super()
        this.tomine=this.tomine.bind(this)
        this.toConsignee=this.toConsignee.bind(this)
    }
    render(){
        return <div id='deliveryList'>
            <Header history={this.props.history}>收货地址</Header>
            <section>
                ergved
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
}

export default DeliveryList