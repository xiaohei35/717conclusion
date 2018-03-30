import React,{Component} from 'react'
import {connect} from 'react-redux'
import './consignee.less'
import Header from '../../components/header/header'
import Button from '../../components/button/button'

class Input extends Component{
    render(){
        return <input type="text" placeholder={this.props.placeholder}/>
    }
}
class Select extends Component{
    render(){
        return <select>
            <option value="">北京</option>
        </select>
    }
}

class Consignee extends Component{
    render(){
        return <div id='consignee'>
            <Header history={this.props.history}>收货人</Header>
            <section>
                <Input placeholder='收货人姓名'/>
                <Input placeholder='手机号'/>
                <Select></Select>
                <Select></Select>
                <Select></Select>
                <Input placeholder='详细地址'/>
                <p>
                    <span className='actived iconfont icon-duihao'></span>
                    <em>设为默认地址</em>
                </p>
                <Button onClick={this.toConsignee}><span className='iconfont icon-jiahao'></span>&nbsp;保存</Button>
            </section>
        </div>
    }
}

export default Consignee